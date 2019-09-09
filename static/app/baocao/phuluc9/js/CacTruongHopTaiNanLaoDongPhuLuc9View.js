define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');
    var itemTemplate = require('text!app/baocao/phuluc9/tpl/cactruonghoptainanlaodongphuluc9.html'),
        itemSchema = require('json!schema/CacTruongHopTaiNanLaoDongPhuLuc9Schema.json');

    return Gonrin.ItemView.extend({
        bindings: "cactruonghoptainanlaodongphuluc9-bind",
        template: itemTemplate,
        tagName: 'tr',
        modelSchema: itemSchema,
        urlPrefix: "/api/v1/",
        collectionName: "cactruonghoptainanlaodongphuluc9",
        foreignRemoteField: "id",
        foreignField: "baocaohoatdongytelaodong6thangnamtuyenhuyen_id",
        uiControl:{
            fields:[
                
            
                {
                    field:"tuoi",
                    cssClass:false
                },
                {
                    field:"nam",
                    cssClass:false
                },
                {
                    field:"nu",
                    cssClass:false
                },
                {
                    field:"duocsocuutaicho",
                    cssClass:false
                },
                {
                    field:"ketquadieutri",
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