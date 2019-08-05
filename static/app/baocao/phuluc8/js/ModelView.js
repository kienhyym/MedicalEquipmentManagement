define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/baocao/phuluc8/tpl/model.html'),
		schema = require('json!schema/BaoCaoYTeLaoDongCuaCoSoLaoDongSchema.json');

	var CongTacThanhTraItemView = require('app/baocao/phuluc8/js/CongTacThanhTraView');
	return Gonrin.ModelView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "baocaoytelaodongcuacosolaodong",
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
				// {
				// 	field: "giangvienthuchienhuanluyenfield",
				// 	uicontrol: false,
				// 	itemView: GiangVienThucHienHuanLuyenItemView,
				// 	tools: [{
				// 		name: "create",
				// 		type: "button",
				// 		buttonClass: "btn btn-outline-success btn-sm",
				// 		label: "<span class='fa fa-plus'></span>",
				// 		command: "create"
				// 	}],
				// 	toolEl: "#add_row"
				// },
				{
					field: "congtacthanhtrafield",
					uicontrol: false,
					itemView: CongTacThanhTraItemView,
					tools: [{
						name: "create",
						type: "button",
						buttonClass: "btn btn-outline-success btn-sm",
						label: "<span class='fa fa-plus'></span>",
						command: "create"
					}],
					toolEl: "#add_row2"
				},
				// {
				// 	field: "bangdanhsachnguoilaodongduochuanluyenfield",
				// 	uicontrol: false,
				// 	itemView: BangDanhSachNguoiLaoDongDuocHuanLuyenItemView,
				// 	tools: [{
				// 		name: "create",
				// 		type: "button",
				// 		buttonClass: "btn btn-outline-success btn-sm",
				// 		label: "<span class='fa fa-plus'></span>",
				// 		command: "create"
				// 	}],
				// 	toolEl: "#add_row3"
				// },
				
				{
					field: "donvibaocao",
					cssClass: false,
				},
				{
					field: "so",
					cssClass: false,
				},
				{
					field: "noivietbaocao",
					cssClass: false,
				},
				{
					field: "ngay",
					cssClass: false,
				},
				{
					field: "thang",
					cssClass: false,
				},
				{
					field: "nam",
					cssClass: false,
				},
				{
					field: "kinhgui",
					cssClass: false,
				},
				{
					field: "baocao6thangnam",
					cssClass: false,
				},
				{
					field: "tencosolaodong",
					cssClass: false,
				},{
					field: "tructhuoctinhthanhpho",
					cssClass: false,
				},
				{
					field: "tructhuocbonganh",
					cssClass: false,
				},
				{
					field: "diachi",
					cssClass: false,
				},
				{
					field: "sodienthoai",
					cssClass: false,
				},
				{
					field: "email",
					cssClass: false,
				},
				{
					field: "fax",
					cssClass: false,
				},
				{
					field: "mathangsanxuatdichvuchinh",
					cssClass: false,
				},
				{
					field: "tongsonguoilaodong",
					cssClass: false,
				},
				{
					field: "songuoilaodongnu",
					cssClass: false,
				},
				{
					field: "solaodongtructiepsanxuat",
					cssClass: false,
				},
				{
					field: "solaodongnutructiepsanxuat",
					cssClass: false,
				},
				{
					field: "solaodonglamviecnguyhiem",
					cssClass: false,
				},
				{
					field: "solaodongnulamviecnguyhiem",
					cssClass: false,
				},
				{
					field: "laphosovesinhkhong",
					cssClass: false,
				},
				{
					field: "nguoilamcongtacytecokhong",
					cssClass: false,
				},
				{
					field: "tramphongkhambenhviencokhong",
					cssClass: false,
				},
				{
					field: "tramphongkhambenhvienneuco",
					cssClass: false,
				},
				{
					field: "thuehopdongvoidonviytecokhong",
					cssClass: false,
				},
				{
					field: "tencosodichvuneuco",
					cssClass: false,
				},

				{
					field: "diachidichvuneuco",
					cssClass: false,
				},

				{
					field: "sodienthoaidichvuneuco",
					cssClass: false,
				},

				{
					field: "noidungcungcapdichvuneuco",
					cssClass: false,
				},

				{
					field: "thoigiancuncapdichvu",
					cssClass: false,
				},

				{
					field: "lucluongsocuutainoilamviec",
					cssClass: false,
				},

				{
					field: "soluongnguoilaodongthamgiasocuu",
					cssClass: false,
				},

				{
					field: "soluongnguoilaodongnuthamgiasocuu",
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