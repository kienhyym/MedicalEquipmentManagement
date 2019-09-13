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
					
					field: "nguoilamcongtacytecokhong",
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
					
					field: "tramphongkhambenhviencokhong",
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
					
					field: "thuehopdongvoidonviytecokhong",
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
				self.$el.find(".kinhgui").removeClass("justify-content-center d-flex");
				self.$el.find(".input-mobile").css("width", "100%");
				// });
			}
			if (id) {
				this.model.set('id', id);
				this.model.fetch({
					success: function (data) {
						self.applyBindings();
						self.$el.find(".input-phuluc2").removeClass("form-control");

						self.registerFunction();
					},
					error: function () {
						self.getApp().notify("Get data Eror");
					},
				});
			} else {
				self.applyBindings();
				self.$el.find(".input-phuluc2").removeClass("form-control");

				self.registerFunction();
			}
			
		},
		registerFunction :function(){
			var self =this;
			self.stt_KinhPhi();
			self.stt_CongTacHuanLuyen();
			self.TongKinhPhi();
			self.phanLoaiSucKhoe();
			self.stt_BenhThongThuong();
			self.stt_CacTruongHopMacBenhNgheNghiep();
			self.stt_CacTruongHopTaiNanLaoDong();
			self.stt_DanhSachTruongHopMacBenh();
			self.stt_TongHopTinhHinhBenhNgheNghiep();
			self.stt_NghiOmTaiNanLaoDong();
			self.stt_CongTacThanhTra();
		},
		// ################################################################
		stt_KinhPhi:function(){
			var self = this;
			var arr = lodash(self.$el.find("tr td #stt_kinhphi"))
			arr.forEach(function(item,index){
				item.value=++index;
			})
		},
		stt_CongTacHuanLuyen:function(){
			var self = this;
			var arr = lodash(self.$el.find("tr td #stt_congtacthanhtra"))
			arr.forEach(function(item,index){
				item.value=++index;
			})
		},
		TongKinhPhi:function(){
			var self = this;
			var ds = self.model.get("kinhphivesinhlaodongvachamsocsuckhoenguoilaodongfield")
				var tongtien=0;			
			ds.forEach(function (item, index) {
				tongtien += (parseInt(item.sotienkhamsuckhoedinhky));
			})
			self.$el.find("#tongtien").val(tongtien);
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
		stt_BenhThongThuong:function(){
			var self = this;
			var arr = lodash(self.$el.find("tr td #stt_benhthongthuong"))
			arr.forEach(function(item,index){
				item.value=++index;
			})
		},
		stt_CacTruongHopMacBenhNgheNghiep:function(){
			var self = this;
			var arr = lodash(self.$el.find("tr td #stt_cactruonghopmacbenhnghenghiep"))
			arr.forEach(function(item,index){
				item.value=++index;
			})
		},
		stt_CacTruongHopTaiNanLaoDong:function(){
			var self = this;
			var arr = lodash(self.$el.find("tr td #stt_cactruonghoptainanlaodong"))
			arr.forEach(function(item,index){
				item.value=++index;
			})
		},
		stt_DanhSachTruongHopMacBenh:function(){
			var self = this;
			var arr = lodash(self.$el.find("tr td #stt_danhsachtruonghopmacbenh"))
			arr.forEach(function(item,index){
				item.value=++index;
			})
		},
		stt_TongHopTinhHinhBenhNgheNghiep:function(){
			var self = this;
			var arr = lodash(self.$el.find("tr td #stt_tonghoptinhhinhbenhnghenghiep"))
			arr.forEach(function(item,index){
				item.value=++index;
			})
		},
		stt_NghiOmTaiNanLaoDong:function(){
			var self = this;
			var arr = lodash(self.$el.find("tr td #stt_nghiomtainanlaodong"))
			arr.forEach(function(item,index){
				item.value=++index;
			})
		},
		stt_CongTacThanhTra:function(){
			var self = this;
			var arr = lodash(self.$el.find("tr td #stt_congtacthanhtra"))
			arr.forEach(function(item,index){
				item.value=++index;
			})
		},
	});	

});