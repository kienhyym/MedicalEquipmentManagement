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
            }],
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
            if (IDTB !== null) {
                var filters = {
                    filters: {
                        "$and": [
                            { "chitietthietbi_id": { "$eq": IDTB } }
                        ]
                    },
                    order_by: [{ "field": "created_at", "direction": "desc" }]
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
            }
            else {
                $.ajax({
                    url: self.getApp().serviceURL + "/api/v1/bangkiemtrathietbi?results_per_page=100000&max_results_per_page=1000000",
                    method: "GET",
                    data: { "q": JSON.stringify({ "order_by": [{ "field": "created_at", "direction": "desc" }] }) },
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
                    }
                })
            }
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
                        label: "Phiếu",
                        template: function (rowData) {
                            if (!!rowData && rowData.ngay) {
                                var utcTolocal = function (times, format) {
                                    return moment(times * 1000).local().format(format);
                                }
                                return `    <div style="position: relative;">
                                                <div>${rowData.tenthietbi} (Serial:${rowData.model_serial_number})</div>
                                                <div>Ngày kiểm tra:${utcTolocal(rowData.ngay, "DD/MM/YYYY")}</div>
                                                <div>Trạng thái:${rowData.tinhtrang}</div>
                                                <i style="position: absolute;bottom:0;right:0" class='fa fa-angle-double-right'></i>
                                            </div>
                                            `;
                            }
                            return "";
                        }
                    },
                ],
                dataSource: dataSource,
                primaryField: "id",
                refresh: true,
                selectionMode: false,
                pagination: {
                    page: 1,
                    pageSize: 15
                },

                events: {
                    "rowclick": function (e) {
                        self.getApp().getRouter().navigate("bangkiemtrathietbi/model?id=" + e.rowId);
                    },
                },
            });

            $(self.$el.find('.grid-data tr')).each(function (index, item) {
                $(item).find('td:first').css('height',$(item).height())

                console.log($(item).find('td:first').addClass('d-flex align-items-center justify-content-center'))

            })
        },
    });

});