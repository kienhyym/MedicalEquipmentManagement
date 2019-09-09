define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/baocao/phuluc2/tpl/model.html'),
		schema = require('json!schema/HSQLSucKhoeVaBenhTatNguoiLaoDongSchema.json');

	var BangQLSucKhoeTruocKhiBoTriViecLamItemView = require('app/baocao/phuluc2/js/BangQLSucKhoeTruocKhiBoTriViecLamView');
	var BangQLSucKhoeLaoDongThongQuaKhamSucKhoeDinhKyItemView = require('app/baocao/phuluc2/js/BangQLSucKhoeLaoDongThongQuaKhamSucKhoeDinhKyView');
	var BangSoTruongHopMacCacLoaiBenhThongThuongItemView = require('app/baocao/phuluc2/js/BangSoTruongHopMacCacLoaiBenhThongThuongVIew');

	var BangCacTruongHopMacBenhNgheNghiepItemView = require('app/baocao/phuluc2/js/BangCacTruongHopMacBenhNgheNghiepView');
	var BangCacTruongHopTaiNanLaoDongItemView = require('app/baocao/phuluc2/js/BangCacTruongHopTaiNanLaoDongView');
	// var BangTinhHinhNghiViecItemView = require('app/baocao/phuluc2/js/BangTinhHinhNghiViecView');
	var BangQuanLyBenhManTinhItemView = require('app/baocao/phuluc2/js/BangQuanLyBenhManTinhView');
	var BangQuanLyBenhManTinhTheoTungBenhView = require('app/baocao/phuluc2/js/BangQuanLyBenhManTinhTheoTungBenhView');
	var BangTheoDoiBenhNgheNghiepItemView = require('app/baocao/phuluc2/js/BangTheoDoiBenhNgheNghiepView');
	var BangDanhSachNguoiLaoDongMacBenhNgheNghiepItemView = require('app/baocao/phuluc2/js/BangDanhSachNguoiLaoDongMacBenhNgheNghiepView');
	var BangTinhHinhNghiViecView = require('app/baocao/phuluc2/js/BangTinhHinhNghiViecView');


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
									// self.getApp().getRouter().navigate(self.collectionName + "/collection");
									self.getApp().router.refresh();

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
					field: "bangqlsuckhoelaodongthongquakhamsuckhoedinhkyfield",
					uicontrol: false,
					itemView: BangQLSucKhoeLaoDongThongQuaKhamSucKhoeDinhKyItemView,
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
					field: "bangsotruonghopmaccacloaibenhthongthuongfield",
					uicontrol: false,
					itemView: BangSoTruongHopMacCacLoaiBenhThongThuongItemView,
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
					field: "bangcactruonghopmacbenhnghenghiepfield",
					uicontrol: false,
					itemView: BangCacTruongHopMacBenhNgheNghiepItemView,
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
					field: "bangcactruonghoptainanlaodongfield",
					uicontrol: false,
					itemView: BangCacTruongHopTaiNanLaoDongItemView,
					tools: [{
						name: "create",
						type: "button",
						buttonClass: "btn btn-outline-success btn-sm",
						label: "<span class='fa fa-plus'></span>",
						command: "create"
					}],
					toolEl: "#add_row5"
				},
				// {
				// 	field: "bangtinhhinhnghiviecfield",
				// 	uicontrol: false,
				// 	itemView: BangTinhHinhNghiViecItemView,
				// 	tools: [{
				// 		name: "create",
				// 		type: "button",
				// 		buttonClass: "btn btn-outline-success btn-sm",
				// 		label: "<span class='fa fa-plus'></span>",
				// 		command: "create"
				// 	}],
				// 	toolEl: "#add_row6"
				// },
				{
					field: "bangquanlybenhmantinhfield",
					uicontrol: false,
					itemView: BangQuanLyBenhManTinhItemView,
					tools: [{
						name: "create",
						type: "button",
						buttonClass: "btn btn-outline-success btn-sm",
						label: "<span class='fa fa-plus'></span>",
						command: "create"
					}],
					toolEl: "#add_row7"
				},
				// {
				// 	field: "bangquanlybenhmantinhtheotungbenhfield",
				// 	uicontrol: false,
				// 	itemView: BangQuanLyBenhManTinhTheoTungBenhView,
				// 	tools: [{
				// 		name: "create",
				// 		type: "button",
				// 		buttonClass: "btn btn-outline-success btn-sm",
				// 		label: "<span class='fa fa-plus'></span>",
				// 		command: "create"
				// 	}],
				// 	toolEl: "#add_row8"
				// },
				{
					field: "BangTheoDoiBenhNgheNghiepfield",
					uicontrol: false,
					itemView: BangTheoDoiBenhNgheNghiepItemView,
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
					field: "bangdanhsachnguoilaodongmacbenhnghenghiepfield",
					uicontrol: false,
					itemView: BangDanhSachNguoiLaoDongMacBenhNgheNghiepItemView,
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
						self.renderBangquanlybenhmantinhtheotungbenh();
						self.registerEvent();
						
					},
					error: function () {
						self.getApp().notify("Get data Eror");
					},
				});
			} else {
				self.applyBindings();
				self.renderBangquanlybenhmantinhtheotungbenh();
				self.registerEvent();
			}
		},

		registerEvent: function () {
			const self = this;
			self.createBangTinhHinhNghiViec();
			self.renderbangtinhhinhnghiviec();
			self.tinhTongBangQLSucKhoeTruocKhiBoTriViecLam();
			self.tinhTongBangQLSucKhoeLaoDongThongQuaKhamSucKhoeDinhKy();
			self.tinhTongBangSoTruongHopMacCacLoaiBenhThongThuong();
			self.tinhTongBangCacTruongHopTaiNanLaoDong();
			self.tinhTongBangTheoDoiBenhNgheNghiep();
			self.sothutuBangDanhSachNguoiLaoDongMacBenhNgheNghiep();
			self.sothutuTinhHinhNghiOm();
			self.sothutuCacTruongHopTaiNanLaoDong();
			self.sothutuCacTruongHopMacBenhNghenghiep();
			self.sothutuCacTruongHopMacBenhThongThuong();

		},

		createBangTinhHinhNghiViec: function () {
			const self = this;
			var containerEl = self.$el.find("#space_bangtinhhinhnghiviecfield");

			self.$el.find("#btn_add_bangtinhhinhnghiviecfield").on("click", (eventClick) => {
				var viewNghiViec = new BangTinhHinhNghiViecView();
				viewNghiViec.model.save(null, {
					success: (model, response, options) => {
						viewNghiViec.model.set(response);
						viewNghiViec.render();
						$(viewNghiViec.el).hide().appendTo(containerEl).fadeIn();

					}, error: (error) => {
						console.log("error", error);
					}

				});
			});
		},

		renderbangtinhhinhnghiviec: function () {
			const self = this;

			var danhSachTinhHinhNghiViec = self.model.get("bangtinhhinhnghiviecfield");
			var containerEl = self.$el.find("#space_bangtinhhinhnghiviecfield");

			danhSachTinhHinhNghiViec.forEach((item, idx) => {
				var viewNghiViec = new BangTinhHinhNghiViecView();
				viewNghiViec.model.set(item);
				viewNghiViec.render();

				$(viewNghiViec.el).hide().appendTo(containerEl).fadeIn();
				viewNghiViec.model.on("change", (change) => {
					var bangTinhHinhNghiViec = self.model.get("bangtinhhinhnghiviecfield");
					if (change.attributes) {
						bangTinhHinhNghiViec.forEach((item, idx) => {
							if (item.id === change.attributes.id) {
								bangTinhHinhNghiViec[idx] = change.attributes;
							}
						});
						self.model.set("bangtinhhinhnghiviecfield", bangTinhHinhNghiViec);

					}
				})
			});
		},

		renderBangquanlybenhmantinhtheotungbenh: function () {
			const self = this;

			var ds_bangquanlybenhmantinhtheotungbenhfield = self.model.get("bangquanlybenhmantinhtheotungbenhfield");
			var containerEl = self.$el.find("#space_bangquanlybenhmantinhtheotungbenhfield");
			containerEl.empty();
			ds_bangquanlybenhmantinhtheotungbenhfield.forEach((item, index) => {
				var view = new BangQuanLyBenhManTinhTheoTungBenhView();
				view.model.set(item);
				view.render();
				$(view.el).hide().appendTo(containerEl).fadeIn();

				view.on("change", (data) => {
					var ds_bangquanlybenhmantinhtheotungbenhfield = self.model.get("bangquanlybenhmantinhtheotungbenhfield");
					ds_bangquanlybenhmantinhtheotungbenhfield.forEach((item, index) => {
						if (item.id == data.id) {
							ds_bangquanlybenhmantinhtheotungbenhfield[index] = data;
						}
					});
					self.model.set("bangquanlybenhmantinhtheotungbenhfield", ds_bangquanlybenhmantinhtheotungbenhfield);
				});
			});

			self.$el.find("#btn_add_bangquanlybenhmantinhtheotungbenhfield").unbind("click").bind("click", () => {
				var view = new BangQuanLyBenhManTinhTheoTungBenhView();
				view.model.save(null, {
					success: function (model, respose, options) {
						view.model.set(respose);

						view.render();
						$(view.el).hide().appendTo(containerEl).fadeIn();

						var ds_bangquanlybenhmantinhtheotungbenhfield = self.model.get("bangquanlybenhmantinhtheotungbenhfield");
						if (!ds_bangquanlybenhmantinhtheotungbenhfield) {
							ds_bangquanlybenhmantinhtheotungbenhfield = [];
						}
						ds_bangquanlybenhmantinhtheotungbenhfield.push(view.model.toJSON());
						self.model.set("bangquanlybenhmantinhtheotungbenhfield", ds_bangquanlybenhmantinhtheotungbenhfield);

						view.on("change", (data) => {


							var ds_bangquanlybenhmantinhtheotungbenhfield = self.model.get("bangquanlybenhmantinhtheotungbenhfield");
							ds_bangquanlybenhmantinhtheotungbenhfield.forEach((item, index) => {
								if (item.id == data.id) {
									ds_bangquanlybenhmantinhtheotungbenhfield[index] = data;
								}
							});
							self.model.set("bangquanlybenhmantinhtheotungbenhfield", ds_bangquanlybenhmantinhtheotungbenhfield);
						});
					},
					error: function (xhr, status, error) {
						// HANDLE ERROR
					}
				});
			});
		},
		tinhTongBangQLSucKhoeTruocKhiBoTriViecLam: function () {
			var self = this;
			var dsKhamSucKhoe = self.model.get("bangqlsuckhoetruockhibotrivieclamfield")


			self.$el.find(".btn-sm").bind("click", () => {

			dsKhamSucKhoe.forEach(function (item, index) {

				var tongcong = parseInt(item.soduockhamtuyennu) + parseInt(item.soduockhamtuyennam);
				var param = {
					id: item.id,
					tongcong: tongcong,
				}

				$.ajax({
					url: "http://0.0.0.0:9082/api/v1/bangqlsuckhoetruockhibotrivieclam/" + item.id,
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
		tinhTongBangQLSucKhoeLaoDongThongQuaKhamSucKhoeDinhKy: function () {
			var self = this;
			var dsKhamSucKhoe = self.model.get("bangqlsuckhoelaodongthongquakhamsuckhoedinhkyfield")


			self.$el.find(".btn-sm").bind("click", () => {

			dsKhamSucKhoe.forEach(function (item, index) {

				var tongcong = parseInt(item.soduockhamtuyennu) + parseInt(item.soduockhamtuyennam);
				var param = {
					id: item.id,
					tongcong: tongcong,
				}

				$.ajax({
					url: "http://0.0.0.0:9082/api/v1/bangqlsuckhoelaodongthongquakhamsuckhoedinhky/" + item.id,
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
		tinhTongBangSoTruongHopMacCacLoaiBenhThongThuong: function () {
			var self = this;
			var ds = self.model.get("bangsotruonghopmaccacloaibenhthongthuongfield")
				var th1=0;
				var th2=0;
				var th3=0;
				var th4=0;
			ds.forEach(function (item, index) {
				th1 += (parseInt(item.sotruonghopquy1));
				th2 += (parseInt(item.sotruonghopquy2));
				th3 += (parseInt(item.sotruonghopquy3));
				th4 += (parseInt(item.sotruonghopquy4));
			})
			self.$el.find("#tongcongtruonghop1").val(th1);
			self.$el.find("#tongcongtruonghop2").val(th2);
			self.$el.find("#tongcongtruonghop3").val(th3);
			self.$el.find("#tongcongtruonghop4").val(th4);
		
		},
		tinhTongBangCacTruongHopTaiNanLaoDong: function () {
			var self = this;
			var ds = self.model.get("bangcactruonghoptainanlaodongfield")
				var quyImac=0;
				var quyIchet=0;
				var quyIImac=0;
				var quyIIchet=0;
				var quyIIImac=0;
				var quyIIIchet=0;
				var quyIVmac=0;
				var quyIVchet=0;
			ds.forEach(function (item, index) {
				quyImac += (parseInt(item.sotruonghopquy1mac));
				quyIchet += (parseInt(item.sotruonghopquy1chet));
				quyIImac += (parseInt(item.sotruonghopquy2mac));
				quyIIchet += (parseInt(item.sotruonghopquy2chet));
				quyIIImac += (parseInt(item.sotruonghopquy3mac));
				quyIIIchet += (parseInt(item.sotruonghopquy3chet));
				quyIVmac += (parseInt(item.sotruonghopquy4mac));
				quyIVchet += (parseInt(item.sotruonghopquy4chet));
			})
			self.$el.find("#sotruonghopquy1mac").val(quyImac);
			self.$el.find("#sotruonghopquy1chet").val(quyIchet);
			self.$el.find("#sotruonghopquy2mac").val(quyIImac);
			self.$el.find("#sotruonghopquy2chet").val(quyIIchet);
			self.$el.find("#sotruonghopquy3mac").val(quyIIImac);
			self.$el.find("#sotruonghopquy3chet").val(quyIIIchet);
			self.$el.find("#sotruonghopquy4mac").val(quyIVmac);
			self.$el.find("#sotruonghopquy4chet").val(quyIVchet);
		
		
		},
		tinhTongBangTheoDoiBenhNgheNghiep: function () {
			var self = this;
			var ds = self.model.get("BangTheoDoiBenhNgheNghiepfield")
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
				tongsokham += (parseInt(item.tongsokham));
				tongsokhamnu += (parseInt(item.tongsokhamnu));
				tongsochuandoan += (parseInt(item.tongsochuandoan));
				tongsochuandoannu += (parseInt(item.tongsochuandoannu));
				tongsogiamdinh += (parseInt(item.tongsogiamdinh));
				tongsogiamdinhnu += (parseInt(item.tongsogiamdinhnu));
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
		sothutuBangDanhSachNguoiLaoDongMacBenhNgheNghiep: function () {
			const self = this;
			var arr = [];
			arr = lodash(self.$el.find("tr td #stt_ds_nld_macbenh"));
			arr.forEach(function (item, index, array) {
				item.value=++index;
			});	

		},
		sothutuTinhHinhNghiOm: function () {
			const self = this;
			var arr = [];
			arr = lodash(self.$el.find("tr td #stt_tinhhinhnghiom"));
			arr.forEach(function (item, index, array) {
				item.value=++index;
			});	

		},
		sothutuCacTruongHopTaiNanLaoDong: function () {
			const self = this;
			var arr = [];
			arr = lodash(self.$el.find("tr td #stt_cacthtainanlaodong"));
			arr.forEach(function (item, index, array) {
				item.value=++index;
			});	

		},
		sothutuCacTruongHopMacBenhNghenghiep: function () {
			const self = this;
			var arr = [];
			arr = lodash(self.$el.find("tr td #stt_cacthmacbenhnghenghiep"));
			arr.forEach(function (item, index, array) {
				item.value=++index;
			});	

		},
		sothutuCacTruongHopMacBenhThongThuong: function () {
			const self = this;
			var arr = [];
			arr = lodash(self.$el.find("tr td #stt_cacthmacbenhthongthuong"));
			arr.forEach(function (item, index, array) {
				item.value=++index;
			});	

		},
	});
});