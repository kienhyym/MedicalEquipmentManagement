define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');

    var template = require('text!app/danhmuc/medicalequipment/tpl/collection.html'),
        schema = require('json!schema/MedicalEquipmentSchema.json');

    var CustomFilterView = require('app/base/view/CustomFilterView');

    return Gonrin.CollectionView.extend({
        template: template,
        modelSchema: schema,
        urlPrefix: "/api/v1/",
        collectionName: "medicalequipment",
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
                    {
                        name: "CREATE",
                        type: "button",
                        buttonClass: "btn-success btn-sm",
                        label: "TRANSLATE:Tạo mới",
                        command: function () {
                            var self = this;
                            self.getApp().getRouter().navigate(self.collectionName + "/model");
                        }
                    },
                    // {
                    //     name: "import",
                    //     type: "button",
                    //     buttonClass: "btn-info btn-sm imp",
                    //     label: "TRANSLATE:Import",
                    //     command: function () {
                    //         var self = this;


                    //     }
                    // },
                ],
            }],
        // uiControl: {
        //     orderBy:
        //         [
        //             {
        //                 field: "name",
        //                 direction: "asc"
        //             },
        //             {
        //                 field: "created_at",
        //                 direction: "desc"
        //             }
        //         ],
        //     fields: [

        //         {
        //             field: "stt",
        //             label: "STT",
        //             width: "30px",

        //         },
        //         {
        //             field: "name", label: "Mã thương hiệu",
        //         }
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
            this.applyBindings();
            self.$el.find("#chonfile").bind('click', function () {
                $.ajax({
                    url: self.getApp().serviceURL + "/api/v1/read_file_json",
                    method: "POST",
                    data: JSON.stringify({ "ok": "ok" }),
                    contentType: "application/json",
                    success: function (data) {
                    }
                })
            })
            var xhr = $.ajax({
                url: self.getApp().serviceURL + "/api/v1/get_data_medical",
                method: "POST",
                data: JSON.stringify({ "text": self.$el.find(".name-search").val() }),
                contentType: "application/json",
                success: function (data) {
                    self.render_grid(data);
                }
            })


            self.$el.find(".name-search").keyup(function (e) {
                xhr.abort()
                xhr = $.ajax({
                    url: self.getApp().serviceURL + "/api/v1/get_data_medical",
                    method: "POST",
                    data: JSON.stringify({ "text": $(this).val() }),
                    contentType: "application/json",
                    success: function (data) {
                        self.render_grid(data);
                    }
                })
            })
            return this;
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
                                if (rowData.classify === "A") {
                                    chungloai = "TTBYT Loại A";
                                }
                                else if (rowData.classify === "B") {
                                    chungloai = "TTBYT Loại B";
                                }
                                else if (rowData.classify === "C") {
                                    chungloai = "TTBYT Loại C";
                                }
                                else if (rowData.classify === "D") {
                                    chungloai = "TTBYT Loại D";
                                }

                                return `    <div style="position: relative;">
                                                <div>${rowData.name}</div>
                                                <div style="font-size:12px">Mức độ rủi ro
                                                được phân loại: ${chungloai}</div>
                                                <div style="font-size:12px">Tình trạng	: ${rowData.status}</div>
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
                        self.getApp().getRouter().navigate("medicalequipment/model?id=" + e.rowId);
                    },
                },

            });
            $(self.$el.find('.grid-data tr')).each(function (index, item) {
                $(item).find('td:first').css('height', $(item).height())
                $(item).find('td:first').addClass('d-flex align-items-center justify-content-center')

            })
        },

    });

});