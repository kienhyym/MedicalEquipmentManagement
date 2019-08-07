define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');
    var itemTemplate = require('text!app/baocao/phuluc9/tpl/ketquaquantraccacyeutobuitrongmoitruonglaodong.html'),
        itemSchema = require('json!schema/KetQuaQuanTracCacYeuToBuiTrongMoiTruongLaoDongSchema.json');

    return Gonrin.ItemView.extend({
        bindings: "ketquaquantraccacyeutobuitrongmoitruonglaodong-bind",
        template: itemTemplate,
        tagName: 'tr',
        modelSchema: itemSchema,
        urlPrefix: "/api/v1/",
        collectionName: "ketquaquantraccacyeutobuitrongmoitruonglaodong",
        foreignRemoteField: "id",
        foreignField: "baocaohoatdongytelaodong6thangnamtuyenhuyen_id",

        render: function () {
            var self = this;
            self.applyBindings();
            self.registerEvent();
            // self.model.set("id", gonrin.uuid())
        
        },
        registerEvent: function () {
            const self = this;
            self.$el.find("#itemRemove").unbind("click").bind("click", function () {
                self.remove(true);
            });
        }
    });
});