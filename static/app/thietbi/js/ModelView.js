define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');
	var template = require('text!app/thietbi/tpl/model.html'),
		schema = require('json!schema/ThietBiSchema.json');


	return Gonrin.ModelView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "thietbi",
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
						{ "value": "A", "text": "TTBYT Loại A (mức độ rủi ro thấp.)" },
						{ "value": "B", "text": "TTBYT Loại B (mức độ rủi ro trung bình thấp.)" },
						{ "value": "C", "text": "TTBYT Loại C (mức độ rủi ro trung bình cao.)" },
						{ "value": "D", "text": "TTBYT Loại D(mức độ rủi ro cao.)" },
					],
				},
				{
					field: "tinhtrang",
					uicontrol: "combobox",
					textField: "text",
					valueField: "value",
					dataSource: [
						{ "value": "Đang lưu hành", "text": "Đang lưu hành" },
						{ "value": "Ngừng lưu hành", "text": "Ngừng lưu hành" },
						{ "value": "Cấm lưu hành", "text": "Cấm lưu hành" },
					],
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
						var danhsachsanpham = self.model.get('chitietsanphamfield');
						danhsachsanpham.sort(function (a, b) {
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
						danhsachsanpham.forEach(function (item, index) {
							self.$el.find("#danhsachthietbi").append("<tr><td class='p-2'>" + item.model_serial_number + "</td><td class='p-2'>" + item.nhanhieu + "</td><td class='p-2'>" + item.made_in + "</td><td class='p-1'><a class='btn btn-info btn-sm btn-chitiet p-1' href="+self.getApp().serviceURL+ "/?#chitietthietbi/model?id="+item.id+">Xem chi tiết</a></td></tr>")
							
						})
						self.applyBindings();
						self.$el.find(".btn-them").unbind("click").bind("click", function () {
							location.href = self.getApp().serviceURL + "/?#chitietthietbi/model";
							sessionStorage.setItem('TenSanPham', self.$el.find("#tensp").val());
							sessionStorage.setItem('IDSanPham', self.model.get("id"));
						})
						
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