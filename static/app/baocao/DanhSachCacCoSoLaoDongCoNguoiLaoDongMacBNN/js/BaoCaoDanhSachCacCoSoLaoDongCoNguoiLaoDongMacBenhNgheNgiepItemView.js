define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/baocao/DanhSachCacCoSoLaoDongCoNguoiLaoDongMacBNN/tpl/baocaodanhsachcaccosolaodongconguoilaodongmacbenhlaodong.html'),
		schema = require('json!app/baocao/DanhSachCacCoSoLaoDongCoNguoiLaoDongMacBNN/schema/DanhSachCoSoLaoDongCoNguoiMacBNNSchema.json');

	return Gonrin.ItemView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		tagName: 'tr',
		bindings: "danhsachcosolaodongconguoimacbnn-bind",
		
	
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