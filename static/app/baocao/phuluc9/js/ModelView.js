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
	var KinhPhiChiTraItemView = require('app/baocao/phuluc9/js/KinhPhiChiTraView');

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
					field: "kinhphichitrafield",
					uicontrol: false,
					itemView: KinhPhiChiTraItemView,
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
				{
					field: "tongsocotren200nld",
					cssClass: false,
				},
				{
					field: "sotructhuocbonganhtren200nld",
					cssClass: false,
				},
				{
					field: "socosocoyeutocohainguyhiemtren200nld",
					cssClass: false,
				},
				{
					field: "songuoilaodongtaitatcacosotren200nld",
					cssClass: false,
				},
				{
					field: "songuoilaodongnutaitatcacosotren200nld",
					cssClass: false,
				},
				{
					field: "songuoilaodongtaitatcacosocoyeutocohaitren200nld",
					cssClass: false,
				},
				{
					field: "songuoilaodongnutaitatcacosocoyeutocohaitren200nld",
					cssClass: false,
				},
				{
					field: "songuoilaodongtaitatcacosotiepxuctructieptren200nld",
					cssClass: false,
				},
				{
					field: "songuoilaodongnutaitatcacosotiepxuctructieptren200nld",
					cssClass: false,
				},
				{
					field: "tongsocotren50duoi200ndl",
					cssClass: false,
				},
				{
					field: "sotructhuocbonganhtren50duoi200ndl",
					cssClass: false,
				},
				{
					field: "socosocoyeutocohainguyhiemtren50duoi200ndl",
					cssClass: false,
				},
				{
					field: "songuoilaodongtaitatcacosotren50duoi200ndl",
					cssClass: false,
				},
				{
					field: "songuoilaodongnutaitatcacosotren50duoi200ndl",
					cssClass: false,
				},
				{
					field: "songuoilaodongtaitatcacosocoyeutocohaitren50duoi200ndl",
					cssClass: false,
				},
				{
					field: "songuoilaodongnutaitatcacosocoyeutocohaitren50duoi200ndl",
					cssClass: false,
				},
				{
					field: "songuoilaodongtaitatcacosotiepxuctructieptren50duoi200ndl",
					cssClass: false,
				},
				{
					field: "songuoilaodongnutaitatcacosotiepxuctructieptren50duoi200ndl",
					cssClass: false,
				},

				{
					field: "tongsocoduoi50nld",
					cssClass: false,
				},


				{
					field: "sotructhuocbonganhduoi50nld",
					cssClass: false,
				},


				{
					field: "socosocoyeutocohainguyhiemduoi50nld",
					cssClass: false,
				},
				{
					field: "songuoilaodongtaitatcacosoduoi50nld",
					cssClass: false,
				},
				{
					field: "songuoilaodongnutaitatcacosoduoi50nld",
					cssClass: false,
				},

				{
					field: "songuoilaodongtaitatcacosocoyeutocohaiduoi50nld",
					cssClass: false,
				},


				{
					field: "songuoilaodongnutaitatcacosocoyeutocohaiduoi50nld",
					cssClass: false,
				},


				{
					field: "songuoilaodongtaitatcacosotiepxuctructiepduoi50nld",
					cssClass: false,
				}, {
					field: "songuoilaodongnutaitatcacosotiepxuctructiepduoi50nld",
					cssClass: false,
				},
				{
					field: "tongsocosothuocphamviquanly",
					cssClass: false,
				},

				{
					field: "socosolaphosovesinhlaodongthuocphamviquanly",
					cssClass: false,
				},


				{
					field: "tongsocosocoyeutocohai",
					cssClass: false,
				},


				{
					field: "socosolaphosovesinhlaodongcoyeutocohai",
					cssClass: false,
				}, {
					field: "loaicososanxuattren50duoi200ndl",
					cssClass: false,
				},
				{
					field: "hinhthuccotramytetren50duoi200ndl",
					cssClass: false,
				},

				{
					field: "hinhthuccobenhvientren50duoi200ndl",
					cssClass: false,
				},


				{
					field: "hinhthuccophongkhamtren50duoi200ndl",
					cssClass: false,
				},


				{
					field: "hinhthuckhactren50duoi200ndl",
					cssClass: false,
				},
				{
					field: "hopdongvoicosokhambenhtren50duoi200ndl",
					cssClass: false,
				},
				{
					field: "loaicososanxuattren200nld",
					cssClass: false,
				},
				{
					field: "hinhthuccotramytetren200nld",
					cssClass: false,
				},
				{
					field: "hinhthuccobenhvientren200nld",
					cssClass: false,
				},
				{
					field: "hinhthuccophongkhamtren200nld",
					cssClass: false,
				},
				{
					field: "hinhthuckhactren200nld",
					cssClass: false,
				}, {
					field: "hopdongvoicosokhambenhtren200nld",
					cssClass: false,
				},
				{
					field: "loaicososanxuatduoi50nld",
					cssClass: false,
				},
				{
					field: "hinhthuccotramyteduoi50nld",
					cssClass: false,
				},
				{
					field: "hinhthuccobenhvienduoi50nld",
					cssClass: false,
				},
				{
					field: "hinhthuccophongkhamduoi50nld",
					cssClass: false,
				},
				{
					field: "hinhthuckhacduoi50nld",
					cssClass: false,
				},
				{
					field: "hopdongvoicosokhambenhduoi50nld",
					cssClass: false,
				},
				{
					field: "songuoilamcongtacytetren50duoi200ndl",
					cssClass: false,
				}, {
					field: "trinhdobacsitren50duoi200ndl",
					cssClass: false,
				},
				{
					field: "trinhdobacsiduphongtren50duoi200ndl",
					cssClass: false,
				},
				{
					field: "trinhdocunhantren50duoi200ndl",
					cssClass: false,
				},
				{
					field: "trinhdoysytren50duoi200ndl",
					cssClass: false,
				},
				{
					field: "trinhdodieuduongtren50duoi200ndl",
					cssClass: false,
				},
				{
					field: "trinhdohosinhvientren50duoi200ndl",
					cssClass: false,
				},
				{
					field: "songuoilamcongtacytetren200nld",
					cssClass: false,
				},
				{
					field: "trinhdobacsitren200nld",
					cssClass: false,
				}, {
					field: "trinhdobacsiduphongtren200nld",
					cssClass: false,
				},
				{
					field: "trinhdocunhantren200nld",
					cssClass: false,
				},
				{
					field: "trinhdoysytren200nld",
					cssClass: false,
				}, {
					field: "natrinhdodieuduongtren200nldm",
					cssClass: false,
				},

				{
					field: "trinhdohosinhvientren200nld",
					cssClass: false,
				},
				{
					field: "songuoilamcongtacyteduoi50nld",
					cssClass: false,
				}, {
					field: "trinhdobacsiduoi50nld",
					cssClass: false,
				},

				{
					field: "trinhdobacsiduphongduoi50nld",
					cssClass: false,
				},
				{
					field: "trinhdocunhanduoi50nld",
					cssClass: false,
				}, {
					field: "trinhdoysyduoi50nld",
					cssClass: false,
				},

				{
					field: "trinhdodieuduongduoi50nld",
					cssClass: false,
				},
				{
					field: "trinhdohosinhvienduoi50nld",
					cssClass: false,
				}, {
					field: "tongsonguoithamgiasocuutren50duoi200ndl",
					cssClass: false,
				},

				{
					field: "tongsonguoinuthamgiasocuutren50duoi200ndl",
					cssClass: false,
				},
				{
					field: "tongsonguoithamgiasocuutren200nld",
					cssClass: false,
				},
				{
					field: "tongsonguoinuthamgiasocuutren200nld",
					cssClass: false,
				},
				{
					field: "tongsonguoithamgiasocuuduoi50nld",
					cssClass: false,
				},
				{
					field: "tongsonguoinuthamgiasocuuduoi50nld",
					cssClass: false,
				},
				{
					field: "songuoilaodongduocsocuucapcuu",
					cssClass: false,
				},
				{
					field: "songuoilaodongduocdieutrilandautrongnam",
					cssClass: false,
				},
				{
					field: "songuoibitainanlaodongdencosokhambenh",
					cssClass: false,
				},
				{
					field: "socosolaodongthamgiagiaoban",
					cssClass: false,
				},
				{
					field: "sotramytethamgiagiaoban",
					cssClass: false,
				},
				{
					field: "tongsocosolaodongduocthanhtra",
					cssClass: false,
				},
				{
					field: "socosolaodongcoyeutocohaiduocthanhtra",
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
						self.registerFunction();

					},
					error: function () {
						self.getApp().notify("Get data Eror");
					},
				});
			} else {
				self.applyBindings();
				self.registerFunction();

			}
		},
		registerFunction: function () {
			var self = this;
			self.stt_PhanLoaiTatCaCoSoTrongPhamViQuanLy();
			self.stt_PhanLoaiCoSoCoYeuToCoHai();
			self.stt_KetQuaQuanTracKhiHau();
			self.stt_KetQuaQuanTracBui();
			self.stt_KetQuaDanhGiaYeuToTamSinhLy();
			self.stt_TinhHinhNghiOm();
			self.stt_TruongHopMacBenhThongThuong();
			self.stt_TruongHopMacBenhNgheNghiep();
			self.stt_TruongHopTaiNanLaoDong();
			self.stt_KqKhamPhatHienBenhNgheNghiep();
			self.stt_DanhSachNguoiMacBenhNgheNghiep();
			self.stt_TongHopBaoCacCacCoSo();
			self.stt_HoatDongTuyenTinhTuyenHuyen();
			self.stt_PhanLoaiTaiNanTheoSoCuuCapCuu();
			self.stt_PhanLoaiTaiNanTheoNganhNghe();
			self.stt_KinhPhi();
			self.tinhTongKinhPhi();
			self.tinhTongSoTruongHopDuocKhamDieuTri();
			self.tinhTongTruongHopTaiNanLaoDong();
			self.tinhTongKetQuaKhamPhatHienBenhNgheNghiep();
			self.phanLoaiSucKhoe();
			self.tinhTongKetQuaDanhGiaTiepXucNgheNghiep();
			self.tinhTongQuantTracYeuToBui();
			self.tinhTongKetQuaQuanTracCacYeuToBuiTrongMoiTruongLaoDong();
			self.tinhTongKetQuaQuanTracCacYeuToViKhiHauVaVatLyHoaHoc();
			self.LucLuongSoCuuCapCuu();
			self.TrinhDoYTe();
			self.hinhThucToChucYTe();
		},
		stt_PhanLoaiTatCaCoSoTrongPhamViQuanLy: function () {
			var self = this;
			var arr = lodash(self.$el.find("tr td #stt_PhanLoaiTatCaCoSoTrongPhamViQuanLy"))
			arr.forEach(function (item, index) {
				item.value = ++index;
			})
		},
		stt_PhanLoaiCoSoCoYeuToCoHai: function () {
			var self = this;
			var arr = lodash(self.$el.find("tr td #stt_PhanLoaiCoSoCoYeuToCoHai"))
			arr.forEach(function (item, index) {
				item.value = ++index;
			})
		},
		stt_KetQuaQuanTracKhiHau: function () {
			var self = this;
			var arr = lodash(self.$el.find("tr td #stt_KetQuaQuanTracKhiHau"))
			arr.forEach(function (item, index) {
				item.value = ++index;
			})
		},
		stt_KetQuaQuanTracBui: function () {
			var self = this;
			var arr = lodash(self.$el.find("tr td #stt_KetQuaQuanTracBui"))
			arr.forEach(function (item, index) {
				item.value = ++index;
			})
		},
		stt_KetQuaDanhGiaYeuToTamSinhLy: function () {
			var self = this;
			var arr = lodash(self.$el.find("tr td #stt_KetQuaDanhGiaYeuToTamSinhLy"))
			arr.forEach(function (item, index) {
				item.value = ++index;
			})
		},
		stt_TinhHinhNghiOm: function () {
			var self = this;
			var arr = lodash(self.$el.find("tr td #stt_TinhHinhNghiOm"))
			arr.forEach(function (item, index) {
				item.value = ++index;
			})
		},
		stt_TruongHopMacBenhThongThuong: function () {
			var self = this;
			var arr = lodash(self.$el.find("tr td #stt_TruongHopMacBenhThongThuong"))
			arr.forEach(function (item, index) {
				item.value = ++index;
			})
		},
		stt_TruongHopMacBenhNgheNghiep: function () {
			var self = this;
			var arr = lodash(self.$el.find("tr td #stt_TruongHopMacBenhNgheNghiep"))
			arr.forEach(function (item, index) {
				item.value = ++index;
			})
		},
		stt_TruongHopTaiNanLaoDong: function () {
			var self = this;
			var arr = lodash(self.$el.find("tr td #stt_TruongHopTaiNanLaoDong"))
			arr.forEach(function (item, index) {
				item.value = ++index;
			})
		},
		stt_KqKhamPhatHienBenhNgheNghiep: function () {
			var self = this;
			var arr = lodash(self.$el.find("tr td #stt_KqKhamPhatHienBenhNgheNghiep"))
			arr.forEach(function (item, index) {
				item.value = ++index;
			})
		},
		stt_DanhSachNguoiMacBenhNgheNghiep: function () {
			var self = this;
			var arr = lodash(self.$el.find("tr td #stt_DanhSachNguoiMacBenhNgheNghiep"))
			arr.forEach(function (item, index) {
				item.value = ++index;
			})
		},
		stt_TongHopBaoCacCacCoSo: function () {
			var self = this;
			var arr = lodash(self.$el.find("tr td #stt_TongHopBaoCacCacCoSo"))
			arr.forEach(function (item, index) {
				item.value = ++index;
			})
		},

		stt_HoatDongTuyenTinhTuyenHuyen: function () {
			var self = this;
			var arr = lodash(self.$el.find("tr td #stt_HoatDongTuyenTinhTuyenHuyen"))
			arr.forEach(function (item, index) {
				item.value = ++index;
			})
		},
		stt_PhanLoaiTaiNanTheoSoCuuCapCuu: function () {
			var self = this;
			var arr = lodash(self.$el.find("tr td #stt_PhanLoaiTaiNanTheoSoCuuCapCuu"))
			arr.forEach(function (item, index) {
				item.value = ++index;
			})
		},
		stt_PhanLoaiTaiNanTheoNganhNghe: function () {
			var self = this;
			var arr = lodash(self.$el.find("tr td #stt_PhanLoaiTaiNanTheoNganhNghe"))
			arr.forEach(function (item, index) {
				item.value = ++index;
			})
		},
		stt_KinhPhi: function () {
			var self = this;
			var arr = lodash(self.$el.find("tr td #stt_KinhPhi"))
			arr.forEach(function (item, index) {
				item.value = ++index;
			})
		},
		tinhTongKinhPhi: function () {
			var self = this;
			var ds = self.model.get("kinhphichitrafield")
				var tinhtong=0;	
			ds.forEach(function (item, index) {
				tinhtong += (parseInt(item.sotien));			
			})
			self.$el.find("#tinhtong").val(tinhtong);
		
		},
		tinhTongSoTruongHopDuocKhamDieuTri: function () {
			var self = this;
			var ds = self.model.get("phanloaicactruonghoptainanlaodongtheonganhnghefield")
				var tinhtong=0;	
			ds.forEach(function (item, index) {
				tinhtong += (parseInt(item.tongso));			
			})
			self.$el.find("#tinhtongsotruonghopduockham").val(tinhtong);
		
		},
		tinhTongTruongHopTaiNanLaoDong: function () {
			var self = this;
			var ds = self.model.get("phanloaicactruonghoptainanlaodongtheoviecsocuufield")
				var tinhtongsocuutaicho=0;	
				var tinhtongtongso=0;	
				var tinhtongkhoi=0;	
				var tinhtongdichung=0;	
				var tinhtongtuvong=0;

			ds.forEach(function (item, index) {
				tinhtongsocuutaicho += (parseInt(item.songuoiduocsocuutaicho));	
				tinhtongtongso += (parseInt(item.tongsonguoiduocdieutritaicosokbcb));			
				tinhtongkhoi += (parseInt(item.tongsonguoiduocdieutrikhoitaicosokbcb));			
				tinhtongdichung += (parseInt(item.tongsonguoiduocdieutrikhoidelaidichungtaicosokbcb));			
				tinhtongtuvong += (parseInt(item.tongsonguoiduocdieutrituvongtaicosokbcb));			

			})
			self.$el.find("#tinhtongsocuutaicho").val(tinhtongsocuutaicho);
			self.$el.find("#tinhtongtongso").val(tinhtongtongso);
			self.$el.find("#tinhtongkhoi").val(tinhtongkhoi);
			self.$el.find("#tinhtongdichung").val(tinhtongdichung);
			self.$el.find("#tinhtongtuvong").val(tinhtongtuvong);
		
		},
		tinhTongKetQuaKhamPhatHienBenhNgheNghiep: function () {
			var self = this;
			var ds = self.model.get("ketquakhamphathienbenhnghenghiepfield")
				var tongsobenh=0;
				var tongsokham=0;
				var tongsokhamnu=0;
				var tongsochuandoan=0;
				var tongsochuandoannu=0;
				var tongsogiamdinh=0;
				var tongsogiamdinhnu=0;
				var tongsoketquaduoi5=0;

				var tongsoketquaduoi5nu=0;
				var tongsoketquaduoitren5duoi31=0;
				var tongsoketquaduoitren5duoi31nu=0;
				var tongsoketquatren31=0;
				var tongsoketquatren31nu=0;
			


			ds.forEach(function (item, index) {
				tongsobenh++;
				tongsokham += (parseInt(item.tongsonldduockhamsuckhoephathienbnn));
				tongsokhamnu += (parseInt(item.tongsonldnuduockhamsuckhoephathienbnn));
				tongsochuandoan += (parseInt(item.tongsondlduocchuandoanbnn));
				tongsochuandoannu += (parseInt(item.tongsondlnuduocchuandoanbnn));
				tongsogiamdinh += (parseInt(item.tongsonldduocgiamdinhbnn));
				tongsogiamdinhnu += (parseInt(item.tongsonldnuduocgiamdinhbnn));
				tongsoketquaduoi5 += (parseInt(item.tongsogiamdinhnhohon5phantram));
				tongsoketquaduoi5nu += (parseInt(item.tongsogiamdinhnhohon5phantramnu));

				tongsoketquaduoitren5duoi31 += (parseInt(item.tongsogiamdinhlonhon5nhohon31phantram));
				tongsoketquaduoitren5duoi31nu += (parseInt(item.tongsogiamdinhlonhon5nhohon31phantramnu));
				tongsoketquatren31 += (parseInt(item.tongsogiamdinhlonhon31phantram));
				tongsoketquatren31nu += (parseInt(item.tongsogiamdinhlonhon31phantramnu));
			})
			self.$el.find("#tongsobenh").val(tongsobenh);
			self.$el.find("#tongsokham").val(tongsokham);
			self.$el.find("#tongsokhamnu").val(tongsokhamnu);
			self.$el.find("#tongsochuandoan").val(tongsochuandoan);
			self.$el.find("#tongsochuandoannu").val(tongsochuandoannu);
			self.$el.find("#tongsogiamdinh").val(tongsogiamdinh);
			self.$el.find("#tongsogiamdinhnu").val(tongsogiamdinhnu);

			self.$el.find("#tongsoketquaduoi5").val(tongsoketquaduoi5);
			self.$el.find("#tongsoketquaduoi5nu").val(tongsoketquaduoi5nu);
			self.$el.find("#tongsoketquaduoitren5duoi31").val(tongsoketquaduoitren5duoi31);
			self.$el.find("#tongsoketquaduoitren5duoi31nu").val(tongsoketquaduoitren5duoi31nu);
			self.$el.find("#tongsoketquatren31").val(tongsoketquatren31);
			self.$el.find("#tongsoketquatren31nu").val(tongsoketquatren31nu);
		
		
		},
		phanLoaiSucKhoe:function(){
			var self = this;
			var nam1 = self.model.get("loai1nam")
			var nam2 = self.model.get("loai2nam")
			var nam3 = self.model.get("loai3nam")
			var nam4 = self.model.get("loai4nam")
			var nam5 = self.model.get("loai5nam")
			var tongsonam = parseInt(nam1)+parseInt(nam2)+parseInt(nam3)+parseInt(nam4)+parseInt(nam5);
			self.$el.find("#tongsonam").val(tongsonam);

			var nu1 = self.model.get("loai1nu")
			var nu2 = self.model.get("loai2nu")
			var nu3 = self.model.get("loai3nu")
			var nu4 = self.model.get("loai4nu")
			var nu5 = self.model.get("loai5nu")
			var tongsonu = parseInt(nu1)+parseInt(nu2)+parseInt(nu3)+parseInt(nu4)+parseInt(nu5);
			self.$el.find("#tongsonu").val(tongsonu);

			self.$el.find("#tongsonamnu").val(tongsonu+tongsonam);

			self.$el.find("#phantramnam1").val((parseInt(nam1)/tongsonam*100).toFixed(2)+"%");
			self.$el.find("#phantramnam2").val((parseInt(nam2)/tongsonam*100).toFixed(2)+"%");
			self.$el.find("#phantramnam3").val((parseInt(nam3)/tongsonam*100).toFixed(2)+"%");
			self.$el.find("#phantramnam4").val((parseInt(nam4)/tongsonam*100).toFixed(2)+"%");
			self.$el.find("#phantramnam5").val((parseInt(nam5)/tongsonam*100).toFixed(2)+"%");


			self.$el.find("#phantramnu1").val((parseInt(nu1)/tongsonu*100).toFixed(2)+"%");
			self.$el.find("#phantramnu2").val((parseInt(nu2)/tongsonu*100).toFixed(2)+"%");
			self.$el.find("#phantramnu3").val((parseInt(nu3)/tongsonu*100).toFixed(2)+"%");
			self.$el.find("#phantramnu4").val((parseInt(nu4)/tongsonu*100).toFixed(2)+"%");
			self.$el.find("#phantramnu5").val((parseInt(nu5)/tongsonu*100).toFixed(2)+"%");

			self.$el.find("#tongsonamnu1").val(parseInt(nam1)+parseInt(nu1));
			self.$el.find("#tongsonamnu2").val(parseInt(nam2)+parseInt(nu2));
			self.$el.find("#tongsonamnu3").val(parseInt(nam3)+parseInt(nu3));
			self.$el.find("#tongsonamnu4").val(parseInt(nam4)+parseInt(nu4));
			self.$el.find("#tongsonamnu5").val(parseInt(nam5)+parseInt(nu5));

			self.$el.find("#phantramnamnu1").val(((parseInt(nam1)+parseInt(nu1))/(tongsonu+tongsonam)*100).toFixed(2)+"%");
			self.$el.find("#phantramnamnu2").val(((parseInt(nam2)+parseInt(nu2))/(tongsonu+tongsonam)*100).toFixed(2)+"%");
			self.$el.find("#phantramnamnu3").val(((parseInt(nam3)+parseInt(nu3))/(tongsonu+tongsonam)*100).toFixed(2)+"%");
			self.$el.find("#phantramnamnu4").val(((parseInt(nam4)+parseInt(nu4))/(tongsonu+tongsonam)*100).toFixed(2)+"%");
			self.$el.find("#phantramnamnu5").val(((parseInt(nam5)+parseInt(nu5))/(tongsonu+tongsonam)*100).toFixed(2)+"%");
		},
		tinhTongKetQuaDanhGiaTiepXucNgheNghiep: function () {
			var self = this;
			var ds = self.model.get("ketquadanhgiacacyeutotiepxucnghenghiepfield")
				var tinhtong=0;	
			ds.forEach(function (item, index) {
				tinhtong += (parseInt(item.tongsonguoilaodong));			
			})
			self.$el.find("#tinhtongsonguoilaodong").val(tinhtong);
		
		},
		tinhTongQuantTracYeuToBui: function () {
			var self = this;
			var ds = self.model.get("ketquaquantraccacyeutobuitrongmoitruonglaodongfield")
				var tongsonguoilaodong=0;	
				var songuoitiepxucvoicacyeutobui=0;	
				var buitoanphan1=0;	
				var buitoanphan2=0;	
				var buihohap1=0;
				var buihohap2=0;	
				var buisilic1=0;	
				var buisilic2=0;	
				var buikhac1=0;
				var buikhac2=0;
				var tong1=0;
				var tong2=0;
			ds.forEach(function (item, index) {
				tongsonguoilaodong += (parseInt(item.tongsonguoilaodong));
				songuoitiepxucvoicacyeutobui += (parseInt(item.songuoitiepxucvoicacyeutobui));			
				buitoanphan1 += (parseInt(item.buitoanphan1));			
				buitoanphan2 += (parseInt(item.buitoanphan2));			
				buihohap1 += (parseInt(item.buihohap1));			
				buihohap2 += (parseInt(item.buihohap2));			
				buisilic1 += (parseInt(item.buisilic1));			
				buisilic2 += (parseInt(item.buisilic2));			
				buikhac1 += (parseInt(item.buikhac1));			
				buikhac2 += (parseInt(item.buikhac2));			
				tong1 += (parseInt(item.tong1));			
				tong2 += (parseInt(item.tong2));

			})
			self.$el.find("#tongsonguoilaodong").val(tongsonguoilaodong);
			self.$el.find("#songuoitiepxucvoicacyeutobui").val(songuoitiepxucvoicacyeutobui);
			self.$el.find("#buitoanphan1").val(buitoanphan1);
			self.$el.find("#buitoanphan2").val(buitoanphan2);
			self.$el.find("#buihohap1").val(buihohap1);
			self.$el.find("#buihohap2").val(buihohap2);
			self.$el.find("#buisilic2").val(buisilic2);
			self.$el.find("#buisilic1").val(buisilic1);
			self.$el.find("#buikhac2").val(buikhac2);
			self.$el.find("#buikhac1").val(buikhac1);
			self.$el.find("#tong1").val(tong1);
			self.$el.find("#tong2").val(tong2);


		
		},
		tinhTongKetQuaQuanTracCacYeuToBuiTrongMoiTruongLaoDong: function () {
			var self = this;
			var ds = self.model.get("ketquaquantraccacyeutobuitrongmoitruonglaodongfield")


			self.$el.find(".btn-sm").bind("click", () => {

			ds.forEach(function (item, index) {
				console.log(item.id)

				var tongcong1 = parseInt(item.buitoanphan1) + parseInt(item.buihohap1) + parseInt(item.buisilic1) + parseInt(item.buikhac1);
				var tongcong2 = parseInt(item.buitoanphan2) + parseInt(item.buihohap2) + parseInt(item.buisilic2) + parseInt(item.buikhac2);
				var param = {
					id: item.id,
					tong1: tongcong1,
					tong2: tongcong2
				}

				$.ajax({
					url: "http://0.0.0.0:9082/api/v1/ketquaquantraccacyeutobuitrongmoitruonglaodong/" + item.id,
					type: 'PUT',
					data: JSON.stringify(param),
					headers: {
						'content-type': 'application/json'
					},
					dataType: 'json',
					success: function (data) {
					
					},
					error: function (request, textStatus, errorThrown) {
						console.log(request);
					}
				})
			})

		})
		},
		tinhTongKetQuaQuanTracCacYeuToViKhiHauVaVatLyHoaHoc: function () {
			var self = this;
			var ds = self.model.get("ketquaquantraccacyeutovikhihauvavatlyhoahocfield")
				var tongsonguoilaodong=0;	
				var songuoitiepxuc=0;	
				var nhietdo1=0;	
				var nhietdo2=0;	
				var doam1=0;
				var doam2=0;	
				var tocdogio1=0;	
				var tocdogio2=0;	
				var anhsang1=0;
				var anhsang2=0;
				var on1=0;
				var on2=0;
				var rung1=0;
				var rung2=0;
				var hkdoc1=0;
				var hkdoc2=0;
				var phongxa1=0;
				var phongxa2=0;
				var dientutruong1=0;
				var dientutruong2=0;
				var yeutokhac1=0;
				var yeutokhac2=0;


			ds.forEach(function (item, index) {
				tongsonguoilaodong += (parseInt(item.tongsonguoilaodong));
				songuoitiepxuc += (parseInt(item.songuoitiepxuc));			
				nhietdo1 += (parseInt(item.nhietdo1));			
				nhietdo2 += (parseInt(item.nhietdo2));			
				doam1 += (parseInt(item.doam1));			
				doam2 += (parseInt(item.doam1));			
				tocdogio1 += (parseInt(item.tocdogio1));			
				tocdogio2 += (parseInt(item.tocdogio2));			
				anhsang1 += (parseInt(item.anhsang1));			
				anhsang2 += (parseInt(item.anhsang2));			
				on1 += (parseInt(item.on1));			
				on2 += (parseInt(item.on2));			
				rung1 += (parseInt(item.rung1));			
				rung2 += (parseInt(item.rung2));			
				hkdoc1 += (parseInt(item.hkdoc1));			
				hkdoc2 += (parseInt(item.hkdoc2));			
				phongxa1 += (parseInt(item.phongxa1));			
				phongxa2 += (parseInt(item.phongxa2));			
				dientutruong1 += (parseInt(item.dientutruong1));			
				dientutruong2 += (parseInt(item.dientutruong2));
				yeutokhac1 += (parseInt(item.yeutokhac2));			
				yeutokhac2 += (parseInt(item.yeutokhac2));

			})
			self.$el.find("#tongsonguoilaodong").val(tongsonguoilaodong);
			self.$el.find("#songuoitiepxuc").val(songuoitiepxuc);
			self.$el.find("#nhietdo1").val(nhietdo1);
			self.$el.find("#nhietdo2").val(nhietdo2);
			self.$el.find("#doam1").val(doam1);
			self.$el.find("#doam2").val(doam2);
			self.$el.find("#tocdogio1").val(tocdogio1);
			self.$el.find("#tocdogio2").val(tocdogio2);
			self.$el.find("#anhsang1").val(anhsang1);
			self.$el.find("#anhsang2").val(anhsang2);
			self.$el.find("#on1").val(on1);
			self.$el.find("#on2").val(on2);
			self.$el.find("#rung1").val(rung1);
			self.$el.find("#rung2").val(rung2);
			self.$el.find("#hkdoc1").val(hkdoc1);
			self.$el.find("#hkdoc2").val(hkdoc2);
			self.$el.find("#phongxa1").val(phongxa1);
			self.$el.find("#phongxa2").val(phongxa2);
			self.$el.find("#dientutruong1").val(dientutruong1);
			self.$el.find("#dientutruong2").val(dientutruong2);
			self.$el.find("#yeutokhac1").val(yeutokhac1);
			self.$el.find("#yeutokhac2").val(yeutokhac2);
		},
		LucLuongSoCuuCapCuu:function(){
			var self = this;
			var tongso50duoi200ndl = self.model.get("tongsonguoithamgiasocuutren50duoi200ndl")
			var trongdonu50duoi200ndl = self.model.get("tongsonguoinuthamgiasocuutren50duoi200ndl")
			var tongsotren200nld = self.model.get("tongsonguoithamgiasocuutren200nld")
			var trongdonutren200nld = self.model.get("tongsonguoinuthamgiasocuutren200nld")
			var tongsoduoi50nld = self.model.get("tongsonguoithamgiasocuuduoi50nld")
			var trongdonuduoi50nld = self.model.get("tongsonguoinuthamgiasocuuduoi50nld")
			var tongso = parseInt(tongso50duoi200ndl)+parseInt(tongsotren200nld)+parseInt(tongsoduoi50nld);
			self.$el.find("#tongso").val(tongso);

			var trongdonu = parseInt(trongdonu50duoi200ndl)+parseInt(trongdonutren200nld)+parseInt(trongdonuduoi50nld);
			self.$el.find("#trongdonu").val(trongdonu);
		},
		TrinhDoYTe:function(){
			var self = this;
			var songuoilamcongtacytetren50duoi200ndl = self.model.get("songuoilamcongtacytetren50duoi200ndl")
			var trinhdobacsitren50duoi200ndl = self.model.get("trinhdobacsitren50duoi200ndl")
			var trinhdobacsiduphongtren50duoi200ndl = self.model.get("trinhdobacsiduphongtren50duoi200ndl")
			var trinhdocunhantren50duoi200ndl = self.model.get("trinhdocunhantren50duoi200ndl")
			var trinhdoysytren50duoi200ndl = self.model.get("trinhdoysytren50duoi200ndl")
			var trinhdodieuduongtren50duoi200ndl = self.model.get("trinhdodieuduongtren50duoi200ndl")
			var trinhdohosinhvientren50duoi200ndl = self.model.get("trinhdohosinhvientren50duoi200ndl")

			var songuoilamcongtacytetren200nld = self.model.get("songuoilamcongtacytetren200nld")
			var trinhdobacsitren200nld = self.model.get("trinhdobacsitren200nld")
			var trinhdobacsiduphongtren200nld = self.model.get("trinhdobacsiduphongtren200nld")
			var trinhdocunhantren200nld = self.model.get("trinhdocunhantren200nld")
			var trinhdoysytren200nld = self.model.get("trinhdoysytren200nld")
			var trinhdodieuduongtren200nld = self.model.get("trinhdodieuduongtren200nld")
			var trinhdohosinhvientren200nld = self.model.get("trinhdohosinhvientren200nld")

			var songuoilamcongtacyteduoi50nld = self.model.get("songuoilamcongtacyteduoi50nld")
			var trinhdobacsiduoi50nld = self.model.get("trinhdobacsiduoi50nld")
			var trinhdobacsiduphongduoi50nld = self.model.get("trinhdobacsiduphongduoi50nld")
			var trinhdocunhanduoi50nld = self.model.get("trinhdocunhanduoi50nld")
			var trinhdoysyduoi50nld = self.model.get("trinhdoysyduoi50nld")
			var trinhdodieuduongduoi50nld = self.model.get("trinhdodieuduongduoi50nld")
			var trinhdohosinhvienduoi50nld = self.model.get("trinhdohosinhvienduoi50nld")

			var tongsosonguoilamcongtacyte= parseInt(songuoilamcongtacyteduoi50nld)+parseInt(songuoilamcongtacytetren200nld)+parseInt(songuoilamcongtacytetren50duoi200ndl);
			self.$el.find("#tongsosonguoilamcongtacyte").val(tongsosonguoilamcongtacyte);

			var tongsotrinhdobacsi= parseInt(trinhdobacsiduoi50nld)+parseInt(trinhdobacsitren200nld)+parseInt(trinhdobacsitren50duoi200ndl);
			self.$el.find("#tongsotrinhdobacsi").val(tongsotrinhdobacsi);

			var tongsotrinhdobacsiduphong= parseInt(trinhdobacsiduphongduoi50nld)+parseInt(trinhdobacsiduphongtren200nld)+parseInt(trinhdobacsiduphongtren50duoi200ndl);
			self.$el.find("#tongsotrinhdobacsiduphong").val(tongsotrinhdobacsiduphong);

			var tongsotrinhdocunhan= parseInt(trinhdocunhanduoi50nld)+parseInt(trinhdocunhantren200nld)+parseInt(trinhdocunhantren50duoi200ndl);
			self.$el.find("#tongsotrinhdocunhan").val(tongsotrinhdocunhan);

			var tongsotrinhdoysy= parseInt(trinhdoysyduoi50nld)+parseInt(trinhdoysytren200nld)+parseInt(trinhdoysytren50duoi200ndl);
			self.$el.find("#tongsotrinhdoysy").val(tongsotrinhdoysy);

			var tongsotrinhdodieuduong= parseInt(trinhdodieuduongduoi50nld)+parseInt(trinhdodieuduongtren200nld)+parseInt(trinhdodieuduongtren50duoi200ndl);
			self.$el.find("#tongsotrinhdodieuduong").val(tongsotrinhdodieuduong);

			var tongsotrinhdohosinhvien= parseInt(trinhdohosinhvienduoi50nld)+parseInt(trinhdohosinhvientren200nld)+parseInt(trinhdohosinhvientren50duoi200ndl);
			self.$el.find("#tongsotrinhdohosinhvien").val(tongsotrinhdohosinhvien);

		},
		hinhThucToChucYTe:function(){
			var self = this;
			var hinhthuccotramytetren50duoi200ndl = self.model.get("hinhthuccotramytetren50duoi200ndl")
			var hinhthuccobenhvientren50duoi200ndl = self.model.get("hinhthuccobenhvientren50duoi200ndl")
			var hinhthuccophongkhamtren50duoi200ndl = self.model.get("hinhthuccophongkhamtren50duoi200ndl")
			var hinhthuckhactren50duoi200ndl = self.model.get("hinhthuckhactren50duoi200ndl")
			var hopdongvoicosokhambenhtren50duoi200ndl = self.model.get("hopdongvoicosokhambenhtren50duoi200ndl")
			

			var hinhthuccotramytetren200nld = self.model.get("hinhthuccotramytetren200nld")
			var hinhthuccobenhvientren200nld = self.model.get("hinhthuccobenhvientren200nld")
			var hinhthuccophongkhamtren200nld = self.model.get("hinhthuccophongkhamtren200nld")
			var hinhthuckhactren200nld = self.model.get("hinhthuckhactren200nld")
			var hopdongvoicosokhambenhtren200nld = self.model.get("hopdongvoicosokhambenhtren200nld")
			

			var hinhthuccotramyteduoi50nld = self.model.get("hinhthuccotramyteduoi50nld")
			var hinhthuccobenhvienduoi50nld = self.model.get("hinhthuccobenhvienduoi50nld")
			var hinhthuccophongkhamduoi50nld = self.model.get("hinhthuccophongkhamduoi50nld")
			var hinhthuckhacduoi50nld = self.model.get("hinhthuckhacduoi50nld")
			var hopdongvoicosokhambenhduoi50nld = self.model.get("hopdongvoicosokhambenhduoi50nld")
			

			var tongsocotochucytetren50duoi200ndl = parseInt(hinhthuccotramytetren50duoi200ndl)+parseInt(hinhthuccobenhvientren50duoi200ndl)+parseInt(hinhthuccophongkhamtren50duoi200ndl)+parseInt(hinhthuckhactren50duoi200ndl);
			var tongsocotochucytetren200nld = parseInt(hinhthuccotramytetren200nld)+parseInt(hinhthuccobenhvientren200nld)+parseInt(hinhthuccophongkhamtren200nld)+parseInt(hinhthuckhactren200nld);
			var tongsocotochucyteduoi50nld = parseInt(hinhthuccotramyteduoi50nld)+parseInt(hinhthuccobenhvienduoi50nld)+parseInt(hinhthuccophongkhamduoi50nld)+parseInt(hinhthuckhacduoi50nld);
			self.$el.find("#tongsocotochucytetren50duoi200ndl").val(tongsocotochucytetren50duoi200ndl);
			self.$el.find("#tongsocotochucytetren200nld").val(tongsocotochucytetren200nld);
			self.$el.find("#tongsocotochucyteduoi50nld").val(tongsocotochucyteduoi50nld);

			var tongsotren50duoi200ndl = parseInt(hinhthuccotramytetren50duoi200ndl)+parseInt(hinhthuccobenhvientren50duoi200ndl)+parseInt(hinhthuccophongkhamtren50duoi200ndl)+parseInt(hinhthuckhactren50duoi200ndl)+parseInt(hopdongvoicosokhambenhtren50duoi200ndl);
			var tongsotren200ndl = parseInt(hinhthuccotramytetren200nld)+parseInt(hinhthuccobenhvientren200nld)+parseInt(hinhthuccophongkhamtren200nld)+parseInt(hinhthuckhactren200nld)+parseInt(hopdongvoicosokhambenhtren200nld);
			var tongsoduoi50nld = parseInt(hinhthuccotramyteduoi50nld)+parseInt(hinhthuccobenhvienduoi50nld)+parseInt(hinhthuccophongkhamduoi50nld)+parseInt(hinhthuckhacduoi50nld)+parseInt(hopdongvoicosokhambenhduoi50nld);
			self.$el.find("#tongsotren50duoi200ndl").val(tongsotren50duoi200ndl);
			self.$el.find("#tongsotren200ndl").val(tongsotren200ndl);
			self.$el.find("#tongsoduoi50nld").val(tongsoduoi50nld);

			var hinhthuccotramyte= parseInt(hinhthuccotramyteduoi50nld)+parseInt(hinhthuccotramytetren200nld)+parseInt(hinhthuccotramytetren50duoi200ndl);
			self.$el.find("#hinhthuccotramyte").val(hinhthuccotramyte);

			var hinhthuccobenhvien= parseInt(hinhthuccobenhvienduoi50nld)+parseInt(hinhthuccobenhvientren200nld)+parseInt(hinhthuccobenhvientren50duoi200ndl);
			self.$el.find("#hinhthuccobenhvien").val(hinhthuccobenhvien);

			var hinhthuccophongkham= parseInt(hinhthuccophongkhamduoi50nld)+parseInt(hinhthuccophongkhamtren200nld)+parseInt(hinhthuccophongkhamtren50duoi200ndl);
			self.$el.find("#hinhthuccophongkham").val(hinhthuccophongkham);

			var hinhthuckhac= parseInt(hinhthuckhacduoi50nld)+parseInt(hinhthuckhactren200nld)+parseInt(hinhthuckhactren50duoi200ndl);
			self.$el.find("#hinhthuckhac").val(hinhthuckhac);

			var tongsocotochucyte= parseInt(tongsocotochucyteduoi50nld)+parseInt(tongsocotochucytetren200nld)+parseInt(tongsocotochucytetren50duoi200ndl);
			self.$el.find("#tongsocotochucyte").val(tongsocotochucyte);

			var hopdongvoicosokhambenh= parseInt(hopdongvoicosokhambenhduoi50nld)+parseInt(hopdongvoicosokhambenhtren200nld)+parseInt(hopdongvoicosokhambenhtren50duoi200ndl);
			self.$el.find("#hopdongvoicosokhambenh").val(hopdongvoicosokhambenh);

			var tongso= parseInt(tongsoduoi50nld)+parseInt(tongsotren200ndl)+parseInt(tongsotren50duoi200ndl);
			self.$el.find("#tongso").val(tongso);

		},
		
	});

});