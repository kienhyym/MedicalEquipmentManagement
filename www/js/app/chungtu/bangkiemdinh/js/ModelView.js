define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');
	var template = require('../../../../../../static/app/chungtu/certificateform/js/node_modules/text!app/chungtu/certificateform/tpl/model.html'),
		schema = require('../../../../../../static/app/chungtu/certificateform/js/node_modules/json!schema/BangKiemDinhSchema.json.js');
	var KhoaSelectView = require('app/hethong/department/view/SelectView');
	var PhongSelectView = require('app/hethong/room/view/SelectView');

	return Gonrin.ModelView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "certificateform",
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

							self.$el.find('#name').val(self.model.get('name'))
							self.$el.find('#serial').val(self.model.get('model_serial_number'))
							self.$el.find('#maqltb').val(self.model.get('management_code'))
							self.$el.find('#matem').val(self.model.get('code'))
							self.$el.find('#dvkiemdinh').val(self.model.get('organization'))

							self.$el.find('#date_of_certification').val(moment(self.model.get('date_of_certification') * 1000).format("DD/MM/YYYY"))
							self.$el.find('#expiration_date').val(moment(self.model.get('expiration_date') * 1000).format("DD/MM/YYYY"))
							self.$el.find('#imgin').attr('src', self.model.get('attachment_image'))

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
					field: "date_of_certification",
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
					field: "expiration_date",
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
			
			var app = {
				init: function () {
					self.$el.find('#btn').on('click', app.takephoto)
				},
				takephoto: function () {
					let opts = {
						quality: 80,
						destinationType: Camera.DestinationType.FILE_URI,
						sourceType: Camera.PictureSourceType.CAMERA,
						mediaType: Camera.MediaType.PICTURE,
						encodingType: Camera.EncodingType.JPEG,
						cameraDirection: Camera.Direction.BACK,
						targetWidth: 300,
						targetHeight: 400,
						// saveToPhotoAlbum: true,
						// correctOrientation: true

					};
					navigator.camera.getPicture(app.ftw, app.wtf, opts);
				},
				ftw: function (imgURI) {
					function getFileEntry(imgUri) {
						window.resolveLocalFileSystemURL(imgUri, function success(fileEntry) {

							// Do something with the FileEntry object, like write to it, upload it, etc.
							// writeFile(fileEntry, imgUri);
							console.log("got file: " + fileEntry.toInternalURL());
							// displayFileData(fileEntry.nativeURL, "Native URL");
							function readFile(fileEntry) {

								fileEntry.file(function (file) {
									var reader = new FileReader();


									reader.readAsText(file);
									const toBase64 = file => new Promise((resolve, reject) => {
										const reader = new FileReader();
										reader.readAsDataURL(file);
										reader.onload = () => resolve(reader.result);
										reader.onerror = error => reject(error);
									});

									async function Main() {
										var base64URL = await toBase64(file);
										self.$el.find('#photo1,#photo2').show();
										self.$el.find('#photo1').attr('src',base64URL);

										$.ajax({
											method: "POST",
											url: "http://103.74.122.206:20808/api/v1/upload/file2",
											data: JSON.stringify({
												files: base64URL.slice(23),
											}),
											headers: {
												'content-type': 'application/json'
											},
											dataType: 'json',
											success: function (response) {
												console.log('ok',response)
												self.model.set('attachment_image',response.url_img)
											}, error: function (xhr, ere) {
												console.log('xhr', ere);

											}
										})
									}

									Main();
								});
							}
							readFile(fileEntry)
						});
					}
					getFileEntry(imgURI)
					console.log('imgURI_-----------------', imgURI)

				},
				wtf: function (msg) {
					console.log('msg', msg)
					self.$el.find('#msg').textContent = msg;
				},

			};
			document.addEventListener('deviceready', app.init);
			
			self.model.set("equipmentdetails_id", sessionStorage.getItem('IDThietBi'))
			self.model.set("name", sessionStorage.getItem('TenThietBi'))
			self.model.set("model_serial_number", sessionStorage.getItem('SerialThietBi'))
			self.model.set("management_code", sessionStorage.getItem('MaQLTBThietBi'))
			sessionStorage.clear();

			var id = this.getApp().getRouter().getParam("id");
			if (id) {
				this.model.set('id', id);
				this.model.fetch({
					success: function (data) {
						if(self.model.get('attachment_image') != null){
							self.$el.find('#photo1,#photo2').show();
							self.$el.find('#photo1').attr("src", "http://sothietbi.com/static/uploads/" +self.model.get('attachment_image'))
						}
						
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