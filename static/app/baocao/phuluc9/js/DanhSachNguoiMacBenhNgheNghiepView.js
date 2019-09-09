define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');
    var itemTemplate = require('text!app/baocao/phuluc9/tpl/danhsachnguoimacbenhnghenghiep.html'),
        itemSchema = require('json!schema/DanhSachNguoiMacBenhNgheNghiepSchema.json');

    return Gonrin.ItemView.extend({
        bindings: "danhsachnguoimacbenhnghenghiep-bind",
        template: itemTemplate,
        tagName: 'tr',
        modelSchema: itemSchema,
        urlPrefix: "/api/v1/",
        collectionName: "danhsachnguoimacbenhnghenghiep",
        foreignRemoteField: "id",
        foreignField: "baocaohoatdongytelaodong6thangnamtuyenhuyen_id",
        uiControl:{
            fields:[
                
            
                {
                    field:"tuoinam",
                    cssClass:false
                },
                {
                    field:"tuoinu",
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