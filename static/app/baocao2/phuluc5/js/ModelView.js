define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/baocao2/phuluc5/tpl/model.html'),
	schema = require('json!schema/BienBanXacNhanTiepXucYeuToCoHaiGayBenhNgheNghiepSchema.json');

	return Gonrin.ModelView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "bienbanxacnhantiepxucyeutocohaigaybenhnghenghiep",
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
		// uiControl: {
		// 	fields: [
				
		// 		{
		// 			field: "hoten",
		// 			cssClass: false,
		// 		},
		// 		{
		// 			field: "tuoi",
		// 			cssClass: false,
		// 		},
		// 		{
		// 			field: "gioitinh",
		// 			cssClass: false,
		// 		},
		// 		{
		// 			field: "noicongtac",
		// 			cssClass: false,
		// 		},
		// 		{
		// 			field: "nghenghiep",
		// 			cssClass: false,
		// 		},
		// 		{
		// 			field: "hoancanhxayrabenh",
		// 			cssClass: false,
		// 		},
		// 		{
		// 			field: "thongtinvetrinhtrangbenh",
		// 			cssClass: false,
		// 		},
		// 		{
		// 			field: "thongtin_nguon_yeuto_hoancanh_gaybenh",
		// 			cssClass: false,
		// 		},
		// 		{
		// 			field: "xutri_ntn",
		// 			cssClass: false,
		// 		},
		// 		{
		// 			field: "tinhtrang_suckhoe",
		// 			cssClass: false,
		// 		},
		// 		{
		// 			field: "noiky",
		// 			cssClass: false,
		// 		},
		// 		{
		// 			field: "ngayky",
		// 			cssClass: false,
		// 		},
		// 		{
		// 			field: "thangky",
		// 			cssClass: false,
		// 		},

		// 		{
		// 			field: "namky",
		// 			cssClass: false,
		// 		},
				

		// 	]
		// },

		render: function () {
			var self = this;
			var id = this.getApp().getRouter().getParam("id");
			// var x = self.$el.find("input")
			// x.removeClass("form-control");
			// console.log(x)
			if (id) {
				this.model.set('id', id);
				this.model.fetch({
					success: function (data) {
						x.removeClass("form-control");
						self.applyBindings();
					},
					error: function () {
						self.getApp().notify("Get data Eror");
					},
				});
			} else {
				x.removeClass("form-control");
				self.applyBindings();
			}
		},
	
	
		
		

	});

});