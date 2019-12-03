define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');
	var template = require('text!app/chungtu/bienbanxacnhantinhtrangthietbi/tpl/model.html'),
		schema = require('json!schema/BienBanXacNhanTinhTrangThietBiSchema.json');


	return Gonrin.ModelView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "bienbanxacnhantinhtrangthietbi",
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
				],
			}],
		uiControl: {
			fields: [
			
				// {
				// 	field: "phanloai",
				// 	uicontrol: "combobox",
				// 	textField: "text",
				// 	valueField: "value",
				// 	dataSource: [
				// 		{ "value": "A", "text": "Loại A (mức độ rủi ro thấp.)" },
				// 		{ "value": "B", "text": "Loại B (mức độ rủi ro trung bình thấp.)" },
				// 		{ "value": "C", "text": "Loại C (mức độ rủi ro trung bình cao.)" },
				// 		{ "value": "D", "text": "Loại D (mức độ rủi ro cao.)" },
				// 	],
				// },
				// {
				// 	field: "trangthai",
				// 	uicontrol: "combobox",
				// 	textField: "text",
				// 	valueField: "value",
				// 	dataSource: [
				// 		{ "value": "Đã gửi yêu cầu sửa chữa", "text": "Đã gửi yêu cầu sửa chữa" },
				// 		{ "value": "Đang sửa chữa", "text": "Đang sửa chữa" },
				// 		{ "value": "Đang chờ kiểm duyệt", "text": "Đang chờ kiểm duyệt" },
				// 		{ "value": "Đã kiểm duyệt", "text": "Đã kiểm duyệt" },
				// 	],
				// },

				{
					field: "ngay",
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
			]
		},

		render: function () {
			var self = this;
			self.$el.find(".tensp").html("Thiết bị: "+sessionStorage.getItem('TenThietBi'))
			self.model.set("chitietthietbi_id",sessionStorage.getItem('IDThietBi'))
			self.model.set("tenthietbi",sessionStorage.getItem('TenThietBi'))
			self.model.set("ma_qltb",sessionStorage.getItem('Ma_qltb'))
			self.model.set("model_serial_number",sessionStorage.getItem('Serial'))
			// sessionStorage.clear();


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