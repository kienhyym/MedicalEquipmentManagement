define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');
	var template = require('text!app/chungtu/dutoansuachuanam/tpl/model.html'),
		schema = require('json!schema/DuToanSuaChuaNamSchema.json');


	return Gonrin.ModelView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "dutoansuachuanam",
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

	
			]
		},

		render: function () {
			var self = this;
			self.$el.find(".tensp").html("Thiết bị: "+sessionStorage.getItem('TenSanPham'))
			self.model.set("thietbi_id",sessionStorage.getItem('IDSanPham'))
			self.model.set("tenthietbi",sessionStorage.getItem('TenSanPham'))

			var id = this.getApp().getRouter().getParam("id");			
			if (id) {
				this.model.set('id', id);
				this.model.fetch({
					success: function (data) {
						self.$el.find(".tensp").html("Thiết bị: "+self.model.get("tenthietbi"))
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
							self.$el.find("#danhsachyeucausuachua").append("<tr><td class='p-2'>" + item.ma_qltb + "</td><td class='p-2'>" +moment(item.ngay_suco*1000).format("DD/MM/YYYY") + "</td><td class='p-2'>" + item.nguoisudung + "</td><td class='p-1'><a class='btn btn-info btn-sm btn-chitiet p-1' href="+self.getApp().serviceURL+ "/?#phieuyeucausuachua/model?id="+item.id+">Xem chi tiết</a></td></tr>")
							
						})
						self.$el.find(".btn-them").unbind("click").bind("click", function () {
							location.href = self.getApp().serviceURL + "/?#phieuyeucausuachua/model";
							sessionStorage.setItem('TenSanPham', self.$el.find("#tensp").val());
							sessionStorage.setItem('IDSanPham', self.model.get("id"));
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