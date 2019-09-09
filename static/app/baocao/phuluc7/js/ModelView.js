define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/baocao/phuluc7/tpl/model.html'),
		schema = require('json!schema/SoTheoDoiCongTacHuanLuyenSoCuuCapCuuTaiNoiLamViecSchema.json');

	var GiangVienThucHienHuanLuyenItemView = require('app/baocao/phuluc7/js/GiangVienThucHienHuanLuyenView');
	var BangDanhSachThanhVienLucLuongSoCuuDuocHuanLuyenItemView = require('app/baocao/phuluc7/js/BangDanhSachThanhVienLucLuongSoCuuDuocHuanLuyenView');
	var BangDanhSachNguoiLaoDongDuocHuanLuyenItemView = require('app/baocao/phuluc7/js/BangDanhSachNguoiLaoDongDuocHuanLuyenView');
	return Gonrin.ModelView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "sotheodoicongtachuanluyensocuucapcuutainoilamviec",
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
					field: "giangvienthuchienhuanluyenfield",
					uicontrol: false,
					itemView: GiangVienThucHienHuanLuyenItemView,
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
					field: "bangdanhsachthanhvienlucluongsocuuduochuanluyenfield",
					uicontrol: false,
					itemView: BangDanhSachThanhVienLucLuongSoCuuDuocHuanLuyenItemView,
					tools: [{
						name: "create",
						type: "button",
						buttonClass: "btn btn-outline-success btn-sm",
						label: "<span class='fa fa-plus'></span>",
						command: "create"
					}],
					toolEl: "#add_row2"
				},
				{
					field: "bangdanhsachnguoilaodongduochuanluyenfield",
					uicontrol: false,
					itemView: BangDanhSachNguoiLaoDongDuocHuanLuyenItemView,
					tools: [{
						name: "create",
						type: "button",
						buttonClass: "btn btn-outline-success btn-sm",
						label: "<span class='fa fa-plus'></span>",
						command: "create"
					}],
					toolEl: "#add_row3"
				},
				
				{
					field: "nam",
					cssClass: false,
				},
				{
					field: "tencosohuanluyen",
					cssClass: false,
				},
				{
					field: "thoigianthuchienhuanluyen",
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
						self.stt_DanhSachNguoiLaoDongDuocHuanLuyen();
						self.stt_DanhSachLucLuongDuocHuanLuyen();

					},
					error: function () {
						self.getApp().notify("Get data Eror");
					},
				});
			} else {
				self.applyBindings();
				self.stt_DanhSachNguoiLaoDongDuocHuanLuyen();
				self.stt_DanhSachLucLuongDuocHuanLuyen();
			}
		},
		stt_DanhSachNguoiLaoDongDuocHuanLuyen:function(){
			var self =this;
			var arr = [];
			arr = lodash(self.$el.find("tr td #stt_dsnld_duochuanluyen"));
			arr.forEach(function (item, index, array) {
				item.value=++index;
			});	
		},
		stt_DanhSachLucLuongDuocHuanLuyen:function(){
			var self =this;
			var arr = [];
			arr = lodash(self.$el.find("tr td #stt_lucluongsocuuduochuanluyen"));
			arr.forEach(function (item, index, array) {
				item.value=++index;
			});	
		}
		

	});

});