define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');
    var itemTemplate = require('text!app/baocao/phuluc11/tpl/cacyeutokhac.html'),
        itemSchema = require('json!schema/CacYeuToKhacSchema.json');

    return Gonrin.ItemView.extend({
        bindings: "cacyeutokhac-bind",
        template: itemTemplate,
        tagName: 'div',
        modelSchema: itemSchema,
        urlPrefix: "/api/v1/",
        collectionName: "cacyeutokhac",
        foreignRemoteField: "id",
        foreignField: "baocaotochucdudieukienquantracmoitruonglaodongduoccongbo_id",
        uiControl: {
			fields: [
				{
					field: "yeuto",
					cssClass: false,
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