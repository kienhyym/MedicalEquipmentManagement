define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');
	var template = require('text!app/user/tpl/model.html'),
		schema = require('json!schema/UserSchema.json');

	var RoleSelectView = require('app/role/js/SelectView');
	var DonViSelectView = require('app/donvi/js/SelectView');

	// var ConnectionChannelItemView = require('app/user/js/ConnectionChannelItemView');

	return Gonrin.ModelView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "user",
		bindings: "data-bind",
		state: null,
		tools: [
			{
				name: "defaultgr",
				type: "group",
				groupClass: "toolbar-group",
				buttons: [
					{
						name: "back",
						type: "button",
						buttonClass: "btn-default btn-sm",
						label: "TRANSLATE:BACK",
						command: function () {
							var self = this;
							Backbone.history.history.back();
						}
					},
					{
						name: "save",
						type: "button",
						buttonClass: "btn-success btn-sm",
						label: "TRANSLATE:SAVE",
						command: function () {
							var self = this;
							var currentUser = self.getApp().currentUser;

							
							self.model.save(null, {
								success: function (model, respose, options) {
									// $.ajax({
									// 	url: self.getApp().serviceURL + "/api/v1/role",
									// 	method: "GET",
									// 	data: { "data": JSON.stringify({ "order_by": [{ "field": "name", "direction": "desc" }], "page": 1, "results_per_page": 10000 }) },
									// 	contentType: "application/json",
									// 	success: function (data) {
									// 		var role_ma ;
									// 		console.log('model',self.model)
						
									// 		for (var i = 0; i < data.objects.length; i++) {
									// 			// console.log('item',data.objects[i].id)
									// 			// console.log('item2',currentUser.role_id)
									// 			if(data.objects[i].id == currentUser.role_id){
												
						
									// 				role_ma = data.objects[i].ma
									// 			self.model.set('role_ma',role_ma)
									// 			self.model.save(null, {
									// 				success: function (model, respose, options) {
									// 					self.getApp().notify("Lưu thông tin thành công");
									// 					self.getApp().getRouter().navigate(self.collectionName + "/collection");
									// 				},
									// 				error: function (xhr, status, error) {
									// 					try {
									// 						if (($.parseJSON(error.xhr.responseText).error_code) === "SESSION_EXPIRED") {
									// 							self.getApp().notify("Hết phiên làm việc, vui lòng đăng nhập lại!");
									// 							self.getApp().getRouter().navigate("login");
									// 						} else {
									// 							self.getApp().notify({ message: $.parseJSON(error.xhr.responseText).error_message }, { type: "danger", delay: 1000 });
									// 						}
									// 					}
									// 					catch (err) {
									// 						self.getApp().notify({ message: "Lưu thông tin không thành công" }, { type: "danger", delay: 1000 });
									// 					}
									// 				}
									// 			});
									// 			}
									// 		}
									// 	},
									// 	error: function (xhr, status, error) {
									// 		try {
									// 			if (($.parseJSON(error.xhr.responseText).error_code) === "SESSION_EXPIRED") {
									// 				self.getApp().notify("Hết phiên làm việc, vui lòng đăng nhập lại!");
									// 				self.getApp().getRouter().navigate("login");
									// 			} else {
									// 				self.getApp().notify({ message: $.parseJSON(error.xhr.responseText).error_message }, { type: "danger", delay: 1000 });
									// 			}
									// 		} catch (err) {
									// 			self.getApp().notify({ message: "Lỗi không lấy được dữ liệu" }, { type: "danger", delay: 1000 });
									// 		}
									// 	}
									// });
									self.getApp().notify("Lưu thông tin thành công");
									location.reload();

								},
								error: function (xhr, status, error) {
									try {
										if (($.parseJSON(error.xhr.responseText).error_code) === "SESSION_EXPIRED") {
											self.getApp().notify("Hết phiên làm việc, vui lòng đăng nhập lại!");
											self.getApp().getRouter().navigate("login");
										} else {
											self.getApp().notify({ message: $.parseJSON(error.xhr.responseText).error_message }, { type: "danger", delay: 1000 });
										}
									}
									catch (err) {
										self.getApp().notify({ message: "Lưu thông tin không thành công" }, { type: "danger", delay: 1000 });
									}
								}
							});
								
							
						}
					},
					{
						name: "delete",
						type: "button",
						buttonClass: "btn-danger btn-sm",
						label: "TRANSLATE:DELETE",
						visible: function () {
							return this.getApp().getRouter().getParam("id") !== null;
						},
						command: function () {
							var self = this;
							self.model.destroy({
								success: function (model, response) {
									self.getApp().notify('Xoá dữ liệu thành công');
									self.getApp().getRouter().navigate(self.collectionName + "/collection");
								},
								error: function (xhr, status, error) {
									try {
										if (($.parseJSON(error.xhr.responseText).error_code) === "SESSION_EXPIRED") {
											self.getApp().notify("Hết phiên làm việc, vui lòng đăng nhập lại!");
											self.getApp().getRouter().navigate("login");
										} else {
											self.getApp().notify({ message: $.parseJSON(error.xhr.responseText).error_message }, { type: "danger", delay: 1000 });
										}
									}
									catch (err) {
										self.getApp().notify({ message: "Xóa dữ liệu không thành công" }, { type: "danger", delay: 1000 });
									}
								}
							});
						}
					},
				],
			}],
		uiControl: {
			fields: [
				{
					field: "role",
					uicontrol: "ref",
					textField: "name",
					foreignRemoteField: "id",
					foreignField: "role_id",
					// selectionMode: "multiple",
					dataSource: RoleSelectView
				},
				{
					field: "donvi",
					uicontrol: "ref",
					textField: "ten",
					foreignRemoteField: "id",
					foreignField: "donvi_id",
					dataSource: DonViSelectView
				},
				{
					field: "type",
					uicontrol: "uploadfile",
					service: {
						url: "https://upstart.vn/services/api/files/upload?path=test"
					}
				},

				// {
				// 	field: "userconnectionchannels",
				// 	uicontrol: false,
				// 	itemView: ConnectionChannelItemView,

				// 	tools: [{
				// 		name: "create",
				// 		type: "button",
				// 		buttonClass: "btn btn-outline-success btn-sm",
				// 		label: "<span class='fa fa-plus'></span>",
				// 		command: "create"
				// 	}],
				// 	toolEl: "#add_connection_channel"
				// },
			]
		},

		render: function () {
			var self = this;
			var id = this.getApp().getRouter().getParam("id");
			var currentUser = self.getApp().currentUser;
			
			// console.log("currentUser.hasRole('worker')==", currentUser.hasRole('worker'));
			if (id) {
				this.model.set('id', id);
				this.model.fetch({
					success: function (data) {
						self.model.on("change",function (change) {
						var x = change.attributes.role.ma
						self.model.set('role_ma',x)
					})

						// console.log('data',data)
						self.applyBindings();
						// self.uploadFile();

					},
					error: function () {
						self.getApp().notify("Get data Eror");
					},
				});
			} else {
				self.applyBindings();
				// self.uploadFile();
			}
		},

		hasPassword: function () {
			var self = this;
			var hasPassword = self.model.get("password");
			console.log(hasPassword);
			self.model.set("password", hasPassword);
		},

	});
});