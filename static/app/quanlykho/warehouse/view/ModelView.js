define(function(require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');

    var template = require('text!app/quanlykho/warehouse/tpl/model.html'),
        schema = require('json!schema/WarehouseSchema.json');

    // var OrganizationView = require("app/view/organization/view/SelectView")
    // var ItemView = require("app/view/warehouse/view/ItemBalances");

    var Helpers = require('app/base/view/Helper');
    var TemplateHelper = require('app/base/view/TemplateHelper');
    var CustomFilterView = require('app/base/view/CustomFilterView');

    return Gonrin.ModelView.extend({
        template: template,
        modelSchema: schema,
        urlPrefix: "/api/v1/",
        collectionName: "warehouse",
        selectItemList: [],
        listItemRemove: [],
        uiControl: {
            fields: [
                // {
                // 	field: "organization",
                // 	uicontrol: "ref",
                // 	textField: "organization_name",
                // 	foreignRemoteField: "id",
                // 	foreignField: "organization_id",
                // 	dataSource: OrganizationView
                // },

                // {
                // 	field: "details",
                // 	uicontrol: false,
                // 	itemView: ItemView,
                // 	tools: [
                // 		{
                // 			name: "create",
                // 			type: "button",
                // 			buttonClass: "btn btn-outline-secondary btn-fw btn-sm",
                // 			label: "<i class='fa fa-plus'></i>",
                // 			command: "create"
                // 		},
                // 	],
                // 	toolEl: "#add-item"
                // },

                // {
                // 	field: "deleted",
                // 	uicontrol: "combobox",
                // 	textField: "text",
                // 	valueField: "value",
                // 	dataSource: [
                // 		{ "value": false, "text": "Hoạt động" },
                // 		{ "value": true, "text": "Ngừng hoạt động" }
                // 	],
                // }
            ]
        },

        tools: [{
            name: "defaultgr",
            type: "group",
            groupClass: "toolbar-group",
            buttons: [{
                    name: "back",
                    type: "button",
                    buttonClass: "btn-dark btn btn-sm",
                    label: "TRANSLATE:BACK",
                    command: function() {
                        var self = this;
                        Backbone.history.history.back();
                    }
                },
                {
                    name: "save",
                    type: "button",
                    buttonClass: "btn-primary btn-sm",
                    label: "TRANSLATE:SAVE",
                    command: function() {
                        var self = this;
                        var id = self.getApp().getRouter().getParam("id");
                        // if (!self.validate()) {
                        // 	return;
                        // }
                        var method = "update";
                        if (!id) {
                            var method = "create";
                            self.model.set("tenant_id", self.getApp().currentTenant[0]);
                        }
                        self.model.save(null, {
                            success: function(model, respose, options) {
                                console.log(respose)
                                self.createItem(respose.id);
                                self.updateItem();
                                self.deleteItem();
                                toastr.info("Lưu thông tin thành công");
                                self.getApp().getRouter().navigate(self.collectionName + "/collection");
                            },
                            error: function(xhr, error) {
                                try {
                                    if (($.parseJSON(error.xhr.responseText).error_code) === "SESSION_EXPIRED") {
                                        toastr.error("Hết phiên làm việc, vui lòng đăng nhập lại!");
                                        self.getApp().getRouter().navigate("login");
                                    } else {
                                        self.getApp().notify({ message: $.parseJSON(error.xhr.responseText).error_message }, { type: "danger", delay: 1000 });
                                    }
                                } catch (err) {
                                    toastr.error('Lưu thông tin không thành công!');
                                }
                            }
                        });
                    }
                },
                // {
                // 	name: "delete",
                // 	type: "button",
                // 	buttonClass: "btn-danger btn btn-sm",
                // 	label: "TRANSLATE:DELETE",
                // 	visible: function () {
                // 		return this.getApp().getRouter().getParam("id") !== null;
                // 	},
                // 	command: function () {
                // 		var self = this;
                // 		self.model.destroy({
                // 			success: function (model, response) {
                // 				toastr.info('Xoá dữ liệu thành công');
                // 				self.getApp().getRouter().navigate(self.collectionName + "/collection");
                // 			},
                // 			error: function (model, xhr, options) {
                // 				toastr.error('Xoá dữ liệu không thành công!');

                // 			}
                // 		});
                // 	}
                // },
            ],
        }],


        render: function() {
            var self = this;
            localStorage.removeItem("listItem");
            self.$el.find('.chothanghoa').unbind('click').bind('click', function() {
                self.model.set('status_init', 'chot')
            })
            var id = this.getApp().getRouter().getParam("id");
            if (id) {
                this.model.set('id', id);
                this.model.fetch({
                    success: function(data) {
                        if (self.model.get('status_init') == 'chot') {
                            self.$el.find('.chothanghoa').hide();
                            self.$el.find('#show-list-item').removeAttr('id')
                        }
                        self.applyBindings();
                        self.listItem();
                        self.showSavedItem();
                        self.listItemsOldRemove();
                        self.ShowListItem();
                        if (self.model.get('status_init') == 'chot') {
                            self.$el.find('.body-item-old').hide();
                        }
                    },
                    error: function() {
                        toastr.error("Get data Eror");
                    },
                });
            } else {
                self.applyBindings();
                self.listItem();
                self.ShowListItem();

            }
        },

        loadData: function(data) {
            var self = this;
            self.$el.find("#grid").grid({
                refresh: true,
                primaryField: "id",
                pagination: {
                    page: 1,
                    pageSize: 8
                },
                fields: [
                    { field: "item_no", label: "Mã", width: "150px" },
                    {
                        field: "",
                        label: "ĐVT",
                        template: function(rowObj) {
                            if (rowObj.unit_code) {
                                return `<div style="min-width: 100px">${rowObj.unit_code}</div>`;
                            } else {
                                return `<div style="min-width: 100px"></div>`;
                            }
                        }
                    },
                    {
                        field: "item_name",
                        label: "Tên hàng hóa",
                        template: function(rowObject) {
                            return `<div style="min-width: 140px;">${rowObject.item_name}</div>`;
                        }
                    },
                    {
                        field: "specification",
                        label: "Quy cách",
                        template: function(rowObject) {
                            if (rowObject.specification) {
                                return `<div style="min-width: 140px">${rowObject.specification}</div>`;
                            } else {
                                return `<div style="min-width: 70px"></div>`;
                            }
                        }
                    },
                    {
                        field: "",
                        label: "Tồn kho",
                        template: function(rowObject) {
                            return `<div style="min-width: 120px">${rowObject.quantity}</div>`;
                        }
                    },
                    {
                        field: "deleted",
                        label: " ",
                        template: function(rowObj) {
                            return TemplateHelper.statusRender(!rowObj.deleted);
                        }
                    }
                ],
                dataSource: data.object_data,

            });
        },
        validate: function() {
            var self = this;
            if (!self.model.get("organization")) {
                toastr.error("Vui lòng chọn công ty")
                return;
            } else if (!self.model.get("warehouse_name")) {
                toastr.error("Vui lòng nhập tên kho");
                return;
            } else if (!self.model.get("warehouse_no")) {
                toastr.error("Vui lòng nhập mã kho");
                return;
            }
            return true;
        },
        listItem: function() {
            var self = this;
            $.ajax({
                type: "POST",
                url: self.getApp().serviceURL + "/api/v1/get_item_in_warehouse",
                data: JSON.stringify({
                    id: self.model.get("id"),
                    tenant: self.getApp().currentTenant[0],
                }),
                success: function(response) {
                    console.log(response)
                    response.forEach(function(item, index) {
                        self.$el.find('#body-items').append(`
							<tr>
								<td style="min-width: 250px">${item.item_name}</td>
								<td style="min-width: 150px">${item.purchase_cost}</td>
								<td style="min-width: 130px">${item.quantity}</td>
							</tr>
						`)

                    })
                }
            })
        },
        // ############################CHỨC NĂNG CHỌN ITEM ##########################################################


        createItem: function(warehouse_id) {
            var self = this;
            var arr = [];
            self.$el.find('.body-item-new').each(function(index, item) {
                var obj = {};
                obj.item_id = $(item).attr('item-id')
                obj.item_name = $(item).find('#item_name').attr('item-name')
                obj.purchase_cost = Number($(item).find('td .purchase-cost').val())
                obj.quantity = Number($(item).find('td .quantity').val())
                obj.net_amount = Number($(item).find('td .net-amount').val())
                obj.warehouse_id = warehouse_id
                obj.tenant_id = self.getApp().currentTenant[0]

                arr.push(obj)
            })
            $.ajax({
                type: "POST",
                url: self.getApp().serviceURL + "/api/v1/create_init_warehouse",
                data: JSON.stringify({ "warehouse_id": warehouse_id, "data": arr }),
                success: function(res) {
                    console.log(res)
                }
            })
        },
        updateItem: function() {
            var self = this;
            var arr = [];
            self.$el.find('.body-item-old').each(function(index, item) {
                var obj = {};
                obj.item_id = $(item).attr('item-id')
                obj.purchase_cost = Number($(item).find('td .purchase-cost').val())
                obj.quantity = Number($(item).find('td .quantity').val())
                obj.net_amount = Number($(item).find('td .net-amount').val())
                obj.warehouse_id = self.model.get('id')
                obj.tenant_id = self.getApp().currentTenant[0]
                arr.push(obj)
            })
            $.ajax({
                type: "POST",
                url: self.getApp().serviceURL + "/api/v1/update_init_warehouse",
                data: JSON.stringify(arr),
                success: function(res) {
                    console.log(res)
                }
            })
        },
        updateItemBill: function() {
            var self = this;
            console.log(self.model.get('details'))
            $.ajax({
                type: "POST",
                url: self.getApp().serviceURL + "/api/v1/update_goods_reciept_details_item_bill",
                data: JSON.stringify(self.model.get('details')),
                success: function(res) {
                    console.log(res)
                }
            })
        },
        listItemsOldRemove: function() {
            var self = this;
            self.$el.find('.body-item-old .itemRemove').unbind('click').bind('click', function() {
                self.$el.find('.body-item-old[item-id="' + $(this).attr('item-id-xoa') + '"]').remove();
                self.listItemRemove.push($(this).attr('item-id-xoa'))
            })
        },
        deleteItem: function() {
            var self = this;
            var arrayItemRemove = self.listItemRemove.length;
            if (arrayItemRemove > 0) {
                $.ajax({
                    type: "POST",
                    url: self.getApp().serviceURL + "/api/v1/delete_init_warehouse",
                    data: JSON.stringify(self.listItemRemove),
                    success: function(response) {
                        self.listItemRemove.splice(0, arrayItemRemove);
                        console.log(response)
                    }
                });
            }
        },

        showSavedItem: function() {
            var self = this;
            var savedItem = self.model.get('details')
            if (savedItem) {
                savedItem.forEach(function(item, index) {
                    self.$el.find('#body-items').append(`
                    <tr class="body-item-old" item-id="${item.id}" >
                    <td id="item_name" item-name="${item.item_name}">
                    ${item.item_name}
                    </td>
                    <td style="text-align: left;">
                        <input type="text" class="form-control purchase-cost"  value="${item.purchase_cost}" />
                    </td>
                    <td><input type="text" class="form-control quantity" value="${item.quantity}"/></td>
                    <td style="width: 160px"><input type="text" class="form-control net-amount" value="${item.net_amount}"  readonly /></td>
                    <td style="width: 50px; line-height: 34px; margin-top: 20px" >
                        <div class="itemRemove" item-id-xoa="${item.id}">
                            <i class="fa fa-trash" style="font-size: 17px"></i>
                        </div>
                    </td>
                    </tr>
                `)
                })
                self.taxExcluded();

            }
        },
        ShowListItem: function() {
            var self = this;
            self.$el.find('#show-list-item').unbind('click').bind('click', function() {
                console.log('xxx')
                self.pagination(null);
                self.inputSearch();
                self.$el.find('.chose-item').show()
                self.$el.find('.btn-quaylai').unbind('click').bind('click', function() {
                    self.$el.find('.chose-item').hide()
                })
            })
        },
        htmlShowItem: function(page_number, text) {
            var self = this;
            $.ajax({
                url: self.getApp().serviceURL + "/api/v1/get_data_item",
                method: "POST",
                data: JSON.stringify({ "page_number": page_number, "text": text }),
                contentType: "application/json",
                success: function(data) {
                    if (data.length != 0) {
                        data.forEach(function(item, index) {
                            self.$el.find('.trang-thiet-bi-y-te').append(`
                            <div class="col-4 col-md-2 p-1 item-show" item-id="${item.id}" >
                                <div class="text-center">
                                    <div title="${item.item_name}" style="margin-left: auto; margin-right: auto; left: 0px; right: 0px;width: 90px;height:170px;position: relative;">
                                        <input class="item-checkbox" item-id="${item.id}" type="checkbox" style="position: absolute; top: 0px; left: 0px;width:90px;height: 90px;opacity:0">
                                        <img src="static/img/user.png" style="width:90px;height: 90px;">
                                        <label class="item-chose" style="position: absolute;top:70px;right:3px;display:none"><i class="fa fa-check-square-o text-success" aria-hidden="true"></i></label>
                                        <label class="item-not-chose"  style="position: absolute;top:70px;right:3px"><i class="fa fa-square-o" aria-hidden="true"></i></label>
                                        <label class="item-name" purchase-cost=${item.purchase_cost}  style="font-size: 10px;width:100%;overflow: hidden;text-overflow: ellipsis;line-height: 20px;-webkit-line-clamp: 3;display: -webkit-box;-webkit-box-orient: vertical;">${item.item_name}</label>
                                        </div>
                                </div>
                            </div>
                            `).fadeIn()
                        })
                        self.choseItem();
                        self.showSelectedItem()
                    }
                }
            })
        },
        inputSearch: function() {
            var self = this;
            self.$el.find("#input-search").keyup(function(e) {
                // xhr.abort()
                var text = $(this).val();
                self.pagination(text);
            })

        },
        choseItem: function() {
            var self = this;
            var selectItemList = self.selectItemList;
            self.$el.find('.item-checkbox').change(function(event) {
                var checkBox = $(this);
                var itemID = checkBox.attr('item-id');
                var itemName = checkBox.siblings('.item-name').text()
                var itemPurchaseCost = checkBox.siblings('.item-name').attr('purchase-cost')

                if (event.target.checked) {
                    selectItemList.push({ "item_id": itemID, "item_name": itemName, "purchase_cost": itemPurchaseCost })
                    checkBox.siblings('.item-chose').show();
                    checkBox.siblings('.item-not-chose').hide();
                    localStorage.setItem("listItem", JSON.stringify(selectItemList))
                } else {
                    checkBox.siblings('.item-chose').hide();
                    checkBox.siblings('.item-not-chose').show();
                    selectItemList.forEach(function(item, index) {
                        if (item.item_id === itemID) {
                            selectItemList.splice(index, 1);
                        }
                    })
                    localStorage.setItem("listItem", JSON.stringify(selectItemList))
                }
                self.showSelectedItem()
            })
        },
        showSelectedItem: function() {
            var self = this;
            var listSelectedItems = JSON.parse(localStorage.getItem("listItem"))
            var savedItemSelected = self.model.get('details')
            savedItemSelected.forEach(function(item, idnex) {
                if (listSelectedItems == null) {
                    listSelectedItems = []
                }
                listSelectedItems.push({ "item_id": item.item_id, "item_name": item.item_name, "purchase_cost": item.purchase_cost })
            })
            if (listSelectedItems != undefined && listSelectedItems != null) {
                listSelectedItems.forEach(function(item, index) {
                    var itemCheckBox = self.$el.find('.item-checkbox[item-id = ' + item.item_id + ']')
                    if (itemCheckBox.attr('item-id') == item.item_id) {
                        itemCheckBox.prop("checked", true);
                        itemCheckBox.siblings('.item-chose').show();
                        itemCheckBox.siblings('.item-not-chose').hide();
                    }
                })
                self.$el.find('.btn-hoantat').unbind('click').bind('click', function() {
                    self.$el.find('.chose-item').hide()
                    self.$el.find('.body-item-new').remove()
                    listSelectedItems.forEach(function(item, index) {
                        savedItemSelected.forEach(function(item2, index2) {
                            if (item.item_id == item2.item_id) {
                                listSelectedItems.splice(index, 1);
                            }
                        })
                    })
                    self.htmlShowSelectedItem(listSelectedItems);
                })
            }
        },
        taxExcluded: function() {
            var self = this;
            var bodyItemNew = self.$el.find('.body-item-new')
            var bodyItemOld = self.$el.find('.body-item-old')
            var bodyItem = [bodyItemNew, bodyItemOld]
            bodyItem.forEach(function(itemBody, indexBody) {
                if (itemBody.length > 0) {
                    itemBody.each(function(index, item) {
                        $(item).find('.quantity').change(function() {
                            if ($(item).find('.purchase-cost').val() != null && $(item).find('.purchase-cost').val() != '') {
                                var purchaseCost = $(item).find('.purchase-cost').val();
                                var quantity = $(item).find('.quantity').val();
                                $(item).find('.net-amount').val(purchaseCost * quantity);
                            }
                        })
                        $(item).find('.purchase-cost').change(function() {
                            if ($(item).find('.quantity').val() != null && $(item).find('.quantity').val() != '') {
                                var purchaseCost = $(item).find('.purchase-cost').val();
                                var quantity = $(item).find('.quantity').val();
                                $(item).find('.net-amount').val(purchaseCost * quantity);
                            }
                        })
                    })
                }
            })
        },
        htmlShowSelectedItem: function(listSelectedItems) {
            var self = this;
            if (listSelectedItems) {
                listSelectedItems.forEach(function(item, index) {
                    self.$el.find('#body-items').append(`
                    <tr class="body-item-new" item-id="${item.item_id}" >
                    <td id="item_name" item-name="${item.item_name}">
                    ${item.item_name}
                    </td>
                    <td style="text-align: left;">
                        <input type="number" class="form-control purchase-cost"  value="${item.purchase_cost}" />
                    </td>
                    <td><input type="number" class="form-control quantity" /></td>
                    <td style="width: 160px"><input type="number" class="form-control net-amount"  readonly /></td>
                    <td style="width: 50px; line-height: 34px; margin-top: 20px" >
                        <div class="itemRemove" ind = "${index}">
                            <i class="fa fa-trash" style="font-size: 17px"></i>
                        </div>
                    </td>
                    </tr>
                `)
                })
                self.listItemsNewRemove(listSelectedItems);
                self.taxExcluded();
            }
        },
        listItemsNewRemove: function(listSelectedItems) {
            var self = this;
            self.$el.find('.body-item-new .itemRemove').unbind('click').bind('click', function() {
                $(self.$el.find('.body-item-new')[$(this).attr('ind')]).remove();
                listSelectedItems.splice($(this).attr('ind'), 1);
                localStorage.setItem('listItem', JSON.stringify(listSelectedItems))
                self.taxExcluded();
            })
        },
        pagination: function(text) {
            var self = this;
            $.ajax({
                type: "POST",
                url: self.getApp().serviceURL + '/api/v1/length_data',
                data: JSON.stringify(12),
                success: function(response) {
                    var lengthAllData = Math.ceil(response);
                    self.$el.find('.page-max').find('a').text(lengthAllData);
                    self.$el.find('.page-max,.page-3dot-max,.page-3dot-min,.page-min').hide()
                    if (lengthAllData > 4) {
                        self.$el.find('.page-3dot-max').show()
                    }
                    if (lengthAllData >= 6) {
                        self.$el.find('.page-max').show()
                    }
                    if (lengthAllData == 1) {
                        $(self.$el.find('.page-number')[2]).hide()
                        $(self.$el.find('.page-number')[3]).hide()
                        $(self.$el.find('.page-number')[4]).hide()
                    }
                    if (lengthAllData == 2) {
                        $(self.$el.find('.page-number')[3]).hide()
                        $(self.$el.find('.page-number')[4]).hide()
                    }
                    if (lengthAllData == 3) {
                        $(self.$el.find('.page-number')[4]).hide()
                    }
                    self.$el.find('.trang-thiet-bi-y-te').find('.item-show').remove();
                    self.htmlShowItem(0, text)
                    var page = self.$el.find('.page-number')



                    page.unbind('click').bind('click', function() {
                        self.$el.find('.trang-thiet-bi-y-te').find('.item-show').remove();
                        self.$el.find('.page-number').removeClass('active')
                        $(this).addClass('active')
                        var pageCurrent = Number($(this).find('a').text());
                        var pageFirst = Number($(page[1]).find('a').text());
                        var pageEnd = Number($(page[4]).find('a').text());

                        if (pageCurrent - pageFirst == 3) {
                            if (pageCurrent < lengthAllData) {
                                self.$el.find('.page-number').removeClass('active')
                                $(page[3]).addClass('active')
                                $(page[1]).find('a').html(pageCurrent - 2)
                                $(page[2]).find('a').html(pageCurrent - 1)
                                $(page[3]).find('a').html(pageCurrent)
                                $(page[4]).find('a').html(pageCurrent + 1)
                                pageFirst = Number($(page[1]).find('a').text());
                                pageEnd = Number($(page[4]).find('a').text());
                            }
                            if (pageCurrent == lengthAllData || lengthAllData - pageCurrent == 1) {
                                self.$el.find('.page-3dot-max').hide()
                            }
                        }
                        if (pageEnd - pageCurrent == 3) {
                            if (pageCurrent == 1) {
                                self.$el.find('.page-number').removeClass('active')
                                $(page[1]).addClass('active')
                                $(page[1]).find('a').html(pageCurrent)
                                $(page[2]).find('a').html(pageCurrent + 1)
                                $(page[3]).find('a').html(pageCurrent + 2)
                                $(page[4]).find('a').html(pageCurrent + 3)
                                pageFirst = Number($(page[1]).find('a').text());
                                pageEnd = Number($(page[4]).find('a').text());

                            }
                            if (pageCurrent > 1) {
                                self.$el.find('.page-number').removeClass('active')
                                $(page[2]).addClass('active')
                                $(page[1]).find('a').html(pageCurrent - 1)
                                $(page[2]).find('a').html(pageCurrent)
                                $(page[3]).find('a').html(pageCurrent + 1)
                                $(page[4]).find('a').html(pageCurrent + 2)
                                pageFirst = Number($(page[1]).find('a').text());
                                pageEnd = Number($(page[4]).find('a').text());
                            }
                            if (pageCurrent <= 2) {
                                self.$el.find('.page-3dot-min').hide()
                            }

                        }
                        if (lengthAllData - pageEnd >= 1) {
                            self.$el.find('.page-3dot-max').show()
                        }
                        if (lengthAllData - pageEnd < 2) {
                            self.$el.find('.page-3dot-max').hide()
                        } else {
                            self.$el.find('.page-3dot-max').show()
                        }
                        if (lengthAllData - pageEnd < 1) {
                            self.$el.find('.page-max').hide()
                        } else {
                            self.$el.find('.page-max').show()
                        }
                        if (pageFirst > 1) {
                            self.$el.find('.page-3dot-min').show()
                        }
                        if (pageFirst > 2) {
                            self.$el.find('.page-min').show()
                        } else {
                            self.$el.find('.page-min').hide()
                        }
                        self.htmlShowItem(pageCurrent - 1, text);

                    })
                    self.$el.find('.page-min').unbind('click').bind('click', function() {
                        self.$el.find('.trang-thiet-bi-y-te').find('.item-show').remove();
                        self.$el.find('.page-number').removeClass('active')
                        $(page[1]).addClass('active')
                        $(page[1]).find('a').html(1)
                        $(page[2]).find('a').html(2)
                        $(page[3]).find('a').html(3)
                        $(page[4]).find('a').html(4)
                        self.$el.find('.page-min,.page-3dot-min').hide()
                        self.$el.find('.page-max,.page-3dot-max').show()
                        self.htmlShowItem(0, text);
                    })
                    self.$el.find('.page-max').unbind('click').bind('click', function() {
                        self.$el.find('.trang-thiet-bi-y-te').find('.item-show').remove();
                        self.$el.find('.page-number').removeClass('active')
                        $(page[4]).addClass('active')
                        $(page[1]).find('a').html(lengthAllData - 3)
                        $(page[2]).find('a').html(lengthAllData - 2)
                        $(page[3]).find('a').html(lengthAllData - 1)
                        $(page[4]).find('a').html(lengthAllData)
                        self.$el.find('.page-min,.page-3dot-min').show()
                        self.$el.find('.page-max,.page-3dot-max').hide()
                        self.htmlShowItem(lengthAllData - 1, text);
                    })
                }
            });

        },
        // ############################ HẾT CHỨC NĂNG CHỌN ITEM ##########################################################

    });

});