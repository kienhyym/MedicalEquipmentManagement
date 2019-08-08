define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');
    var itemTemplate = require('text!app/baocao/phuluc3/tpl/banghscctainanlaodongtaicosolaodong.html'),
        itemSchema = require('json!schema/BangHSCCTaiNanLaoDongTaiCoSoLaoDongSchema.json');

    return Gonrin.ItemView.extend({
        bindings: "hosocapcuu-bind",
        template: itemTemplate,
        tagName: 'tr',
        modelSchema: itemSchema,
        urlPrefix: "/api/v1/",
        collectionName: "banghscctainanlaodongtaicosolaodong",
        foreignRemoteField: "id",
        foreignField: "hscctainanlaodongtaicosolaodong_id",

        render: function () {
            var self = this;
            self.applyBindings();
            self.registerEvent();
            // self.model.set("id", gonrin.uuid())

            console.log("item", self.model.toJSON());
        
        },
        registerEvent: function () {
            const self = this;
            self.$el.find("#itemRemove").unbind("click").bind("click", function () {
                self.remove(true);
            });
        }
    });
});