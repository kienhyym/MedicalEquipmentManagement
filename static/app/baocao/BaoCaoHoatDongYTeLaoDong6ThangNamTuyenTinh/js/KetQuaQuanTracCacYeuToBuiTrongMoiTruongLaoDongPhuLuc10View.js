define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');
    var itemTemplate = require('text!app/baocao/BaoCaoHoatDongYTeLaoDong6ThangNamTuyenTinh/tpl/ketquaquantraccacyeutobuitrongmoitruonglaodongphuluc10.html'),
        itemSchema = require('json!schema/KetQuaQuanTracCacYeuToBuiTrongMoiTruongLaoDongPhuLuc10Schema.json');

    return Gonrin.ItemView.extend({
        bindings: "ketquaquantraccacyeutobuitrongmoitruonglaodongphuluc10-bind",
        template: itemTemplate,
        tagName: 'tr',
        modelSchema: itemSchema,
        urlPrefix: "/api/v1/",
        collectionName: "ketquaquantraccacyeutobuitrongmoitruonglaodongphuluc10",
        foreignRemoteField: "id",
        foreignField: "baocaohoatdongytelaodong6thangnam_id",

        render: function () {
            var self = this;
            self.applyBindings();
            self.registerEvent();        
        },
        registerEvent: function () {
            const self = this;
            self.$el.find("#itemRemove").unbind("click").bind("click", function () {
                self.remove(true);
            });
        }
    });
});