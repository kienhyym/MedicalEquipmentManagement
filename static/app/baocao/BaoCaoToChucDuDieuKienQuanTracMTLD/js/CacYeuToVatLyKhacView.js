define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');
    var itemTemplate = require('text!app/baocao/BaoCaoToChucDuDieuKienQuanTracMTLD/tpl/cacyeutovatlykhac.html'),
        itemSchema = require('json!schema/CacYeuToVatLyKhacSchema.json');

    return Gonrin.ItemView.extend({
        bindings: "cacyeutovatlykhac-bind",
        template: itemTemplate,
        tagName: 'div',
        modelSchema: itemSchema,
        urlPrefix: "/api/v1/",
        collectionName: "cacyeutovatlykhac",
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