define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/hoso/SoKhamDInhKyNguoiLaiXeOTo/tpl/tiensubenhtatbanthan.html'),
		schema = require('json!app/hoso/SoKhamDInhKyNguoiLaiXeOTo/schema/TienSuBenhTatBanThanSchema.json');

	return Gonrin.ItemView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		tagName: 'tr',
		bindings: "tiensubenhtatbanthan-bind",
		
	
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