define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');
	var template = require('text!app/chungtu/bangkiemtrathietbi/tpl/model.html'),
		schema = require('json!schema/BangKiemTraThietBiSchema.json');
	var KhoaSelectView = require('app/hethong/khoa/view/SelectView');
	var PhongSelectView = require('app/hethong/phong/view/SelectView');

	return Gonrin.ModelView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "bangkiemtrathietbi",
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
									if (respose.tinhtrang == "Có vấn đề") {
										$.ajax({
											method: "POST",
											url: self.getApp().serviceURL + "/api/v1/thongbao",
											data: JSON.stringify({
												tenthietbi: respose.tenthietbi,
												model_serial_number: respose.model_serial_number,
												idloaithongbao: respose.id,
												loaithongbao: "Phiếu kiểm tra hàng ngày",
												maloaithongbao: "bangkiemtrathietbi",

												daxem: "chuaxem",
												ngaytao: respose.created_at
											}),
											headers: {
												'content-type': 'application/json'
											},
											dataType: 'json',
											success: function (response) {
												if (response) {
													self.getApp().notify("Lưu thông tin thành công");
													self.getApp().getRouter().navigate(self.collectionName + "/collection");
												}
											}, error: function (xhr, ere) {
												self.getApp().notify({ message: "Lưu thông tin không thành công" }, { type: "danger", delay: 1000 });


											}
										})
									} else {
										self.getApp().notify("Lưu thông tin thành công");
										self.getApp().getRouter().navigate(self.collectionName + "/collection");

									}



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
							self.$el.find('#ngaykiemtra').val(moment(self.model.get('ngay') * 1000).format("DD/MM/YYYY"))

							self.$el.find('#khoa').val(self.model.get('khoa').ten)
							self.$el.find('#phong').val(self.model.get('phong').ten)

							self.$el.find('#tinhtrang').val(self.model.get('tinhtrang'))
							self.$el.find('#nguoikiemtra').val(self.model.get('nguoikiemtra'))

							var x = self.$el.find("#mota2")[0].scrollHeight;
							// self.$el.find("#mota").style.height = x + 'px';
							self.$el.find("#mota")[0].style.height = x + 'px';
							self.$el.find('#mota').val(self.model.get('mota'))

							self.$el.find('#imgin').attr('src', self.model.get('attachment'))

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
					field: "tinhtrang",
					uicontrol: "combobox",
					textField: "text",
					valueField: "value",
					dataSource: [
						{ "value": "Không vấn đề", "text": "Bình thường" },
						{ "value": "Có vấn đề", "text": "Không kình thường" },

					],
				},

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
			]
		},

		render: function () {
			var self = this;
			var id = this.getApp().getRouter().getParam("id");

			var userID = self.getApp().currentUser.id
			self.$el.find(".tensp").html("Kiểm tra thiết bị: " + sessionStorage.getItem('TenThietBi'))
			self.model.set("chitietthietbi_id", sessionStorage.getItem('IDThietBi'))
			var idthietbi = sessionStorage.getItem('IDThietBi');
			self.registerEvent(idthietbi);

			self.model.set("tenthietbi", sessionStorage.getItem('TenThietBi'))
			self.model.set("model_serial_number", sessionStorage.getItem('SerialThietBi'))
			self.model.set("ma_qltb", sessionStorage.getItem('MaQLTBThietBi'))
			self.model.set("nguoikiemtra", self.getApp().currentUser.name)
			self.model.set("nguoikiemtra_id", userID)
			sessionStorage.clear();
			self.$el.find(".linkDownload").hide();
			self.$el.find("#img").hide();
			self.bindEventSelect();
			if (id) {
				this.model.set('id', id);
				this.model.fetch({
					success: function (data) {
						self.renderUpload();
						self.$el.find("#img").attr("src", "." + self.model.get('attachment'))
						self.applyBindings();
						self.cacBuoc(self.model.get('chitietthietbi_id'));
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
							self.$el.find(".linkDownload").show();
							self.$el.find("#img").show();
							self.$el.find("#img").attr("src", "." + data_file.link)

							// self.$el.find("#content").val(self.$el.find("#content").val()
						}
					} else {
						self.getApp().notify("Không thể tải tệp tin lên máy chủ");
					}
				};
				http.send(fd);
			});
		},
		registerEvent: function (IDTB) {
			const self = this;

			if (IDTB != null || IDTB != undefined) {
				var filters = {
					filters: {
						"$and": [
							{ "id": { "$eq": IDTB } }
						]
					},
					order_by: [{ "field": "created_at", "direction": "asc" }]
				}
			}
			$.ajax({
				type: "GET",
				url: self.getApp().serviceURL + "/api/v1/thietbi?results_per_page=100000&max_results_per_page=1000000",
				data: "q=" + JSON.stringify(filters),
				contentType: "application/json",
				success: function (response) {
					var quytrinh = response.objects[0].quytrinhkiemtrafield;
					quytrinh.forEach(function (item, index) {
						self.$el.find('#quytrinhkiemtra').append(`
						<div class="row col-md-12">
							<div class="col-md-1 p-0 mt-3 buoc">
									<div class="text-center">
										<label class='m-0'>Click để xem hướng dẫn</label>
										<h1 class='m-0 stt'>01</h1>
										<i class="fa fa-chevron-down fa-3x" aria-hidden="true"></i>
									</div>
							</div>
							<div class="row col-md-11 mr-0 pr-0 huongdan" style="display:none">
								<div class="col-md-9 p-1"><textarea rows="8" type="text" class="form-control">${item.noidungkiemtra}</textarea></div>
								<div class="col-md-3 d-flex align-items-center justify-content-center p-0"><img src="static/img/user.png" height="170px" width="170px" style="border-radius: 6px;" class="p-0"></div>
							</div>

							<div class="row col-md-11 m-0 p-0 text-center pt-1 kiemtra">
								<div class="col-md-3">
								<div class="col-md-12">
									<label>Thời gian</label>
									<input type="text" class="form-control" placeholder="..." required="" >
								</div>
								<br>
								<div class="col-md-12">
									<label>Trạng thái</label>
									<input type="text" class="form-control trangthai" placeholder="..." required="" >
								</div>
								</div>
								<div class="col-md-6">
									<label>Ghi chú</label>
									<textarea rows="6" style="padding:1px" type="text" class="form-control ghichu" placeholder="..." required=""></textarea>
								</div>
								<div class="col-md-2">
									<label>Hình ảnh</label>
									<div class="d-flex align-items-center justify-content-center p-0"><img src="static/img/user.png" height="120px" width="120px" style="border-radius: 6px;" class="p-0"></div>
								</div>
								<div class="col-md-1">
									<label>&nbsp;</label>
									<button class="btn btn-primary mt-5 btn-Luu">Lưu</button>
								</div>
							</div> 
						</div>
						<hr>`)
					})
					self.$el.find('.buoc').click(function () {
						$(".huongdan").toggle();
						$(".kiemtra").toggle();
					});
					self.$el.find('.stt').each(function (index, item) {
						$(item).html(index + 1)
					});
					self.$el.find('.trangthai').each(function (index, item) {
						$(item).combobox({
							textField: "text",
							valueField: "value",
							allowTextInput: true,
							enableSearch: true,
							dataSource: [
								{ text: "không bình thường", value: "khong binh thuong" },
								{ text: "bình thường", value: "binh thuong" },

							],

						});
					});

					self.$el.find('.btn-Luu').each(function (index, item) {
						// var self = this;
						$(item).unbind('click').bind('click', function () {
							self.model.save(null, {
								success: function (model, respose, options) {
									$.ajax({
										url: self.getApp().serviceURL + "/api/v1/luucacbuoc",
										method: "POST",
										data: JSON.stringify({
											id: gonrin.uuid(),
											ghichu: $(self.$el.find('.ghichu')[index]).val(),
											hinhanh: "",
											thoigian: moment(moment().unix() * 1000).format("HH:mm"),
											buockiemtra: index + 1,
											tinhtrang: $(self.$el.find('.trangthai')[index]).val(),
											bangkiemtrathietbi_id: self.model.get('id')
										}),
										contentType: "application/json",
										success: function (data) {
											self.getApp().notify({ message: "Lưu thành công" });
											window.location = self.getApp().serviceURL + "/#bangkiemtrathietbi/model?id=" + self.model.get('id');
										},
										error: function (xhr, status, error) {
											self.getApp().notify({ message: "Lỗi không lấy được dữ liệu" }, { type: "danger", delay: 1000 });
										},


									})
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

						})


					});
				}
			});
		},
		cacBuoc: function (IDTB) {
			var self = this;
			if (IDTB != null || IDTB != undefined) {
				var filters = {
					filters: {
						"$and": [
							{ "id": { "$eq": IDTB } }
						]
					},
					order_by: [{ "field": "created_at", "direction": "asc" }]
				}
			}
			$.ajax({
				type: "GET",
				url: self.getApp().serviceURL + "/api/v1/chitietthietbi?results_per_page=100000&max_results_per_page=1000000",
				data: "q=" + JSON.stringify(filters),
				contentType: "application/json",
				success: function (response) {
					var quytrinh = response.objects[0].quytrinhkiemtrafield;
					quytrinh.forEach(function (item, index) {
						self.$el.find('#quytrinhkiemtra').append(`

						<div class="row col-md-12">
							<div class="col-md-1 p-0 mt-3 buoc">
									<div class="text-center">
										<label class='m-0'>Click để xem hướng dẫn</label>
										<h1 class='m-0 stt'>01</h1>
										<i class="fa fa-chevron-down fa-3x" aria-hidden="true"></i>
									</div>
							</div>
							<div class="row col-md-11 mr-0 pr-0 huongdan" style="display:none">
								<div class="col-md-9 p-1"><textarea rows="8" type="text" class="form-control">${item.noidungkiemtra}</textarea></div>
								<div class="col-md-3 d-flex align-items-center justify-content-center p-0"><img src="static/img/user.png" height="170px" width="170px" style="border-radius: 6px;" class="p-0"></div>
							</div>

							<div class="row col-md-11 m-0 p-0 text-center pt-1 kiemtra">
								<div class="col-md-3">
								<div class="col-md-12">
									<label>Thời gian</label>
									<input type="text"  class="form-control thoigian" placeholder="..." required="" >
								</div>
								<br>
								<div class="col-md-12">
									<label>Trạng thái</label>
									<input type="text" class="form-control trangthai" placeholder="..." required="" >
								</div>
								</div>
								<div class="col-md-6">
									<label>Ghi chú</label>
									<textarea rows="6"  type="text" class="form-control ghichu" placeholder="..." required=""></textarea>
								</div>
								<div class="col-md-2">
									<label>Hình ảnh</label>
									<div class="d-flex align-items-center justify-content-center p-0"><img src="static/img/user.png" height="120px" width="120px" style="border-radius: 6px;" class="p-0"></div>
								</div>
								<div class="col-md-1">
									<label>&nbsp;</label>
									<button class="btn btn-primary mt-5 btn-Luu">Lưu</button>
								</div>
							</div> 
						</div>
						<hr>`)
					})
					self.$el.find('.buoc').click(function () {
						$(".huongdan").toggle();
						$(".kiemtra").toggle();

					});
					self.giaTriCacBuoc(self.model.get('id'));
					self.dahoanthoanhkiemtra(self.model.get('id'))
					self.$el.find('.stt').each(function (index, item) {
						$(item).html(index + 1)
					});

					self.$el.find('.btn-Luu').each(function (index, item) {
						$(item).unbind('click').bind('click', function () {
							$.ajax({
								url: self.getApp().serviceURL + "/api/v1/luucacbuoc",
								method: "POST",
								data: JSON.stringify({
									ghichu: $(self.$el.find('.ghichu')[index]).val(),
									hinhanh: "",
									thoigian: moment(moment().unix() * 1000).format("HH:mm"),
									buockiemtra: index + 1,
									tinhtrang: $(self.$el.find('.trangthai')[index]).val(),
									bangkiemtrathietbi_id: self.model.get('id')
								}),
								contentType: "application/json",
								success: function (data) {
									self.getApp().notify({ message: "Lưu thành công" });
									self.getApp().getRouter().refresh();
								},
								error: function (xhr, status, error) {
									self.getApp().notify({ message: "Lỗi không lấy được dữ liệu" }, { type: "danger", delay: 1000 });
								},

							})
						})
					});
				}
			});

		},
		giaTriCacBuoc: function (id) {
			var self = this;
			var filters = {
				filters: {
					"$and": [
						{ "bangkiemtrathietbi_id": { "$eq": id } }
					]
				},
				order_by: [{ "field": "buockiemtra", "direction": "asc" }]
			}

			$.ajax({
				url: self.getApp().serviceURL + "/api/v1/buockiemtra",
				method: "GET",
				data: "q=" + JSON.stringify(filters),
				contentType: "application/json",
				success: function (data) {
					data.objects.forEach(function (item, index) {
						$(self.$el.find('.thoigian')[item.buockiemtra - 1]).val(item.thoigian)
						$(self.$el.find('.ghichu')[item.buockiemtra - 1]).val(item.ghichu)
						$(self.$el.find('.trangthai')[item.buockiemtra - 1]).combobox({
							textField: "text",
							valueField: "value",
							allowTextInput: true,
							enableSearch: true,
							dataSource: [
								{ text: "không bình thường", value: "khong binh thuong" },
								{ text: "bình thường", value: "binh thuong" },
							],
							value: item.tinhtrang
						});
					})
				},
				error: function (xhr, status, error) {
					self.getApp().notify({ message: "Lỗi không lấy được dữ liệu" }, { type: "danger", delay: 1000 });
				},

			})
		},
		dahoanthoanhkiemtra: function (id) {
			var self = this;
			var filters = {
				filters: {
					"$and": [
						{ "bangkiemtrathietbi_id": { "$eq": id } }
					]
				},
				order_by: [{ "field": "buockiemtra", "direction": "asc" }]
			}

			$.ajax({
				url: self.getApp().serviceURL + "/api/v1/buockiemtra",
				method: "GET",
				data: "q=" + JSON.stringify(filters),
				contentType: "application/json",
				success: function (data) {
					data.objects.forEach(function (item, index) {
						$(self.$el.find('.fa-chevron-down')[item.buockiemtra - 1]).css("color","green")
						$(self.$el.find('.stt')[item.buockiemtra - 1]).css("color","green")

					})
				},
				error: function (xhr, status, error) {
					self.getApp().notify({ message: "Lỗi không lấy được dữ liệu" }, { type: "danger", delay: 1000 });
				},

			})
		}
	});
});



