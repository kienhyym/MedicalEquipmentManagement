define(function(require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');

    var template = require('text!app/danhmuc/organization/tpl/collection.html'),
        schema = require('json!schema/OrganizationUserSchema.json');
    var TemplateHelper = require('app/base/view/TemplateHelper');
    return Gonrin.CollectionView.extend({
        template: template,
        modelSchema: schema,
        urlPrefix: "/api/v1/",
        collectionName: "organizationuser",
        render: function() {
            this.applyBindings();
            this.locData();
            return this;
        },
        locData: function() {
            var self = this;
            $.ajax({
                url: self.getApp().serviceURL + "/api/v1/organizationuser?results_per_page=100000&max_results_per_page=1000000",
                method: "GET",
                data: { "q": JSON.stringify({ "order_by": [{ "field": "updated_at", "direction": "desc" }] }) },
                contentType: "application/json",
                success: function(data) {
                    var arr = [];
                    data.objects.forEach(function(item, index) {
                        item.stt = index + 1;
                        arr.push(item)
                    })
                    self.render_grid(arr);
                }
            })
        },
        render_grid: function(dataSource) {
            var self = this;
            var element = self.$el.find("#grid-data");
            element.grid({
                orderByMode: "client",
                language: {
                    no_records_found: "Chưa có dữ liệu"
                },
                noResultsClass: "alert alert-default no-records-found",
                fields: [{
                        field: "stt",
                        label: "STT",
                        width: 30,
                    },
                    { field: "name", label: "Tên" },
                    // {
                    //     field: "province_id",
                    //     label: "Tỉnh thành",
                    //     foreign: "province",
                    //     foreignValueField: "id",
                    //     foreignTextField: "name",
                    // },
                    // {
                    //     field: "district_id",
                    //     label: "Quận/Huyện",
                    //     foreign: "district",
                    //     foreignValueField: "id",
                    //     foreignTextField: "name",
                    // },
                    // {
                    //     field: "wards_id",
                    //     label: "Xã/Phường/Thị trấn",
                    //     foreign: "wards",
                    //     foreignValueField: "id",
                    //     foreignTextField: "name",
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
                    "rowclick": function(e) {
                        self.getApp().getRouter().navigate("organizationuser/model?id=" + e.rowId);
                    },
                },
            });
            $(self.$el.find('.grid-data tr')).each(function(index, item) {
                $(item).find('td:first').css('height', $(item).height())

                console.log($(item).find('td:first').addClass('d-flex align-items-center justify-content-center'))

            })
        },

    });

});