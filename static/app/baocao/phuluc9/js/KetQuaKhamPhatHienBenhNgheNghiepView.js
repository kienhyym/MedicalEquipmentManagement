define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');
    var itemTemplate = require('text!app/baocao/phuluc9/tpl/ketquakhamphathienbenhnghenghiep.html'),
        itemSchema = require('json!schema/KetQuaKhamPhatHienBenhNgheNghiepSchema.json');

    return Gonrin.ItemView.extend({
        bindings: "ketquakhamphathienbenhnghenghiep-bind",
        template: itemTemplate,
        tagName: 'tr',
        modelSchema: itemSchema,
        urlPrefix: "/api/v1/",
        collectionName: "ketquakhamphathienbenhnghenghiep",
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