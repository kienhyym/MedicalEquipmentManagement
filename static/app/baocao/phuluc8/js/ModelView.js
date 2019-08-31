define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/baocao/phuluc8/tpl/model.html'),
		schema = require('json!schema/BaoCaoYTeLaoDongCuaCoSoLaoDongSchema.json');

	var NghiViecDoOmDauTaiNanLaoDongVaBenhNgheNghiepItemView = require('app/baocao/phuluc8/js/NghiViecDoOmDauTaiNanLaoDongVaBenhNgheNghiepView');
	var CongTacThanhTraItemView = require('app/baocao/phuluc8/js/CongTacThanhTraView');
	var TinhHinhBenhNgheNghiepTaiCoSoItemView = require('app/baocao/phuluc8/js/TinhHinhBenhNgheNghiepTaiCoSoView');
	var DanhSachTruongHopBenhNgheNghiepItemView = require('app/baocao/phuluc8/js/DanhSachTruongHopBenhNgheNghiepView');
	var ThongKeTongSoTruongHopMacCacLoaiBenhThongThuongItemView = require('app/baocao/phuluc8/js/ThongKeTongSoTruongHopMacCacLoaiBenhThongThuongView');
	var CacTruongHopMacBenhNgheNghiepItemView = require('app/baocao/phuluc8/js/CacTruongHopMacBenhNgheNghiepView');
	var CacTruongHopTaiNanLaoDongItemView = require('app/baocao/phuluc8/js/CacTruongHopTaiNanLaoDongView');
	var CongTacHuanLuyenItemView = require('app/baocao/phuluc8/js/CongTacHuanLuyenView');
	var KinhPhiVeSinhLaoDongVaChamSocSucKhoeNguoiLaoDongItemView = require('app/baocao/phuluc8/js/KinhPhiVeSinhLaoDongVaChamSocSucKhoeNguoiLaoDongView');
	var CacKienNghiDuKienVaKeHoachDuKienTrongKyToiItemView = require('app/baocao/phuluc8/js/CacKienNghiDuKienVaKeHoachDuKienTrongKyToiView');
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

				{
					field: "tructhuoctinhvathanhpho",

					uicontrol: "checkbox",
					checkedField: "key",
					valueField: "value",
					dataSource: [{
						"value": 1,
						"key": true
					},
					{
						"value": 0,
						"key": false
					},
					],
				},
				{
					field: "tructhuocbovanganh",

					uicontrol: "checkbox",
					checkedField: "key",
					valueField: "value",
					dataSource: [{
						"value": 1,
						"key": true
					},
					{
						"value": 0,
						"key": false
					},
					],
				},

				{
					
					field: "laphosovesinhkhong",
					uicontrol: "radio",
					textField: "name",
					valueField: "id",
					cssClassField: "cssClass",
					dataSource: [
						{ name: "Có", id: 1},
						{ name: "Không", id: 0},
					],
				},
				{
					field: "nghiviecdoomdautainanlaodongvabenhnghenghiepfield",
					uicontrol: false,
					itemView: NghiViecDoOmDauTaiNanLaoDongVaBenhNgheNghiepItemView,
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
				{
					field: "tinhhinhbenhnghenghieptaicosofield",
					uicontrol: false,
					itemView: TinhHinhBenhNgheNghiepTaiCoSoItemView,
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
					field: "danhsachtruonghopbenhnghenghiepfield",
					uicontrol: false,
					itemView: DanhSachTruongHopBenhNgheNghiepItemView,
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
					field: "thongketongsotruonghopmaccacloaibenhthongthuongfield",
					uicontrol: false,
					itemView: ThongKeTongSoTruongHopMacCacLoaiBenhThongThuongItemView,
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
					field: "cactruonghopmacbenhnghenghiepfield",
					uicontrol: false,
					itemView:CacTruongHopMacBenhNgheNghiepItemView,
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
					field: "cactruonghoptainanlaodongfield",
					uicontrol: false,
					itemView:CacTruongHopTaiNanLaoDongItemView,
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
					field: "congtachuanluyenfield",
					uicontrol: false,
					itemView:CongTacHuanLuyenItemView,
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
					field: "kinhphivesinhlaodongvachamsocsuckhoenguoilaodongfield",
					uicontrol: false,
					itemView:KinhPhiVeSinhLaoDongVaChamSocSucKhoeNguoiLaoDongItemView,
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
					field: "cackiennghidukienvakehoachdukientrongkytoifield",
					uicontrol: false,
					itemView:CacKienNghiDuKienVaKeHoachDuKienTrongKyToiItemView,
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
				// {
				// 	field: "loai1nam",
				// 	cssClass: false,
				// },
				// {
				// 	field: "loai1nam",
				// 	cssClass: false,
				// },
				// {
				// 	field: "loai2nam",
				// 	cssClass: false,
				// },
				// {
				// 	field: "loai3nam",
				// 	cssClass: false,
				// },
				// {
				// 	field: "loai4nam",
				// 	cssClass: false,
				// },
				// {
				// 	field: "loai5nam",
				// 	cssClass: false,
				// },
				// {
				// 	field: "loai1nu",
				// 	cssClass: false,
				// },
				// {
				// 	field: "loai2nu",
				// 	cssClass: false,
				// },
				// {
				// 	field: "loai3nu",
				// 	cssClass: false,
				// },
				// {
				// 	field: "loai4nu",
				// 	cssClass: false,
				// },
				// {
				// 	field: "loai5nu",
				// 	cssClass: false,
				// },
				




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