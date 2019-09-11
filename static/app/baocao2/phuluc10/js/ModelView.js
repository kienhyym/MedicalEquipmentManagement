define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/baocao2/phuluc10/tpl/model.html'),
		schema = require('json!schema/TongHopKetQuaDotKhamSucKhoePhatHienBenhNgheNghiepSchema.json');

	var KetQuaKhamSucKhoeItemView = require('app/baocao2/phuluc10/js/KetQuaKhamSucKhoeItemView');
	var DanhSachNguoiMacBenhNgheNghiepItemView = require('app/baocao2/phuluc10/js/DanhSachNguoiMacBenhNgheNghiepItemView');
	var TongHopKetQuaKhamBenhNgheNghiepItemView = require('app/baocao2/phuluc10/js/TongHopKetQuaKhamBenhNgheNghiepItemView');
	var KienNghiCuaDonKhamItemView = require('app/baocao2/phuluc10/js/KienNghiCuaDonKhamItemView');

	return Gonrin.ModelView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "tonghopketquadotkhamsuckhoephathienbenhnghenghiep",
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
					field: "ngayviet",
					cssClass: false,
				},
				{
					field: "thangviet",
					cssClass: false,
				},
				{
					field: "namviet",
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

						// render_KetQuaKhamSucKhoe
						var dataKetQuaKhamSucKhoe = self.model.get("ketquakhamsuckhoe");
						if (dataKetQuaKhamSucKhoe === null) {
							self.model.set("ketquakhamsuckhoe", []);
						}
						$.each(dataKetQuaKhamSucKhoe, function (idx, value) {
							self.render_KetQuaKhamSucKhoe(value);
						});


						// render_DanhsachNguoiMacBenhNgheNghiep
						var dataDanhSachNguoiMacBenhNgheNghiep = self.model.get("danhsachnguoimacbenhnghenghiep");
						if (dataDanhSachNguoiMacBenhNgheNghiep === null) {
							self.model.set("danhsachnguoimacbenhnghenghiep", []);
						}
						$.each(dataDanhSachNguoiMacBenhNgheNghiep, function (idx, value) {
							self.render_DanhsachNguoiMacBenhNgheNghiep(value);
						});


						// render_TongHopKetQuaKhamBenhNgheNghiep
						var dataTongHopKetQuaKhamBenhNgheNghiep = self.model.get("tonghopketquakhambenhnghenghiep");
						if (dataTongHopKetQuaKhamBenhNgheNghiep === null) {
							self.model.set("tonghopketquakhambenhnghenghiep", []);
						}
						$.each(dataTongHopKetQuaKhamBenhNgheNghiep, function (idx, value) {
							self.render_TongHopKetQuaKhamBenhNgheNghiep(value);
						});

						// render_TongHopKetQuaKhamBenhNgheNghiep
						var dataKienNghiCuaDonKham = self.model.get("kiennghicuadonkham");
						if (dataKienNghiCuaDonKham === null) {
							self.model.set("kiennghicuadonkham", []);
						}
						$.each(dataKienNghiCuaDonKham, function (idx, value) {
							self.render_KienNghiCuaDonKham(value);
						});

					},
					error: function () {
						self.getApp().notify("Get data Eror");
					},
					complete: function () {
						self.btn_add_row_ketquakhamsuckhoe();
						self.btn_add_row_danhsachnguoimacbenhnghenghiep();
						self.btn_add_row_tonghopketquakhambenhnghenghiep();
						self.btn_add_row_kiennghicuadonkham();
						self.stt_KetQuaKhamSucKhoe();
						self.stt_DanhSachNguoiMacBenh();
						self.stt_TongHopKetQuaKham();



					}
				});
			} else {
				self.applyBindings();
				self.btn_add_row_ketquakhamsuckhoe();
				self.btn_add_row_danhsachnguoimacbenhnghenghiep();
				self.btn_add_row_tonghopketquakhambenhnghenghiep();
				self.btn_add_row_kiennghicuadonkham();
				self.stt_KetQuaKhamSucKhoe();
				self.stt_DanhSachNguoiMacBenh();
				self.stt_TongHopKetQuaKham();
			}
		},
		// RENDER_DATA_JSON
		// RENDER_DATA_ KẾT QUẢ KHÁM SỨC KHỎE
		render_KetQuaKhamSucKhoe: function (data) {
			var self = this;
			var ketQuaKhamSucKhoeItemView = new KetQuaKhamSucKhoeItemView();

			if (!!data) {
				ketQuaKhamSucKhoeItemView.model.set(JSON.parse(JSON.stringify(data)));

			}
			ketQuaKhamSucKhoeItemView.render();
			self.$el.find("#ketquakhamsuckhoe_grid").append(ketQuaKhamSucKhoeItemView.$el);
			ketQuaKhamSucKhoeItemView.on("change", function (event) {
				var dataKetQuaKhamSucKhoe = self.model.get("ketquakhamsuckhoe");
				console.log(dataKetQuaKhamSucKhoe)
				if (dataKetQuaKhamSucKhoe === null) {
					dataKetQuaKhamSucKhoe = [];
					dataKetQuaKhamSucKhoe.push(event.data)
				}
				for (var i = 0; i < dataKetQuaKhamSucKhoe.length; i++) {
					if (dataKetQuaKhamSucKhoe[i].id == event.oldData.id) {
						dataKetQuaKhamSucKhoe[i] = event.data;
						break;
					}
				}
				console.log(dataKetQuaKhamSucKhoe)
				self.model.set("ketquakhamsuckhoe", dataKetQuaKhamSucKhoe);
				self.applyBindings("ketquakhamsuckhoe");
			})
			ketQuaKhamSucKhoeItemView.$el.find("#itemRemove").unbind("click").bind("click", function () {

				var dataKetQuaKhamSucKhoe = self.model.get("ketquakhamsuckhoe");
				for (var i = 0; i < dataKetQuaKhamSucKhoe.length; i++) {
					if (dataKetQuaKhamSucKhoe[i].id === ketQuaKhamSucKhoeItemView.model.get("id")) {
						dataKetQuaKhamSucKhoe.splice(i, 1);
					}
				}
				self.model.set("ketquakhamsuckhoe", dataKetQuaKhamSucKhoe);
				self.applyBinding("ketquakhamsuckhoe");
				ketQuaKhamSucKhoeItemView.destroy();
				ketQuaKhamSucKhoeItemView.remove();
			});
		},
		// RENDER_DATA_ DANH SÁCH NGƯỜI MẮC BỆNH NGHỀ NGHIỆP
		render_DanhsachNguoiMacBenhNgheNghiep: function (data) {
			var self = this;
			var danhsachNguoiMacBenhNgheNghiepItemView = new DanhSachNguoiMacBenhNgheNghiepItemView();

			if (!!data) {
				danhsachNguoiMacBenhNgheNghiepItemView.model.set(JSON.parse(JSON.stringify(data)));

			}
			danhsachNguoiMacBenhNgheNghiepItemView.render();
			self.$el.find("#danhsachnguoimacbenhnghenghiep_grid").append(danhsachNguoiMacBenhNgheNghiepItemView.$el);
			danhsachNguoiMacBenhNgheNghiepItemView.on("change", function (event) {
				var dataDanhSachNguoiMacBenhNgheNghiep = self.model.get("danhsachnguoimacbenhnghenghiep");
				if (dataDanhSachNguoiMacBenhNgheNghiep === null) {
					dataDanhSachNguoiMacBenhNgheNghiep = [];
					dataDanhSachNguoiMacBenhNgheNghiep.push(event.data)
				}
				for (var i = 0; i < dataDanhSachNguoiMacBenhNgheNghiep.length; i++) {
					if (dataDanhSachNguoiMacBenhNgheNghiep[i].id == event.oldData.id) {
						dataDanhSachNguoiMacBenhNgheNghiep[i] = event.data;
						break;
					}
				}
				self.model.set("danhsachnguoimacbenhnghenghiep", dataDanhSachNguoiMacBenhNgheNghiep);
				self.applyBindings("danhsachnguoimacbenhnghenghiep");
			})
			danhsachNguoiMacBenhNgheNghiepItemView.$el.find("#itemRemove").unbind("click").bind("click", function () {

				var dataDanhSachNguoiMacBenhNgheNghiep = self.model.get("danhsachnguoimacbenhnghenghiep");
				for (var i = 0; i < dataDanhSachNguoiMacBenhNgheNghiep.length; i++) {
					if (dataDanhSachNguoiMacBenhNgheNghiep[i].id === danhsachNguoiMacBenhNgheNghiepItemView.model.get("id")) {
						dataDanhSachNguoiMacBenhNgheNghiep.splice(i, 1);
					}
				}
				self.model.set("danhsachnguoimacbenhnghenghiep", dataDanhSachNguoiMacBenhNgheNghiep);
				self.applyBinding("danhsachnguoimacbenhnghenghiep");
				danhsachNguoiMacBenhNgheNghiepItemView.destroy();
				danhsachNguoiMacBenhNgheNghiepItemView.remove();
			});
		},
		// RENDER_DATA_TỔNG HỢP KẾT QUẢ KHÁM BỆNH NGHỀ NGHIỆP
		render_TongHopKetQuaKhamBenhNgheNghiep: function (data) {
			var self = this;
			var tongHopKetQuaKhamBenhNgheNghiepItemView = new TongHopKetQuaKhamBenhNgheNghiepItemView();

			if (!!data) {
				tongHopKetQuaKhamBenhNgheNghiepItemView.model.set(JSON.parse(JSON.stringify(data)));

			}
			tongHopKetQuaKhamBenhNgheNghiepItemView.render();
			self.$el.find("#tonghopketquakhambenhnghenghiep_grid").append(tongHopKetQuaKhamBenhNgheNghiepItemView.$el);
			tongHopKetQuaKhamBenhNgheNghiepItemView.on("change", function (event) {
				var dataTongHopKetQuaKhamBenhNgheNghiep = self.model.get("tonghopketquakhambenhnghenghiep");
				if (dataTongHopKetQuaKhamBenhNgheNghiep === null) {
					dataTongHopKetQuaKhamBenhNgheNghiep = [];
					dataTongHopKetQuaKhamBenhNgheNghiep.push(event.data)
				}
				for (var i = 0; i < dataTongHopKetQuaKhamBenhNgheNghiep.length; i++) {
					if (dataTongHopKetQuaKhamBenhNgheNghiep[i].id == event.oldData.id) {
						dataTongHopKetQuaKhamBenhNgheNghiep[i] = event.data;
						break;
					}
				}
				self.model.set("tonghopketquakhambenhnghenghiep", dataTongHopKetQuaKhamBenhNgheNghiep);
				self.applyBindings("tonghopketquakhambenhnghenghiep");
			})
			tongHopKetQuaKhamBenhNgheNghiepItemView.$el.find("#itemRemove").unbind("click").bind("click", function () {
				var dataTongHopKetQuaKhamBenhNgheNghiep = self.model.get("tonghopketquakhambenhnghenghiep");
				for (var i = 0; i < dataTongHopKetQuaKhamBenhNgheNghiep.length; i++) {
					if (dataTongHopKetQuaKhamBenhNgheNghiep[i].id === tongHopKetQuaKhamBenhNgheNghiepItemView.model.get("id")) {
						dataTongHopKetQuaKhamBenhNgheNghiep.splice(i, 1);
					}
				}
				self.model.set("tonghopketquakhambenhnghenghiep", dataTongHopKetQuaKhamBenhNgheNghiep);
				self.applyBinding("tonghopketquakhambenhnghenghiep");
				tongHopKetQuaKhamBenhNgheNghiepItemView.destroy();
				tongHopKetQuaKhamBenhNgheNghiepItemView.remove();
			});
		},

		// RENDER_DATA_KIẾN NGHỊ CỦA ĐOÀN KHÁM:
		render_KienNghiCuaDonKham: function (data) {
			var self = this;
			var kienNghiCuaDonKhamItemView = new KienNghiCuaDonKhamItemView();

			if (!!data) {
				kienNghiCuaDonKhamItemView.model.set(JSON.parse(JSON.stringify(data)));

			}
			kienNghiCuaDonKhamItemView.render();
			self.$el.find("#kiennghicuadonkham_grid").append(kienNghiCuaDonKhamItemView.$el);
			kienNghiCuaDonKhamItemView.on("change", function (event) {
				var dataKienNghiCuaDonKham = self.model.get("kiennghicuadonkham");
				if (dataKienNghiCuaDonKham === null) {
					dataKienNghiCuaDonKham = [];
					dataKienNghiCuaDonKham.push(event.data)
				}
				for (var i = 0; i < dataKienNghiCuaDonKham.length; i++) {
					if (dataKienNghiCuaDonKham[i].id == event.oldData.id) {
						dataKienNghiCuaDonKham[i] = event.data;
						break;
					}
				}
				self.model.set("kiennghicuadonkham", dataKienNghiCuaDonKham);
				self.applyBindings("kiennghicuadonkham");
			})
			kienNghiCuaDonKhamItemView.$el.find("#itemRemove").unbind("click").bind("click", function () {
				var dataKienNghiCuaDonKham = self.model.get("kiennghicuadonkham");
				for (var i = 0; i < dataKienNghiCuaDonKham.length; i++) {
					if (dataKienNghiCuaDonKham[i].id === kienNghiCuaDonKhamItemView.model.get("id")) {
						dataKienNghiCuaDonKham.splice(i, 1);
					}
				}
				self.model.set("kiennghicuadonkham", dataKienNghiCuaDonKham);
				self.applyBinding("kiennghicuadonkham");
				kienNghiCuaDonKhamItemView.destroy();
				kienNghiCuaDonKhamItemView.remove();
			});
		},
		// buttom add 1 row
		//BUTTOM THÊM 1 DÒNG KẾT QUẢ KHÁM SỨC KHỎE
		btn_add_row_ketquakhamsuckhoe: function () {
			var self = this;
			self.$el.find("#add_1_row").unbind('click').bind("click", function () {
				var data_default = {
					"id": gonrin.uuid(),
					"hoten": null,
					"bophanlamviec": null,
					"tuoinam": null,
					"tuoinu": null,
					"phanloaisuckhoe1": null,
					"phanloaisuckhoe2": null,
					"phanloaisuckhoe3": null,
					"phanloaisuckhoe4": null,
					"phanloaisuckhoe5": null,
					"tinhtrangbenhtat": null,
					"huonggiaiquyet": null,
					"ghichu": null,

				}

				var dataKetQuaKhamSucKhoe = self.model.get("ketquakhamsuckhoe");
				if (dataKetQuaKhamSucKhoe === null) {
					dataKetQuaKhamSucKhoe = [];
				}
				dataKetQuaKhamSucKhoe.push(data_default);
				self.model.set("ketquakhamsuckhoe", dataKetQuaKhamSucKhoe)
				self.applyBindings("ketquakhamsuckhoe");

				self.render_KetQuaKhamSucKhoe(data_default);
			})
		},
		//BUTTON ADD THÊM 1 DÒNG DANH SÁCH NGƯỜI MẮC BỆNH
		btn_add_row_danhsachnguoimacbenhnghenghiep: function () {
			var self = this;
			self.$el.find("#btn_add_row_danhsachnguoimacbenhnghenghiep").unbind('click').bind("click", function () {

				var data_default = {
					"id": gonrin.uuid(),
					"tengnuoibenh": null,
					"tuoi": null,
					"nghekhibnn": null,
					"tuoinghe": null,
					"ngayphathienbenh": null,
					"tenbenhnghenghiep": null,
					"congviechiennay": null,
				}
				var dataDanhSachNguoiLamMacBenhNgheNghiep = self.model.get("danhsachnguoimacbenhnghenghiep");
				if (dataDanhSachNguoiLamMacBenhNgheNghiep === null) {
					dataDanhSachNguoiLamMacBenhNgheNghiep = [];
				}
				dataDanhSachNguoiLamMacBenhNgheNghiep.push(data_default);
				self.model.set("danhsachnguoimacbenhnghenghiep", dataDanhSachNguoiLamMacBenhNgheNghiep)
				self.applyBindings("danhsachnguoimacbenhnghenghiep");

				self.render_DanhsachNguoiMacBenhNgheNghiep(data_default);
			})
		},

		//BUTTON ADD THÊM 1 TỔNG HỢP KẾT QUẢ KHÁM BỆNH NGHỀ NGHIỆP
		btn_add_row_tonghopketquakhambenhnghenghiep: function () {
			var self = this;
			self.$el.find("#btn_add_row_tonghopketquakhambenhnghenghiep").unbind('click').bind("click", function () {

				var data_default = {
					"id": gonrin.uuid(),
					"tenbenhnghenghiep": null,
					"nguoilaodongkhamphathienbenh": null,
					"nguoilaodongkhamphathienbenhnu": null,
					"nguoilaodongchuandoanphathienbenh": null,
					"nguoilaodongchuandoanphathienbenhnu": null,
				}
				var dataTongHopKetQuaKhamBenhNgheNghiep = self.model.get("tonghopketquakhambenhnghenghiep");
				if (dataTongHopKetQuaKhamBenhNgheNghiep === null) {
					dataTongHopKetQuaKhamBenhNgheNghiep = [];
				}
				dataTongHopKetQuaKhamBenhNgheNghiep.push(data_default);
				self.model.set("tonghopketquakhambenhnghenghiep", dataTongHopKetQuaKhamBenhNgheNghiep)
				self.applyBindings("tonghopketquakhambenhnghenghiep");

				self.render_TongHopKetQuaKhamBenhNgheNghiep(data_default);
			})
		},
		//BUTTON ADD THÊM 1 TỔNG HỢP KẾT QUẢ KHÁM BỆNH NGHỀ NGHIỆP
		btn_add_row_kiennghicuadonkham: function () {
			var self = this;
			self.$el.find("#btn_add_row_kiennghicuadonkham").unbind('click').bind("click", function () {

				var data_default = {
					"id": gonrin.uuid(),
					"noidung": null,
				}
				var dataKienNghiCuaDonKham= self.model.get("kiennghicuadonkham");
				if (dataKienNghiCuaDonKham === null) {
					dataKienNghiCuaDonKham = [];
				}
				dataKienNghiCuaDonKham.push(data_default);
				self.model.set("kiennghicuadonkham", dataKienNghiCuaDonKham)
				self.applyBindings("kiennghicuadonkham");

				self.render_KienNghiCuaDonKham(data_default);
			})
		},
		stt_KetQuaKhamSucKhoe:function(){
			var self = this;
			var arr = [];
			arr = lodash(self.$el.find("tr td #stt_ketquakhamsk"))
			arr.forEach(function(item,index){
				item.value=++index;
			});
		},
		stt_DanhSachNguoiMacBenh:function(){
			var self = this;
			var arr = [];
			arr = lodash(self.$el.find("tr td #stt_danhsachnguoimacbenh"))
			arr.forEach(function(item,index){
				item.value=++index;
			});
		},
		stt_TongHopKetQuaKham:function(){
			var self = this;
			var arr = [];
			arr = lodash(self.$el.find("tr td #stt_tonghopketquakham"))
			arr.forEach(function(item,index){
				item.value=++index;
			});
		},



	});

});




