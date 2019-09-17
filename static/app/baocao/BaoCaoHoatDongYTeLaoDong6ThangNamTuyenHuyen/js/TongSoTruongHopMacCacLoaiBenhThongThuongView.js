define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');
    var itemTemplate = require('text!app/baocao/BaoCaoHoatDongYTeLaoDong6ThangNamTuyenHuyen/tpl/tongsotruonghopmaccacloaibenhthongthuong.html'),
        itemSchema = require('json!schema/TongSoTruongHopMacCacLoaiBenhThongThuongSchema.json');

    return Gonrin.ItemView.extend({
        bindings: "tongsotruonghopmaccacloaibenhthongthuong-bind",
        template: itemTemplate,
        tagName: 'tr',
        modelSchema: itemSchema,
        urlPrefix: "/api/v1/",
        collectionName: "tongsotruonghopmaccacloaibenhthongthuong",
        foreignRemoteField: "id",
        foreignField: "baocaohoatdongytelaodong6thangnamtuyenhuyen_id",
        // uiControl:{
        //     fields:[
        //         {
        //             field:"",
        //             cssClass:false
        //         }
        //     ]
        // },
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