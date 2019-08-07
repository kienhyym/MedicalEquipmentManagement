define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/baocao/phuluc10/tpl/model.html'),
		schema = require('json!schema/BaoCaoHoatDongYTeLaoDong6ThangNamSchema.json');

	var TinhHinhThucHienVanBanPhapQuyItemView = require('app/baocao/phuluc10/js/TinhHinhThucHienVanBanPhapQuyView');
	var PhanLoaiCacCoSoLaoDongTheoNganhNgheVaQuyMoItemView = require('app/baocao/phuluc10/js/PhanLoaiCoSoLaoDongTheoNganhNgheVaQuyMoView');
	var PhanLoaiCoSoLaoDongYTCHNHItemView = require('app/baocao/phuluc10/js/PhanLoaiCoSoLaoDongYTCHNHView');
	var KetQuaQuanTracCacYeuToViKhiHauVaVatLyHoaHocTrongMTItemView = require('app/baocao/phuluc10/js/KetQuaQuanTracCacYeuToViKhiHauVaVatLyHoaHocTrongMTView');
	var KetQuaQuanTracCacYeuToBuiTrongMoiTruongLaoDongPhuLuc10ItemView = require('app/baocao/phuluc10/js/KetQuaQuanTracCacYeuToBuiTrongMoiTruongLaoDongPhuLuc10View');
	var KetQuaDanhGiaCacYeuToTiepXucNgheNghiepVaYeuToTamLyItemView = require('app/baocao/phuluc10/js/KetQuaDanhGiaCacYeuToTiepXucNgheNghiepVaYeuToTamLyView');

	var TinhHinhNghiOmPhuLuc10ItemView = require('app/baocao/phuluc10/js/TinhHinhNghiOmPhuLuc10View');
	var TongSoTruongHopMacCacLoaiBenhThongThuongPhucluc10ItemView = require('app/baocao/phuluc10/js/TongSoTruongHopMacCacLoaiBenhThongThuongPhucluc10View');
	var CacTruongHopMacBenhNgheNghiepPhuLuc10ItemView = require('app/baocao/phuluc10/js/CacTruongHopMacBenhNgheNghiepPhuLuc10View');
	var CacTruongHopTaiNanLaoDongPhuLuc10ItemView = require('app/baocao/phuluc10/js/CacTruongHopTaiNanLaoDongPhuLuc10View');

	var CacHoatDongDoDonViTrienKhaiPhuLuc10ItemView = require('app/baocao/phuluc10/js/CacHoatDongDoDonViTrienKhaiPhuLuc10View');
	var DanhSachCacTruongHopTaiNanLaoDongDuocKhamTaiCSItemView = require('app/baocao/phuluc10/js/DanhSachCacTruongHopTaiNanLaoDongDuocKhamTaiCSView');
	var DanhSachNguoiMacBenhNgheNghiepPhuLuc10ItemView = require('app/baocao/phuluc10/js/DanhSachNguoiMacBenhNgheNghiepPhuLuc10View');
	var KetQuaKhamPhatHienBenhNgheNghiepPhuLuc10ItemView = require('app/baocao/phuluc10/js/KetQuaKhamPhatHienBenhNgheNghiepPhuLuc10View');
	var KinhPhiChiTraPhuLuc10ItemView = require('app/baocao/phuluc10/js/KinhPhiChiTraPhuLuc10View');
	var PhanLoaiCacTruongHopTaiNanLaoDongTheoNganhNghePhuLuc10ItemView = require('app/baocao/phuluc10/js/PhanLoaiCacTruongHopTaiNanLaoDongTheoNganhNghePhuLuc10View');
	var PhanLoaiCacTruongHopTaiNanLaoDongTheoViecSoCuuPhuLuc10ItemView = require('app/baocao/phuluc10/js/PhanLoaiCacTruongHopTaiNanLaoDongTheoViecSoCuuPhuLuc10View');
	var TongHopTuBaoCaoCuaCacCoSoLaoDongPhuLuc10ItemView = require('app/baocao/phuluc10/js/TongHopTuBaoCaoCuaCacCoSoLaoDongPhuLuc10View');
	


	return Gonrin.ModelView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "baocaohoatdongytelaodong6thangnam",
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
					field: "tinhhinhthuchienvanbanphapquyfield",
					uicontrol: false,
					itemView: TinhHinhThucHienVanBanPhapQuyItemView,
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
					field: "phanloaicaccosolaodongtheonganhnghevaquymofield",
					uicontrol: false,
					itemView: PhanLoaiCacCoSoLaoDongTheoNganhNgheVaQuyMoItemView,
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
					field: "phanloaicosolaodongytchnhfield",
					uicontrol: false,
					itemView: PhanLoaiCoSoLaoDongYTCHNHItemView,
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
					field: "ketquaquantraccacyeutovikhihauvavatlyhoahoctrongmtfield",
					uicontrol: false,
					itemView: KetQuaQuanTracCacYeuToViKhiHauVaVatLyHoaHocTrongMTItemView,
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
					field: "ketquaquantraccacyeutobuitrongmoitruonglaodongphuluc10field",
					uicontrol: false,
					itemView: KetQuaQuanTracCacYeuToBuiTrongMoiTruongLaoDongPhuLuc10ItemView,
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
					field: "ketquadanhgiacacyeutotiepxucnghenghiepvayeutotamlyfield",
					uicontrol: false,
					itemView: KetQuaDanhGiaCacYeuToTiepXucNgheNghiepVaYeuToTamLyItemView,
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
					field: "tinhhinhnghiomphuluc10field",
					uicontrol: false,
					itemView: TinhHinhNghiOmPhuLuc10ItemView,
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
					field: "tongsotruonghopmaccacloaibenhthongthuongphuluc10field",
					uicontrol: false,
					itemView: TongSoTruongHopMacCacLoaiBenhThongThuongPhucluc10ItemView,
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
					field: "cactruonghopmacbenhnghenghiepphuluc10field",
					uicontrol: false,
					itemView: CacTruongHopMacBenhNgheNghiepPhuLuc10ItemView,
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
					field: "cactruonghoptainanlaodongphuluc10field",
					uicontrol: false,
					itemView: CacTruongHopTaiNanLaoDongPhuLuc10ItemView,
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
					field: "ketquakhamphathienbenhnghenghiepphuluc10field",
					uicontrol: false,
					itemView: KetQuaKhamPhatHienBenhNgheNghiepPhuLuc10ItemView,
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
					field: "danhsachnguoimacbenhnghenghiepphuluc10field",
					uicontrol: false,
					itemView: DanhSachNguoiMacBenhNgheNghiepPhuLuc10ItemView,
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
					field: "tonghoptubaocaocuacaccosolaodongphuluc10field",
					uicontrol: false,
					itemView: TongHopTuBaoCaoCuaCacCoSoLaoDongPhuLuc10ItemView,
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
					field: "cachoatdongdodonvitrienkhaiphuluc10field",
					uicontrol: false,
					itemView: CacHoatDongDoDonViTrienKhaiPhuLuc10ItemView,
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
					field: "danhsachcactruonghoptainanlaodongduockhamtaicsfield",
					uicontrol: false,
					itemView: DanhSachCacTruongHopTaiNanLaoDongDuocKhamTaiCSItemView,
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
					field: "phanloaicactruonghoptainanlaodongtheoviecsocuuphuluc10field",
					uicontrol: false,
					itemView: PhanLoaiCacTruongHopTaiNanLaoDongTheoViecSoCuuPhuLuc10ItemView,
					tools: [{
						name: "create",
						type: "button",
						buttonClass: "btn btn-outline-success btn-sm",
						label: "<span class='fa fa-plus'></span>",
						command: "create"
					}],
					toolEl: "#add_row16"
				},
				{
					field: "phanloaicactruonghoptainanlaodongtheonganhnghephuluc10field",
					uicontrol: false,
					itemView: PhanLoaiCacTruongHopTaiNanLaoDongTheoNganhNghePhuLuc10ItemView,
					tools: [{
						name: "create",
						type: "button",
						buttonClass: "btn btn-outline-success btn-sm",
						label: "<span class='fa fa-plus'></span>",
						command: "create"
					}],
					toolEl: "#add_row17"
				},
				{
					field: "kinhphichitraphuluc10field",
					uicontrol: false,
					itemView: KinhPhiChiTraPhuLuc10ItemView,
					tools: [{
						name: "create",
						type: "button",
						buttonClass: "btn btn-outline-success btn-sm",
						label: "<span class='fa fa-plus'></span>",
						command: "create"
					}],
					toolEl: "#add_row18"
				},
				{
					field: "donvibaocao",
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
					field: "giamdinhnghenghiep",
					cssClass: false,
				},
				{
					field: "socosoduocquantracmoitruonglaodong",
					cssClass: false,
				},
				{
					field: "tongsocosobaocao",
					cssClass: false,
				},
				{
					field: "socosolaodongcokhamsuckhoedinhky",
					cssClass: false,
				},
				{
					field: "socosolaodongcokhamsuckhoedinhkytongso",
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