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
        uiControl: {
            fields: [
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
            onRowClick: function (event) {
                if (event.rowId) {
                    var path = this.collectionName + '/model?id=' + event.rowId;
                    this.getApp().getRouter().navigate(path);
                }
            }
        },
        render: function () {
            var self = this;
            $('#timkiem').combobox({
                textField: "text",
                valueField: "value",
                allowTextInput: true,
                enableSearch: true,
                dataSource: [
                    // { text: "Máy xét nhiệm", value: 1 },
                    // { text: "Máy chuẩn đoán hình ảnh", value: 2 },
                    // { text: "Máy thăm dò chức năng", value: 3 },
                    // { text: "Hỗ trợ", value: 4 },
                    // { text: "robot", value: 5 },
                    { text: "Phòng", value: 6 },
                    { text: "Khoa", value: 7 },
                ],

            })
            self.locData();



            this.applyBindings();
            return this;
        },
        locData: function () {
            var self = this;


            $.ajax({
                url: self.getApp().serviceURL + "/api/v1/chitietthietbi?results_per_page=100000&max_results_per_page=1000000",
                method: "GET",
                // data: { "q": JSON.stringify({ "order_by": [{ "field": "updated_at", "direction": "desc" }] }) },
                contentType: "application/json",
                success: function (data) {
                    self.render_grid(data.objects);
                    var boloc;
                    self.$el.find('#timkiem').on('change.gonrin', function (e) {
                        boloc = self.$el.find('#timkiem').data('gonrin').getValue();
                        if (boloc == 7) {
                            self.$el.find("#noidungtimkiem").keyup(function () {
                                var arr = [];
                                data.objects.forEach(function (item, index) {
                                    var arrKhacNull = [];
                                    if (item.khoa != undefined || item.khoa != null) {
                                        arrKhacNull.push(item)
                                    }
                                    arrKhacNull.forEach(function (item2, index2) {
                                        if ((item2.khoa.ten).indexOf(self.$el.find("#noidungtimkiem").val()) !== -1) {
                                            arr.push(item2)
                                        }
                                    })


                                });
                                self.render_grid(arr);

                            })
                        }
                        else if (boloc == 6) {
                            self.$el.find("#noidungtimkiem").keyup(function () {
                                var arr = [];
                                data.objects.forEach(function (item, index) {
                                    var arrKhacNull = [];
                                    if (item.phong != undefined || item.phong != null) {
                                        arrKhacNull.push(item)
                                    }
                                    arrKhacNull.forEach(function (item2, index2) {
                                        if ((item2.phong.ten).indexOf(self.$el.find("#noidungtimkiem").val()) !== -1) {
                                            arr.push(item2)
                                        }
                                    })
                                });
                                self.render_grid(arr);
                            })
                        }

                    });



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