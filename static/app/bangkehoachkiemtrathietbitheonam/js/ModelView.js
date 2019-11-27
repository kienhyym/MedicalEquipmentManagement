define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');
	var template = require('text!app/bangkehoachkiemtrathietbitheonam/tpl/model.html'),
		schema = require('json!schema/BangKeHoachKiemTraThietBiTheoNamSchema.json');
	var ThietBiDuocKiemTraItemView = require('app/bangkehoachkiemtrathietbitheonam/js/ThietBiDuocKiemTraView');


	return Gonrin.ModelView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "bangkehoachkiemtrathietbitheonam",
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


			]
		},

		render: function () {
			var self = this;
			self.$el.find('.dialogView').hide();

			var id = this.getApp().getRouter().getParam("id");
			if (id) {
				this.model.set('id', id);
				this.model.fetch({
					success: function (data) {
						self.$el.find('.close').on('click', function () {
							self.$el.find('.dialogView').hide();
							self.getApp().getRouter().refresh();

						})
						var datathietbiduockiemtrafield = self.model.get("thietbiduockiemtrafield");
						if (datathietbiduockiemtrafield === null) {

							self.model.set("thietbiduockiemtrafield", []);
						}

						$.each(datathietbiduockiemtrafield, function (idx, value) {

							self.render_thietbiduockiemtra(value);

						});
						self.setThietBiID();
						self.applyBindings();

					},
					error: function () {
						self.getApp().notify("Get data Eror");
					},
					complete: function () {
						self.btn_add_row();

					}
				});
			} else {
				self.applyBindings();
				self.btn_add_row();

			}
		},
		render_thietbiduockiemtra: function (data) {
			var self = this;
			var thietBiDuocKiemTraItemView = new ThietBiDuocKiemTraItemView();
			if (!!data) {
				thietBiDuocKiemTraItemView.model.set(JSON.parse(JSON.stringify(data)));
			}
			thietBiDuocKiemTraItemView.render();
			self.$el.find("#tiensubenhtatbanthan_grid").append(thietBiDuocKiemTraItemView.$el);

			thietBiDuocKiemTraItemView.$el.find('.dsTuan').each(function (item, index) {
				var tuan = (item + 1);
				$(index).on('click', function () {

					self.$el.find('.dialogView').show();
					var dataTuanNay = thietBiDuocKiemTraItemView.model.get("datatuan" + tuan);
					if (dataTuanNay != null) {
						if (thietBiDuocKiemTraItemView.model.get("datatuan" + tuan).ketqua != null) {
							self.$el.find(".ketqua").val(thietBiDuocKiemTraItemView.model.get("datatuan" + tuan).ketqua)
						}
						if (thietBiDuocKiemTraItemView.model.get("datatuan" + tuan).ngaykiemtra != null) {
							self.$el.find(".ngaykiemtra").val(thietBiDuocKiemTraItemView.model.get("datatuan" + tuan).ngaykiemtra)
						}
						if (thietBiDuocKiemTraItemView.model.get("datatuan" + tuan).soluong != null) {
							self.$el.find(".soluong").val(thietBiDuocKiemTraItemView.model.get("datatuan" + tuan).soluong)
						}
						if (thietBiDuocKiemTraItemView.model.get("datatuan" + tuan) != null) {
							self.$el.find(".check").val(thietBiDuocKiemTraItemView.model.get("tuan" + tuan))
						}
					}



					// ############################ DATA CHI TIET THIET BI
					var filters = {
						filters: {
							"$and": [
								{ "thietbi_id": { "$eq": thietBiDuocKiemTraItemView.model.get("thietbi_id") } }
							]
						},
						order_by: [{ "field": "created_at", "direction": "asc" }]
					}
					$.ajax({
						url: self.getApp().serviceURL + "/api/v1/chitietthietbi?results_per_page=100000&max_results_per_page=1000000",
						method: "GET",
						data: "q=" + JSON.stringify(filters),
						contentType: "application/json",
						success: function (data) {
							data.objects.forEach(function (itemChiTietThietBi, indexChiTietThietBi) {
								self.$el.find("#danhsachthietbinay").append("<tr><td class='p-2' id='" + itemChiTietThietBi.id + "'>" + itemChiTietThietBi.model_serial_number + "</td><td class='p-2'>"+itemChiTietThietBi.trangthai+"</td><td class='p-1'><a class='btn btn-info btn-sm btn-phieusuachua p-1' href='" + self.getApp().serviceURL + "/?#phieuyeucausuachua/model'>Tạo mới</a></td></tr>")

							});
							self.$el.find('#danhsachthietbinay tr').each(function (indexxx, itemxx) {
								if (thietBiDuocKiemTraItemView.model.get("datatuan" + tuan) != null) {
									if (thietBiDuocKiemTraItemView.model.get("datatuan" + tuan).mangthietbi != undefined) {
										$(itemxx).find('td').find('input').val(thietBiDuocKiemTraItemView.model.get("datatuan" + tuan).mangthietbi[indexxx].thietbi_trangthai);
									}
								}
							})

							self.$el.find('#danhsachthietbinay tr').each(function (indexxx, itemxx) {
								$(itemxx).find('td').find('.btn-phieusuachua').bind('click', function () {
									sessionStorage.setItem('TenSanPham',data.objects[indexxx].model_serial_number);
									sessionStorage.setItem('IDSanPham',data.objects[indexxx].id);
								});
							})
							

							self.$el.find('.btn-luu').unbind('click').bind("click", function () {
								var arrThietBi = [];
								self.$el.find('#danhsachthietbinay tr').each(function (index, item) {
									var objThietBi = {};
									objThietBi.thietbi_id = $($(item).find('td')).attr('id');
									objThietBi.thietbi_trangthai = $(item).find('td').find('input').val();
									arrThietBi.push(objThietBi);
								})
								if (tuan == 1) {
									var dataTuan = {
										tuan1: self.$el.find(".check").val(),
										datatuan1:
										{
											"soluong": parseInt(self.$el.find(".soluong").val()),
											"ketqua": self.$el.find(".ketqua").val(),
											"ngaykiemtra": parseInt(self.$el.find(".ngaykiemtra").val()),
											"mangthietbi": arrThietBi
										},
									}
								}
								else if (tuan == 2) {
									var dataTuan = {
										tuan2: self.$el.find(".check").val(),
										datatuan2:
										{
											"soluong": parseInt(self.$el.find(".soluong").val()),
											"ketqua": self.$el.find(".ketqua").val(),
											"ngaykiemtra": parseInt(self.$el.find(".ngaykiemtra").val()),
										},
									}
								}
								else if (tuan == 3) {
									var dataTuan = {
										tuan3: self.$el.find(".check").val(),
										datatuan3:
										{
											"soluong": parseInt(self.$el.find(".soluong").val()),
											"ketqua": self.$el.find(".ketqua").val(),
											"ngaykiemtra": parseInt(self.$el.find(".ngaykiemtra").val()),
										},
									}
								}
								else if (tuan == 4) {
									var dataTuan = {
										tuan4: self.$el.find(".check").val(),
										datatuan4:
										{
											"soluong": parseInt(self.$el.find(".soluong").val()),
											"ketqua": self.$el.find(".ketqua").val(),
											"ngaykiemtra": parseInt(self.$el.find(".ngaykiemtra").val()),
										},
									}
								}
								$.ajax({
									url: self.getApp().serviceURL + "/api/v1/thietbiduockiemtra/" + thietBiDuocKiemTraItemView.model.get('id'),
									method: "PUT",
									data: JSON.stringify(dataTuan),
									headers: {
										'content-type': 'application/json'
									},
									dataType: 'json',
									success: function (data, res) {
										self.getApp().getRouter().refresh();
									},
									error: function (xhr, status, error) {
										self.getApp().notify({ message: "Lỗi không lấy được dữ liệu" }, { type: "danger", delay: 1000 });
									},
								});
							})



						},
						error: function (xhr, status, error) {
							self.getApp().notify({ message: "Lỗi không lấy được dữ liệu" }, { type: "danger", delay: 1000 });
						},
					});
					// ############################


				})
			})



			// thietBiDuocKiemTraItemView.model.on("change:tuan" + 1, function () {
			// 	console.log("xxx", thietBiDuocKiemTraItemView.model.get("tuan" + 1))
			// })
			// thietBiDuocKiemTraItemView.model.on("change:tuan" + 2, function () {
			// 	console.log("xxx", thietBiDuocKiemTraItemView.model.get("tuan" + 2))
			// })
			// thietBiDuocKiemTraItemView.model.on("change:tuan" + 3, function () {
			// 	console.log("xxx", thietBiDuocKiemTraItemView.model.get("tuan" + 3))
			// })
			// thietBiDuocKiemTraItemView.model.on("change:tuan" + 4, function () {
			// 	console.log("xxx", thietBiDuocKiemTraItemView.model.get("tuan" + 4))
			// })
			// thietBiDuocKiemTraItemView.model.on("change:tuan" + 5, function () {
			// 	console.log("xxx", thietBiDuocKiemTraItemView.model.get("tuan" + 5))
			// })




			thietBiDuocKiemTraItemView.on("change", function (event) {
				var datathietbiduockiemtrafield = self.model.get("thietbiduockiemtrafield");
				if (datathietbiduockiemtrafield === null) {
					datathietbiduockiemtrafield = [];
					datathietbiduockiemtrafield.push(event.data)
				}
				for (var i = 0; i < datathietbiduockiemtrafield.length; i++) {
					if (datathietbiduockiemtrafield[i].id == event.oldData.id) {
						datathietbiduockiemtrafield[i] = event.data;
						break;
					}
				}

				self.model.set("thietbiduockiemtrafield", datathietbiduockiemtrafield);
				self.applyBindings("thietbiduockiemtrafield");
			})
			// thietBiDuocKiemTraItemView.$el.find("#itemRemove").unbind("click").bind("click", function () {

			// 	var datathietbiduockiemtrafield = self.model.get("thietbiduockiemtrafield");
			// 	for (var i = 0; i < datathietbiduockiemtrafield.length; i++) {
			// 		if (datathietbiduockiemtrafield[i].id === thietBiDuocKiemTraItemView.model.get("id")) {
			// 			datathietbiduockiemtrafield.splice(i, 1);
			// 		}
			// 	}
			// 	self.model.set("thietbiduockiemtrafield", datathietbiduockiemtrafield);
			// 	self.applyBinding("thietbiduockiemtrafield");
			// 	thietBiDuocKiemTraItemView.destroy();
			// 	thietBiDuocKiemTraItemView.remove();
			// });
		},
		btn_add_row: function () {
			var self = this;
			self.$el.find("#add_1_row").unbind('click').bind("click", function () {
				var data_default = {
					"id": gonrin.uuid(),
				}

				var datathietbiduockiemtrafield = self.model.get("thietbiduockiemtrafield");
				if (datathietbiduockiemtrafield === null) {
					datathietbiduockiemtrafield = [];
				}
				datathietbiduockiemtrafield.push(data_default);
				self.model.set("thietbiduockiemtrafield", datathietbiduockiemtrafield)
				self.applyBindings("thietbiduockiemtrafield");

				self.render_thietbiduockiemtra(data_default);
			})
		},
		setThietBiID: function () {
			var self = this;

			self.model.get("thietbiduockiemtrafield").forEach(function (item, index) {
				$.ajax({
					url: self.getApp().serviceURL + "/api/v1/thietbi?results_per_page=100000&max_results_per_page=1000000",
					method: "GET",
					success: function (data) {
						if (item.thietbi_id != null) {
							$(self.$el.find(".thietbi_combobox")[index]).combobox({
								textField: "ten",
								valueField: "id",
								dataSource: data.objects,
								refresh: true,
								value: item.thietbi_id
							});
							$(self.$el.find(".input_gia")[index]).val($($('.thietbi_combobox')[index]).data('gonrin').getText());
						}

						$(self.$el.find(".input_gia")[index]).on('click', function () {
							$(self.$el.find(".thietbi_combobox")[index]).combobox({
								textField: "ten",
								valueField: "id",
								dataSource: data.objects,
								refresh: true,
								value: item.thietbi_id
							});
							$(self.$el.find(".dropdown-menu")[index]).css("display", "block")
						});
					}
				})
				$(self.$el.find(".input_gia")[index]).keyup(function () {
					$.ajax({
						url: self.getApp().serviceURL + "/api/v1/thietbi?results_per_page=100000&max_results_per_page=1000000",
						method: "GET",
						success: function (data) {
							var dsThietBi = [];

							(data.objects).forEach(function (item3, index3) {
								if ((item3.ten).indexOf($(self.$el.find(".input_gia")[index]).val()) !== -1) {
									dsThietBi.push(item3)
								}
							})
							$(self.$el.find(".thietbi_combobox")[index]).combobox({
								textField: "ten",
								valueField: "id",
								dataSource: dsThietBi,
								refresh: true
							});

							$(self.$el.find(".dropdown-menu")[index]).css("display", "block")
							dsThietBi = [];




							$(self.$el.find(".thietbi_combobox")[index]).on('change.gonrin', function (e) {
								$(self.$el.find(".dropdown-menu")[index]).css("display", "block")
								$(self.$el.find(".input_gia")[index]).val($(self.$el.find(".thietbi_combobox")[index]).data('gonrin').getText());
								var idThietBiDaChon = $(self.$el.find(".thietbi_combobox")[index]).data('gonrin').getValue();
								var thietBiDaChon = null;
								(data.objects).forEach(function (item3, index3) {
									if (idThietBiDaChon == item3.id) {
										thietBiDaChon = item3;
									}
								})
								self.$el.find(".btn-xxx").unbind("click").bind("click", function () {

									$.ajax({
										method: "PUT",
										url: self.getApp().serviceURL + "/api/v1/thietbiduockiemtra/" + item.id,
										data: JSON.stringify({
											thietbi_id: thietBiDaChon.id,
											thietbi: thietBiDaChon
										}),
										headers: {
											'content-type': 'application/json'
										},
										dataType: 'json',
										success: function (response) {
											if (response) {
												self.getApp().notify("Đăng ký thành công");
												self.getApp().getRouter().navigate(self.collectionName + "/collection");
											}
										}, error: function (xhr, ere) {
											console.log('xhr', ere);

										}
									})


								});

							});
							$(self.$el.find(".input_gia")[index]).focusout(function () {
								setTimeout(function () {
									$(self.$el.find(".dropdown-menu")[index]).css("display", "none")
								}, 300);
							});

						}
					})

				});

			})







		},


	});
});