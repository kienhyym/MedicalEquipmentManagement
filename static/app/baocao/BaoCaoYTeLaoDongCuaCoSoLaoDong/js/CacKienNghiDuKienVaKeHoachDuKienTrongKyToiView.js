define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');
    var itemTemplate = require('text!app/baocao/BaoCaoYTeLaoDongCuaCoSoLaoDong/tpl/cackiennghidukienvakehoachdukientrongkytoi.html'),
        itemSchema = require('json!schema/CacKienNghiDuKienVaKeHoachDuKienTrongKyToiSchema.json');

    return Gonrin.ItemView.extend({
        bindings: "kiennghi-bind",
        template: itemTemplate,
        tagName: 'div',
        modelSchema: itemSchema,
        urlPrefix: "/api/v1/",
        collectionName: "cackiennghidukienvakehoachdukientrongkytoi",
        foreignRemoteField: "id",
        foreignField: "baocaoytelaodongcuacosolaodong_id",

        uiControl: {
            fields: [
                {
					field: "noidung",
					cssClass: false,
				},
            ]
        },
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