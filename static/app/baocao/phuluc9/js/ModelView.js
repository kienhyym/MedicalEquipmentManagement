define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/baocao/phuluc9/tpl/model.html'),
		schema = require('json!schema/BaoCaoHoatDongYTeLaoDong6ThangNamTuyenHuyenSchema.json');
	var PhanLoaiCoSoLaoDongTheoNganhNgheVaQuyMoItemView = require('app/baocao/phuluc9/js/PhanLoaiCoSoLaoDongTheoNganhNgheVaQuyMoView');
	var PhanLoaiCoSoLaoDongCoYeuToCoHaiNguyHiemItemView = require('app/baocao/phuluc9/js/PhanLoaiCoSoLaoDongCoYeuToCoHaiNguyHiemView');
	var KetQuaQuanTracCacYeuToViKhiHauVaVatLyHoaHocItemView = require('app/baocao/phuluc9/js/KetQuaQuanTracCacYeuToViKhiHauVaVatLyHoaHocView');
	var KetQuaQuanTracCacYeuToBuiTrongMoiTruongLaoDongItemView = require('app/baocao/phuluc9/js/KetQuaQuanTracCacYeuToBuiTrongMoiTruongLaoDongView');
	var KetQuaDanhGiaCacYeuToTiepXucNgheNghiepItemView = require('app/baocao/phuluc9/js/KetQuaDanhGiaCacYeuToTiepXucNgheNghiepView');
	var TinhHinhNghiOmItemView = require('app/baocao/phuluc9/js/TinhHinhNghiOmView');
	var TongSoTruongHopMacCacLoaiBenhThongThuongItemView = require('app/baocao/phuluc9/js/TongSoTruongHopMacCacLoaiBenhThongThuongView');
	var CacTruongHopMacBenhNgheNghiepPhuLuc9ItemView = require('app/baocao/phuluc9/js/CacTruongHopMacBenhNgheNghiepPhuLuc9View');
	var CacTruongHopTaiNanLaoDongPhuLuc9ItemView = require('app/baocao/phuluc9/js/CacTruongHopTaiNanLaoDongPhuLuc9View');
	var KetQuaKhamPhatHienBenhNgheNghiepItemView = require('app/baocao/phuluc9/js/KetQuaKhamPhatHienBenhNgheNghiepView');
	var DanhSachNguoiMacBenhNgheNghiepItemView = require('app/baocao/phuluc9/js/DanhSachNguoiMacBenhNgheNghiepView');
	var TongHopTuBaoCaoCuaCacCoSoLaoDongItemView = require('app/baocao/phuluc9/js/TongHopTuBaoCaoCuaCacCoSoLaoDongView');
	var CacHoatDongDoDonViTrienKhaiItemView = require('app/baocao/phuluc9/js/CacHoatDongDoDonViTrienKhaiView');
	var PhanLoaiCacTruongHopTaiNanLaoDongTheoViecSoCuuItemView = require('app/baocao/phuluc9/js/PhanLoaiCacTruongHopTaiNanLaoDongTheoViecSoCuuView');
	var PhanLoaiCacTruongHopTaiNanLaoDongTheoNganhNgheItemView = require('app/baocao/phuluc9/js/PhanLoaiCacTruongHopTaiNanLaoDongTheoNganhNgheView');

	return Gonrin.ModelView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "baocaohoatdongytelaodong6thangnamtuyenhuyen",
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
					field: "phanloaicosolaodongtheonganhnghevaquymofield",
					uicontrol: false,
					itemView: PhanLoaiCoSoLaoDongTheoNganhNgheVaQuyMoItemView,
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
					field: "phanloaicosolaodongcoyeutocohainguyhiemfield",
					uicontrol: false,
					itemView: PhanLoaiCoSoLaoDongCoYeuToCoHaiNguyHiemItemView,
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
					field: "ketquaquantraccacyeutovikhihauvavatlyhoahocfield",
					uicontrol: false,
					itemView: KetQuaQuanTracCacYeuToViKhiHauVaVatLyHoaHocItemView,
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
					field: "ketquaquantraccacyeutobuitrongmoitruonglaodongfield",
					uicontrol: false,
					itemView: KetQuaQuanTracCacYeuToBuiTrongMoiTruongLaoDongItemView,
					tools: [{
						name: "create",
						type: "button",
						buttonClass: "btn btn-outline-success btn-sm",
						label: "<span class='fa fa-plus'></span>",
						command: "create"
					}],
					toolEl: "#add_row4"
				},
				{
					field: "ketquadanhgiacacyeutotiepxucnghenghiepfield",
					uicontrol: false,
					itemView: KetQuaDanhGiaCacYeuToTiepXucNgheNghiepItemView,
					tools: [{
						name: "create",
						type: "button",
						buttonClass: "btn btn-outline-success btn-sm",
						label: "<span class='fa fa-plus'></span>",
						command: "create"
					}],
					toolEl: "#add_row5"
				},
				{
					field: "tinhhinhnghiomfield",
					uicontrol: false,
					itemView: TinhHinhNghiOmItemView,
					tools: [{
						name: "create",
						type: "button",
						buttonClass: "btn btn-outline-success btn-sm",
						label: "<span class='fa fa-plus'></span>",
						command: "create"
					}],
					toolEl: "#add_row6"
				},
				{
					field: "tongsotruonghopmaccacloaibenhthongthuongfield",
					uicontrol: false,
					itemView: TongSoTruongHopMacCacLoaiBenhThongThuongItemView,
					tools: [{
						name: "create",
						type: "button",
						buttonClass: "btn btn-outline-success btn-sm",
						label: "<span class='fa fa-plus'></span>",
						command: "create"
					}],
					toolEl: "#add_row7"
				},
				{
					field: "cactruonghopmacbenhnghenghiepphuluc9field",
					uicontrol: false,
					itemView: CacTruongHopMacBenhNgheNghiepPhuLuc9ItemView,
					tools: [{
						name: "create",
						type: "button",
						buttonClass: "btn btn-outline-success btn-sm",
						label: "<span class='fa fa-plus'></span>",
						command: "create"
					}],
					toolEl: "#add_row8"
				},
				{
					field: "cactruonghoptainanlaodongphuluc9field",
					uicontrol: false,
					itemView: CacTruongHopTaiNanLaoDongPhuLuc9ItemView,
					tools: [{
						name: "create",
						type: "button",
						buttonClass: "btn btn-outline-success btn-sm",
						label: "<span class='fa fa-plus'></span>",
						command: "create"
					}],
					toolEl: "#add_row9"
				},
				{
					field: "ketquakhamphathienbenhnghenghiepfield",
					uicontrol: false,
					itemView: KetQuaKhamPhatHienBenhNgheNghiepItemView,
					tools: [{
						name: "create",
						type: "button",
						buttonClass: "btn btn-outline-success btn-sm",
						label: "<span class='fa fa-plus'></span>",
						command: "create"
					}],
					toolEl: "#add_row10"
				},
				{
					field: "danhsachnguoimacbenhnghenghiepfield",
					uicontrol: false,
					itemView: DanhSachNguoiMacBenhNgheNghiepItemView,
					tools: [{
						name: "create",
						type: "button",
						buttonClass: "btn btn-outline-success btn-sm",
						label: "<span class='fa fa-plus'></span>",
						command: "create"
					}],
					toolEl: "#add_row11"
				},
				{
					field: "tonghoptubaocaocuacaccosolaodongfield",
					uicontrol: false,
					itemView: TongHopTuBaoCaoCuaCacCoSoLaoDongItemView,
					tools: [{
						name: "create",
						type: "button",
						buttonClass: "btn btn-outline-success btn-sm",
						label: "<span class='fa fa-plus'></span>",
						command: "create"
					}],
					toolEl: "#add_row12"
				},
				{
					field: "cachoatdongdodonvitrienkhaifield",
					uicontrol: false,
					itemView: CacHoatDongDoDonViTrienKhaiItemView,
					tools: [{
						name: "create",
						type: "button",
						buttonClass: "btn btn-outline-success btn-sm",
						label: "<span class='fa fa-plus'></span>",
						command: "create"
					}],
					toolEl: "#add_row13"
				},
				{
					field: "phanloaicactruonghoptainanlaodongtheoviecsocuufield",
					uicontrol: false,
					itemView: PhanLoaiCacTruongHopTaiNanLaoDongTheoViecSoCuuItemView,
					tools: [{
						name: "create",
						type: "button",
						buttonClass: "btn btn-outline-success btn-sm",
						label: "<span class='fa fa-plus'></span>",
						command: "create"
					}],
					toolEl: "#add_row14"
				},
				{
					field: "phanloaicactruonghoptainanlaodongtheonganhnghefield",
					uicontrol: false,
					itemView: PhanLoaiCacTruongHopTaiNanLaoDongTheoNganhNgheItemView,
					tools: [{
						name: "create",
						type: "button",
						buttonClass: "btn btn-outline-success btn-sm",
						label: "<span class='fa fa-plus'></span>",
						command: "create"
					}],
					toolEl: "#add_row15"
				},
				{
					field: "soyte",
					cssClass: false,
				},
				{
					field: "trungtamyte",
					cssClass: false,
				},
				{
					field: "so",
					cssClass: false,
				},
				{
					field: "bc",
					cssClass: false,
				},
				{
					field: "noivietbaocao",
					cssClass: false,
				},
				{
					field: "ngayvietbaocao",
					cssClass: false,
				},
				{
					field: "thangvietbaocao",
					cssClass: false,
				},
				{
					field: "namvietbaocao",
					cssClass: false,
				},
				{
					field: "baocaonam",
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