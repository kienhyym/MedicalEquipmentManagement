define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');

    var template = require('text!app/chungtu/bienbanxacnhantinhtrangthietbi/tpl/collection.html'),
        schema = require('json!schema/BienBanXacNhanTinhTrangThietBiSchema.json');

    return Gonrin.CollectionView.extend({
        template: template,
        modelSchema: schema,
        urlPrefix: "/api/v1/",
        collectionName: "bienbanxacnhantinhtrangthietbi",
        render: function () {
            var self = this;
            self.$el.find('#ngaykiemtra').datetimepicker({
                textFormat: 'DD-MM-YYYY',
                extraFormats: ['DDMMYYYY'],
                parseInputDate: function (val) {
                    return moment.unix(val)
                },
                parseOutputDate: function (date) {
                    return date.unix()
                }
            });

            this.applyBindings();
            self.locData();

            return this;
        },
        locData: function () {
            var self = this;
            var IDTB = sessionStorage.getItem('IDThietBi');
            sessionStorage.clear();
                $.ajax({
                    url: self.getApp().serviceURL + "/api/v1/bienbanxacnhantinhtrangthietbi?results_per_page=100000&max_results_per_page=1000000",
                    method: "GET",
                    // data: { "q": JSON.stringify({ "order_by": [{ "field": "updated_at", "direction": "desc" }] }) },
                    contentType: "application/json",
                    success: function (data) {
                        self.render_grid(data.objects);
                        var arr = [];
                        if(IDTB != null || IDTB != undefined){
                            var filters = {
                                filters: {
                                    "$and": [
                                        { "chitietthietbi_id": { "$eq": IDTB } }
                                    ]
                                },
                                order_by: [{ "field": "created_at", "direction": "asc" }]
                            }
                        }
                        $.ajax({
                            url: self.getApp().serviceURL + "/api/v1/bienbanxacnhantinhtrangthietbi?results_per_page=100000&max_results_per_page=1000000",
                            method: "GET",
                            data: "q=" + JSON.stringify(filters),
                            contentType: "application/json",
                            success: function (data) {
                                console.log('xxxxx', data.objects)
                                self.render_grid(data.objects);
    
                            },
                            error: function (xhr, status, error) {
                                // self.getApp().notify({ message: "Lỗi không lấy được dữ liệu" }, { type: "danger", delay: 1000 });
                            },
    
                        })
                        self.$el.find("#tenthietbi").keyup(function () {
                            arr = [];
                            data.objects.forEach(function (item, index) {
                                if ((item.tenthietbi).indexOf(self.$el.find("#tenthietbi").val()) !== -1) {
                                    arr.push(item)

                                }
                            });
                            self.render_grid(arr);
                        });
                        var arr2 = [];
                        self.$el.find('#ngaykiemtra').blur(function () {
                            var x = self.$el.find('#ngaykiemtra').data("gonrin").getValue();

                            if (arr.length != 0) {
                                arr2 = [];
                                arr.forEach(function (item, index) {
                                    if (moment(item.ngay * 1000).format("DDMMYYYY") == moment(x * 1000).format("DDMMYYYY")) {
                                        arr2.push(item)
                                    }
                                });
                                self.render_grid(arr2);
                            }
                            else {
                                arr2 = []
                                data.objects.forEach(function (item, index) {
                                    if (moment(item.ngay * 1000).format("DDMMYYYY") == moment(x * 1000).format("DDMMYYYY")) {
                                        arr2.push(item)
                                    }
                                });
                                self.render_grid(arr2);
                                self.$el.find("#tenthietbi").keyup(function () {
                                    var arr3 = [];
                                    arr2.forEach(function (item, index) {
                                        if ((item.tenthietbi).indexOf(self.$el.find("#tenthietbi").val()) !== -1) {
                                            arr3.push(item)

                                        }
                                    });
                                    self.render_grid(arr3);
                                });
                            }

                        })
                    
                    }
                })
        },
        render_grid: function (dataSource) {
			sessionStorage.clear();

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
                        field: "tenthietbi", label: "Tên thiết bị", width: 350, readonly: true,
                    },
                    {
                        field: "model_serial_number", label: "Serial", width: 100, readonly: true,
                    },
                    {
                        field: "ma_qltb", label: "Mã QLTB", width: 150, readonly: true,
                    },
                    {
                        field: "ngay", label: "Ngày viết",
                        template: function (rowData) {
                            if (!!rowData && rowData.ngay) {

                                var utcTolocal = function (times, format) {
                                    return moment(times * 1000).local().format(format);
                                }
                                // return template_helper.datetimeFormat(rowData.ngaythanhtra, "DD/MM/YYYY");
                                return utcTolocal(rowData.ngay, "DD/MM/YYYY");
                            }
                            return "";
                        },
                        width: 150,
                    },
                    {
                        field: "ketquakiemtra", label: "Kết qủa kiểm tra", readonly: true,
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
                        self.getApp().getRouter().navigate("bienbanxacnhantinhtrangthietbi/model?id=" + e.rowId);
                    },
                },
            });

        },

    });

});