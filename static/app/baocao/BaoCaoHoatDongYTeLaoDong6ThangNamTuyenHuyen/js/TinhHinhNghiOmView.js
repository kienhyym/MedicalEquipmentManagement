define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');
    var itemTemplate = require('text!app/baocao/BaoCaoHoatDongYTeLaoDong6ThangNamTuyenHuyen/tpl/tinhhinhnghiom.html'),
        itemSchema = require('json!schema/TinhHinhNghiOmSchema.json');

    return Gonrin.ItemView.extend({
        bindings: "tinhhinhnghiom-bind",
        template: itemTemplate,
        tagName: 'tr',
        modelSchema: itemSchema,
        urlPrefix: "/api/v1/",
        collectionName: "tinhhinhnghiom",
        foreignRemoteField: "id",
        foreignField: "baocaohoatdongytelaodong6thangnamtuyenhuyen_id",
        uiControl:{
            fields:[
                
            
                {
                    field:"songuoiom",
                    cssClass:false
                },
                {
                    field:"songayom",
                    cssClass:false
                },
                {
                    field:"songuoitainanlaodong",
                    cssClass:false
                },
                {
                    field:"songaytainanlaodong",
                    cssClass:false
                },
                {
                    field:"songuoibenhnghenghiep",
                    cssClass:false
                },
                {
                    field:"songaybenhnghenghiep",
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