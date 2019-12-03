define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');
	var template = require('text!app/chitietthietbi/tpl/model.html'),
		schema = require('json!schema/ChiTietThietBiSchema.json');
	var NhaCungCapSelectView = require('app/donvi/js/SelectView');
	var NoisanXuatCapSelectView = require('app/danhmuc/QuocGia/view/SelectView');
	var KhoaSelectView = require('app/hethong/khoa/view/SelectView');
	var PhongSelectView = require('app/hethong/phong/view/SelectView');



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
						buttonClass: "btn-default btn-sm",
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
					{
						name: "taophieu",
						type: "button",
						buttonClass: "btn-info btn-sm",
						label: "TRANSLATE:Tạo Phiếu",
						command: function () {
							var self = this;
							location.href = self.getApp().serviceURL + "/?#bangkiemtrathietbi/model";
							sessionStorage.setItem('TenThietBi', self.model.get("tenthietbi"));
							sessionStorage.setItem('IDThietBi', self.model.get("id"));
							sessionStorage.setItem('SerialThietBi', self.model.get("model_serial_number"));
							sessionStorage.setItem('MaQLTBThietBi', self.model.get("ma_qltb"));
						}
					},
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
						{ "value": "Đã gửi yêu cầu sửa chữa", "text": "Đã gửi yêu cầu sửa chữa" },
						{ "value": "Đang sửa chữa", "text": "Đang sửa chữa" },
						{ "value": "Đang chờ kiểm duyệt", "text": "Đang chờ kiểm duyệt" },
						{ "value": "Đã kiểm duyệt", "text": "Đã kiểm duyệt" },
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
			// sessionStorage.clear();
			var id = this.getApp().getRouter().getParam("id");
			if (id) {
				this.model.set('id', id);
				this.model.fetch({
					// http://0.0.0.0:20808/#chitietthietbi/model?id=26204cbe-8744-4eec-b912-6a4f452c37ce
					success: function (data) {

						var qrcode = new QRCode("id_qrcodeMini", {
							text: "www://" + self.getApp().serviceURL + "/#chitietthietbi/model?id=" + self.model.get("id"),
							width: 40,
							height: 40,
							colorDark: "#000000",
							colorLight: "#ffffff",
							correctLevel: QRCode.CorrectLevel.H
						});
						var qrcode = new QRCode("id_qrcodeBigSize", {
							text: "www://" + self.getApp().serviceURL + "/#chitietthietbi/model?id=" + self.model.get("id"),
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


						self.$el.find(".tensp").html("Thiết bị: " + self.model.get("tenthietbi"))
						var danhsachyeucausuachua = self.model.get('phieuyeucausuachuafield');
						danhsachyeucausuachua.sort(function (a, b) {
							var thoigiantaoA = a.created_at
							var thoigiantaoB = b.created_at
							if (thoigiantaoA < thoigiantaoB) {
								return 1;
							}
							if (thoigiantaoA > thoigiantaoB) {
								return -1;
							}
							return 0;
						});

						danhsachyeucausuachua.forEach(function (item, index) {
							self.$el.find("#danhsachyeucausuachua").append("<tr><td class='p-2'>" + item.ma_qltb + "</td><td class='p-2'>" + moment(item.ngay_suco * 1000).format("DD/MM/YYYY") + "</td><td class='p-2'>" + item.nguoisudung + "</td><td class='p-1'><a class='btn btn-info btn-sm btn-chitiet p-1' href=" + self.getApp().serviceURL + "/?#phieuyeucausuachua/model?id=" + item.id + ">Xem chi tiết</a></td></tr>")
						})

						self.$el.find(".btn-them").unbind("click").bind("click", function () {
							location.href = self.getApp().serviceURL + "/?#phieuyeucausuachua/model";
							sessionStorage.setItem('TenSanPham', self.$el.find("#tensp").val());
							sessionStorage.setItem('IDSanPham', self.model.get("id"));
						})




						// var bangkiemtrathietbi = self.model.get('bangkiemtrathietbifield');
						// bangkiemtrathietbi.sort(function (a, b) {
						// 	var thoigiantaoA = a.created_at
						// 	var thoigiantaoB = b.created_at
						// 	if (thoigiantaoA < thoigiantaoB) {
						// 		return 1;
						// 	}
						// 	if (thoigiantaoA > thoigiantaoB) {
						// 		return -1;
						// 	}
						// 	return 0;
						// });
						// bangkiemtrathietbi.forEach(function (item, index) {
						// 	self.$el.find("#danhsachhosokiemtrathietbi").append("<tr><td class='p-2'>" + item.tenthietbi + "</td><td class='p-2'>" +moment(item.ngay*1000).format("DD/MM/YYYY") + "</td><td class='p-2'>" + item.tinhtrang + "</td><td class='p-1'><a class='btn btn-info btn-sm btn-chitiet p-1' href="+self.getApp().serviceURL+ "/?#bangkiemtrathietbi/model?id="+item.id+">Xem chi tiết</a></td></tr>")

						// })
						// self.$el.find(".btn-them2").unbind("click").bind("click", function () {
						// 	location.href = self.getApp().serviceURL + "/?#bangkiemtrathietbi/model";
						// 	sessionStorage.setItem('TenThietBi',self.model.get("model_serial_number"));
						// 	sessionStorage.setItem('IDThietBi', self.model.get("id"));
						// })




						var bienbanxacnhantinhtrangthietbi = self.model.get('bienbanxacnhantinhtrangthietbifield');
						bienbanxacnhantinhtrangthietbi.sort(function (a, b) {
							var thoigiantaoA = a.created_at
							var thoigiantaoB = b.created_at
							if (thoigiantaoA < thoigiantaoB) {
								return 1;
							}
							if (thoigiantaoA > thoigiantaoB) {
								return -1;
							}
							return 0;
						});
						bienbanxacnhantinhtrangthietbi.forEach(function (item, index) {
							self.$el.find("#danhsachhosokiemtrathietbi").append("<tr><td class='p-2'>" + item.tenthietbi +
								"</td><td class='p-2'>" + item.model_serial_number +
								"</td><td class='p-2'>" + moment(item.ngay * 1000).format("DD/MM/YYYY") +
								"</td><td class='p-1'><a class='btn btn-info btn-sm btn-chitiet p-1' href=" +
								self.getApp().serviceURL + "/?#bienbanxacnhantinhtrangthietbi/model?id=" + item.id + ">Xem chi tiết</a></td></tr>")

						})
						self.$el.find(".btn-them2").unbind("click").bind("click", function () {
							location.href = self.getApp().serviceURL + "/?#bienbanxacnhantinhtrangthietbi/model";
							sessionStorage.setItem('TenThietBi', self.model.get("tenthietbi"));
							sessionStorage.setItem('Serial', self.model.get("model_serial_number"));
							sessionStorage.setItem('Ma_qltb', self.model.get("ma_qltb"));
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