define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');

    var template = require('text!app/goods-reciept/tpl/model.html'),
        schema = require('json!schema/GoodsRecieptSchema.json');

    // var WarehouseView = require("app/view/warehouse/view/SelectView");
    // var CurrencyView = require("app/view/currency/view/SelectView");
    var ContactView = require("app/contact/view/SelectView");
    var ItemView = require("app/goods-reciept/view/ItemView")
    var Helpers = require('app/base/view/Helper');
    var ItemDialogView = require("app/goods-reciept/view/ItemDialogView");
    var PaymentView = require("app/goods-reciept/view/Payment");

    var currencyFormat = {
        symbol: "VNĐ", // default currency symbol is '$'
        format: "%v %s", // controls output: %s = symbol, %v = value (can be object, see docs)
        decimal: ",", // decimal point separator
        thousand: ".", // thousands separator
        precision: 0, // decimal places
        grouping: 3 // digit grouping (not implemented yet)
    };


    return Gonrin.ModelView.extend({
        template: template,
        modelSchema: schema,
        urlPrefix: "/api/v1/",
        collectionName: "goodsreciept",
        changeDetails: [],

        refresh: true,
        uiControl: {
            fields: [
                {
                    field: "contact",
                    uicontrol: "ref",
                    textField: "contact_name",
                    foreignRemoteField: "id",
                    foreignField: "contact_id",
                    dataSource: ContactView
                },
                {
                    field: "net_amount",
                    uicontrol: "currency",
                    currency: currencyFormat,
                    cssClass: "text-right"
                },
                {
                    field: "amount",
                    uicontrol: "currency",
                    currency: currencyFormat,
                    cssClass: "text-right"
                },
                {
                    field: "discount_amount",
                    uicontrol: "currency",
                    currency: currencyFormat,
                    cssClass: "text-right"
                },
                {
                    field: "tax_amount",
                    uicontrol: "currency",
                    currency: currencyFormat,
                    cssClass: "text-right"
                },
                {
                    field: "discount_percent",
                    cssClass: "text-right"
                },
                {
                    field: "tax_percent",
                    cssClass: "text-right"
                },
                {
                    field: "taxtype",
                    uicontrol: "combobox",
                    textField: "text",
                    valueField: "value",
                    dataSource: [{
                        "value": "group",
                        "text": "Theo hoá đơn"
                    },
                    {
                        "value": "individual",
                        "text": "Theo hàng hoá"
                    },
                    ],
                    value: "male"
                },
                {
                    field: "payment_status",
                    uicontrol: "combobox",
                    textField: "text",
                    valueField: "value",
                    dataSource: [{
                        "value": "created",
                        "text": "Tạo yêu cầu"
                    },
                    {
                        "value": "confirm",
                        "text": "Đã duyệt yêu cầu"
                    },
                    {
                        "value": "done",
                        "text": "Đã về kho"
                    },
                    {
                        "value": "paid",
                        "text": "Đã thanh toán"
                    }
                    ]
                },
                {
                    field: "details",
                    uicontrol: false,
                    itemView: ItemView,
                    tools: [{
                        name: "create",
                        type: "button",
                        buttonClass: "btn btn-outline-secondary btn-fw btn-sm",
                        label: "<i class='fa fa-plus'></i>",
                        command: "create"
                    },],
                    toolEl: "#add-item"
                },
            ]
        },

        tools: [{
            name: "defaultgr",
            type: "group",
            groupClass: "toolbar-group",
            buttons: [{
                name: "back",
                type: "button",
                buttonClass: "btn btn-secondary btn-sm",
                label: "Quay lại",
                command: function () {
                    var self = this;
                    if ($("body").hasClass("sidebar-icon-only")) {
                        $("#btn-menu").trigger("click");
                    }
                    Backbone.history.history.back();
                }
            },
            {
                name: "save",
                type: "button",
                buttonClass: "btn-primary btn btn-sm save",
                label: "Lưu",
                command: function () {
                    var self = this;
                    console.log('xxx')
                    // var id = self.getApp().getRouter().getParam("id");
                    // if (!self.validate()) {
                    //     return;
                    // }
                    // var method = "update";
                    // if (!id) {
                    //     var method = "create";
                    //     var created_by_name = self.getApp().currentUser.fullname ? self.getApp().currentUser.fullname : self.getApp().currentUser.email;
                    //     self.model.set("created_by_name", created_by_name);
                    //     self.model.set("created_at", Helpers.utcToUtcTimestamp());
                    //     var makeNo = Helpers.makeNoGoods(10, "PN0").toUpperCase();
                    //     self.model.set("goodsreciept_no", makeNo);
                    //     self.model.set("tenant_id", self.getApp().currentTenant);
                    //     // saveLog(action, actor, object_type, object_no, workstation_id, workstation_name, items)
                    //     self.getApp().saveLog("create", "goodsreciept", self.model.get("goodsreciept_no"), null, null, self.model.get("details"), Helpers.utcToUtcTimestamp());
                    // }
                    // self.getApp().saveLog("update", "goodsreciept", self.model.get("goodsreciept_no"), null, null, self.model.get("details"), Helpers.utcToUtcTimestamp());
                    self.model.save({
                        success: function (model, respose, options) {
                            // if ($("body").hasClass("sidebar-icon-only")) {
                            //     $("#btn-menu").trigger("click");
                            // }
                            toastr.info('Lưu thông tin thành công');
                            self.getApp().getRouter().navigate(self.collectionName + "/collection");

                        },
                        error: function (model, xhr, options) {
                            toastr.error('Đã có lỗi xảy ra');

                        }
                    });
                }
            },
            {
                name: "delete",
                type: "button",
                buttonClass: "btn btn-danger btn-sm btn-delete hide",
                label: "Xóa",
                visible: function () {
                    return this.getApp().getRouter().getParam("id") !== null;
                },
                command: function () {
                    var self = this;
                    $.jAlert({
                        'title': 'Bạn có chắc muốn xóa?',
                        'content': '<button class="btn btn-sm btn-danger" id="yes">Có!</button><button class="btn btn-sm btn-light" id="no">Không</button>',
                        'theme': 'red',
                        'onOpen': function ($el) {

                            $el.find("#yes").on("click", function () {
                                self.model.set("deleted", true);
                                self.getApp().saveLog("delete", "goodsreciept", self.model.get("goodsreciept_no"), null, null, self.model.get("details"), Helpers.utcToUtcTimestamp());
                                self.model.save(null, {
                                    success: function (model, respose, options) {
                                        $el.closeAlert();
                                        if ($("body").hasClass("sidebar-icon-only")) {
                                            $("#btn-menu").trigger("click");
                                        }
                                        toastr.error('Xóa dữ liệu thành công');
                                        self.getApp().getRouter().navigate(self.collectionName + "/collection");

                                    },
                                    error: function (model, xhr, options) {
                                        toastr.error('Lưu thông tin không thành công!');

                                    }
                                });
                            });
                            $el.find("#no").on("click", function () {
                                $el.closeAlert();
                            })
                        }
                    });
                }
            },

            {
                name: "confirm",
                type: "button",
                buttonClass: "btn btn-warning btn-sm btn-confirm hide",
                label: "Duyệt yêu cầu",
                visible: function () {
                    return this.getApp().getRouter().getParam("id") !== null;
                },
                command: function () {
                    loader.show();
                    var self = this;
                    var warehouseID = self.model.get("warehouse_id");
                    var items = self.model.get("details");
                    $.ajax({
                        method: "POST",
                        url: self.getApp().serviceURL + "/api/v1/warehouse/add-item",
                        data: JSON.stringify({
                            warehouse_id: warehouseID,
                            items: items,
                            user_id: self.getApp().currentUser.id
                        }),
                        success: function (response) {
                            if (response) {
                                self.model.set("payment_status", "confirm");
                                self.getApp().saveLog("confirm", "goodsreciept", self.model.get("goodsreciept_no"), null, null, self.model.get("details"), Helpers.utcToUtcTimestamp());
                                self.$el.find(".save").trigger("click");
                            }
                            loader.hide();
                        },
                        error: function () {
                            loader.hide();
                        }
                    })
                }
            },
            {
                name: "bill",
                type: "button",
                buttonClass: "btn-primary btn btn-sm btn-paid hide",
                label: "Thanh toán",
                visible: function () {
                    return this.getApp().getRouter().getParam("id") !== null;
                },
                command: function () {
                    var self = this;
                    var paymentView = new PaymentView({
                        "viewData": self.model.toJSON()
                    });
                    paymentView.dialog({
                        // size: "large"
                    });
                    paymentView.on("close", function (e) {
                        // console.log(e);
                        self.model.set("payment_status", "paid");
                        self.model.set("payment_no", e.payment_no);
                        // console.log(e.payment_no);
                        self.getApp().saveLog("paid", "goodsreciept", self.model.get("goodsreciept_no"), null, null, self.model.get("details"), Helpers.utcToUtcTimestamp());
                        self.$el.find(".save").trigger("click");
                    });

                }
            },
            ],
        }],


        render: function () {
            var self = this;
            if (!$("body").hasClass("sidebar-icon-only")) {
                $("#btn-menu").trigger("click");
            }
            if (self.getApp().platforms == "ANDROID" || self.getApp().platforms == "IOS") {
                self.$el.find("#print").remove();
            }
            self.changeDetails = [];
            var id = this.getApp().getRouter().getParam("id");
            if (id) {
                this.model.set('id', id);
                this.model.fetch({
                    success: function (data) {
                        self.applyBindings();
                        self.registerEvent();
                    },
                    error: function () {
                        toastr.error('Lỗi hệ thống, vui lòng thử lại sau');
                    },
                });
            } else {
                self.applyBindings();
                self.registerEvent();
            }

        },

        registerEvent: function () {
            var self = this;

            self.changeDetails = self.model.get("details");
            self.loadCombox();
            self.toggleEvent();
            self.showListItem();
            self.bindPaymentStatus();
            self.printScreen();

            if (self.model.get("payment_status") == "confirm" || self.model.get("payment_status") == "done") {
                self.$el.find(".save").addClass("hide");
                // self.$el.find(".btn-delete").addClass("hide");
                self.$el.find(".btn-confirm").addClass("hide");
            } else {
                self.$el.find(".save").removeClass("hide");
                // self.$el.find(".btn-delete").removeClass("hide");
                self.$el.find(".btn-confirm").removeClass("hide");
            }
            self.$el.find("#copy-no").unbind("click").bind("click", function (event) {
                var copyText = document.getElementById("text-copy");
                copyText.select();
                document.execCommand("copy");
                toastr.success("Copied success");
            });

            // console.log(self.model.toJSON())
            self.calculateItemAmounts();
            self.model.on("change:details", function () {
                self.calculateItemAmounts();
            });

            self.model.on("change:tax_amount", function () {
                self.caculateTaxAmount();
            });

            self.model.on("change:tax_percent", function () {
                if (self.model.get("tax_percent") > 100) {
                    self.model.set("tax_percent", 0);
                }
                self.caculateTaxPercent();
            });

            // init tax
            if (self.model.get("taxtype") === "individual") {
                self.$el.find("#tax_percent").attr("readonly", true);
                self.$el.find("#tax_amount").attr("readonly", true);
            } else {
                self.$el.find("#tax_percent").attr("readonly", false);
                self.$el.find("#tax_amount").attr("readonly", false);
            }

            self.model.on("change:taxtype", function (e) {
                if (e.changed) {
                    if (e.changed.taxtype === "individual") {
                        self.$el.find("#tax_percent").attr("readonly", true);
                        self.$el.find("#tax_amount").attr("readonly", true);
                    } else {
                        self.$el.find("#tax_percent").attr("readonly", false);
                        self.$el.find("#tax_amount").attr("readonly", false);
                    }
                }
            });
        },

        calculateItemAmounts: function () {
            const self = this;
            var details = clone(self.model.get("details"));
            var netAmount = 0;
            var quantity = 0;
            var totalItem = 0;

            if (details && Array.isArray(details)) {
                totalItem += details.length;
                details.forEach((item, index) => {
                    quantity += item.quantity;
                    details[index].net_amount = parseFloat(item.purchase_cost) * parseFloat(item.quantity);
                    netAmount = netAmount + parseFloat(item.net_amount);
                });
            }

            self.$el.find("#total_quantity").val(quantity);
            self.$el.find("#total_item").val(totalItem);
            self.model.set("net_amount", netAmount);
            self.caculateTaxPercent();
        },

        caculateTaxAmount: function () {
            const self = this;
            var netAmount = parseFloat(self.model.get("net_amount"));
            var saleorderDiscount = parseFloat(self.model.get("tax_amount"));
            var taxAmount = saleorderDiscount / netAmount * 100;
            self.model.set("tax_percent", Math.round(taxAmount * 100) / 100);
            var amount = parseFloat(netAmount + saleorderDiscount);
            self.model.set("amount", amount);
        },

        caculateTaxPercent: function () {
            const self = this;
            var netAmount = parseFloat(self.model.get("net_amount"));
            if (netAmount > 0) {
                var saleorderDiscount = netAmount / 100 * parseFloat(self.model.get("tax_percent"));
                self.model.set("tax_amount", saleorderDiscount);
                var amount = netAmount + saleorderDiscount;
                self.model.set("amount", amount);
            }
        },

        loadCombox: function () {
            loader.show();
            var self = this;
            var tenantID = self.getApp().currentTenant[0]
            $.ajax({
                type: "POST",
                url: self.getApp().serviceURL + "/api/v1/get_all_warehouse_by_tenant",
                data: JSON.stringify({
                    tenant_id: tenantID,
                }),
                success: function (res) {
                    loader.hide();
                    if (res) {
                        self.$el.find("#warehouse").combobox({
                            textField: "warehouse_name",
                            valueField: "id",
                            dataSource: res,
                            value: self.model.get("warehouse_id")
                        });
                    }
                }
            })

            $.ajax({
                type: "POST",
                url: self.getApp().serviceURL + "/api/v1/get_all_curency",
                data: JSON.stringify({
                    "tenant_id": tenantID
                }),
                success: function (res) {
                    loader.hide();
                    if (res) {
                        self.$el.find("#currency").combobox({
                            textField: "currency_name",
                            valueField: "id",
                            dataSource: res,
                            value: self.model.get("currency_id")
                        });
                    }
                }
            })

            $.ajax({
                type: "POST",
                url: self.getApp().serviceURL + "/api/v1/get_all_organization",
                data: JSON.stringify({
                    tenant_id: tenantID
                }),
                success: function (res) {
                    loader.hide();
                    if (res) {
                        self.$el.find("#organization").combobox({
                            textField: "organization_name",
                            valueField: "id",
                            dataSource: res,
                            value: self.model.get("organization_id")
                        });
                        self.$el.find("#organization").on('change.gonrin', function(e){
                            self.$el.find(".nguoiDaiDien").html(`
                                <label>Đại diện</label>
                                <input type="text" class="form-control " id="contact">
                            `)
                            var organization_id = $(this).data('gonrin').getValue();
                            $.ajax({
                                type: "POST",
                                url: self.getApp().serviceURL + "/api/v1/get_all_organizationstaff",
                                data: JSON.stringify(organization_id),
                                success: function (res) {
                                    loader.hide();
                                    if (res) {
                                        self.$el.find("#contact").combobox({
                                            textField: "name",
                                            valueField: "id",
                                            dataSource: res,
                                            // value: self.model.get("contact_id")
                                        });
                                    }
                                }
                            })
                        });
                    }
                }
            })
            $.ajax({
                type: "POST",
                url: self.getApp().serviceURL + "/api/v1/get_all_organizationstaff",
                data: JSON.stringify(self.model.get("organization_id")),
                success: function (res) {
                    loader.hide();
                    if (res) {
                        self.$el.find("#contact").combobox({
                            textField: "name",
                            valueField: "id",
                            dataSource: res,
                            value: self.model.get("contact_id")
                        });
                    }
                }
            })

            

            self.$el.find("#contact").on("change.gonrin", function (event) {
                self.model.set("contact_id", self.$el.find("#contact").data("gonrin").getValue());
                self.model.set("contact_name", self.$el.find("#contact").data("gonrin").getText());
            });

            self.$el.find("#organization").on("change.gonrin", function (event) {
                self.model.set("organization_id", self.$el.find("#organization").data("gonrin").getValue());
                self.model.set("organization_name", self.$el.find("#organization").data("gonrin").getText());
            });

            self.$el.find("#warehouse").on("change.gonrin", function (event) {
                self.model.set("warehouse_id", self.$el.find("#warehouse").data("gonrin").getValue());
                self.model.set("warehouse_name", self.$el.find("#warehouse").data("gonrin").getText());
            });
            self.$el.find("#currency").on("change.gonrin", function (event) {
                self.model.set("currency_id", self.$el.find("#currency").data("gonrin").getValue());
                self.model.set("currency_name", self.$el.find("#currency").data("gonrin").getText());
            });

        },

        printScreen: function () {
            var self = this;
            self.$el.find("#print").on("click", function () {
                var viewData = JSON.stringify(self.model.toJSON());
                // window.open('https://upstart.vn/inventory/#print-goodsreciept?viewdata=' + viewData);
                self.getApp().getRouter().navigate("print-goodsreciept?viewdata=" + viewData);

            });
        },

        validate: function () {
            var self = this;
            if (!self.model.get("warehouse_name")) {
                toastr.warning("Vui lòng chọn kho phù hợp");
                return;
            }
            return true;
        },

        showListItem: function () {
            var self = this;

            self.$el.find("#show-list-item").unbind("click").bind("click", function () {
                var details = clone(self.model.get('details'));
                var detailNos = [];
                details.forEach(item => {
                    detailNos.push(item.item_no);
                });

                var itemDialogView = new ItemDialogView({
                    viewData: {
                        detailNos: detailNos,
                        warehouseID: self.model.get("warehouse_id")
                    }
                });
                itemDialogView.dialog({
                    size: "large"
                });
                itemDialogView.on("close", function (event) {
                    var availableItems = self.model.get('details');
                    var selectedItems = event && Array.isArray(event) ? event : [];
                    var data = availableItems.concat(selectedItems);
                    self.renderModelItem(data);
                    self.model.set('details', data);
                    // self.changeDetails = clone(data);
                })
            });
        },

        renderModelItem: function (details) {
            var self = this;
            // console.log(self.changeDetails);
            var bodyItemEL = $("#body-items");
            bodyItemEL.empty();

            details.forEach(item => {
                var itemView = new ItemView();
                itemView.model.set(clone(item));
                itemView.render();
                bodyItemEL.append(itemView.el);

                itemView.on("onRemove", function (event) {
                    var onRemove = clone(self.model.get("details"));
                    onRemove.forEach((item, idx) => {
                        if (item.item_no == event.item_no) {
                            onRemove.splice(idx, 1);
                        }
                    });
                    self.model.set("details", onRemove);
                });

                itemView.model.on("change", function (event) {
                    if (item.item_no === event.attributes.item_no) {
                        itemView.model.set(event.attributes);
                    }
                    var isExist = false;

                    // console.log(event)
                    self.changeDetails.forEach((param, idx) => {
                        if (param.item_no == event.attributes.item_no) {
                            // self.changeDetails.splice(idx, 1);
                            isExist = true;
                        }
                    });
                    if (!isExist) {
                        self.changeDetails.push(event.attributes);
                    }

                    console.log(self.changeDetails);

                    self.model.set('details', self.changeDetails);
                    self.calculateItemAmounts();
                });
            });
        },

        bindPaymentStatus: function () {
            var self = this;
            if (self.model.get("payment_status") == "done") {
                self.$el.find("#payment_status").html(`<label style="width: 100%" class="badge badge-info">Đã về kho</label>`);
            } else if (self.model.get("payment_status") == "created") {
                self.$el.find("#payment_status").html(`<label style="width: 100%" class="badge badge-primary">Tạo yêu cầu</label>`);
            } else if (self.model.get("payment_status") == "pending") {
                self.$el.find("#payment_status").html(`<label style="width: 100% class="badge badge-danger">Chờ xử lý</label>`);
            } else if (self.model.get("payment_status") == "confirm") {
                self.$el.find("#payment_status").html(`<label style="width: 100%" class="badge badge-warning">Đã duyệt yêu cầu</label>`);
            } else if (self.model.get("payment_status") == "paid") {
                self.$el.find("#payment_status").html(`<label style="width: 100%" class="badge badge-success">Đã thanh toán</label>`);
            } else {
                return ``;
            }
        },

        toggleEvent: function () {
            var self = this;
            if (self.model.get("payment_status") == "confirm") {
                self.$el.find(".btn-paid").removeClass('hide');
                self.$el.find(".btn-confirm").hide();
                self.$el.find(".save").hide();
                self.$el.find(".btn-delete").hide();

            } else if (self.model.get("payment_status") == "paid") {
                self.$el.find(".btn-confirm").hide();
                self.$el.find(".save").hide();
                self.$el.find(".btn-paid").hide();
                self.$el.find(".btn-delete").hide();
            }
        }
    });

});
