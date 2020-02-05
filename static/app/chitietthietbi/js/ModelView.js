define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');
	var template = require('text!app/chitietthietbi/tpl/model.html'),
		schema = require('json!schema/ChiTietThietBiSchema.json');
	var NhaCungCapSelectView = require('app/danhmuc/donvi/js/SelectView');
	var NoisanXuatCapSelectView = require('app/danhmuc/QuocGia/view/SelectView');
	var KhoaSelectView = require('app/hethong/khoa/view/SelectView');
	var PhongSelectView = require('app/hethong/phong/view/SelectView');
	var HangSanXuatSelectView = require('app/danhmuc/hangsanxuat/view/SelectView');




	return Gonrin.ModelView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "chitietthietbi",
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
						buttonClass: "btn-default btn-sm btn-secondary",
						label: "TRANSLATE:Quay lại",
						command: function () {
							var self = this;
							Backbone.history.history.back();
						}
					},
					{
						name: "save",
						type: "button",
						buttonClass: "btn-success btn-sm",
						label: "TRANSLATE:Lưu",
						command: function () {
							var self = this;

							if (self.model.get("trangthai") == null) {
								self.getApp().notify({ message: "Bạn chưa cập nhật trạng thái thiết bị" }, { type: "danger", delay: 1000 });

								return false;
							}
							else {
								self.model.save(null, {
									success: function (model, respose, options) {

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



						}
					},
					{
						name: "delete",
						type: "button",
						buttonClass: "btn-danger btn-sm",
						label: "TRANSLATE:Xóa",
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
					// {
					// 	name: "taophieu",
					// 	type: "button",
					// 	buttonClass: "btn-info btn-sm",
					// 	label: "TRANSLATE:Tạo Phiếu",
					// 	command: function () {
					// 		var self = this;
					// 		location.href = self.getApp().serviceURL + "/?#bangkiemtrathietbi/model";
					// 		sessionStorage.setItem('TenThietBi', self.model.get("tenthietbi"));
					// 		sessionStorage.setItem('IDThietBi', self.model.get("id"));
					// 		sessionStorage.setItem('SerialThietBi', self.model.get("model_serial_number"));
					// 		sessionStorage.setItem('MaQLTBThietBi', self.model.get("ma_qltb"));
					// 	}
					// },
				],
			}],
		uiControl: {
			fields: [

				{
					field: "phanloai",
					uicontrol: "combobox",
					textField: "text",
					valueField: "value",
					dataSource: [
						{ "value": "A", "text": "Loại A (mức độ rủi ro thấp.)" },
						{ "value": "B", "text": "Loại B (mức độ rủi ro trung bình thấp.)" },
						{ "value": "C", "text": "Loại C (mức độ rủi ro trung bình cao.)" },
						{ "value": "D", "text": "Loại D (mức độ rủi ro cao.)" },
					],
				},
				{
					field: "trangthai",
					uicontrol: "combobox",
					textField: "text",
					valueField: "value",
					dataSource: [
						{ "value": "yeucaukiemtrathietbi", "text": "Đang yêu cầu kiểm tra" },
						{ "value": "dangsuachua", "text": "Đang sửa chữa" },
						{ "value": "dangchokiemduyet", "text": "Đang chờ kiểm duyệt" },
						{ "value": "dakiemduyet", "text": "Đã kiểm duyệt" },
						{ "value": "luukho", "text": "Lưu kho chưa vận hành" },

					],
				},

				{
					field: "ngaymua",
					uicontrol: "datetimepicker",
					textFormat: "DD/MM/YYYY",
					extraFormats: ["DDMMYYYY"],
					parseInputDate: function (val) {
						return moment.unix(val)
					},
					parseOutputDate: function (date) {
						return date.unix()
					}
				},
				{
					field: "baohanhtungay",
					uicontrol: "datetimepicker",
					textFormat: "DD/MM/YYYY",
					extraFormats: ["DDMMYYYY"],
					parseInputDate: function (val) {
						return moment.unix(val)
					},
					parseOutputDate: function (date) {
						return date.unix()
					}
				},
				{
					field: "baohanhdenngay",
					uicontrol: "datetimepicker",
					textFormat: "DD/MM/YYYY",
					extraFormats: ["DDMMYYYY"],
					parseInputDate: function (val) {
						return moment.unix(val)
					},
					parseOutputDate: function (date) {
						return date.unix()
					}
				},
				{
					field: "ngaynhap",
					uicontrol: "datetimepicker",
					textFormat: "DD/MM/YYYY",
					extraFormats: ["DDMMYYYY"],
					parseInputDate: function (val) {
						return moment.unix(val)
					},
					parseOutputDate: function (date) {
						return date.unix()
					}
				},
				{
					field: "nhacungcap",
					uicontrol: "ref",
					textField: "ten",
					foreignRemoteField: "id",
					foreignField: "nhacungcap_id",
					dataSource: NhaCungCapSelectView
				},
				{
					field: "hangsanxuat",
					uicontrol: "ref",
					textField: "ten",
					foreignRemoteField: "id",
					foreignField: "hangsanxuat_id",
					dataSource: HangSanXuatSelectView
				},
				{
					field: "quocgia",
					uicontrol: "ref",
					textField: "ten",
					foreignRemoteField: "id",
					foreignField: "quocgia_id",
					dataSource: NoisanXuatCapSelectView
				},
				{
					field: "phong",
					uicontrol: "ref",
					textField: "ten",
					foreignRemoteField: "id",
					foreignField: "phong_id",
					dataSource: PhongSelectView
				},
				{
					field: "khoa",
					uicontrol: "ref",
					textField: "ten",
					foreignRemoteField: "id",
					foreignField: "khoa_id",
					dataSource: KhoaSelectView
				},
				{
					field: "tinhtrangthietbikhimua",
					uicontrol: "radio",
					textField: "text",
					valueField: "value",
					cssClassField: "cssClass",
					dataSource: [
						{ text: "-Mới 100%", value: "moi" },
						{ text: "- Thiết bị cũ:", value: "cu" },
					],
				},
				{
					field: "yeucauvebaoduong",
					uicontrol: "radio",
					textField: "text",
					valueField: "value",
					cssClassField: "cssClass",
					dataSource: [
						{ text: "- Không cần bảo dưỡng:", value: "Không cần bảo dưỡng" },
						{ text: "- Bảo dưỡng, chu kỳ:", value: "Bảo dưỡng" },
					],
				},
				{
					field: "hetbaohanh",

					uicontrol: "checkbox",
					checkedField: "key",
					valueField: "value",
					dataSource: [{
						"value": "hetbaohanh",
						"key": true
					},
					{
						"value": null,
						"key": false
					},
					],
				},
			]
		},

		render: function () {
			var self = this;
			self.$el.find('.dialogView').hide();

			self.$el.find(".tensp").html("Thiết bị: " + sessionStorage.getItem('TenSanPham'))
			self.model.set("thietbi_id", sessionStorage.getItem('IDSanPham'))
			self.model.set("tenthietbi", sessionStorage.getItem('TenSanPham'))
			self.model.set("chungloailoaithietbi", sessionStorage.getItem('ChungLoai'))
			
			sessionStorage.clear();
			var id = this.getApp().getRouter().getParam("id");
			if (id) {
				this.model.set('id', id);
				this.model.fetch({
					// http://0.0.0.0:20808/#chitietthietbi/model?id=26204cbe-8744-4eec-b912-6a4f452c37ce
					success: function (data) {
						var qrcode = new QRCode("id_qrcodeMini", {
							text: self.model.get("id"),
							width: 40,
							height: 40,
							colorDark: "#000000",
							colorLight: "#ffffff",
							correctLevel: QRCode.CorrectLevel.H
						});
						var qrcode = new QRCode("id_qrcodeBigSize", {
							text: self.model.get("id"),
							width: 220,
							height: 220,
							colorDark: "#000000",
							colorLight: "#ffffff",
							correctLevel: QRCode.CorrectLevel.H
						});
						self.$el.find('#id_qrcodeMini').on('click', function () {
							self.$el.find('.dialogView').show()
							self.$el.find('.bodychitiet').css("opacity", "0.3");
						})
						self.$el.find(".close").on('click', function () {
							self.$el.find('.dialogView').hide()
							self.$el.find('.bodychitiet').css("opacity", "1");
						})


						self.$el.find(".btn-taophieuyeucausuachua").unbind("click").bind("click", function () {
							location.href = self.getApp().serviceURL + "/?#phieuyeucausuachua/model";
							sessionStorage.setItem('TenThietBi', self.model.get("tenthietbi"));
							sessionStorage.setItem('IDThietBi', self.model.get("id"));
							sessionStorage.setItem('SerialThietBi', self.model.get("model_serial_number"));
							sessionStorage.setItem('MaQLTBThietBi', self.model.get("ma_qltb"));
						})
						self.$el.find(".btn-taobienbankiemtra").unbind("click").bind("click", function () {
							location.href = self.getApp().serviceURL + "/?#bienbanxacnhantinhtrangthietbi/model";
							sessionStorage.setItem('TenThietBi', self.model.get("tenthietbi"));
							sessionStorage.setItem('IDThietBi', self.model.get("id"));
							sessionStorage.setItem('SerialThietBi', self.model.get("model_serial_number"));
							sessionStorage.setItem('MaQLTBThietBi', self.model.get("ma_qltb"));
						})
						self.$el.find(".btn-taokiemtrahangngay").unbind("click").bind("click", function () {
							location.href = self.getApp().serviceURL + "/?#bangkiemtrathietbi/model";
							sessionStorage.setItem('TenThietBi', self.model.get("tenthietbi"));
							sessionStorage.setItem('IDThietBi', self.model.get("id"));
							sessionStorage.setItem('SerialThietBi', self.model.get("model_serial_number"));
							sessionStorage.setItem('MaQLTBThietBi', self.model.get("ma_qltb"));
							sessionStorage.setItem('Khoa', self.model.get("khoa_id"));
							sessionStorage.setItem('Khoa2', self.model.get("khoa"));

							sessionStorage.setItem('Phong', self.model.get("phong_id"));
							sessionStorage.setItem('ThietBiID', self.model.get("thietbi_id"));
						


						})
						self.$el.find(".btn-taokiemdinh").unbind("click").bind("click", function () {
							location.href = self.getApp().serviceURL + "/?#bangkiemdinh/model";
							sessionStorage.setItem('TenThietBi', self.model.get("tenthietbi"));
							sessionStorage.setItem('IDThietBi', self.model.get("id"));
							sessionStorage.setItem('SerialThietBi', self.model.get("model_serial_number"));
							sessionStorage.setItem('MaQLTBThietBi', self.model.get("ma_qltb"));
						})


						self.$el.find(".btn-dsphieuyeucausuachua").unbind("click").bind("click", function () {
							location.href = self.getApp().serviceURL + "/?#phieuyeucausuachua/collection";
							sessionStorage.setItem('IDThietBi', self.model.get("id"));
						})
						self.$el.find(".btn-dsbienbankiemtra").unbind("click").bind("click", function () {
							location.href = self.getApp().serviceURL + "/?#bienbanxacnhantinhtrangthietbi/collection";
							sessionStorage.setItem('IDThietBi', self.model.get("id"));
						})
						self.$el.find(".btn-dskiemtrahangngay").unbind("click").bind("click", function () {
							location.href = self.getApp().serviceURL + "/?#bangkiemtrathietbi/collection";
							sessionStorage.setItem('IDThietBi', self.model.get("id"));
						})
						self.$el.find(".btn-dskiemdinh").unbind("click").bind("click", function () {
							location.href = self.getApp().serviceURL + "/?#bangkiemdinh/collection";
							sessionStorage.setItem('IDThietBi', self.model.get("id"));

						})
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