define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/baocao/phuluc11/tpl/model.html'),
		schema = require('json!schema/BaoCaoToChucDuDieuKienQuanTracMoiTruongLaoDongDuocCongBoSchema.json');

	var CacYeuToVatLyKhac_ItemView = require('app/baocao/phuluc11/js/CacYeuToVatLyKhacView');
	var CacLoaiBuiKhac_ItemView = require('app/baocao/phuluc11/js/CacLoaiBuiKhacView');
	var CacHoaChatKhac_ItemView = require('app/baocao/phuluc11/js/CacHoaChatKhacView');
	var CacYeuToKhac_ItemView = require('app/baocao/phuluc11/js/CacYeuToKhacView');


	return Gonrin.ModelView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "baocaotochucdudieukienquantracmoitruonglaodongduoccongbo",
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
		uiControl: {
			fields: [
				{
					field: "cacyeutovatlykhac_field",
					uicontrol: false,
					itemView: CacYeuToVatLyKhac_ItemView,
					tools: [{
						name: "create",
						type: "button",
						buttonClass: "btn btn-outline-success btn-sm",
						label: "<span class='fa fa-plus'></span>",
						command: "create"
					}],
					toolEl: "#add_row"
				},
				{
					field: "cacloaibuikhac_field",
					uicontrol: false,
					itemView: CacLoaiBuiKhac_ItemView,
					tools: [{
						name: "create",
						type: "button",
						buttonClass: "btn btn-outline-success btn-sm",
						label: "<span class='fa fa-plus'></span>",
						command: "create"
					}],
					toolEl: "#add_row2"
				},
				{
					field: "cachoachatkhac_field",
					uicontrol: false,
					itemView: CacHoaChatKhac_ItemView,
					tools: [{
						name: "create",
						type: "button",
						buttonClass: "btn btn-outline-success btn-sm",
						label: "<span class='fa fa-plus'></span>",
						command: "create"
					}],
					toolEl: "#add_row3"
				},
				{
					field: "cacyeutokhac_field",
					uicontrol: false,
					itemView: CacYeuToKhac_ItemView,
					tools: [{
						name: "create",
						type: "button",
						buttonClass: "btn btn-outline-success btn-sm",
						label: "<span class='fa fa-plus'></span>",
						command: "create"
					}],
					toolEl: "#add_row4"
				},
				{
					field: "yeutonhietdo",

					uicontrol: "checkbox",
					checkedField: "key",
					valueField: "value",
					dataSource: [{
						"value": 1,
						"key": true
					},
					{
						"value": 0,
						"key": false
					},
					],
				},

				{
					field: "yeutodoam",

					uicontrol: "checkbox",
					checkedField: "key",
					valueField: "value",
					dataSource: [{
						"value": 1,
						"key": true
					},
					{
						"value": 0,
						"key": false
					},
					],
				},

				{
					field: "yeutotocdogio",

					uicontrol: "checkbox",
					checkedField: "key",
					valueField: "value",
					dataSource: [{
						"value": 1,
						"key": true
					},
					{
						"value": 0,
						"key": false
					},
					],
				},
				
				{
					field: "yeutobucxanhiet",

					uicontrol: "checkbox",
					checkedField: "key",
					valueField: "value",
					dataSource: [{
						"value": 1,
						"key": true
					},
					{
						"value": 0,
						"key": false
					},
					],
				},
				



				{
					field: "yeutoanhsang",

					uicontrol: "checkbox",
					checkedField: "key",
					valueField: "value",
					dataSource: [{
						"value": 1,
						"key": true
					},
					{
						"value": 0,
						"key": false
					},
					],
				},
				
				{
					field: "yeutotiengontheodaitan",

					uicontrol: "checkbox",
					checkedField: "key",
					valueField: "value",
					dataSource: [{
						"value": 1,
						"key": true
					},
					{
						"value": 0,
						"key": false
					},
					],
				},
				
				{
					field: "yeutorungchuyentheodaitan",

					uicontrol: "checkbox",
					checkedField: "key",
					valueField: "value",
					dataSource: [{
						"value": 1,
						"key": true
					},
					{
						"value": 0,
						"key": false
					},
					],
				},
				
				{
					field: "yeutovantocrungdunghoacngang",

					uicontrol: "checkbox",
					checkedField: "key",
					valueField: "value",
					dataSource: [{
						"value": 1,
						"key": true
					},
					{
						"value": 0,
						"key": false
					},
					],
				},
				
				{
					field: "yeutophongxa",

					uicontrol: "checkbox",
					checkedField: "key",
					valueField: "value",
					dataSource: [{
						"value": 1,
						"key": true
					},
					{
						"value": 0,
						"key": false
					},
					],
				},
				
				{
					field: "yeutodientutruongtansocongnghiep",

					uicontrol: "checkbox",
					checkedField: "key",
					valueField: "value",
					dataSource: [{
						"value": 1,
						"key": true
					},
					{
						"value": 0,
						"key": false
					},
					],
				},
				
				{
					field: "yeutodientutruongtansocao",

					uicontrol: "checkbox",
					checkedField: "key",
					valueField: "value",
					dataSource: [{
						"value": 1,
						"key": true
					},
					{
						"value": 0,
						"key": false
					},
					],
				},
				
				{
					field: "yeutobucxatungoai",

					uicontrol: "checkbox",
					checkedField: "key",
					valueField: "value",
					dataSource: [{
						"value": 1,
						"key": true
					},
					{
						"value": 0,
						"key": false
					},
					],
				},
				




				{
					field: "yeutobuitoanphan",

					uicontrol: "checkbox",
					checkedField: "key",
					valueField: "value",
					dataSource: [{
						"value": 1,
						"key": true
					},
					{
						"value": 0,
						"key": false
					},
					],
				},
				
				{
					field: "yeutobuihohap",

					uicontrol: "checkbox",
					checkedField: "key",
					valueField: "value",
					dataSource: [{
						"value": 1,
						"key": true
					},
					{
						"value": 0,
						"key": false
					},
					],
				},
				
				{
					field: "yeutobuithongthuong",

					uicontrol: "checkbox",
					checkedField: "key",
					valueField: "value",
					dataSource: [{
						"value": 1,
						"key": true
					},
					{
						"value": 0,
						"key": false
					},
					],
				},
				
				{
					field: "yeutobuisilic",

					uicontrol: "checkbox",
					checkedField: "key",
					valueField: "value",
					dataSource: [{
						"value": 1,
						"key": true
					},
					{
						"value": 0,
						"key": false
					},
					],
				},
				
				{
					field: "yeutobuiamiang",

					uicontrol: "checkbox",
					checkedField: "key",
					valueField: "value",
					dataSource: [{
						"value": 1,
						"key": true
					},
					{
						"value": 0,
						"key": false
					},
					],
				},
				
				{
					field: "yeutobuikimloai",

					uicontrol: "checkbox",
					checkedField: "key",
					valueField: "value",
					dataSource: [{
						"value": 1,
						"key": true
					},
					{
						"value": 0,
						"key": false
					},
					],
				},
				
				{
					field: "yeutobuithan",

					uicontrol: "checkbox",
					checkedField: "key",
					valueField: "value",
					dataSource: [{
						"value": 1,
						"key": true
					},
					{
						"value": 0,
						"key": false
					},
					],
				},
				
				{
					field: "yeutobuitalc",

					uicontrol: "checkbox",
					checkedField: "key",
					valueField: "value",
					dataSource: [{
						"value": 1,
						"key": true
					},
					{
						"value": 0,
						"key": false
					},
					],
				},
				
{
					field: "yeutobuibong",

					uicontrol: "checkbox",
					checkedField: "key",
					valueField: "value",
					dataSource: [{
						"value": 1,
						"key": true
					},
					{
						"value": 0,
						"key": false
					},
					],
				},
				


				{
					field: "yeutothuyngan",

					uicontrol: "checkbox",
					checkedField: "key",
					valueField: "value",
					dataSource: [{
						"value": 1,
						"key": true
					},
					{
						"value": 0,
						"key": false
					},
					],
				},
				
				{
					field: "yeutoasen",

					uicontrol: "checkbox",
					checkedField: "key",
					valueField: "value",
					dataSource: [{
						"value": 1,
						"key": true
					},
					{
						"value": 0,
						"key": false
					},
					],
				},
				
{
					field: "yeutooxitcacbon",

					uicontrol: "checkbox",
					checkedField: "key",
					valueField: "value",
					dataSource: [{
						"value": 1,
						"key": true
					},
					{
						"value": 0,
						"key": false
					},
					],
				},
				
				{
					field: "yeutobenzen",

					uicontrol: "checkbox",
					checkedField: "key",
					valueField: "value",
					dataSource: [{
						"value": 1,
						"key": true
					},
					{
						"value": 0,
						"key": false
					},
					],
				},
				
				{
					field: "yeutotnt",

					uicontrol: "checkbox",
					checkedField: "key",
					valueField: "value",
					dataSource: [{
						"value": 1,
						"key": true
					},
					{
						"value": 0,
						"key": false
					},
					],
				},

				{
					field: "yeutonicotin",

					uicontrol: "checkbox",
					checkedField: "key",
					valueField: "value",
					dataSource: [{
						"value": 1,
						"key": true
					},
					{
						"value": 0,
						"key": false
					},
					],
				},
				
				{
					field: "yeutohoachattrusau",

					uicontrol: "checkbox",
					checkedField: "key",
					valueField: "value",
					dataSource: [{
						"value": 1,
						"key": true
					},
					{
						"value": 0,
						"key": false
					},
					],
				},
				
				{
					field: "danhgiaganhnangthankinhtamly",

					uicontrol: "checkbox",
					checkedField: "key",
					valueField: "value",
					dataSource: [{
						"value": 1,
						"key": true
					},
					{
						"value": 0,
						"key": false
					},
					],
				},
				
				{
					field: "danhgiaecgonomy",

					uicontrol: "checkbox",
					checkedField: "key",
					valueField: "value",
					dataSource: [{
						"value": 1,
						"key": true
					},
					{
						"value": 0,
						"key": false
					},
					],
				},
				
				{
					field: "yeutovisinhvat",

					uicontrol: "checkbox",
					checkedField: "key",
					valueField: "value",
					dataSource: [{
						"value": 1,
						"key": true
					},
					{
						"value": 0,
						"key": false
					},
					],
				},
				
				{
					field: "yeutogaydiung",

					uicontrol: "checkbox",
					checkedField: "key",
					valueField: "value",
					dataSource: [{
						"value": 1,
						"key": true
					},
					{
						"value": 0,
						"key": false
					},
					],
				},
				
				{
					field: "yeutodungmoi",

					uicontrol: "checkbox",
					checkedField: "key",
					valueField: "value",
					dataSource: [{
						"value": 1,
						"key": true
					},
					{
						"value": 0,
						"key": false
					},
					],
				},
				
				{
					field: "yeutogayungthu",

					uicontrol: "checkbox",
					checkedField: "key",
					valueField: "value",
					dataSource: [{
						"value": 1,
						"key": true
					},
					{
						"value": 0,
						"key": false
					},
					],
				},
				
				{
					field: "donvibaocao",
					cssClass: false,
				},
				{
					field: "thoigianvietbaocao",
					cssClass: false,
				},
				{
					field: "so",
					cssClass: false,
				},
				{
					field: "bc",
					cssClass: false,
				},
				{
					field: "noivietbaocao",
					cssClass: false,
				},
				{
					field: "ngayvietbaocao",
					cssClass: false,
				},
				{
					field: "thangvietbaocao",
					cssClass: false,
				},
				{
					field: "namvietbaocao",
					cssClass: false,
				},
				{
					field: "ngaytienhanh",
					cssClass: false,
				},
				{
					field: "thangtienhanh",
					cssClass: false,
				},
				{
					field: "namtienhanh",
					cssClass: false,
				},
				{
					field: "tentochuc",
					cssClass: false,
				},
				{
					field: "nguoidaidien",
					cssClass: false,
				},{
					field: "chucvu",
					cssClass: false,
				},
				{
					field: "so",
					cssClass: false,
				},
				{
					field: "diachi",
					cssClass: false,
				},
				{
					field: "sodienthoai",
					cssClass: false,
				},
				{
					field: "sofax",
					cssClass: false,
				},
				{
					field: "email",
					cssClass: false,
				},
				{
					field: "website",
					cssClass: false,
				},
				{
					field: "nguoichiutrachnhiemchuyenmon",
					cssClass: false,
				},
				{
					field: "chucvunguoichiutrachnhiem",
					cssClass: false,
				},

				{
					field: "sodienthoainguoichiutrachnhiem",
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
				self.$el.find(".input-mobile").css("width", "100%");
				// });
			}
			if (id) {
				this.model.set('id', id);
				this.model.fetch({
					success: function (data) {
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