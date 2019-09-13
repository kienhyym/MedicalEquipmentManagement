define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/baocao2/phuluc12/tpl/model.html'),
		schema = require('json!schema/BaoCaoDanhSachCacCoSoLaoDongCoNguoiLaoDongMacBenhNgheNgiepSchema.json');
		
	var BaoCaoDanhSachCacCoSoLaoDongCoNguoiLaoDongMacBenhNgheNgiepItemView = require('app/baocao2/phuluc12/js/BaoCaoDanhSachCacCoSoLaoDongCoNguoiLaoDongMacBenhNgheNgiepItemView');
	return Gonrin.ModelView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "baocaodanhsachcaccosolaodongconguoilaodongmacbenhlaodong",
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
						label: "TRANSLATE:BACK",
						command: function () {
							var self = this;
							Backbone.history.history.back();
						}
					},
					{
						name: "save",
						type: "button",
						buttonClass: "btn-success btn-sm",
						label: "TRANSLATE:SAVE",
						command: function () {
							var self = this;
							console.log(self.model)
							self.model.save(null, {
								success: function (model, respose, options) {
									// self.getApp().hideloading();
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
						label: "TRANSLATE:DELETE",
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
					field: "ngayviet",
					cssClass: false,
				},
				{
					field: "thangviet",
					cssClass: false,
				},
				{
					field: "namviet",
					cssClass: false,
				},
				
			]
		},


		render: function () {
			var self = this;
			var id = this.getApp().getRouter().getParam("id");
			var width = $(window).width();
			console.log(width);
			if (width <= 414) {
				// $(window).resize(function(){
				self.$el.find("div").removeClass("flexboxer");
				self.$el.find(".kinhgui").removeClass("justify-content-center d-flex");

				self.$el.find(".input-mobile").css("width", "100%");
				// });
			}
			if (id) {
				this.model.set('id', id);
				this.model.fetch({
					success: function (data) {
						self.applyBindings();
						self.$el.find(".input-phuluc2").removeClass("form-control");

						var dataDanhSachCoSoLaoDongCoNguoiMacBNN = self.model.get("danhsachcosolaodongconguoimacbnn");
						console.log(dataDanhSachCoSoLaoDongCoNguoiMacBNN)

						if (dataDanhSachCoSoLaoDongCoNguoiMacBNN === null) {
							self.model.set("danhsachcosolaodongconguoimacbnn", []);
						}
						$.each(dataDanhSachCoSoLaoDongCoNguoiMacBNN, function (idx, value) {

							self.render_DanhSachCoSoLaoDongCoNguoiMacBNN(value);
						});
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
				self.$el.find(".input-phuluc2").removeClass("form-control");

				self.btn_add_row();
			}
		},
		render_DanhSachCoSoLaoDongCoNguoiMacBNN: function (data) {
			var self = this;
			var baocaoDanhSachCacCoSoLaoDongCoNguoiLaoDongMacBenhNgheNgiepItemView = new BaoCaoDanhSachCacCoSoLaoDongCoNguoiLaoDongMacBenhNgheNgiepItemView();

			if (!!data) {
				baocaoDanhSachCacCoSoLaoDongCoNguoiLaoDongMacBenhNgheNgiepItemView.model.set(JSON.parse(JSON.stringify(data)));

			}
			baocaoDanhSachCacCoSoLaoDongCoNguoiLaoDongMacBenhNgheNgiepItemView.render();
			self.$el.find("#danhsachcosolaodongconguoimacbnn_grid").append(baocaoDanhSachCacCoSoLaoDongCoNguoiLaoDongMacBenhNgheNgiepItemView.$el);
			baocaoDanhSachCacCoSoLaoDongCoNguoiLaoDongMacBenhNgheNgiepItemView.on("change", function (event) {
				var dataDanhSachCoSoLaoDongCoNguoiMacBNN = self.model.get("danhsachcosolaodongconguoimacbnn");
				console.log(dataDanhSachCoSoLaoDongCoNguoiMacBNN)
				if (dataDanhSachCoSoLaoDongCoNguoiMacBNN === null) {
					dataDanhSachCoSoLaoDongCoNguoiMacBNN = [];
					dataDanhSachCoSoLaoDongCoNguoiMacBNN.push(event.data)
				}
				for (var i = 0; i < dataDanhSachCoSoLaoDongCoNguoiMacBNN.length; i++) {
					if (dataDanhSachCoSoLaoDongCoNguoiMacBNN[i].id == event.oldData.id) {
						dataDanhSachCoSoLaoDongCoNguoiMacBNN[i] = event.data;
						break;
					}
				}
				console.log(dataDanhSachCoSoLaoDongCoNguoiMacBNN)
				self.model.set("danhsachcosolaodongconguoimacbnn", dataDanhSachCoSoLaoDongCoNguoiMacBNN);
				self.applyBindings("danhsachcosolaodongconguoimacbnn");
			})
			baocaoDanhSachCacCoSoLaoDongCoNguoiLaoDongMacBenhNgheNgiepItemView.$el.find("#itemRemove").unbind("click").bind("click", function () {

				var dataDanhSachCoSoLaoDongCoNguoiMacBNN = self.model.get("danhsachcosolaodongconguoimacbnn");
				for (var i = 0; i < dataDanhSachCoSoLaoDongCoNguoiMacBNN.length; i++) {
					if (dataDanhSachCoSoLaoDongCoNguoiMacBNN[i].id === baocaoDanhSachCacCoSoLaoDongCoNguoiLaoDongMacBenhNgheNgiepItemView.model.get("id")) {
						dataDanhSachCoSoLaoDongCoNguoiMacBNN.splice(i, 1);
					}
				}
				self.model.set("danhsachcosolaodongconguoimacbnn", dataDanhSachCoSoLaoDongCoNguoiMacBNN);
				self.applyBinding("danhsachcosolaodongconguoimacbnn");
				baocaoDanhSachCacCoSoLaoDongCoNguoiLaoDongMacBenhNgheNgiepItemView.destroy();
				baocaoDanhSachCacCoSoLaoDongCoNguoiLaoDongMacBenhNgheNgiepItemView.remove();
			});
		},
		btn_add_row: function () {
			var self = this;
			self.$el.find("#add_1_row").unbind('click').bind("click", function () {

				var data_default = {
					"id": gonrin.uuid(),
					"tencosolaodong": null,
					"diachicosolaodong": null,
					"sodienthoaicosoladong": null,
					"tongsolaodong": null,
					"tongsolaodongnu": null,
					"tongsolaodongduockham": null,
					"tongsolaodongduockhamnu": null,
					"tongsolaodongduocchuandoanmacbenh": null,
					"tongsolaodongduocchuandoanmacbenhnu": null,
					"tenbenhnghenghiep": null,
				}

				var dataDanhSachCoSoLaoDongCoNguoiMacBNN = self.model.get("danhsachcosolaodongconguoimacbnn");
				if (dataDanhSachCoSoLaoDongCoNguoiMacBNN === null) {
					dataDanhSachCoSoLaoDongCoNguoiMacBNN = [];
				}
				dataDanhSachCoSoLaoDongCoNguoiMacBNN.push(data_default);
				self.model.set("danhsachcosolaodongconguoimacbnn", dataDanhSachCoSoLaoDongCoNguoiMacBNN)
				self.applyBindings("danhsachcosolaodongconguoimacbnn");

				self.render_DanhSachCoSoLaoDongCoNguoiMacBNN(data_default);
			})
		}


	});

});

