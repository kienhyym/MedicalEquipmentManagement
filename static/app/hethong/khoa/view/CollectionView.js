define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/hethong/khoa/tpl/collection.html'),
		schema = require('json!schema/KhoaSchema.json');

	return Gonrin.CollectionView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "khoa",
		bindings: "data-bind",
		uiControl: {
			fields: [
				{ field: "ma", label: "Mã", width: 250 },
				{ field: "ten", label: "Tên", width: 250 },
			],
			onRowClick: function (event) {
				if (event.rowId) {
					var path = this.collectionName + '/model?id=' + event.rowId;
					this.getApp().getRouter().navigate(path);
				}
				//this.getApp().loading(); 
				//this.getApp().alert("haha");

			}
		},
		render: function () {
			this.applyBindings();
			return this;
		},
	});

});