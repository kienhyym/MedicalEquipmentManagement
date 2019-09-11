define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');
    var itemTemplate = require('text!app/baocao/phuluc2/tpl/bangtinhhinhnghiviec.html'),
        itemSchema = require('json!schema/BangTinhHinhNghiViecSchema.json');

    return Gonrin.ItemView.extend({
        bindings: "bangtinhhinhnghiviec-bind",
        template: itemTemplate,
        tagName: 'tr',
        modelSchema: itemSchema,
        urlPrefix: "/api/v1/",
        collectionName: "bangtinhhinhnghiviec",
        foreignRemoteField: "id",
        foreignField: "hsqlsuckhoevabenhtatnguoilaodong_id",

        
        render: function () {
            var self = this;   
                
            self.applyBindings();
            self.registerEvent();
        
        },
        registerEvent: function () {
            const self = this;
            self.model.on("change", () => {
                self.trigger("change", self.model.toJSON());
            });     
            self.$el.find("#itemRemove").unbind("click").bind("click", function () {
                self.remove(true);
            });
           
        }
    });
});