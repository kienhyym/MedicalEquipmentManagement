define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/baocao2/phuluc11/tpl/model.html'),
		schema = require('json!schema/TongHopKetQuaKhamDinhKyNguoiMacBenhNgheNghiepSchema.json');
		
	var TongHopKetQuaKhamDinhKyChoNguoiLaoDongMacBNNItemView = require('app/baocao2/phuluc11/js/TongHopKetQuaKhamDinhKyChoNguoiLaoDongMacBNNItemView');
	return Gonrin.ModelView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "tonghopketquakhamdinhkynguoimacbenhnghenghiep",
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
				{
					field: "ngayky",
					cssClass: false,
				},

				{
					field: "thangky",
					cssClass: false,
				},
				{
					field: "namky",
					cssClass: false,
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
						self.applyBindings();
						var dataTongHopKetQuaKhamDinhKy = self.model.get("tonghopketquakhamdinhky");
						if (dataTongHopKetQuaKhamDinhKy === null) {
							self.model.set("tonghopketquakhamdinhky", []);
						}
						$.each(dataTongHopKetQuaKhamDinhKy, function (idx, value) {

							self.render_TongHopKetQuaKhamDinhKyNguoiMacBenhNgheNghiep(value);
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
				self.btn_add_row();
			}
		},
		render_TongHopKetQuaKhamDinhKyNguoiMacBenhNgheNghiep: function (data) {
			var self = this;
			var tonghopKetQuaKhamDinhKyChoNguoiLaoDongMacBNNItemView = new TongHopKetQuaKhamDinhKyChoNguoiLaoDongMacBNNItemView();

			if (!!data) {
				tonghopKetQuaKhamDinhKyChoNguoiLaoDongMacBNNItemView.model.set(JSON.parse(JSON.stringify(data)));

			}
			tonghopKetQuaKhamDinhKyChoNguoiLaoDongMacBNNItemView.render();
			self.$el.find("#tonghopketquakhamdinhky_grid").append(tonghopKetQuaKhamDinhKyChoNguoiLaoDongMacBNNItemView.$el);
			tonghopKetQuaKhamDinhKyChoNguoiLaoDongMacBNNItemView.on("change", function (event) {
				var dataTongHopKetQuaKhamDinhKy = self.model.get("tonghopketquakhamdinhky");
				console.log(dataTongHopKetQuaKhamDinhKy)
				if (dataTongHopKetQuaKhamDinhKy === null) {
					dataTongHopKetQuaKhamDinhKy = [];
					dataTongHopKetQuaKhamDinhKy.push(event.data)
				}
				for (var i = 0; i < dataTongHopKetQuaKhamDinhKy.length; i++) {
					if (dataTongHopKetQuaKhamDinhKy[i].id == event.oldData.id) {
						dataTongHopKetQuaKhamDinhKy[i] = event.data;
						break;
					}
				}
				console.log(dataTongHopKetQuaKhamDinhKy)
				self.model.set("tonghopketquakhamdinhky", dataTongHopKetQuaKhamDinhKy);
				self.applyBindings("tonghopketquakhamdinhky");
			})
			tonghopKetQuaKhamDinhKyChoNguoiLaoDongMacBNNItemView.$el.find("#itemRemove").unbind("click").bind("click", function () {

				var dataTongHopKetQuaKhamDinhKy = self.model.get("tonghopketquakhamdinhky");
				for (var i = 0; i < dataTongHopKetQuaKhamDinhKy.length; i++) {
					if (dataTongHopKetQuaKhamDinhKy[i].id === tonghopKetQuaKhamDinhKyChoNguoiLaoDongMacBNNItemView.model.get("id")) {
						dataTongHopKetQuaKhamDinhKy.splice(i, 1);
					}
				}
				self.model.set("tonghopketquakhamdinhky", dataTongHopKetQuaKhamDinhKy);
				self.applyBinding("tonghopketquakhamdinhky");
				tonghopKetQuaKhamDinhKyChoNguoiLaoDongMacBNNItemView.destroy();
				tonghopKetQuaKhamDinhKyChoNguoiLaoDongMacBNNItemView.remove();
			});
		},
		btn_add_row: function () {
			var self = this;
			self.$el.find("#add_1_row").unbind('click').bind("click", function () {

				var data_default = {
					"id": gonrin.uuid(),
					"tenbenhnhan": null,
					"gioitinh": null,
					"tuoi": null,
					"tuoinghe": null,
					"nghekhibibnn": null,
					"congviechiennay": null,
					"ngayphathienbenh": null,
					"tenbenhnghenghiep": null,
					"tientrien": null,
					"bienchung": null,
					"huonggiaiquyet": null,
				}

				var dataTongHopKetQuaKhamDinhKy = self.model.get("tonghopketquakhamdinhky");
				if (dataTongHopKetQuaKhamDinhKy === null) {
					dataTongHopKetQuaKhamDinhKy = [];
				}
				dataTongHopKetQuaKhamDinhKy.push(data_default);
				self.model.set("tonghopketquakhamdinhky", dataTongHopKetQuaKhamDinhKy)
				self.applyBindings("tonghopketquakhamdinhky");

				self.render_TongHopKetQuaKhamDinhKyNguoiMacBenhNgheNghiep(data_default);
			})
		}


	});

});

