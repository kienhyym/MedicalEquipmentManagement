define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/hoso/HoSoBenhNgheNghiep/tpl/model.html'),
		schema = require('json!schema/HoSoBenhNgheNghiepSchema.json');

	var TomTatDienBienSucKhoeHangNamItemView = require('app/hoso/HoSoBenhNgheNghiep/js/TomTatDienBienSucKhoeHangNamItemView');


	return Gonrin.ModelView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "hosobenhnghenghiep",
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
							console.log(self.model)
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
					field: "ma_cancuoc_congdan",
					cssClass: false,
				},
				{
					field: "tuoinghe",
					cssClass: false,
				},
				{
					field: "nam",
					cssClass: false,
				},
				{
					field: "phan1_ngay_bacsyky",
					cssClass: false,
				},

				{
					field: "phan1_thang_bacsyky",
					cssClass: false,
				},
				{
					field: "phan1_nam_bacsyky",
					cssClass: false,
				},
				{
					field: "phan2_lankham_dinhky",
					cssClass: false,
				},

				{
					field: "phan2_bienban_giamdinh_ykhoa_so",
					cssClass: false,
				},
				{
					field: "phan2_bienban_giamdinh_ykhoa_ngay",
					cssClass: false,
				},
				{
					field: "phan2_bienban_giamdinh_ykhoa_thang",
					cssClass: false,
				},

				{
					field: "phan2_bienban_giamdinh_ykhoa_nam",
					cssClass: false,
				},

				{
					field: "phan2_sotrocapngay",
					cssClass: false,
				},
				{
					field: "phan2_sotrocapthang",
					cssClass: false,
				},
				{
					field: "phan2_sotrocapnam",
					cssClass: false,
				},

				{
					field: "phan2_bacsyky_ngay",
					cssClass: false,
				},
				{
					field: "phan2_bacsyky_thang",
					cssClass: false,
				},
				{
					field: "phan2_bacsyky_nam",
					cssClass: false,
				},
				{
					field: "phan3_thutruongdonvilaodongky_ngay",
					cssClass: false,
				},

				{
					field: "phan3_thutruongdonvilaodongky_thang",
					cssClass: false,
				},
				{
					field: "phan3_thutruongdonvilaodongky_nam",
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
				self.$el.find(".kinhgui").removeClass("justify-content-center d-flex");

				self.$el.find(".input-mobile").css("width", "100%");
				// });
			}
			if (id) {
				this.model.set('id', id);
				this.model.fetch({
					success: function (data) {

						self.applyBindings();
						self.$el.find(".input-phuluc2").removeClass("form-control");

						var dataTomTatDienBienSucKhoeHangNam = self.model.get("phan3_tomtatdienbien_suckhoe_hangnam");
						if (dataTomTatDienBienSucKhoeHangNam === null) {
							self.model.set("dataTomTatDienBienSucKhoeHangNam", []);
						}
						$.each(dataTomTatDienBienSucKhoeHangNam, function (idx, value) {

							self.render_TomTatSucKhoeHangNam(value);
						});
					},
					error: function () {
						self.getApp().notify("Get data Eror");
					},
					complete: function () {
						self.btn_add_row();
					}
				});
			} else {
				self.applyBindings();
				self.$el.find(".input-phuluc2").removeClass("form-control");

				self.btn_add_row();
			}
		},
		render_TomTatSucKhoeHangNam: function (data) {
			var self = this;
			var tomTatDienBienSucKhoeHangNamView = new TomTatDienBienSucKhoeHangNamItemView();

			if (!!data) {
				tomTatDienBienSucKhoeHangNamView.model.set(JSON.parse(JSON.stringify(data)));

			}
			tomTatDienBienSucKhoeHangNamView.render();
			self.$el.find("#tomtatdienbiensuckhoehangnam_grid").append(tomTatDienBienSucKhoeHangNamView.$el);
			tomTatDienBienSucKhoeHangNamView.on("change", function (event) {
				var dataTomTatDienBienSucKhoeHangNam = self.model.get("phan3_tomtatdienbien_suckhoe_hangnam");
				console.log(dataTomTatDienBienSucKhoeHangNam)
				if (dataTomTatDienBienSucKhoeHangNam === null) {
					dataTomTatDienBienSucKhoeHangNam = [];
					dataTomTatDienBienSucKhoeHangNam.push(event.data)
				}
				for (var i = 0; i < dataTomTatDienBienSucKhoeHangNam.length; i++) {
					if (dataTomTatDienBienSucKhoeHangNam[i].id == event.oldData.id) {
						dataTomTatDienBienSucKhoeHangNam[i] = event.data;
						break;
					}
				}
				console.log(dataTomTatDienBienSucKhoeHangNam)
				self.model.set("phan3_tomtatdienbien_suckhoe_hangnam", dataTomTatDienBienSucKhoeHangNam);
				self.applyBindings("phan3_tomtatdienbien_suckhoe_hangnam");
			})
			tomTatDienBienSucKhoeHangNamView.$el.find("#itemRemove").unbind("click").bind("click", function () {

				var dataTomTatDienBienSucKhoeHangNam = self.model.get("phan3_tomtatdienbien_suckhoe_hangnam");
				for (var i = 0; i < dataTomTatDienBienSucKhoeHangNam.length; i++) {
					if (dataTomTatDienBienSucKhoeHangNam[i].id === tomTatDienBienSucKhoeHangNamView.model.get("id")) {
						dataTomTatDienBienSucKhoeHangNam.splice(i, 1);
					}
				}
				self.model.set("phan3_tomtatdienbien_suckhoe_hangnam", dataTomTatDienBienSucKhoeHangNam);
				self.applyBinding("phan3_tomtatdienbien_suckhoe_hangnam");
				tomTatDienBienSucKhoeHangNamView.destroy();
				tomTatDienBienSucKhoeHangNamView.remove();
			});
		},
		btn_add_row: function () {
			var self = this;
			self.$el.find("#add_1_row").unbind('click').bind("click", function () {

				var data_default = {
					"id": gonrin.uuid(),
					"namkham": null,
					"tinhtrangcuabenh": null,
					"dieutri_tungay": null,
					"dieuduong_tungay": null,
					"phuchoi_chucnang": null,
					"tyle_suygiam_laodong": null,
					"ketqua_saudieutri_dieuduong": null,
					"ghichu": null
				}

				var dataTomTatDienBienSucKhoeHangNam = self.model.get("phan3_tomtatdienbien_suckhoe_hangnam");
				if (dataTomTatDienBienSucKhoeHangNam === null) {
					dataTomTatDienBienSucKhoeHangNam = [];
				}
				dataTomTatDienBienSucKhoeHangNam.push(data_default);
				self.model.set("phan3_tomtatdienbien_suckhoe_hangnam", dataTomTatDienBienSucKhoeHangNam)
				self.applyBindings("phan3_tomtatdienbien_suckhoe_hangnam");

				self.render_TomTatSucKhoeHangNam(data_default);
			})
		}



	});

});