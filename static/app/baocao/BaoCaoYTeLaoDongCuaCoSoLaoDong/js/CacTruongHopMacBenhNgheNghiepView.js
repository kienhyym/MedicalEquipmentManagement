define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');
    var itemTemplate = require('text!app/baocao/BaoCaoYTeLaoDongCuaCoSoLaoDong/tpl/cactruonghopmacbenhnghenghiep.html'),
        itemSchema = require('json!schema/CacTruongHopMacBenhNgheNghiepSchema.json');

    return Gonrin.ItemView.extend({
        bindings: "cactruonghopmacbenhnghenghiep-bind",
        template: itemTemplate,
        tagName: 'tr',
        modelSchema: itemSchema,
        urlPrefix: "/api/v1/",
        collectionName: "cactruonghopmacbenhnghenghiep",
        foreignRemoteField: "id",
        foreignField: "baocaoytelaodongcuacosolaodong_id",

        // uiControl: {
        //     fields: [
        //         {
        //             field: "channelname",
        //             uicontrol: "combobox",
        //             dataSource: [
        //                 { value: "phone_number", text: "Phone" },
        //                 { value: "email", text: "Email" },
        //                 { value: "zalo_id", text: "zalo ID" },
        //                 { value: "somevabe_id", text: "Sổ mẹ và bé ID" },
        //             ],
        //             textField: "text",
        //             valueField: "text"
        //         },
        //     ]
        // },
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