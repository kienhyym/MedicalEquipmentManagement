define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');

    var template = require('text!app/chitietthietbi/tpl/collection.html'),
        schema = require('json!schema/ChiTietThietBiSchema.json');

    return Gonrin.CollectionView.extend({
        template: template,
        modelSchema: schema,
        urlPrefix: "/api/v1/",
        collectionName: "chitietthietbi",
        // uiControl: {
        //     fields: [
        //         {
        //             field: "tenthietbi", label: "Tên thiết bị", width: 250, readonly: true,
        //         },
        //         {
        //             field: "model_serial_number", label: "Serial", width: 150, readonly: true,
        //         },
        //         {
        //             field: "quocgia_id",
        //             label: "Nước sản xuất",
        //             foreign: "quocgia",
        //             foreignValueField: "id",
        //             foreignTextField: "ten",
        //             width: 150
        //         },

        //         {
        //             field: "ngaymua", label: "Năm sử dụng",
        //             template: function (rowData) {
        //                 if (!!rowData && rowData.ngaymua) {

        //                     var utcTolocal = function (times, format) {
        //                         return moment(times * 1000).local().format(format);
        //                     }
        //                     // return template_helper.datetimeFormat(rowData.ngaythanhtra, "DD/MM/YYYY");
        //                     return utcTolocal(rowData.ngaymua, "DD/MM/YYYY");
        //                 }
        //                 return "";
        //             },
        //             width: 150
        //         },
        //         {
        //             field: "nhacungcap_id",
        //             label: "Đơn vị",
        //             foreign: "nhacungcap",
        //             foreignValueField: "id",
        //             foreignTextField: "ten",
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
            self.$el.find('.khoaphong').hide();
            self.$el.find('.trangthai').hide();

            $('#boloc').combobox({
                textField: "text",
                valueField: "value",
                allowTextInput: true,
                enableSearch: true,
                dataSource: [
                    { "value": "1", "text": "Chủng loại" },
                    { "value": "2", "text": "Khoa phòng" },
                    { "value": "3", "text": "Trạng thái" },


                ],

            })
            self.$el.find('#boloc').on('change.gonrin', function (e) {
                var boloc = self.$el.find('#boloc').data('gonrin').getValue();
                
                if (boloc == "1") {
                    self.$el.find('.chungloai').show();
                    self.$el.find('.khoaphong').hide();
                    self.$el.find('.trangthai').hide();

                }
                if (boloc == "2") {
                    self.$el.find('.khoaphong').show();
                    self.$el.find('.chungloai').hide();
                    self.$el.find('.trangthai').hide();

                }
                if (boloc == "3") {
                    self.$el.find('.khoaphong').hide();
                    self.$el.find('.chungloai').hide();
                    self.$el.find('.trangthai').show();

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
            $('#trangthai').combobox({
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
            self.locData();



            this.applyBindings();
            return this;
        },
        locData: function () {
            var self = this;
            $.ajax({
                url: self.getApp().serviceURL + "/api/v1/khoa?results_per_page=100000&max_results_per_page=1000000",
                method: "GET",
                // data: { "q": JSON.stringify({ "order_by": [{ "field": "updated_at", "direction": "desc" }] }) },
                contentType: "application/json",
                success: function (data) {

                    $.ajax({
                        url: self.getApp().serviceURL + "/api/v1/phong?results_per_page=100000&max_results_per_page=1000000",
                        method: "GET",
                        // data: { "q": JSON.stringify({ "order_by": [{ "field": "updated_at", "direction": "desc" }] }) },
                        contentType: "application/json",
                        success: function (data2) {


                            $('#khoa').combobox({
                                textField: "ten",
                                valueField: "id",
                                allowTextInput: true,
                                enableSearch: true,
                                dataSource: data.objects
                            })
                            self.$el.find('#khoa').on('change.gonrin', function (e) {
                                var boloc = self.$el.find('#khoa').data('gonrin').getValue();
                                var arrKhoa = [];

                                data2.objects.forEach(function (item, index) {

                                    if (item.khoa_id == boloc) {
                                        console.log(item.khoa_id, boloc)

                                        arrKhoa.push(item)
                                    }

                                });
                                $('.phong').combobox({
                                    textField: "ten",
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
                url: self.getApp().serviceURL + "/api/v1/phong?results_per_page=100000&max_results_per_page=1000000",
                method: "GET",
                // data: { "q": JSON.stringify({ "order_by": [{ "field": "updated_at", "direction": "desc" }] }) },
                contentType: "application/json",
                success: function (data) {

                    $('#phong').combobox({
                        textField: "ten",
                        valueField: "id",
                        allowTextInput: true,
                        enableSearch: true,
                        dataSource: data.objects
                    })
                },

            })
            $.ajax({
                url: self.getApp().serviceURL + "/api/v1/chitietthietbi?results_per_page=100000&max_results_per_page=1000000",
                method: "GET",
                // data: { "q": JSON.stringify({ "order_by": [{ "field": "updated_at", "direction": "desc" }] }) },
                contentType: "application/json",
                success: function (data) {
                    self.$el.find('#trangthai').on('change.gonrin', function (e) {
                        var boloc = self.$el.find('#trangthai').data('gonrin').getValue();
                        var arrTinhTrang = [];

                        data.objects.forEach(function (item, index) {
                            if (item.trangthai == boloc) {
                                arrTinhTrang.push(item)
                            }

                        });
                        self.render_grid(arrTinhTrang);

                    })
                    self.$el.find('#khoa').on('change.gonrin', function (e) {
                        var boloc = self.$el.find('#khoa').data('gonrin').getValue();
                        var arrKhoa = [];
                        data.objects.forEach(function (item, index) {
                            if (item.khoa_id == boloc) {
                                arrKhoa.push(item)
                            }
                        });
                        self.render_grid(arrKhoa);
                        self.$el.find('#phong').on('change.gonrin', function (e) {
                            var boloc = self.$el.find('#phong').data('gonrin').getValue();
                            var arrPhong = [];
                            arrKhoa.forEach(function (item, index) {
                                if (item.phong_id == boloc) {
                                    arrPhong.push(item)
                                }
                            });
                            self.render_grid(arrPhong);
                        })
                    })
                    self.$el.find('#phong').on('change.gonrin', function (e) {
                        var boloc = self.$el.find('#phong').data('gonrin').getValue();
                        var arrPhong = [];
                        data.objects.forEach(function (item, index) {
                            if (item.phong_id == boloc) {
                                arrPhong.push(item)
                            }
                        });
                        self.render_grid(arrPhong);
                    })

                    self.render_grid(data.objects);
                    var boloc;
                    self.$el.find('#chungloai').on('change.gonrin', function (e) {
                        boloc = self.$el.find('#chungloai').data('gonrin').getValue();
                        data.objects.forEach(function (item, index) {
                            var arrChungLoai = [];
                            if (item.chungloailoaithietbi == boloc) {
                                arrChungLoai.push(item)
                            }
                            self.render_grid(arrChungLoai);
                            self.$el.find("#noidungtimkiem").keyup(function () {
                                var arrTimKiem = [];
                                arrChungLoai.forEach(function (item2, index2) {
                                    if ((item2.tenthietbi).indexOf(self.$el.find("#noidungtimkiem").val()) !== -1) {
                                        arrTimKiem.push(item2)
                                    }
                                })
                                self.render_grid(arrTimKiem);
                            })
                        });
                    });
                    self.$el.find("#noidungtimkiem").keyup(function () {
                        var arrTimKiem = [];
                        data.objects.forEach(function (item2, index2) {
                            if ((item2.tenthietbi).indexOf(self.$el.find("#noidungtimkiem").val()) !== -1) {
                                arrTimKiem.push(item2)
                            }
                        })
                        self.render_grid(arrTimKiem);
                        self.$el.find('#chungloai').on('change.gonrin', function (e) {
                            boloc = self.$el.find('#chungloai').data('gonrin').getValue();
                            arrTimKiem.forEach(function (item, index) {
                                var arrChungLoai = [];
                                if (item.chungloailoaithietbi == boloc) {
                                    arrChungLoai.push(item)
                                }
                                self.render_grid(arrChungLoai);
                            });
                        });
                    })
                    // self.$el.find('#khoaphong').on('change.gonrin', function (e) {
                    //     boloc = self.$el.find('#khoaphong').data('gonrin').getValue();
                    //     if (boloc == 7) {
                    //         self.$el.find("#noidungtimkiem").keyup(function () {
                    //             var arr = [];
                    //             data.objects.forEach(function (item, index) {
                    //                 var arrKhacNull = [];
                    //                 if (item.khoa != undefined || item.khoa != null) {
                    //                     arrKhacNull.push(item)
                    //                 }
                    //                 arrKhacNull.forEach(function (item2, index2) {
                    //                     if ((item2.khoa.ten).indexOf(self.$el.find("#noidungtimkiem").val()) !== -1) {
                    //                         arr.push(item2)
                    //                     }
                    //                 })
                    //             });
                    //             self.render_grid(arr);

                    //         })
                    //     }
                    //     else if (boloc == 6) {
                    //         self.$el.find("#noidungtimkiem").keyup(function () {
                    //             var arr = [];
                    //             data.objects.forEach(function (item, index) {
                    //                 var arrKhacNull = [];
                    //                 if (item.phong != undefined || item.phong != null) {
                    //                     arrKhacNull.push(item)
                    //                 }
                    //                 arrKhacNull.forEach(function (item2, index2) {
                    //                     if ((item2.phong.ten).indexOf(self.$el.find("#noidungtimkiem").val()) !== -1) {
                    //                         arr.push(item2)
                    //                     }
                    //                 })
                    //             });
                    //             self.render_grid(arr);
                    //         })
                    //     }

                    // });



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
						field: "stt",
						label: "STT",
						width: "30px",
					},
                    {
                        field: "tenthietbi", label: "Tên thiết bị", width: 250, readonly: true,
                    },
                    {
                        field: "model_serial_number", label: "Serial", width: 150, readonly: true,
                    },
                    {
                        field: "quocgia_id",
                        label: "Nước sản xuất",
                        foreign: "quocgia",
                        foreignValueField: "id",
                        foreignTextField: "ten",
                        width: 150
                    },

                    {
                        field: "ngaymua", label: "Năm sử dụng",
                        template: function (rowData) {
                            if (!!rowData && rowData.ngaymua) {

                                var utcTolocal = function (times, format) {
                                    return moment(times * 1000).local().format(format);
                                }
                                // return template_helper.datetimeFormat(rowData.ngaythanhtra, "DD/MM/YYYY");
                                return utcTolocal(rowData.ngaymua, "DD/MM/YYYY");
                            }
                            return "";
                        },
                        width: 150
                    },
                    {
                        field: "nhacungcap_id",
                        label: "Đơn vị",
                        foreign: "nhacungcap",
                        foreignValueField: "id",
                        foreignTextField: "ten",
                        width: 250
                    },
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
                        self.getApp().getRouter().navigate("chitietthietbi/model?id=" + e.rowId);
                    },
                },
            });

        },
    });

});