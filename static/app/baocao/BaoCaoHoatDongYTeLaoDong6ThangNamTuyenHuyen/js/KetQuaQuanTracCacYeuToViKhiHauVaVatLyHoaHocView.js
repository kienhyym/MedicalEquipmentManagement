define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');
    var itemTemplate = require('text!app/baocao/BaoCaoHoatDongYTeLaoDong6ThangNamTuyenHuyen/tpl/ketquaquantraccacyeutovikhihauvavatlyhoahoc.html'),
        itemSchema = require('json!schema/KetQuaQuanTracCacYeuToViKhiHauVaVatLyHoaHocSchema.json');

    return Gonrin.ItemView.extend({
        bindings: "ketquaquantraccacyeutovikhihauvavatlyhoahoc-bind",
        template: itemTemplate,
        tagName: 'tr',
        modelSchema: itemSchema,
        urlPrefix: "/api/v1/",
        collectionName: "ketquaquantraccacyeutovikhihauvavatlyhoahoc",
        foreignRemoteField: "id",
        foreignField: "baocaohoatdongytelaodong6thangnamtuyenhuyen_id",
        uiControl:{
            fields:[
                {
                    field:"tongsonguoilaodong",
                    cssClass:false
                },
                {
                    field:"songuoitiepxuc",
                    cssClass:false
                },
                {
                    field:"nhietdo1",
                    cssClass:false
                },
                {
                    field:"nhietdo2",
                    cssClass:false
                },
                {
                    field:"doam1",
                    cssClass:false
                },
                {
                    field:"doam2",
                    cssClass:false
                },
                {
                    field:"tocdogio1",
                    cssClass:false
                },
                {
                    field:"tocdogio2",
                    cssClass:false
                },
                {
                    field:"anhsang1",
                    cssClass:false
                },
                {
                    field:"anhsang2",
                    cssClass:false
                },
                {
                    field:"on1",
                    cssClass:false
                },
                {
                    field:"on2",
                    cssClass:false
                },
                {
                    field:"rung1",
                    cssClass:false
                },
                {
                    field:"rung2",
                    cssClass:false
                },
                {
                    field:"hkdoc1",
                    cssClass:false
                },
                {
                    field:"hkdoc2",
                    cssClass:false
                },
                {
                    field:"phongxa1",
                    cssClass:false
                },
                {
                    field:"phongxa2",
                    cssClass:false
                },
                {
                    field:"dientutruong1",
                    cssClass:false
                },
                {
                    field:"dientutruong2",
                    cssClass:false
                },
                {
                    field:"yeutokhac1",
                    cssClass:false
                },
                {
                    field:"yeutokhac2",
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