define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/hoso/SoKhamDInhKyNguoiLaiXeOTo/tpl/model.html'),
	schema = require('json!schema/SoKhamSucKhoeDinhKyCuaNguoiLaiXeOToSchema.json');

	var TienSuBenhTatBanThanItemView = require('app/hoso/SoKhamDInhKyNguoiLaiXeOTo/js/TienSuBenhTatBanThanItemView');

	return Gonrin.ModelView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "sokhamsuckhoedinhkycuanguoilaixeoto",
		bindings: "data-bind",
		state: null,
		uiControl:{
			fields:[
				{
					field: "noidungkham_matsacgiac_binhthuong",

					uicontrol: "checkbox",
					checkedField: "key",
					valueField: "value",
					dataSource: [{
						"value": "binhthuong",
						"key": true
					},
					{
						"value": null,
						"key": false
					},
					],
				},
				{
					field: "noidungkham_matsacgiac_mumautoanbo",

					uicontrol: "checkbox",
					checkedField: "key",
					valueField: "value",
					dataSource: [{
						"value": "binhthuong",
						"key": true
					},
					{
						"value": null,
						"key": false
					},
					],
				},
				{
					field: "noidungkham_matsacgiac_mumauvang",

					uicontrol: "checkbox",
					checkedField: "key",
					valueField: "value",
					dataSource: [{
						"value": "binhthuong",
						"key": true
					},
					{
						"value": null,
						"key": false
					},
					],
				},
				{
					field: "noidungkham_matsacgiac_mumaudo",

					uicontrol: "checkbox",
					checkedField: "key",
					valueField: "value",
					dataSource: [{
						"value": "binhthuong",
						"key": true
					},
					{
						"value": null,
						"key": false
					},
					],
				},
				{
					field: "noidungkham_matsacgiac_mumauxanh",

					uicontrol: "checkbox",
					checkedField: "key",
					valueField: "value",
					dataSource: [{
						"value": "binhthuong",
						"key": true
					},
					{
						"value": null,
						"key": false
					},
					],
				},
			]
		},
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
	

		render: function () {
			var self = this;
			var id = this.getApp().getRouter().getParam("id");
			var width = $(window).width();
			console.log(width);
			if (width <= 414) {
				// $(window).resize(function(){
				self.$el.find("div").removeClass("flexboxer");
				self.$el.find(".input-mobile").css("width", "100%");
				// });
			}
			if (id) {
				this.model.set('id', id);
				this.model.fetch({
					success: function (data) {
						self.applyBindings();
						self.$el.find(".input-phuluc2").removeClass("form-control");

						var dataTienSuBenhTatBanThan = self.model.get("tiensubenhtatbanthan");

						if (dataTienSuBenhTatBanThan === null) {

							self.model.set("tiensubenhtatbanthan", []);
						}
						$.each(dataTienSuBenhTatBanThan, function (idx, value) {

							self.render_tiensubenhtatbanthan(value);
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
		render_tiensubenhtatbanthan: function (data) {
			var self = this;
			var tienSuBenhTatBanThanItemView = new TienSuBenhTatBanThanItemView();

			if (!!data) {
				tienSuBenhTatBanThanItemView.model.set(JSON.parse(JSON.stringify(data)));

			}
			tienSuBenhTatBanThanItemView.render();
			self.$el.find("#tiensubenhtatbanthan_grid").append(tienSuBenhTatBanThanItemView.$el);
			tienSuBenhTatBanThanItemView.on("change", function (event) {
				var dataTienSuBenhTatBanThan = self.model.get("tiensubenhtatbanthan");
				if (dataTienSuBenhTatBanThan === null) {
					dataTienSuBenhTatBanThan = [];
					dataTienSuBenhTatBanThan.push(event.data)
				}
				for (var i = 0; i < dataTienSuBenhTatBanThan.length; i++) {
					if (dataTienSuBenhTatBanThan[i].id == event.oldData.id) {
						dataTienSuBenhTatBanThan[i] = event.data;
						break;
					}
				}
				self.model.set("tiensubenhtatbanthan", dataTienSuBenhTatBanThan);
				self.applyBindings("tiensubenhtatbanthan");
			})
			tienSuBenhTatBanThanItemView.$el.find("#itemRemove").unbind("click").bind("click", function () {

				var dataTienSuBenhTatBanThan = self.model.get("tiensubenhtatbanthan");
				for (var i = 0; i < dataTienSuBenhTatBanThan.length; i++) {
					if (dataTienSuBenhTatBanThan[i].id === tienSuBenhTatBanThanItemView.model.get("id")) {
						dataTienSuBenhTatBanThan.splice(i, 1);
					}
				}
				self.model.set("tiensubenhtatbanthan", dataTienSuBenhTatBanThan);
				self.applyBinding("tiensubenhtatbanthan");
				tienSuBenhTatBanThanItemView.destroy();
				tienSuBenhTatBanThanItemView.remove();
			});
		},
		btn_add_row: function () {
			var self = this;
			self.$el.find("#add_1_row").unbind('click').bind("click", function () {
				var data_default = {
					"id": gonrin.uuid(),
					"tenbenh": null,
					"phathiennam": null
				}

				var dataTienSuBenhTatBanThan = self.model.get("tiensubenhtatbanthan");
				if (dataTienSuBenhTatBanThan === null) {
					dataTienSuBenhTatBanThan = [];
				}
				dataTienSuBenhTatBanThan.push(data_default);
				self.model.set("tiensubenhtatbanthan", dataTienSuBenhTatBanThan)
				self.applyBindings("tiensubenhtatbanthan");

				self.render_tiensubenhtatbanthan(data_default);
			})
		}
	
		
		

	});

});