define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');
    var itemTemplate = require('text!app/baocao/phuluc10/tpl/tonghoptubaocaocuacaccosolaodongphuluc10.html'),
        itemSchema = require('json!schema/TongHopTuBaoCaoCuaCacCoSoLaoDongPhuLuc10Schema.json');

    return Gonrin.ItemView.extend({
        bindings: "tonghoptubaocaocuacaccosolaodongphuluc10-bind",
        template: itemTemplate,
        tagName: 'tr',
        modelSchema: itemSchema,
        urlPrefix: "/api/v1/",
        collectionName: "tonghoptubaocaocuacaccosolaodongphuluc10",
        foreignRemoteField: "id",
        foreignField: "baocaohoatdongytelaodong6thangnam_id",

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