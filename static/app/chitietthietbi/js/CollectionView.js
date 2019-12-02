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
                    field: "model_serial_number", label: "Serial", width: 250, readonly: true,
                },
                {
                    field: "quocgia_id",
                    label: "Nước sản xuất",
                    foreign: "quocgia",
                    foreignValueField: "id",
                    foreignTextField: "ten",
                    width: 250
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
                    width: 250
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

            this.applyBindings();
            console.log(this);
            return this;
        },

    });

});