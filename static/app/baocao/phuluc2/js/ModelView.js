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
	// var BangQuanLyBenhManTinhTheoTungBenhItemView = require('app/baocao/phuluc2/js/BangQuanLyBenhManTinhTheoTungBenhView');
	var BangTheoDoiBenhNgheNghiepItemView = require('app/baocao/phuluc2/js/BangTheoDoiBenhNgheNghiepView');
	var BangDanhSachNguoiLaoDongMacBenhNgheNghiepItemView = require('app/baocao/phuluc2/js/BangDanhSachNguoiLaoDongMacBenhNgheNghiepView');


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
				// 	itemView: BangQuanLyBenhManTinhTheoTungBenhItemView,
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
						self.tinhtong();
						self.sothutu()
						self.sothutu2();		
					},
					error: function () {
						self.getApp().notify("Get data Eror");
					},
				});
			} else {
				self.applyBindings();	
				self.tinhtong();
				self.sothutu();	
				self.sothutu2();	
			}
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

		},

		sothutu: function () {
			const self = this;
			var arr = [];
			var arrr = [];

			arr = lodash.sortBy(self.model.get("bangsotruonghopmaccacloaibenhthongthuongfield"), ["created_at"], ["asc"])
			arr.forEach(function (item, index, array) {
				console.log(index);
			
			});	
		
			arrr = lodash(self.$el.find("tr td #stt"));
			arrr.forEach(function (item, index, array) {
				console.log(item);
				item.value=index+1;
			});	

		},
		sothutu2: function () {
			const self = this;
			var arr = [];
			var arrr = [];

			arr = lodash.sortBy(self.model.get("bangcactruonghopmacbenhnghenghiepfield"), ["created_at"], ["asc"])
			arr.forEach(function (item, index, array) {
				console.log(index);
			
			});	
		
			arrr = lodash(self.$el.find("tr td #stt"));
			arrr.forEach(function (item, index, array) {
				console.log(item);
				item.value=index+1;
			});	

		},

	});

});