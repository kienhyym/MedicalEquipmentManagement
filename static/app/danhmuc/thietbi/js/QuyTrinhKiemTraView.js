define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');
    var itemTemplate = require('text!app/danhmuc/thietbi/tpl/quytrinhkiemtra.html'),
        itemSchema = require('json!schema/QuyTrinhKiemTraSchema.json');

    return Gonrin.ItemView.extend({
        bindings: "quytrinhkiemtra-bind",
        template: itemTemplate,
        tagName: 'div',
        modelSchema: itemSchema,
        urlPrefix: "/api/v1/",
        collectionName: "quytrinhkiemtra",
        foreignRemoteField: "id",
        foreignField: "bangkiemtrathietbi_id",
        uiControl: {
            fields: [

				// {
				// 	field: "tranghthai",
				// 	uicontrol: "combobox",
				// 	textField: "text",
				// 	valueField: "value",
				// 	dataSource: [
				// 		{ "value": "Không vấn đề", "text": "Bình thường" },
				// 		{ "value": "Có vấn đề", "text": "Không bình thường" },

				// 	],
                // },
            ]
        },
        render: function () {
			var self = this;

			if (self.model.get("id") == null){
				self.model.set("id", gonrin.uuid());
			}
						
			self.model.on("change", function () {

				self.trigger("change", {
					"oldData": self.model.previousAttributes(),
					"data": self.model.toJSON()
				});
			});
			self.applyBindings();
        },
        
    });
});