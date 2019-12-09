define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');
	var template = require('text!app/chungtu/bangkiemdinh/tpl/model.html'),
		schema = require('json!schema/BangKiemDinhSchema.json');
	var KhoaSelectView = require('app/hethong/khoa/view/SelectView');
	var PhongSelectView = require('app/hethong/phong/view/SelectView');

	return Gonrin.ModelView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "bangkiemdinh",
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
									var data = {
										tenthietbi: respose.tenthietbi,
										ma_qltb: respose.ma_qltb,
										model_serial_number: respose.model_serial_number,
										ngaykiemdinh: respose.ngayhethan,
										chitietthietbi_id: respose.chitietthietbi_id,
										kiemdinh: respose.id,
									}
									$.ajax({
										type: "POST",
										url: self.getApp().serviceURL + "/api/v1/kehoachhangngay",
										data: JSON.stringify(data),
										success: function (response) {
											self.getApp().notify("Lưu thông tin thành công");
											self.getApp().getRouter().navigate(self.collectionName + "/collection");
										},
										error: function (response) {
											self.getApp().notify({ message: "Lưu không thành công" }, { type: "danger", delay: 1000 });
										}
									});



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
					field: "ngaycap",
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
					field: "ngayhethan",
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
			self.$el.find(".linkDownload").hide();
			self.$el.find("#img").hide();
			self.$el.find("#title").hide();

			self.bindEventSelect();
			var id = this.getApp().getRouter().getParam("id");
			if (id) {
				this.model.set('id', id);
				this.model.fetch({
					success: function (data) {
						self.renderUpload();
						self.$el.find("#img").attr("src","."+self.model.get('attachment'))

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
		renderUpload() {
			var self = this;
		
			self.$el.find(".linkDownload").attr("href", self.model.get("attachment"));
			self.$el.find(".linkDownload").show();
			self.$el.find("#img").show();
			self.$el.find("#title").show();

		},
		bindEventSelect: function () {
			var self = this;

			self.$el.find(".upload_files").on("change", function () {
				var http = new XMLHttpRequest();
				var fd = new FormData();

				var data_attr = $(this).attr("data-attr");
				fd.append('file', this.files[0]);
				http.open('POST', '/api/v1/upload/file');

				http.upload.addEventListener('progress', function (evt) {
					if (evt.lengthComputable) {
						var percent = evt.loaded / evt.total;
						percent = parseInt(percent * 100);

					}
				}, false);
				http.addEventListener('error', function () {
				}, false);

				http.onreadystatechange = function () {
					if (http.status === 200) {
						if (http.readyState === 4) {
							var data_file = JSON.parse(http.responseText), link, p, t;
							self.getApp().notify("Tải file thành công");
							self.model.set(data_attr, data_file.link);
							self.$el.find("#title").show();
							self.$el.find("#img").show();
							self.$el.find("#img").attr("src","."+data_file.link)

							// self.$el.find("#content").val(self.$el.find("#content").val()
						}
					} else {
						self.getApp().notify("Không thể tải tệp tin lên máy chủ");
					}
				};
				http.send(fd);
			});
		},
	});
});