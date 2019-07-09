define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/user/tpl/model.html'),
		schema = require('json!schema/UserSchema.json');

	var RoleSelectView = require('app/role/js/SelectView');
	return Gonrin.ModelView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "user",
		uiControl:{
			fields:[
				{
					field: "roles",
					uicontrol: "ref",
					textField: "name",
					foreignRemoteField: "id",
					foreignField: "role_id",
					selectionMode: "multiple",
					dataSource: RoleSelectView
				}
			]
		},
		
		render: function () {
			var self = this;
			var id = this.getApp().getRouter().getParam("id");
			if (id) {
				//progresbar quay quay
				this.model.set('id', id);
				this.model.fetch({
					success: function (data) {

						self.applyBindings();
					},
					error: function () {
						self.getApp().notify("Get data Eror");
					},
				});
			} else {
				self.applyBindings();
			}

		},

	});

});