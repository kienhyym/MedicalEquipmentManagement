define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/chungtu/dutoansuachuanam/tpl/dutoansuachua.html'),
		schema = require('json!schema/DuToanSuaChuaSchema.json');

	return Gonrin.ItemView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		tagName: 'tr',
		bindings: "dutoansuachua-bind",
		// uiControl: {
		// 	fields: [
				
		// 		{
		// 			field: "thietbi",
		// 			uicontrol: "ref",
		// 			textField: "ten",
		// 			foreignRemoteField: "id",
		// 			foreignField: "thietbi_id",
		// 			dataSource: ThietBiSelectView
		// 		},
		// 	]
		// },
	
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