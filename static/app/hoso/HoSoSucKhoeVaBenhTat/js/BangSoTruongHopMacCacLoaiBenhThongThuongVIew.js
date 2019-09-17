define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');
    var itemTemplate = require('text!app/hoso/HoSoSucKhoeVaBenhTat/tpl/bangsotruonghopmaccacloaibenhthongthuong.html'),
        itemSchema = require('json!schema/BangSoTruongHopMacCacLoaiBenhThongThuongSchema.json');

    return Gonrin.ItemView.extend({
        bindings: "cacbenhthongthuong-bind",
        template: itemTemplate,
        tagName: 'tr',
        modelSchema: itemSchema,
        urlPrefix: "/api/v1/",
        collectionName: "bangsotruonghopmaccacloaibenhthongthuong",
        foreignRemoteField: "id",
        foreignField: "hsqlsuckhoevabenhtatnguoilaodong_id",

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