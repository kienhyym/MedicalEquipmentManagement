define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');
	var template = require('text!app/chungtu/phieuyeucausuachua/tpl/model.html'),
		schema = require('json!schema/PhieuYeuCauSuaChuaSchema.json');


	return Gonrin.ModelView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "phieuyeucausuachua",
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
						buttonClass: "btn-default btn-sm  btn-secondary",
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

									$.ajax({
										method: "POST",
										url: self.getApp().serviceURL + "/api/v1/thongbao",
										data: JSON.stringify({
											tenthietbi: respose.tenthietbi,
											model_serial_number: respose.model_serial_number,
											idloaithongbao: respose.id,
											loaithongbao: "Phiếu yêu cầu sửa chữa",
											maloaithongbao: "phieuyeucausuachua",
											daxem: "chuaxem",
											ngaytao: respose.created_at
										}),
										headers: {
											'content-type': 'application/json'
										},
										dataType: 'json',
										success: function (response) {
											if (response) {
										}
										}, error: function (xhr, ere) {
											console.log('xhr', ere);

										}
									})

									$.ajax({
										method: "PUT",
										url: self.getApp().serviceURL + "/api/v1/chitietthietbi/"+self.model.get('chitietthietbi_id'),
										data: JSON.stringify({
											trangthai: "dangsuachua",
											
										}),
										headers: {
											'content-type': 'application/json'
										},
										dataType: 'json',
										success: function (response) {
											if (response) {
							
											}
										}, error: function (xhr, ere) {
											console.log('xhr', ere);

										}
									})


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
						name: "&nbsp; In &nbsp; ",
						type: "button",
						buttonClass: "btn-primary btn-sm",
						// label: "TRANSLATE:Xóa",
						visible: function () {
							return this.getApp().getRouter().getParam("id") !== null;
						},
						command: function () {
							var self = this;
							// self.$el.find('#xxx').on('click', function () {
							self.$el.find('#printJS-form').show();
							self.$el.find('.bodynay').hide();

							self.$el.find('#tenthietbi').val(self.model.get('tenthietbi'))
							self.$el.find('#serial').val(self.model.get('model_serial_number'))
							self.$el.find('#maqltb').val(self.model.get('ma_qltb'))
							self.$el.find('#nguoisundung').val(self.model.get('nguoisudung'))
							self.$el.find('#donvi').val(self.model.get('donvisudung'))
							self.$el.find('#ngayxayrasuco').val(moment(self.model.get('ngay_suco') * 1000).format("DD/MM/YYYY"))
							// var x = self.$el.find("#mota")[0].scrollHeight;
							// console.log(x)
							// self.$el.find("#mota")[0].style.height =  x + 'px';
							self.$el.find('#mota').val(self.model.get('motasuco'))
							self.$el.find('#ngaydanhgia').val(moment(self.model.get('ngay_danhgia') * 1000).format("DD/MM/YYYY"))
							self.$el.find('#motasuco').val(self.model.get('danhgiasobo'))

							self.$el.find('#ykien').val(self.model.get('ykienlanhdao'))
							self.$el.find('#motaketqua').val(self.model.get('ketqua'))
							self.$el.find('#ngayketqua').val(moment(self.model.get('ngay_ketqua') * 1000).format("DD/MM/YYYY"))
							new printJS({ printable: 'printJS-form', font_size: '30px;', type: 'html', css: 'static/css/style.css' });
							self.getApp().getRouter().refresh();

							// })
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
					field: "ngay_suco",
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
					field: "ngay_danhgia",
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
					field: "ngay_ketqua",
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
			self.model.set("chitietthietbi_id", sessionStorage.getItem('IDThietBi'))
			self.model.set("tenthietbi", sessionStorage.getItem('TenThietBi'))
			self.model.set("model_serial_number", sessionStorage.getItem('SerialThietBi'))
			self.model.set("ma_qltb", sessionStorage.getItem('MaQLTBThietBi'))
			sessionStorage.clear();
			var id = this.getApp().getRouter().getParam("id");
			if (id) {
				this.model.set('id', id);
				this.model.fetch({
					success: function (data) {
						// self.$el.find(".tensp").html("PHIẾU YÊU CẦU SỬA CHỮA THIẾT BỊ: "+self.model.get("tenthietbi"))
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