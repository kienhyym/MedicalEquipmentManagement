define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');
    var itemTemplate = require('text!app/baocao/BaoCaoHoatDongYTeLaoDong6ThangNamTuyenHuyen/tpl/phanloaicosolaodongcoyeutocohainguyhiem.html'),
        itemSchema = require('json!schema/PhanLoaiCoSoLaoDongCoYeuToCoHaiNguyHiemSchema.json');

    return Gonrin.ItemView.extend({
        bindings: "phanloaicosolaodongcoyeutocohainguyhiem-bind",
        template: itemTemplate,
        tagName: 'tr',
        modelSchema: itemSchema,
        urlPrefix: "/api/v1/",
        collectionName: "phanloaicosolaodongcoyeutocohainguyhiem",
        foreignRemoteField: "id",
        foreignField: "baocaohoatdongytelaodong6thangnamtuyenhuyen_id",
        uiControl:{
            fields:[
                {
                    field:"socsconho",
                    cssClass:false
                },
                {
                    field:"sonldcosoconho",
                    cssClass:false
                },
                {
                    field:"socscovua",
                    cssClass:false
                },
                {
                    field:"sonldcosocovua",
                    cssClass:false
                },
                {
                    field:"socscolon",
                    cssClass:false
                },
                {
                    field:"sonldcosocolon",
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