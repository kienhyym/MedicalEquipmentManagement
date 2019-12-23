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
            // self.$el.find('.thietbi').remove();
            // self.$el.find('.xuongdong').remove();
            // console.log(Math.ceil(dataSource.length/10))
            // dataSource.forEach(function (item, index) {
            //     if(index < 10){

            //         self.$el.find('#grid-table').append(`<div class="thietbi row">
            //         <div class="d-flex justify-content-center  align-items-center col-md-1 col-sm-1 col-2 p-0 stt">${item.stt}</div>
            //         <div class="col-md-10 col-sm-10 col-8 p-0">
            //             <div style="font-weight:bold">${item.tenthietbi}(Serial:${item.model_serial_number})</div>
            //             <div class="row">
            //                 <div class = "col-md-4">Ngày cấp: ${moment(item.ngaycap * 1000).local().format("DD/MM/YYYY")} </div>
            //                 <div class = "col-md-4">Ngày hết hạn:${moment(item.ngayhethan * 1000).local().format("DD/MM/YYYY")}</div>
            //             </div>
            //             <div>Trạng thái :${item.tinhtrang}</div>
            //         </div>
            //         <div class="d-flex justify-content-center align-items-center col-md-1 col-sm-1 col-2 p-0 "><button class="btn btn-primary p-2">Chọn</button></div>
            //         </div><hr class="xuongdong">`)
            //     }

            // })
            // self.$el.find('.thietbi').each(function (indexHTML2, itemHTML2) {
            //     $(itemHTML2).bind('click', function () {
            //         var link = (dataSource[parseInt($(itemHTML2).find('.stt').html())-1].id)
            //         self.getApp().getRouter().navigate("bangkiemdinh/model?id=" + link);

            //     })
            // })
            // self.$el.find('.xxx').each(function (indexHTML, itemHTML) {

            //     $(itemHTML).click(function () {
            //         self.$el.find('.thietbi').remove();
            //         self.$el.find('.xuongdong').remove();

            //         dataSource.forEach(function (item, index) {
            //             if ((indexHTML) * 10 <= index && index < (indexHTML + 1) * 10)
            //                 self.$el.find('#grid-table').append(`<div class="thietbi row">
            //             <div class="d-flex justify-content-center  align-items-center col-md-1 col-sm-1 col-2 p-0 stt">${item.stt}</div>
            //             <div class="col-md-10 col-sm-10 col-8 p-0">
            //                 <div style="font-weight:bold">${item.tenthietbi}(Serial:${item.model_serial_number})</div>
            //                 <div class="row">
            //                     <div class = "col-md-4">Ngày cấp: ${moment(item.ngaycap * 1000).local().format("DD/MM/YYYY")} </div>
            //                     <div class = "col-md-4">Ngày hết hạn:${moment(item.ngayhethan * 1000).local().format("DD/MM/YYYY")}</div>
            //                 </div>
            //                 <div>Trạng thái :${item.tinhtrang}</div>
            //             </div>
            //             <div class="d-flex justify-content-center align-items-center col-md-1 col-sm-1 col-2 p-0 "><button class="btn btn-primary p-2">Chọn</button></div>
            //             </div><hr class="xuongdong">`)
            //         })

            //         self.$el.find('.thietbi').each(function (indexHTML2, itemHTML2) {
            //             $(itemHTML2).bind('click', function () {
            //                 var link = (dataSource[parseInt($(itemHTML2).find('.stt').html())-1].id)
            //                 self.getApp().getRouter().navigate("bangkiemdinh/model?id=" + link);

            //             })
            //         })
            //     })
            // })




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
                        template: function (rowData) {
                                return `<div  style="position: relative;" ><div style="position: absolute; top:10px;left:6px;">${rowData.stt}</div></div>`;
                        
                        },
                        width:20
                    },
                    {
                        label: "Phiếu",
                        template: function (rowData) {
                            if (!!rowData && rowData.ngayhethan && rowData.ngaycap) {
                                var utcTolocal = function (times, format) {
                                    return moment(times * 1000).local().format(format);
                                }
                                return `<div style="position: relative;"><div class="d-flex align-items-center"><i class="fa fa-angle-double-right" aria-hidden="true"></i>
                                </div>${rowData.tenthietbi}</div><div class='row'><div class='col-md-4'>Ngày cấp:${utcTolocal(rowData.ngaycap, "DD/MM/YYYY")}</div><div class='col-md-4'>Ngày hết hạn:${utcTolocal(rowData.ngayhethan, "DD/MM/YYYY")}</div>`;
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
                    pageSize: 10
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