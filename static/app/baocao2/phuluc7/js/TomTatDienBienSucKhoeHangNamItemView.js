define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/baocao2/phuluc7/tpl/tomtatdienbiensuckhoehangnam.html'),
		schema = require('json!app/baocao2/phuluc7/schema/TomTatDienBienSucKhoeHangNamschema.json');

	return Gonrin.ItemView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		tagName: 'tr',
		bindings: "tomtatdienbiensuckhoe-bind",
		// collectionName: "tomtatdienbiensuckhoe",
		foreignRemoteField: "id",
		// foreignField: "hosobenhnghenghiep_id",
		
	
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