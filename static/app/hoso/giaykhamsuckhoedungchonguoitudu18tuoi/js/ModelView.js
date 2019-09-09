define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/hoso/giaykhamsuckhoedungchonguoitudu18tuoi/tpl/model.html'),
		schema = require('json!schema/GiayKhamSucKhoeDungChoNguoiTudu18TuoiSchema.json');

	return Gonrin.ModelView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "giaykhamsuckhoedungchonguoitudu18tuoi",
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
						field: "tuoi",
						cssClass: false,
					},
					{
						field: "hochieu_capngay",
						cssClass: false,
					},
					{
						field: "nguoidenghikham_kyngay",
						cssClass: false,
					},

						{
						field: "theluc_chieucao",
						cssClass: false,
					},
					{
						field: "theluc_cannang",
						cssClass: false,
					},
					{
						field: "theluc_chiso_bmi",
						cssClass: false,
					},



					{
						field: "theluc_mach",
						cssClass: false,
					},
					{
						field: "theluc_huyetap",
						cssClass: false,
					},
					{
						field: "mat_khongkinh_phai",
						cssClass: false,
					},


					{
						field: "mat_khongkinh_trai",
						cssClass: false,
					},
					{
						field: "mat_cokinh_phai",
						cssClass: false,
					},
					{
						field: "mat_cokinh_trai",
						cssClass: false,
					},

					{
						field: "taimuihong_taitrai_noithuong",
						cssClass: false,
					},
					{
						field: "taimuihong_taitrai_noitham",
						cssClass: false,
					},
					{
						field: "taimuihong_taiphai_noithuong",
						cssClass: false,
					},
					{
						field: "taimuihong_taiphai_noitham",
						cssClass: false,
					},

					{
						field: "nguoiketluan_kyngay",
						cssClass: false,
					},


				]
		},

		render: function () {
			var self = this;
			var id = this.getApp().getRouter().getParam("id");
			var width = $(window).width();
			console.log(width);
			if (width <= 378) {
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