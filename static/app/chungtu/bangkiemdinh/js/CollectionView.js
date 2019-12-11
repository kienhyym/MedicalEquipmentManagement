define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');

    var template = require('text!app/chungtu/bangkiemdinh/tpl/collection.html'),
        schema = require('json!schema/BangKiemDinhSchema.json');

    return Gonrin.CollectionView.extend({
        template: template,
        modelSchema: schema,
        urlPrefix: "/api/v1/",
        collectionName: "bangkiemdinh",

        render: function () {
            var self = this;
            self.$el.find('#ngaycap').datetimepicker({
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
                url: self.getApp().serviceURL + "/api/v1/bangkiemdinh?results_per_page=100000&max_results_per_page=1000000",
                method: "GET",
                // data: { "q": JSON.stringify({ "order_by": [{ "field": "updated_at", "direction": "desc" }] }) },
                contentType: "application/json",
                success: function (data) {
                    // self.render_grid(data.objects);

                    var i = 1;
                    var arr = [];
                    data.objects.forEach(function (item, index) {
                        item.stt = i;
                        i++;
                        arr.push(item)
                    })
                    self.render_grid(arr);


                    var arr = [];
                    if (IDTB != null || IDTB != undefined) {
                        var filters = {
                            filters: {
                                "$and": [
                                    { "chitietthietbi_id": { "$eq": IDTB } }
                                ]
                            },
                            order_by: [{ "field": "created_at", "direction": "desc" }]
                        }
                    }

                    $.ajax({
                        url: self.getApp().serviceURL + "/api/v1/bangkiemdinh?results_per_page=100000&max_results_per_page=1000000",
                        method: "GET",
                        data: "q=" + JSON.stringify(filters),
                        contentType: "application/json",
                        success: function (data) {
                            var i = 1;
                            var arr = [];
                            data.objects.forEach(function (item, index) {
                                item.stt = i;
                                i++;
                                arr.push(item)
                            })
                            self.render_grid(arr);

                        },
                        error: function (xhr, status, error) {
                            // self.getApp().notify({ message: "Lỗi không lấy được dữ liệu" }, { type: "danger", delay: 1000 });
                        },

                    })

                    self.$el.find("#tenthietbi").keyup(function () {
                        var i = 1;
                        var arr = [];

                        data.objects.forEach(function (item, index) {
                            if ((item.tenthietbi).indexOf(self.$el.find("#tenthietbi").val()) !== -1) {
                                item.stt = i;
                                i++;
                                arr.push(item)
                            }
                        });
                        self.render_grid(arr);
                    });
                    var arr2 = [];
                    self.$el.find('#ngaycap').blur(function () {

                        var x = self.$el.find('#ngaycap').data("gonrin").getValue();

                        if (arr.length != 0) {
                            arr2 = [];
                            var i = 1;

                            arr.forEach(function (item, index) {
                                if (moment(item.ngaycap * 1000).format("DDMMYYYY") == moment(x * 1000).format("DDMMYYYY")) {
                                    item.stt = i;
                                    i++;
                                    arr2.push(item)
                                }
                            });
                            self.render_grid(arr2);
                        }
                        else {
                            arr2 = [];
                            var i = 1;

                            data.objects.forEach(function (item, index) {
                                if (moment(item.ngaycap * 1000).format("DDMMYYYY") == moment(x * 1000).format("DDMMYYYY")) {
                                    item.stt = i;
                                    i++;
                                    arr2.push(item)
                                }
                            });
                            self.render_grid(arr2);
                            self.$el.find("#tenthietbi").keyup(function () {
                                var arr3 = [];
                                var i = 1;

                                arr2.forEach(function (item, index) {
                                    if ((item.tenthietbi).indexOf(self.$el.find("#tenthietbi").val()) !== -1) {
                                        item.stt = i;
                                        i++;
                                        arr3.push(item)

                                    }
                                });
                                self.render_grid(arr3);
                            });
                        }

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
                        field: "ma_qltb", label: "Mã QLTB", width: 150, readonly: true,
                    },
                    {
                        field: "ma", label: "Mã tem", width: 150, readonly: true,
                    },
                    {
                        field: "ngaycap", label: "Ngày cấp",
                        template: function (rowData) {
                            if (!!rowData && rowData.ngaycap) {

                                var utcTolocal = function (times, format) {
                                    return moment(times * 1000).local().format(format);
                                }
                                // return template_helper.datetimeFormat(rowData.ngaythanhtra, "DD/MM/YYYY");
                                return utcTolocal(rowData.ngaycap, "DD/MM/YYYY");
                            }
                            return "";
                        },
                        width: 150,
                    },
                    {
                        field: "ngayhethan", label: "Ngày hết hạn",
                        template: function (rowData) {
                            if (!!rowData && rowData.ngayhethan) {

                                var utcTolocal = function (times, format) {
                                    return moment(times * 1000).local().format(format);
                                }
                                // return template_helper.datetimeFormat(rowData.ngaythanhtra, "DD/MM/YYYY");
                                return utcTolocal(rowData.ngayhethan, "DD/MM/YYYY");
                            }
                            return "";
                        },
                        width: 150,
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
                        self.getApp().getRouter().navigate("bangkiemdinh/model?id=" + e.rowId);
                    },
                },
            });

        },
    });

});