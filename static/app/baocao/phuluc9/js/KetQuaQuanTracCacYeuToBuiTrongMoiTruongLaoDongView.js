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
        uiControl:{
            fields:[
                
            
                {
                    field:"buikhac2",
                    cssClass:false
                },
                {
                    field:"buikhac1",
                    cssClass:false
                },
                {
                    field:"buisilic2",
                    cssClass:false
                },
                {
                    field:"buisilic1",
                    cssClass:false
                },
                {
                    field:"buihohap2",
                    cssClass:false
                },
                {
                    field:"buihohap1",
                    cssClass:false
                },
                {
                    field:"buitoanphan2",
                    cssClass:false
                },
                {
                    field:"buitoanphan1",
                    cssClass:false
                },
                {
                    field:"songuoitiepxucvoicacyeutobui",
                    cssClass:false
                },
                {
                    field:"tongsonguoilaodong",
                    cssClass:false
                },
                {
                    field:"tong1",
                    cssClass:false
                },
                {
                    field:"tong2",
                    cssClass:false
                },
            
            ]
        },
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