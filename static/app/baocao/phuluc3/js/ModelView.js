define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/baocao/phuluc3/tpl/model.html'),
		schema = require('json!schema/HSCCTaiNanLaoDongTaiCoSoLaoDongSchema.json');

	var ConnectionBangHoSoCapCuuItemView = require('app/baocao/phuluc3/js/BangHSCCTaiNanLaoDongTaiCoSoLaoDongView');
	return Gonrin.ModelView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "hscctainanlaodongtaicosolaodong",
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
					field: "banghscctainanlaodongtaicosolaodongfield",
					uicontrol: false,
					itemView: ConnectionBangHoSoCapCuuItemView,
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
					field: "tencosolaodong",
					cssClass: false,
				},
				{
					field: "nganhchuquan",
					cssClass: false,
				},
				{
					field: "diachi",
					cssClass: false,
				},
				{
					field: "dienthoai",
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
					field: "nguoilienhe",
					cssClass: false,
				},
				{
					field: "nguoilaphoso",
					cssClass: false,
				},
				{
					field: "nam",
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
						self.registerEvent();
						// self.sothutu();
					},
					error: function () {
						self.getApp().notify("Get data Eror");
					},
				});
			} else {
				self.applyBindings();
				self.registerEvent();
			}
		},
		registerEvent: function () {
			this.sothutu();
			this.ChonNamHoacNu();
			this.ChonNuHoacNam();
		},
		// sothutu: function () {
		// 	var self = this;
		// 	// var id = self.getApp().currentUser.id
		// 	self.$el.find(" tr td #stt").val('x')
		// 	var x = self.$el.find("tr td #stt")

		// 	for(var i= 0;i<=x.length;i++){
		// 		x[i].val('a');
		// 	console.log(x[i]);

		// 	}
		// }
		sothutu: function () {
			const self = this;
			var arr = [];
			var arrr = [];

			arr = lodash.sortBy(self.model.get("banghscctainanlaodongtaicosolaodongfield"), ["created_at"], ["asc"])
			arr.forEach(function (item, index, array) {
				console.log(index);
			
			});	
		
			arrr = lodash(self.$el.find("tr td #stt"));
			arrr.forEach(function (item, index, array) {
				console.log(item);
				item.value=index;
			});	

		},
		ChonNamHoacNu: function(){
			var arrTuoiNam = [];
			const self = this;
			arrTuoiNam = lodash(self.$el.find("tr td #tuoinam"));
			arrTuoiNam.forEach(function (item, index, array) {
				item.addEventListener("click", function(){
					var idTuoiNam = index;
					console.log('idTuoiNam',idTuoiNam)
					var arrTuoiNu = [];
					arrTuoiNu = lodash(self.$el.find("tr td #tuoinu"));
					arrTuoiNu.forEach(function (item, index, array) {
					if(index == idTuoiNam){
						item.value="";
						console.log('idTuoiNu',index)
					}
					
					});
				});
				
			});	
		},
		ChonNuHoacNam: function(){
			var arrTuoiNu = [];
			const self = this;
			arrTuoiNu = lodash(self.$el.find("tr td #tuoinu"));
			arrTuoiNu.forEach(function (item, index, array) {
				item.addEventListener("click", function(){
					var idTuoiNu = index;
					console.log('idTuoiNu',idTuoiNu)
					var arrTuoiNam = [];
					arrTuoiNam = lodash(self.$el.find("tr td #tuoinam"));
					arrTuoiNam.forEach(function (item, index, array) {
					if(index == idTuoiNu){
						item.value="";
						console.log('idTuoiNam',index)
					}
					
					});
				});
				
			});	
		}

	});

});