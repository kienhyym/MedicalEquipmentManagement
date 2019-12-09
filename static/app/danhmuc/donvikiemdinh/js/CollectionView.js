define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');

    var template = require('text!app/danhmuc/donvikiemdinh/tpl/collection.html'),
        schema = require('json!schema/DonViKiemDinhSchema.json');
    var TemplateHelper = require('app/base/view/TemplateHelper');
    return Gonrin.CollectionView.extend({
        template: template,
        modelSchema: schema,
        urlPrefix: "/api/v1/",
        collectionName: "donvikiemdinh",
        uiControl: {
            fields: [
                {
                    field: "stt",
                    label: "STT",
                    width: "30px",
                },
                { field: "ten", label: "Tên", width: "350px" },
                {
                    field: "tinhthanh_id",
                    label: "Tỉnh thành",
                    foreign: "tinhthanh",
                    foreignValueField: "id",
                    foreignTextField: "ten",
                },
                {
                    field: "quanhuyen_id",
                    label: "Quận/Huyện",
                    foreign: "quanhuyen",
                    foreignValueField: "id",
                    foreignTextField: "ten",
                },
                {
                    field: "xaphuong_id",
                    label: "Xã/Phường/Thị trấn",
                    foreign: "xaphuong",
                    foreignValueField: "id",
                    foreignTextField: "ten",
                },
            ],

            onRowClick: function (event) {
                if (event.rowId) {
                    var path = this.collectionName + '/model?id=' + event.rowId;
                    this.getApp().getRouter().navigate(path);
                }
            },

        },
        render: function () {
            this.applyBindings();
            return this;
        },

    });
});