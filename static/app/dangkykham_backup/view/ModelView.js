define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!app/dangkykham/tpl/model.html'),
    	schema 				= require('json!schema/DangKyKhamSchema.json');
    var CoSoKCB = require('app/cosokcb/view/SelectView');
    var ChuyenKhoaSelectView = require('app/dangkykham/view/ChuyenKhoaSelectView');
    
    return Gonrin.ModelView.extend({
    	template : template,
    	urlPrefix: "/api/v1/",
    	modelSchema	: schema,
    	collectionName: "dangkykham",
    	tools : [
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
						command: function(){
							var self = this;
							
							Backbone.history.history.back();
						},
						visible:function(){
							return this.getApp().currentUser.hasRole("Admin") || this.getApp().currentUser.hasRole("CoSoKCB");
						}
					},
					{
		    	    	name: "delete",
		    	    	type: "button",
		    	    	buttonClass: "btn-danger btn-sm",
		    	    	label: "TRANSLATE:DELETE",
		    	    	visible: function(){
		    	    		return this.getApp().currentUser.hasRole("Admin");
		    	    	},
		    	    	command: function(){
		    	    		var self = this;
		                    self.model.destroy({
		                        success: function(model, response) {
		                        	self.getApp().notify('Xoá dữ liệu thành công');
		                            self.getApp().getRouter().navigate(self.collectionName + "/collection");
		                        },
		                        error: function (model, xhr, options) {
		                            self.getApp().notify('Xoá dữ liệu không thành công!');
		                            
		                        }
		                    });
		    	    	}
		    	    },
    	    	],
    	    }],
    	uiControl:{
    		fields:[
    			{
					field:"ngayhenkham",
					textFormat:"DD/MM/YYYY",
					extraFormats:["DDMMYYYY"]
				},
        		{
    				field:"cosokcb",
    				uicontrol:"ref",
    				textField: "ten_coso",
    				foreignRemoteField: "id",
    				foreignField: "cosokcb_id",
    				dataSource: CoSoKCB
    			},
    			{
					field:"khunggiokham",
					label:"Khung giờ khám",
   					uicontrol:"combobox",
   					textField: "text",
                    valueField: "value",
                    cssClass:"form-control",
   					dataSource: [
                        { value: "08_10",  text: "Từ 08h - 10h sáng" },
                        { value: "10_12", text: "Từ 10h - 12h sáng" },
                        { value: "12_14", text: "Từ 12h - 14h chiều" },
                        { value: "14_16", text: "Từ 14h - 16h chiều" },
                        { value: "16_18", text: "Từ 16h - 18h chiều" },
                        { value: "18_20", text: "Từ 18h - 20h chiều" },
                    ],
   				},
				{
					field:"trangthai",
					label:"Trạng thái",
   					uicontrol:"combobox",
   					textField: "text",
                    valueField: "value",
                    cssClass:"form-control",
   					dataSource: [
                        
                        { value: 0, text: "Tạo mới" },
                        { value: 1, text: "Xác nhận khám" },
                        { value: 2, text: "Đã khám xong" },
                    ],
   				},
   				{
					field: "ghisochamsoc",
					uicontrol:"radio",
					textField: "text",
					valueField: "value",
					cssClassField: "cssClass",
					dataSource: [
						{ value: true, text: "Có" },
						{ value: false, text: "Không", cssClass: "yeallow" },
			       ]
				},
				{
					field: "chuyenkhoa",
					uicontrol:"ref",
					textField: "name",
//					valueField: "code",
					dataSource: ChuyenKhoaSelectView,
					selectionMode: "multiple"
				}
        	]
    	},
    	render:function(){
    		var self = this;
    		self.$el.find("#thongtinketqua").hide();
    		self.model.on('change:cosokcb', function(){
    			var cosokcb  = self.model.get("cosokcb");
    			if(cosokcb !== null){
    				self.model.set("noikham",cosokcb.diachi);
    			}
    		});
    		
    		self.$el.find("#btndatkham").unbind("click").bind("click", function(){
    			var danhsach_chuyenkhoa = self.model.get("chuyenkhoa");
    			var donvi_kham = self.model.get("cosokcb");
    			var ngaykham = self.model.get("ngayhenkham");
    			var lydokham = self.model.get("lydokham");
    			if(donvi_kham === null || donvi_kham === undefined){
					self.getApp().notify({ message: 'Vui lòng chọn đơn vị đăng ký khám' }, { type: "danger", delay: 1000 });
					return;
    			}
    			if(ngaykham === null || ngaykham === undefined){
					self.getApp().notify({ message: 'Vui lòng chọn ngày đăng ký khám' }, { type: "danger", delay: 1000 });
					return;
    			}
    			if(lydokham === null || lydokham === undefined){
					self.getApp().notify({ message: 'Vui lòng chọn lý do khám' }, { type: "danger", delay: 1000 });
					return;
    			}
    			
				self.model.save(null,{
		            success: function (model, respose, options) {
		                self.getApp().notify("Lưu dữ liệu thành công");
		                
		                self.getApp().getRouter().navigate("dangkykham/collection");
		            },
		            error: function (xhr, status, error) {
						try {
							if (($.parseJSON(error.xhr.responseText).error_code) === "SESSION_EXPIRED"){
								self.getApp().notify("Hết phiên làm việc, vui lòng đăng nhập lại!");
								self.getApp().getRouter().navigate("login");
							} else {
								self.getApp().notify({ message: $.parseJSON(error.xhr.responseText).error_message }, { type: "danger", delay: 1000 });
							}
						}
						catch (err) {
						  self.getApp().notify({ message: "Lưu dữ liệu không thành công"}, { type: "danger", delay: 1000 });
						}
					}
		        });
				return;
    		});
    		self.model.on("change:chuyenkhoa", function(){
    			console.log("onchage====",self.model.get("chuyenkhoa"));
    		});
    		
    		var id = this.getApp().getRouter().getParam("id");
    		if(id){
    			this.model.set('id',id);
        		this.model.fetch({
        			success: function(data){
        				self.$el.find("#form-content").find("input").prop("disabled", true );
        				self.$el.find("#trangthai").prop("disabled", true );
        				self.$el.find("#thongtinketqua").show();
        				self.$el.find("#btndatkham").html("Lưu thông tin");
        				
//        				var data_chuyenkhoa = self.model.get('chuyenkhoa');
//        				var array = [];
//        				if (data_chuyenkhoa!==null){
//        					array = JSON.parse(data_chuyenkhoa);
//        				}else{
//        					array = [];
//        				}
        				if (typeof data_chuyenkhoa !== "object"){
        					self.model.set("chuyenkhoa",[]);
        				}
        				var data_donthuoc = self.model.get("donthuoc");
        				if (data_donthuoc === null){
        					data_donthuoc = [];
        				}
        				self.$el.find("#donthuoc").grid({
                        	showSortingIndicator: true,
                        	onValidateError: function(){
                        		alert("error");
                        	},
                        	orderByMode: "client",
                        	tools:[
        	                 ],
                        	fields: [
                        		{field: "ten", label: "Tên thuốc"},
                        		{field: "ma", label: "Mã thuốc"},
                        		{field: "hamluong", label: "Hàm lượng"},
                        		{field: "soluong", label: "Số lượng"},
                        		{field: "donvi", label: "Đơn vị tính"},
                        		{field: "cachdung", label: "Cách dùng"},
                              	 ],
                            dataSource: data_donthuoc,
                            primaryField:"ma",
                            noResultsClass:"d-none",
                            onRendered: function(e){
//                           	 self.$el.find("#no_res_donthuoc").hide();
                            }
        				});
                            
        				self.applyBindings();
        			},
        			error: function (xhr, status, error) {
						try {
							if (($.parseJSON(error.xhr.responseText).error_code) === "SESSION_EXPIRED"){
								self.getApp().notify("Hết phiên làm việc, vui lòng đăng nhập lại!");
								self.getApp().getRouter().navigate("login");
							} else {
								self.getApp().notify({ message: $.parseJSON(error.xhr.responseText).error_message }, { type: "danger", delay: 1000 });
							}
						}
						catch (err) {
						  self.getApp().notify({ message: "Không tìm thấy dữ liệu"}, { type: "danger", delay: 1000 });
						}
					},
        		});
    		}else{
    			self.model.set("trangthai",0);
    			var viewData = self.viewData;
    			if(viewData !== null && viewData !== undefined){
    				self.model.set("sochamsoc_id",viewData.sochamsoc_id);
        			self.model.set("nguoibenh_id", viewData.id);
        			self.model.set("hosobenhnhan", viewData);
        			self.model.set("user_id",viewData.user_id);
        			
    			}else{
//    	    		self.getApp().getRouter().navigate('hosobenhnhan/model');
//    	    		return;
    			}
    			self.applyBindings();
    		}
    		
    	},
    });

});