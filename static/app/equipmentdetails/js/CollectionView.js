define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');

    var template = require('text!app/equipmentdetails/tpl/collection.html'),
        schema = require('json!schema/EquipmentDetailsSchema.json');

    return Gonrin.CollectionView.extend({
        template: template,
        modelSchema: schema,
        urlPrefix: "/api/v1/",
        collectionName: "equipmentdetails",
        tools: [
            {
                name: "defaultgr",
                type: "group",
                groupClass: "toolbar-group",
                buttons: [
                    {
                        name: "back",
                        type: "button",
                        buttonClass: "btn-default btn-sm btn-secondary",
                        label: "TRANSLATE:Quay lại",
                        command: function () {
                            var self = this;
                            Backbone.history.history.back();
                        }
                    },
                ],
            },
            {
                name: "save",
                type: "button",
                buttonClass: "btn-success btn-sm",
                label: "TRANSLATE:CREATE",
                command: function () {
                    var self = this;
                    self.getApp().getRouter().navigate("equipmentdetails/model");
                }
            },
        ],
        // uiControl: {
        //     fields: [
        //         {
        //             field: "name", label: "Tên thiết bị", width: 250, readonly: true,
        //         },
        //         {
        //             field: "model_serial_number", label: "Serial", width: 150, readonly: true,
        //         },
        //         {
        //             field: "nation_id",
        //             label: "Nước sản xuất",
        //             foreign: "nation",
        //             foreignValueField: "id",
        //             foreignTextField: "name",
        //             width: 150
        //         },

        //         {
        //             field: "time_of_purchase", label: "Năm sử dụng",
        //             template: function (rowData) {
        //                 if (!!rowData && rowData.time_of_purchase) {

        //                     var utcTolocal = function (times, format) {
        //                         return moment(times * 1000).local().format(format);
        //                     }
        //                     // return template_helper.datetimeFormat(rowData.ngaythanhtra, "DD/MM/YYYY");
        //                     return utcTolocal(rowData.time_of_purchase, "DD/MM/YYYY");
        //                 }
        //                 return "";
        //             },
        //             width: 150
        //         },
        //         {
        //             field: "supplier_id",
        //             label: "Đơn vị",
        //             foreign: "supplier",
        //             foreignValueField: "id",
        //             foreignTextField: "name",
        //             width: 250
        //         },
        //     ],
        //     onRowClick: function (event) {
        //         if (event.rowId) {
        //             var path = this.collectionName + '/model?id=' + event.rowId;
        //             this.getApp().getRouter().navigate(path);
        //         }
        //     }
        // },
        render: function () {
            var self = this;
            self.$el.find('.chungloai').hide();
            self.$el.find('.departmentphong').hide();
            self.$el.find('.status').hide();

            $('#boloc').combobox({
                textField: "text",
                valueField: "value",
                allowTextInput: true,
                enableSearch: true,
                dataSource: [
                    { "value": "1", "text": "Chủng loại" },
                    { "value": "2", "text": "Department phòng" },
                    { "value": "3", "text": "Trạng thái" },


                ],

            })
            self.$el.find('#boloc').on('change.gonrin', function (e) {
                var boloc = self.$el.find('#boloc').data('gonrin').getValue();

                if (boloc == "1") {
                    self.$el.find('.chungloai').show();
                    self.$el.find('.departmentphong').hide();
                    self.$el.find('.status').hide();

                }
                if (boloc == "2") {
                    self.$el.find('.departmentphong').show();
                    self.$el.find('.chungloai').hide();
                    self.$el.find('.status').hide();

                }
                if (boloc == "3") {
                    self.$el.find('.departmentphong').hide();
                    self.$el.find('.chungloai').hide();
                    self.$el.find('.status').show();

                }
            })

            $('#chungloai').combobox({
                textField: "text",
                valueField: "value",
                allowTextInput: true,
                enableSearch: true,
                dataSource: [
                    { "value": "1", "text": "Máy xét nhiệm" },
                    { "value": "2", "text": "Máy chuẩn đoán hình ảnh " },
                    { "value": "3", "text": "Máy thăm dò chức năng" },
                    { "value": "4", "text": "Thiết bị hấp sấy " },
                    { "value": "5", "text": "Thiết bị hỗ trợ sinh tồn " },
                    { "value": "6", "text": "Robot" },
                    { "value": "7", "text": "Thiết bi miễn dịch" },
                    { "value": "8", "text": "Thiết bị lọc và hỗ trợ chức năng " },
                ],

            })
            $('#status').combobox({
                textField: "text",
                valueField: "value",
                allowTextInput: true,
                enableSearch: true,
                dataSource: [
                    { "value": "yeucaukiemtrathietbi", "text": "Đang yêu cầu kiểm tra" },
                    { "value": "dangsuachua", "text": "Đang sửa chữa" },
                    { "value": "dangchokiemduyet", "text": "Đang chờ kiểm duyệt" },
                    { "value": "dakiemduyet", "text": "Đã kiểm duyệt" },
                ],

            })



            this.applyBindings();
            self.locData();

            return this;
        },
        locData: function () {
            var self = this;
            $.ajax({
                url: self.getApp().serviceURL + "/api/v1/department?results_per_page=100000&max_results_per_page=1000000",
                method: "GET",
                // data: { "q": JSON.stringify({ "order_by": [{ "field": "updated_at", "direction": "desc" }] }) },
                contentType: "application/json",
                success: function (data) {

                    $.ajax({
                        url: self.getApp().serviceURL + "/api/v1/room?results_per_page=100000&max_results_per_page=1000000",
                        method: "GET",
                        // data: { "q": JSON.stringify({ "order_by": [{ "field": "updated_at", "direction": "desc" }] }) },
                        contentType: "application/json",
                        success: function (data2) {


                            $('#department').combobox({
                                textField: "name",
                                valueField: "id",
                                allowTextInput: true,
                                enableSearch: true,
                                dataSource: data.objects
                            })
                            self.$el.find('#department').on('change.gonrin', function (e) {
                                var boloc = self.$el.find('#department').data('gonrin').getValue();
                                var arrKhoa = [];

                                data2.objects.forEach(function (item, index) {

                                    if (item.department_id == boloc) {
                                        console.log(item.department_id, boloc)

                                        arrKhoa.push(item)
                                    }

                                });
                                $('.room').combobox({
                                    textField: "name",
                                    valueField: "id",
                                    allowTextInput: true,
                                    enableSearch: true,
                                    dataSource: arrKhoa,
                                    refresh: true,

                                })
                                console.log(arrKhoa)
                            })

                        },

                    })


                },

            })
            $.ajax({
                url: self.getApp().serviceURL + "/api/v1/room?results_per_page=100000&max_results_per_page=1000000",
                method: "GET",
                data: { "q": JSON.stringify({ "order_by": [{ "field": "updated_at", "direction": "desc" }] }) },
                contentType: "application/json",
                success: function (data) {

                    $('#room').combobox({
                        textField: "name",
                        valueField: "id",
                        allowTextInput: true,
                        enableSearch: true,
                        dataSource: data.objects
                    })
                },

            })




            $.ajax({
                url: self.getApp().serviceURL + "/api/v1/equipmentdetails?results_per_page=100000&max_results_per_page=1000000",
                method: "GET",
                data: { "q": JSON.stringify({ "order_by": [{ "field": "updated_at", "direction": "desc" }] }) },
                contentType: "application/json",
                success: function (data) {
                    var arrdata = [];
                    data.objects.forEach(function (item, index) {
                        item.stt = index + 1;
                        arrdata.push(item)
                    });
                    self.render_grid(arrdata);

                    self.$el.find('#status').on('change.gonrin', function (e) {
                        var boloc = self.$el.find('#status').data('gonrin').getValue();
                        var arrTinhTrang = [];
                        var i = 1;

                        data.objects.forEach(function (item, index) {
                            if (item.status == boloc) {
                                // arrTinhTrang.push(item)
                                item.stt = i;
                                i++;
                                arrTinhTrang.push(item)
                            }

                        });
                        self.render_grid(arrTinhTrang);

                    })
                    self.$el.find('#department').on('change.gonrin', function (e) {
                        var boloc = self.$el.find('#department').data('gonrin').getValue();
                        var arrKhoa = [];
                        var i = 1;

                        data.objects.forEach(function (item, index) {
                            if (item.department_id == boloc) {
                                // arrKhoa.push(item)
                                item.stt = i;
                                i++;
                                arrKhoa.push(item)

                            }
                        });
                        self.render_grid(arrKhoa);

                        self.$el.find('#room').on('change.gonrin', function (e) {
                            var boloc = self.$el.find('#room').data('gonrin').getValue();
                            var arrPhong = [];
                            var i = 1;

                            arrKhoa.forEach(function (item, index) {
                                if (item.room_id == boloc) {
                                    item.stt = i;
                                    i++;
                                    arrPhong.push(item)
                                }
                            });
                            self.render_grid(arrPhong);
                        })
                    })
                    self.$el.find('#room').on('change.gonrin', function (e) {
                        var boloc = self.$el.find('#room').data('gonrin').getValue();
                        var arrPhong = [];
                        var i = 1;

                        data.objects.forEach(function (item, index) {
                            if (item.room_id == boloc) {
                                item.stt = i;
                                i++;
                                arrPhong.push(item)
                            }
                        });
                        self.render_grid(arrPhong);
                    })


                    self.$el.find('#chungloai').on('change.gonrin', function (e) {
                        var boloc = self.$el.find('#chungloai').data('gonrin').getValue();
                        var i = 1;
                        var arrChungLoai = [];

                        data.objects.forEach(function (itemcl, index) {
                            console.log(itemcl.types_of_equipment, boloc)
                            if (itemcl.types_of_equipment === boloc) {
                                itemcl.stt = i;
                                i++;
                                arrChungLoai.push(itemcl)
                            }
                            self.render_grid(arrChungLoai);

                            self.$el.find("#noidungtimkiem").keyup(function () {
                                var arrTimKiem = [];
                                var i = 1;

                                arrChungLoai.forEach(function (item2, index2) {
                                    if ((item2.name).indexOf(self.$el.find("#noidungtimkiem").val()) !== -1) {
                                        item.stt = i;
                                        i++;
                                        arrTimKiem.push(item2)
                                    }
                                })
                                self.render_grid(arrTimKiem);
                            })
                        });
                    });
                    self.$el.find("#noidungtimkiem").keyup(function () {
                        var arrTimKiem = [];
                        var i = 1;

                        data.objects.forEach(function (item2, index2) {
                            if ((item2.name).indexOf(self.$el.find("#noidungtimkiem").val()) !== -1) {
                                item.stt = i;
                                i++;
                                arrTimKiem.push(item2)
                            }
                        })
                        self.render_grid(arrTimKiem);
                        self.$el.find('#chungloai').on('change.gonrin', function (e) {
                            boloc = self.$el.find('#chungloai').data('gonrin').getValue();
                            var i = 1;
                            var arrChungLoai = [];

                            arrTimKiem.forEach(function (item, index) {
                                if (item.types_of_equipment == boloc) {
                                    item.stt = i;
                                    i++;
                                    arrChungLoai.push(item)
                                }
                                self.render_grid(arrChungLoai);
                            });
                        });
                    })



                },

            })
        },
        render_grid: function (dataSource) {

            var self = this;
            var element = self.$el.find("#grid-data");
            element.grid({
                // showSortingIndicator: true,
                orderByMode: "client",
                language: {
                    no_records_found: "Chưa có dữ liệu"
                },
                noResultsClass: "alert alert-default no-records-found",
                fields: [
                    {
                        label: "STT",
                        width: "30px",
                        template: function (rowData) {
                            if (!!rowData) {
                                return `
                                            <div>${rowData.stt}</div>
                                        `;
                            }
                            return "";
                        }
                    },
                    {
                        label: "Thiết bị",
                        template: function (rowData) {
                            if (!!rowData) {
                                var utcTolocal = function (times, format) {
                                    return moment(times * 1000).local().format(format);
                                }
                                var status = '';
                                if (rowData.status === "yeucaukiemtrathietbi") {
                                    status = "Đang yêu cầu kiểm tra";
                                }
                                else if (rowData.status === "dangsuachua") {
                                    status = "Đang sửa chữa";
                                }
                                else if (rowData.status === "dangchokiemduyet") {
                                    status = "Đang chờ kiểm duyệt";
                                }
                                else if (rowData.status === "dakiemduyet") {
                                    status = "Đã kiểm duyệt";
                                }
                                else if (rowData.status === "luukho") {
                                    status = "Lưu kho chưa vận hành ";
                                }
                                return `    <div style="position: relative;">
                                                <div>${rowData.name} (Serial:${rowData.model_serial_number})</div>
                                                <div>Trạng thái:${status}</div>
                                                <i style="position: absolute;bottom:0;right:0" class='fa fa-angle-double-right'></i>
                                            </div>
                                            `;
                            }
                            return "";
                        }
                    },

                    // {
                    //     field: "status",
                    //     label: "Trạng thái",
                    //     width: 150, readonly: true,
                    //     template: function (rowData) {
                    //        
                    //         else if (rowData.status === null) {
                    //             return "";
                    //         }

                    //     }
                    // },
                    // {
                    //     field: "types_of_equipment",
                    //     label: "Chủng loại",
                    //     width: 150, readonly: true,
                    //     template: function (rowData) {
                    //         if (rowData.types_of_equipment === "1") {
                    //             return "Máy xét nhiệm";
                    //         }
                    //         else if (rowData.types_of_equipment === "2") {
                    //             return "Máy chuẩn đoán hình ảnh";
                    //         }
                    //         else if (rowData.types_of_equipment === "3") {
                    //             return "Máy thăm dò chức năng";
                    //         }
                    //         else if (rowData.types_of_equipment === "4") {
                    //             return "Thiết bị hấp sấy";
                    //         }
                    //         else if (rowData.types_of_equipment === "5") {
                    //             return "Thiết bị hỗ trợ sinh tồn ";
                    //         }
                    //         else if (rowData.types_of_equipment === "6") {
                    //             return "Robot";
                    //         }
                    //         else if (rowData.types_of_equipment === "7") {
                    //             return "Thiết bi miễn dịch";
                    //         }
                    //         else if (rowData.types_of_equipment === "8") {
                    //             return "Thiết bị lọc và hỗ trợ chức năng ";
                    //         }
                    //         else {
                    //             return ""
                    //         }

                    //     }
                    // },


                ],
                dataSource: dataSource,
                primaryField: "id",
                refresh: true,
                selectionMode: false,
                pagination: {
                    page: 1,
                    pageSize: 100
                },
                events: {
                    "rowclick": function (e) {
                        self.getApp().getRouter().navigate("equipmentdetails/model?id=" + e.rowId);
                    },
                },
            });
            $(self.$el.find('.grid-data tr')).each(function (index, item) {
                $(item).find('td:first').css('height', $(item).height())

                console.log($(item).find('td:first').addClass('d-flex align-items-center justify-content-center'))

            })
        },
    });

});