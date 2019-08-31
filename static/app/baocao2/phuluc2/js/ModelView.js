define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/baocao2/phuluc2/tpl/model.html'),
	schema = require('json!schema/PhieuKhamSucKhoeTruocKhiBoTriLamViecSchema.json');

	return Gonrin.ModelView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "phieukhamsuckhoetruockhibotrilamviec",
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
					field: "hovaten",
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
					field: "lydokham",
					cssClass: false,
				},
				{
					field: "tiensu_benhtat",
					cssClass: false,
				},
				{
					field: "yeuto_tiepxuc_benhtat",
					cssClass: false,
				},
				{
					field: "theluc_ngay",
					cssClass: false,
				},
				{
					field: "theluc_thang",
					cssClass: false,
				},
				{
					field: "theluc_nam",
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
					field: "theluc_huyetap",
					cssClass: false,
				},
				{
					field: "theluc_mach",
					cssClass: false,
				},
				{
					field: "khamnoikhoa_ngay",
					cssClass: false,
				},
				{
					field: "khamnoikhoa_thang",
					cssClass: false,
				},
				{
					field: "khamnoikhoa_nam",
					cssClass: false,
				},


				{
					field: "mat_ngay",
					cssClass: false,
				},
				{
					field: "mat_thang",
					cssClass: false,
				},
				{
					field: "mat_nam",
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
					field: "mat_cacbenh",
					cssClass: false,
				},


				{
					field: "taimuihong_ngay",
					cssClass: false,
				},
				{
					field: "taimuihong_thang",
					cssClass: false,
				},
				{
					field: "taimuihong_nam",
					cssClass: false,
				},
				{
					field: "taimuihong_taitrai_noithuong",
					cssClass: false,
				},
				{
					field: "taimuihong_taiphai_noithuong",
					cssClass: false,
				},
				{
					field: "taimuihong_taitrai_noitham",
					cssClass: false,
				},
				{
					field: "taimuihong_thaiphai_noitham",
					cssClass: false,
				},
				{
					field: "taimuihong_cacbenh",
					cssClass: false,
				},
				{
					field: "ranghammat_ngay",
					cssClass: false,
				},
				{
					field: "ranghammat_thang",
					cssClass: false,
				},
				{
					field: "ranghammat_nam",
					cssClass: false,
				},
				{
					field: "ranghammat_hamtren",
					cssClass: false,
				},{
					field: "ranghammat_hamduoi",
					cssClass: false,
				},
				{
					field: "ranghammat_cacbenh",
					cssClass: false,
				},
				{
					field: "dalieu_ngay",
					cssClass: false,
				},
				{
					field: "dalieu_thang",
					cssClass: false,
				},
				{
					field: "dalieu_nam",
					cssClass: false,
				},
				{
					field: "khamsanphukhoa_ngay",
					cssClass: false,
				},
				{
					field: "khamsanphukhoa_thang",
					cssClass: false,
				},
				{
					field: "khamsanphukhoa_nam",
					cssClass: false,
				},
				{
					field: "khamngoaikhoa_ngay",
					cssClass: false,
				},
				{
					field: "khamngoaikhoa_thang",
					cssClass: false,
				},

				{
					field: "khamngoaikhoa_nam",
					cssClass: false,
				},

				{
					field: "kham_phathien_benh_lamsang",
					cssClass: false,
				},
				{
					field: "kham_phathien_benh_canlamsang",
					cssClass: false,
				},
				{
					field: "ketluan_phanloai_suckhoe",
					cssClass: false,
				},
				{
					field: "ketluan_cacbenh",
					cssClass: false,
				},
				{
					field: "ketluan_du_suckhoe_khong",
					cssClass: false,
				},
				{
					field: "noiky",
					cssClass: false,
				},
				{
					field: "ngayky",
					cssClass: false,
				},
				{
					field: "thangky",
					cssClass: false,
				},
				{
					field: "namky",
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