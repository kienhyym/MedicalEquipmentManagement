define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/baocao2/phuluc1/tpl/model.html'),
	schema = require('json!schema/GiayGioiThieuSchema.json');

	return Gonrin.ModelView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "giaygioithieu",
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

							self.model.save(null, {
								success: function (model, respose, options) {
									// self.getApp().hideloading();
									self.getApp().notify("Lưu thông tin thành công");
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
					field: "gioitinh",
					uicontrol: "radio",
					textField: "name",
					valueField: "id",
					cssClassField: "cssClass",
					dataSource: [
						{ name: "nam", id: 1 },
						{ name: "nữ", id: 0 },
					
					],
                },
				{
					field: "so",
					cssClass: false,
				},
				{
					field: "noiviet",
					cssClass: false,
				},
				{
					field: "ngayviet",
					cssClass: false,
				},
				{
					field: "thangvieti",
					cssClass: false,
				},
				{
					field: "namviet",
					cssClass: false,
				},
				{
					field: "kinhgui",
					cssClass: false,
				},
				{
					field: "ten_coquan_gioithieu",
					cssClass: false,
				},
				{
					field: "gioithieu_ong_ba",
					cssClass: false,
				},
				{
					field: "gioitinh",
					cssClass: false,
				},
				{
					field: "sinhngay",
					cssClass: false,
				},
				{
					field: "sinhthang",
					cssClass: false,
				},
				{
					field: "sinhnam",
					cssClass: false,
				},
				{
					field: "so_cmtnn",
					cssClass: false,
				},

				{
					field: "so_cmtnn_capngay",
					cssClass: false,
				},
				{
					field: "so_cmtnn_capthang",
					cssClass: false,
				},
				{
					field: "so_cmtnn_capnam",
					cssClass: false,
				},
				{
					field: "so_cmtnn_captai",
					cssClass: false,
				},
				{
					field: "nghe_chuanbi_botri",
					cssClass: false,
				},
				{
					field: "yeuto_cohai",
					cssClass: false,
				},
				{
					field: "duoc_cu_den_cosokham_de",
					cssClass: false,
				},

			]
		},

		render: function () {
			var self = this;
			var id = this.getApp().getRouter().getParam("id");
			var width = $(window).width();
			console.log(width);
			if (width <= 414) {
				// $(window).resize(function(){
				self.$el.find("div").removeClass("flexboxer");
				self.$el.find(".input-mobile").css("width", "100%");
				// });
			}
			if (id) {
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