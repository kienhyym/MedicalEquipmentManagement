define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');
    var itemTemplate = require('text!app/baocao/phuluc10/tpl/ketquaquantraccacyeutovikhihauvavatlyhoahoctrongmt.html'),
        itemSchema = require('json!schema/KetQuaQuanTracCacYeuToViKhiHauVaVatLyHoaHocTrongMTSchema.json');

    return Gonrin.ItemView.extend({
        bindings: "ketquaquantraccacyeutovikhihauvavatlyhoahoctrongmt-bind",
        template: itemTemplate,
        tagName: 'tr',
        modelSchema: itemSchema,
        urlPrefix: "/api/v1/",
        collectionName: "ketquaquantraccacyeutovikhihauvavatlyhoahoctrongmt",
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