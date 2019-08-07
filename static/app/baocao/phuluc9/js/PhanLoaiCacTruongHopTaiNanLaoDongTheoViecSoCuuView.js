define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');
    var itemTemplate = require('text!app/baocao/phuluc9/tpl/phanloaicactruonghoptainanlaodongtheoviecsocuu.html'),
        itemSchema = require('json!schema/PhanLoaiCacTruongHopTaiNanLaoDongTheoViecSoCuuSchema.json');

    return Gonrin.ItemView.extend({
        bindings: "phanloaicactruonghoptainanlaodongtheoviecsocuu-bind",
        template: itemTemplate,
        tagName: 'tr',
        modelSchema: itemSchema,
        urlPrefix: "/api/v1/",
        collectionName: "phanloaicactruonghoptainanlaodongtheoviecsocuu",
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