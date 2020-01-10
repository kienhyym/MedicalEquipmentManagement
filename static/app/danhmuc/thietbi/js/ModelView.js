define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');
	var template = require('text!app/danhmuc/thietbi/tpl/model.html'),
		schema = require('json!schema/ThietBiSchema.json');
	var QuyTrinhKiemTraView = require('app/danhmuc/thietbi/js/QuyTrinhKiemTraView');


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
						{ "value": "A", "text": "TTBYT Loại A" },
						{ "value": "B", "text": "TTBYT Loại B " },
						{ "value": "C", "text": "TTBYT Loại C " },
						{ "value": "D", "text": "TTBYT Loại D " },
					],
				},
				{
					field: "danhsachhanche",
					uicontrol: "combobox",
					textField: "text",
					valueField: "value",
					dataSource: [
						{ "value": "kimloainang", "text": "Thải kim loại nặng" },
						{ "value": "hoachatkhongthanthien", "text": "Hóa chất không thân thiện" },
						{ "value": "khong", "text": "Không" },
					],
				},
				{
					field: "chungloailoaithietbi",
					uicontrol: "combobox",
					textField: "text",
					valueField: "value",
					dataSource: [
						{ "value": "1", "text": "Máy xét nhiệm" },
						{ "value": "2", "text": "Máy chuẩn đoán hình ảnh " },
						{ "value": "3", "text": "Máy thăm dò chức năng" },
						{ "value": "4", "text": "Thiết bị hấp sấy " },
						{ "value": "5", "text": "Thiết bị hỗ trợ sinh tồn " },
						{ "value": "6", "text": "Robot" },
						{ "value": "7", "text": "Thiết bi miễn dịch" },
						{ "value": "8", "text": "Thiết bị lọc và hỗ trợ chức năng " },
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
			self.bindEventSelect();

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
							self.$el.find("#danhsachthietbi").append("<tr><td class='p-2'>" + item.model_serial_number + "</td><td class='p-2'>" + item.ma_qltb + "</td><td class='p-2'>" + item.trangthai + "</td><td class='p-1'><a class='btn btn-info btn-sm btn-chitiet p-1' href=" + self.getApp().serviceURL + "/?#chitietthietbi/model?id=" + item.id + ">Xem chi tiết</a></td></tr>")

						})
						self.applyBindings();
						self.$el.find(".btn-them").unbind("click").bind("click", function () {
							location.href = self.getApp().serviceURL + "/?#chitietthietbi/model";
							sessionStorage.setItem('TenSanPham', self.$el.find("#tensp").val());
							sessionStorage.setItem('IDSanPham', self.model.get("id"));
							sessionStorage.setItem('ChungLoai', self.model.get("chungloailoaithietbi"));
						})
						var quytrinhkiemtra = self.model.get("quytrinhkiemtrafield");
						quytrinhkiemtra.sort(function(a, b){
							if (a.buockiemtra< b.buockiemtra) {return -1;}
							if (a.buockiemtra > b.buockiemtra) {return 1;}
							return 0;
						});
						console.log(quytrinhkiemtra)
						if (quytrinhkiemtra === null) {
							self.model.set("quytrinhkiemtrafield", []);
						}
						$.each(quytrinhkiemtra, function (idx, value) {
							self.registerEvent(value);
						});
						self.cacBuoc();
						self.hinhanh();
						self.chieucaonoidung();
						self.chieurongnoidung();

					},
					error: function () {
						self.getApp().notify("Get data Eror");
					},
					complete: function () {

						self.$el.find("#btn_add").unbind("click").bind("click", () => {
							console.log('xxxx')
							if (self.$el.find("#noidung").val() !== "") {
								var data_default = {
									"id": gonrin.uuid(),
									"buockiemtra": self.model.get("quytrinhkiemtrafield").length + 1,
									// "thoigian": moment(moment().unix() * 1000).format(" HH:mm"),
									"hinhanh": null,
									"noidungkiemtra": self.$el.find('#noidung').val(),
									// "tranghthai": null,
								}
								var quytrinhkiemtra = self.model.get("quytrinhkiemtrafield");
								if (quytrinhkiemtra === null) {
									quytrinhkiemtra = [];
								}

								quytrinhkiemtra.push(data_default);
								self.model.set("quytrinhkiemtrafield", quytrinhkiemtra)
								self.applyBindings("quytrinhkiemtrafield");

								self.registerEvent(data_default);
								self.$el.find('#quytrinhkiemtra div .row .stt').each(function (index, item) {
									$(item).html('Bước ' + (index + 1))
								})
								// self.$el.find('.noidungkiemtra').each(function (index, item) {
								// 	$(item).addClass('col-md-12')
								// })
								// self.$el.find('.hinhanh').each(function (index, item) {
								// 	$(item).css("display", "none");
								// })

								$(self.$el.find('.noidungkiemtra')[quytrinhkiemtra.length - 1]).addClass('col-md-12')
								$(self.$el.find('.hinhanh')[quytrinhkiemtra.length - 1]).css("display", "none");

								self.model.save(null, {
									success: function (model, respose, options) {
										self.$el.find("#noidung").val("")
										self.getApp().notify("Lưu thông tin thành công");
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
								// self.$el.find('#quytrinhkiemtra div .row .tg').each(function (index, item) {
								// 	// $(item).val(moment(moment().unix() * 1000).format("DD/MM/YYYY"))
								// })

							}

						});
					}
				});
			} else {
				self.applyBindings();
			}
		},
		registerEvent: function (data) {
			
			
			const self = this;
			var QuyTrinhKiemTraItem = new QuyTrinhKiemTraView();
			if (!!data) {
				QuyTrinhKiemTraItem.model.set(JSON.parse(JSON.stringify(data)));
			}
			QuyTrinhKiemTraItem.render();
			self.$el.find("#quytrinhkiemtra").append(QuyTrinhKiemTraItem.$el);
			QuyTrinhKiemTraItem.on("change", function (event) {
				var quytrinhkiemtra = self.model.get("quytrinhkiemtrafield");
				
				if (quytrinhkiemtra === null) {
					quytrinhkiemtra = [];
					quytrinhkiemtra.push(event.data)
				}
				for (var i = 0; i < quytrinhkiemtra.length; i++) {
					if (quytrinhkiemtra[i].id == event.oldData.id) {
						quytrinhkiemtra[i] = event.data;
						break;
					}
				}
				self.model.set("quytrinhkiemtrafield", quytrinhkiemtra);
				self.applyBindings("quytrinhkiemtrafield");
			})

			QuyTrinhKiemTraItem.$el.find("#itemRemove").unbind("click").bind("click", function () {

				var quytrinhkiemtra = self.model.get("quytrinhkiemtrafield");
				for (var i = 0; i < quytrinhkiemtra.length; i++) {
					if (quytrinhkiemtra[i].id === QuyTrinhKiemTraItem.model.get("id")) {
						quytrinhkiemtra.splice(i, 1);
					}
				}
				self.model.set("quytrinhkiemtrafield", quytrinhkiemtra);
				self.applyBinding("quytrinhkiemtrafield");
				QuyTrinhKiemTraItem.destroy();
				QuyTrinhKiemTraItem.remove();
				self.model.save(null, {
					success: function (model, respose, options) {
						
						self.getApp().notify("Xóa thông tin thành công");
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
			});


		},
		cacBuoc: function () {
			var self = this;
			self.$el.find('#quytrinhkiemtra div .row .stt').each(function (index, item) {
				$(item).append('Bước ', index + 1)
			})
		},
		chieucaonoidung: function () {
			var self = this;
			self.$el.find(".noidungthuchien").each(function (index, item) {
				var x = $(item)[0].scrollHeight;
				$(item)[0].style.height = x + 'px';
			})
		},
		chieurongnoidung: function () {
			var self = this;
			self.$el.find(".hinhanhthietbi").each(function (index, item) {
				console.log($(item).attr("src"))
				// if ($(item).attr("src") !== "") {

				// 	self.$el.find(".noidungkiemtra").each(function (index, item) {
				// 		$(item).addClass('col-md-8')
				// 	})
				// 	self.$el.find(".hinhanh").each(function (index, item) {
				// 		$(item).addClass('col-md-4')
				// 	})
				// }
				// else {
				// 	$(self.$el.find(".hinhanh")[index]).css("display", "none")
				// }
			})

		},
		hinhanh: function () {
			var self = this;
			console.log()
			var filters = {
				filters: {
					"$and": [
						{ "thietbi_id": { "$eq": self.model.get('id') } }
					]
				},
				order_by: [{ "field": "buockiemtra", "direction": "asc" }]
			}
			$.ajax({
				url: self.getApp().serviceURL + "/api/v1/quytrinhkiemtra?results_per_page=100000&max_results_per_page=1000000",
				method: "GET",
				data: { "q": JSON.stringify(filters) },
				contentType: "application/json",
				success: function (data) {
					data.objects.forEach(function (item, index) {
						if (item.hinhanh !== null) {
							$(self.$el.find('.hinhanhthietbi')[index]).attr("src", item.hinhanh)
							$(self.$el.find(".noidungkiemtra")[index]).addClass('col-md-8')
							$(self.$el.find(".hinhanh")[index]).addClass('col-md-4')
						}
						else {
							$(self.$el.find(".noidungkiemtra")[index]).addClass('col-md-12')
							$(self.$el.find(".hinhanh")[index]).css("display", "none")
						}
					})

				}
			})
		},
		// renderUpload() {
		// 	var self = this;
		// 	self.$el.find(".linkDownload").attr("href", self.model.get("attachment"));
		// 	self.$el.find(".linkDownload").show();
		// 	self.$el.find("#img").show();
		// },
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
							var linkhinhanh = data_file.link;
							self.$el.find('#hinhanhnho').attr("src", data_file.link)

							// console.log('data_file.link',data_file.link)

							self.$el.find("#btn_add").unbind("click").bind("click", () => {
								if (self.$el.find("#noidung").val() !== "") {
									var data_default = {
										"id": gonrin.uuid(),
										"buockiemtra": self.model.get("quytrinhkiemtrafield").length + 1,
										// "thoigian": moment(moment().unix() * 1000).format(" HH:mm"),
										"hinhanh": linkhinhanh,
										"noidungkiemtra": self.$el.find('#noidung').val(),
										// "tranghthai": null,
									}

									var quytrinhkiemtra = self.model.get("quytrinhkiemtrafield");
									if (quytrinhkiemtra === null) {
										quytrinhkiemtra = [];
									}
									quytrinhkiemtra.push(data_default);
									self.model.set("quytrinhkiemtrafield", quytrinhkiemtra)
									self.applyBindings("quytrinhkiemtrafield");

									self.registerEvent(data_default);
									self.$el.find('#quytrinhkiemtra div .row .stt').each(function (index, item) {
										$(item).html('Bước ' + (index + 1))
									})
									if (linkhinhanh != null) {
										$(self.$el.find('.noidungkiemtra')[quytrinhkiemtra.length - 1]).addClass('col-md-8')
										$(self.$el.find('.hinhanh')[quytrinhkiemtra.length - 1]).addClass('col-md-4')
										$(self.$el.find('.hinhanhthietbi')[quytrinhkiemtra.length - 1]).attr("src", linkhinhanh)
										self.model.save(null, {
											success: function (model, respose, options) {
												self.$el.find('#hinhanhnho').removeAttr("src")
												self.$el.find("#noidung").val("")
												linkhinhanh = null;
												self.getApp().notify("Lưu thông tin thành công");
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
									else {
										$(self.$el.find('.noidungkiemtra')[quytrinhkiemtra.length - 1]).addClass('col-md-12')
										$(self.$el.find('.hinhanh')[quytrinhkiemtra.length - 1]).css("display", "none");
										self.model.save(null, {
											success: function (model, respose, options) {
												self.$el.find('#hinhanhnho').removeAttr("src")
												self.$el.find("#noidung").val("")
												linkhinhanh = null;
												self.getApp().notify("Lưu thông tin thành công");
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
							});
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