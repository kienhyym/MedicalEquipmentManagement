define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/baocao/phuluc2/tpl/model.html'),
		schema = require('json!schema/HSQLSucKhoeVaBenhTatNguoiLaoDongSchema.json');

	var BangQLSucKhoeTruocKhiBoTriViecLamItemView = require('app/baocao/phuluc2/js/BangQLSucKhoeTruocKhiBoTriViecLamView');

	return Gonrin.ModelView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "hsqlsuckhoevabenhtatnguoilaodong",
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
					field: "bangqlsuckhoetruockhibotrivieclamfield",
					uicontrol: false,
					itemView: BangQLSucKhoeTruocKhiBoTriViecLamItemView,
					tools: [{
						name: "create",
						type: "button",
						buttonClass: "btn btn-outline-success btn-sm",
						label: "<span class='fa fa-plus'></span>",
						command: "create"
					}],
					toolEl: "#add_row"
				},
				{
					field: "tencosolaodong",
					cssClass: false,
				},
				{
					field: "nganhchuquan",
					cssClass: false,
				},
				{
					field: "diachi",
					cssClass: false,
				},
				{
					field: "dienthoai",
					cssClass: false,
				},
				{
					field: "sofax",
					cssClass: false,
				},
				{
					field: "email",
					cssClass: false,
				},
				{
					field: "website",
					cssClass: false,
				},
				{
					field: "nguoilienhe",
					cssClass: false,
				},
				{
					field: "nguoilaphoso",
					cssClass: false,
				},
				{
					field: "nam",
					cssClass: false,
				},

			]
		},
		render: function () {
			var self = this;
			var id = this.getApp().getRouter().getParam("id");
			if (id) {
				this.model.set('id', id);
				this.model.fetch({
					success: function (data) {
						self.applyBindings();
						self.tinhtong();
						self.checking();
					},
					error: function () {
						self.getApp().notify("Get data Eror");
					},
				});
			} else {
				self.applyBindings();
				self.checking();
				self.tinhtong();

			}
		},
		checking: function () {
			const self = this;
			var phanloaisuckhoe1 = self.getApp().getRouter().getParam("phanloaisuckhoeloai1");
			console.log(phanloaisuckhoe1);
			self.$el.find("#phanloaisuckhoe1").unbind("click").bind("click", function () {
				// console.log('x1');
				if ($(this).is(":checked")) {
					console.log('x1');
					self.$el.find("#phanloaisuckhoe1").val('');
					// self.model.set("#phanloaisuckhoe1", true);
				} else {
					console.log('x2');
					self.model.set("#phanloaisuckhoe1", false);
				}
			})
			var phanloaisuckhoe2 = self.getApp().getRouter().getParam("phanloaisuckhoeloai2");
			console.log(phanloaisuckhoe2);
			self.$el.find("#phanloaisuckhoe2").unbind("click").bind("click", function () {
				// console.log('x1');
				if ($(this).is(":checked")) {
					console.log('x3');
					self.$el.find("#phanloaisuckhoe2").val('2');
					// self.model.set("#phanloaisuckhoe1", true);
				} else {
					console.log('x4');
					self.model.set("#phanloaisuckhoe2", false);
				}
			})

		},
		tinhtong: function () {
			const self = this;

			var arrx = [];
			arrx = lodash(self.$el.find("tr td #x"));
			arrx.forEach(function (item, index, array) {
				var indexx = index;
				var itemx = item;
				var arry = [];
				arry = lodash(self.$el.find("tr td #y"));
				arry.forEach(function (item, index, array) {
					if (indexx == index) {
						var itemy = item;
						var arrtong = [];
						arrtong = lodash(self.$el.find("tr td #tong"));
						arrtong.forEach(function (item, index, array) {
							if (indexx == index) {
								item.value = parseInt(itemx.value) + parseInt(itemy.value);
							}
						});
					}
				});
			});

		}

	});

});