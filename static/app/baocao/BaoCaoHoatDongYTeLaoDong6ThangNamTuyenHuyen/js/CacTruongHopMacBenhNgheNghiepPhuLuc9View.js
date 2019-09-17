define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');
    var itemTemplate = require('text!app/baocao/BaoCaoHoatDongYTeLaoDong6ThangNamTuyenHuyen/tpl/cactruonghopmacbenhnghenghiepphuluc9.html'),
        itemSchema = require('json!schema/CacTruongHopMacBenhNgheNghiepPhuLuc9Schema.json');

    return Gonrin.ItemView.extend({
        bindings: "cactruonghopmacbenhnghenghiepphuluc9-bind",
        template: itemTemplate,
        tagName: 'tr',
        modelSchema: itemSchema,
        urlPrefix: "/api/v1/",
        collectionName: "cactruonghopmacbenhnghenghiepphuluc9",
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