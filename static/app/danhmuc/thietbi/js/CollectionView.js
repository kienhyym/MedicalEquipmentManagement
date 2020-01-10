define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');

    var template = require('text!app/danhmuc/thietbi/tpl/collection.html'),
        schema = require('json!schema/ThietBiSchema.json');

    return Gonrin.CollectionView.extend({
        template: template,
        modelSchema: schema,
        urlPrefix: "/api/v1/",
        collectionName: "thietbi",
        uiControl: {
            fields: [
                {
                    field: "stt",
                    label: "STT",
                    width: "30px",
                },
                {
                    field: "ten", label: "Tên", width: 350, readonly: true,
                },
                {
                    field: "chungloailoaithietbi", label: "Chủng loại", width: 250, readonly: true,
                },
                {
                    field: "tinhtrang", label: "Tình trạng", width: 150, readonly: true,
                },

            ],
            onRowClick: function (event) {
                if (event.rowId) {
                    var path = this.collectionName + '/model?id=' + event.rowId;
                    this.getApp().getRouter().navigate(path);
                }
            }
            // , rowClass: function (data) {

            //     if (data.tinhtrang === "Đang lưu hành") {
            //         return "Green";
            //     }
            //     // if (data.name === "XYZ") {
            //     //     return "Blue";
            //     // }
            // },
        },
        render: function () {

            this.applyBindings();
            this.locData();

            return this;
        },
        locData: function () {
            var self = this;
            $.ajax({
                url: self.getApp().serviceURL + "/api/v1/thietbi?results_per_page=100000&max_results_per_page=1000000",
                method: "GET",
                data: { "q": JSON.stringify({ "order_by": [{ "field": "updated_at", "direction": "desc" }] }) },
                contentType: "application/json",
                success: function (data) {
                    var arr = [];
                    data.objects.forEach(function (item, index) {
                        item.stt = index + 1;
                        arr.push(item)
                    })
                    console.log(arr)
                    self.render_grid(arr);
                }
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
                        label: "Phiếu",
                        template: function (rowData) {
                            if (!!rowData) {
                                var utcTolocal = function (times, format) {
                                    return moment(times * 1000).local().format(format);
                                }
                                var chungloai = "";
                                if (rowData.chungloailoaithietbi === "1") {
                                    chungloai = "Máy xét nhiệm";
                                }
                                else if (rowData.chungloailoaithietbi === "2") {
                                    chungloai =  "Máy chuẩn đoán hình ảnh";
                                }
                                else if (rowData.chungloailoaithietbi === "3") {
                                    chungloai =  "Máy thăm dò chức năng";
                                }
                                else if (rowData.chungloailoaithietbi === "4") {
                                    chungloai =  "Thiết bị hấp sấy";
                                }
                                else if (rowData.chungloailoaithietbi === "5") {
                                    chungloai =  "Thiết bị hỗ trợ sinh tồn ";
                                }
                                else if (rowData.chungloailoaithietbi === "6") {
                                    chungloai =  "Robot";
                                }
                                else if (rowData.chungloailoaithietbi === "7") {
                                    chungloai =  "Thiết bi miễn dịch";
                                }
                                else if (rowData.chungloailoaithietbi === "8") {
                                    chungloai =  "Thiết bị lọc và hỗ trợ chức năng ";
                                }
                            
                            return `    <div style="position: relative;">
                                                <div>${rowData.ten}</div>
                                                <div>Chủng loại: ${chungloai}</div>

                                                <i style="position: absolute;bottom:0;right:0" class='fa fa-angle-double-right'></i>
                                            </div>
                                            `;
                        }
                            return "";
                    }
                    },
                    // {
                    //     field: "chungloailoaithietbi", label: "Chủng loại", width: 250, readonly: true,
                    //     template: function (rowData) {
                    //        
                    //     }
                    // },
                    // {
                    //     field: "tinhtrang", label: "Tình trạng", width: 150, readonly: true,
                    // },
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
                    self.getApp().getRouter().navigate("thietbi/model?id=" + e.rowId);
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