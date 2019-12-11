define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');

    var template = require('text!app/chungtu/bangkiemtrathietbi/tpl/collection.html'),
        schema = require('json!schema/BangKiemTraThietBiSchema.json');

    return Gonrin.CollectionView.extend({
        template: template,
        modelSchema: schema,
        urlPrefix: "/api/v1/",
        collectionName: "bangkiemtrathietbi",
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
                url: self.getApp().serviceURL + "/api/v1/bangkiemtrathietbi?results_per_page=100000&max_results_per_page=1000000",
                method: "GET",
                // data: { "q": JSON.stringify({ "order_by": [{ "field": "updated_at", "direction": "desc" }] }) },
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

                    if (IDTB != null || IDTB != undefined) {
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
                        url: self.getApp().serviceURL + "/api/v1/bangkiemtrathietbi?results_per_page=100000&max_results_per_page=1000000",
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
                        arr = [];
                        var i = 1;

                        data.objects.forEach(function (item, index) {
                            if ((item.tenthietbi).indexOf(self.$el.find("#tenthietbi").val()) !== -1) {
                                item.stt = i;
                                i++;
                                arr.push(item)

                            }
                        });
                        self.render_grid(arr);

                    });
                    self.$el.find('#ngaykiemtra').blur(function () {
                        var x = self.$el.find('#ngaykiemtra').data("gonrin").getValue();

                        if (arr.length != 0) {
                            var arr2 = [];
                            var i = 1;
                            arr.forEach(function (item, index) {
                                if (moment(item.ngay * 1000).format("DDMMYYYY") == moment(x * 1000).format("DDMMYYYY")) {
                                    item.stt = i;
                                    i++;
                                    arr2.push(item)
                                }
                            });
                            self.render_grid(arr2);

                        }
                        else {
                            arr2 = []
                            var i = 1;
                            data.objects.forEach(function (item, index) {
                                if (moment(item.ngay * 1000).format("DDMMYYYY") == moment(x * 1000).format("DDMMYYYY")) {
                                    item.stt = i;
                                    i++;
                                    arr2.push(item)
                                }
                            });
                            self.render_grid(arr2);
                            self.$el.find("#tenthietbi").keyup(function () {
                                var arr3 = [];
                                var i =1;
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
                        field: "ngay", label: "Ngày kiểm tra",
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
                        width: 150
                    },
                    {
                        field: "tinhtrang", label: "Tình trạng", width: 150, readonly: true,
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
                        self.getApp().getRouter().navigate("bangkiemtrathietbi/model?id=" + e.rowId);
                    },
                },
            });

            // $(self.$el.find('.grid-data tr')).each(function (index, item) {
            //     $(item).find('td:first').html(index + 1)

            // })


            // self.$el.find('.page-item').each(function (index, item) {

            //     $(item).bind('click', function () {
            //         console.log('xx', item)

            //         // $(self.$el.find('.grid-data tr')).each(function (index, item) {
            //         //     $(item).find('td:first').html(index + 1)
            //         // })
            //     })
            // })
        },
    });

});