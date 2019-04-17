define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!app/hosobenhnhan/tpl/model.html'),
    	schema 				= require('json!schema/HoSoBenhNhanSchema.json');
    var XaPhuongSelectView = require('app/DanhMuc/XaPhuong/view/SelectView');
	var QuanHuyenSelectView = require('app/DanhMuc/QuanHuyen/view/SelectView');
	var TinhThanhSelectView = require('app/DanhMuc/TinhThanh/view/SelectView');

	var DatKhamView = require('app/dangkykham/view/ModelView');

	var currentDate = new Date();
    return Gonrin.ModelView.extend({
    	template : template,
    	urlPrefix: "/api/v1/",
    	modelSchema	: schema,
    	collectionName: "hosobenhnhan",
    	bindings:"data-hoso-bind",
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
							return this.getApp().currentUser.hasRole("Admin");
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
    	uiControl: {
            fields: [
            	{
					field:"ngaysinh",
					textFormat:"DD/MM/YYYY",
					extraFormats:["DDMMYYYY"],
					maxDate: currentDate
				},
            	{
   					field:"gioitinh",
   					uicontrol:"combobox",
   					textField: "text",
                    valueField: "value",
   					dataSource: [
                        { value: 1, text: "Nam" },
                        { value: 0, text: "Nữ" },
                    ],
   				},
            	{
        			field: "thannhan_quanhe",
        			uicontrol: "combobox",
        			textField: "text",
        			valueField: "value",
        			dataSource: [
        				{text: "Chồng", value: "1"},
        				{text: "Vợ", value: "2"},
        				{text: "Con", value: "3"},
        				{text: "Ông", value: "4"},
        				{text: "Bà", value: "5"},
        				{text: "Bố", value: "6"},
        				{text: "Mẹ", value: "7"},
        				{text: "Anh/Em trai", value: "8"},
        				{text: "Chị/Em gái", value: "9"},
        				{text: "Cô/Gì/Chú/Bác", value: "10"},
        				{text: "khác", value: "11"}
        			]
        		},
        		{
        			field: "nghenghiep",
        			uicontrol: "combobox",
        			textField: "text",
        			valueField: "value",
        			dataSource: [
        				{text: "Hành chính", value: "1"},
        				{text: "Nhân viên văn phòng", value: "2"},
        				{text: "Làm ruộng", value: "3"},
        				{text: "Kỹ sư", value: "4"},
        				{text: "công nhân", value: "5"},
        				{text: "khác", value: "11"}
        			]
        		},
        		{
					field: "xaphuong",
					uicontrol: "ref",
					textField: "ten",
					foreignRemoteField: "id",
					foreignField: "xaphuong_id",
					dataSource: XaPhuongSelectView
				},
				{
					field: "quanhuyen",
					uicontrol: "ref",
					textField: "ten",
					foreignRemoteField: "id",
					foreignField: "quanhuyen_id",
					dataSource: QuanHuyenSelectView
				},
				{
					field: "tinhthanh",
					uicontrol: "ref",
					textField: "ten",
					foreignRemoteField: "id",
					foreignField: "tinhthanh_id",
					dataSource: TinhThanhSelectView
				},
        		]
    	},
    	render:function(){
    		var self = this;
//			var currentUser = self.getApp().currentUser;
//			if (!!currentUser && currentUser.hoten === null || currentUser.hoten == "" ){
//				currentUser.hoten = currentUser.id;
//			}
    		self.model.on('change:sochamsoc_id', function(){
    			var sochamsoc_id = self.model.get("sochamsoc_id");
    			if (sochamsoc_id!==null && sochamsoc_id!==undefined && sochamsoc_id!==""){
    				$.ajax({
    					url: self.getApp().serviceURL + "/api/v1/hosobenhnhan/check_sochamsoc",
    					method: "POST",
    					data:JSON.stringify({"sochamsoc_id":sochamsoc_id}),
    					contentType: "application/json",
    					success: function (data) {
    						self.model.set(data);
    					},
    					error: function (xhr, status, error) {
//    						console.log("loi check sochamsoc_id===",error);
    					}
    				});
    			}
    			
    		});
			self.$el.find("#taohosobenhnhan").unbind('click').bind('click', function(){
				//validate
//				var check_validate = true;
//        		var forms = document.getElementsByClassName('needs-validation');
//        		// Loop over them and prevent submission
//        		var validation = Array.prototype.filter.call(forms, function(form) {
//    	    		if (form.checkValidity() === false) {
//    	    			event.preventDefault();
//    	    			event.stopPropagation();
//    	    			if(check_validate === true){
//    	    				check_validate = false;
//    	    			}
//    	    			
//    	    		}
//    	    		form.classList.add('was-validated');
//        		});
//            	if(check_validate === false){
//            		return;
//            	}
            	//end validate
            	
				var sochamsoc_id = self.model.get("sochamsoc_id");
				var ten = self.model.get('ten');
				var ngaysinh = self.model.get("ngaysinh");
				var tinhthanh_id = self.model.get("tinhthanh_id");
				var quanhuyen_id = self.model.get("quanhuyen_id");
				var xaphuong_id = self.model.get("xaphuong_id");
				if (ten === null || ten ===""||
						ngaysinh === null || ngaysinh ===""||
						tinhthanh_id === null || tinhthanh_id ===""||
						quanhuyen_id === null || quanhuyen_id ===""||
						xaphuong_id === null || xaphuong_id ===""){
					self.getApp().notify({ message: 'Vui lòng nhập đầy đủ thông tin' }, { type: "danger", delay: 1000 });
					return;
				}
				
				self.model.set("user_id",self.getApp().currentUser.id)
				self.model.save(null,{
		            success: function (model, respose, options) {
		                self.getApp().notify("Lưu dữ liệu thành công");
		                var datkhamView = new DatKhamView({
		                	el: self.getApp().$content,
		                	viewData:respose, 
		                	type:"new"});
		                datkhamView.render();
		                
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
				
			});
			
			var id = this.getApp().getRouter().getParam("id");
    		if(id){
    			this.model.set('id',id);
        		this.model.fetch({
        			success: function(data){
        				self.applyBindings();
        				self.model.on("change:tinhthanh", function(){
        					self.getFieldElement("quanhuyen").data("gonrin").setFilters({"tinhthanh_id": { "$eq": self.model.get("tinhthanh_id")}});
        				});
        	    		self.model.on("change:quanhuyen", function(){
        	    			self.getFieldElement("xaphuong").data("gonrin").setFilters({"quanhuyen_id": { "$eq": self.model.get("quanhuyen_id")}});

        				});
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
    			self.applyBindings();
    			self.model.on("change:tinhthanh", function(){
    				self.getFieldElement("quanhuyen").data("gonrin").setFilters({"tinhthanh_id": { "$eq": self.model.get("tinhthanh_id")}});
    			});
        		self.model.on("change:quanhuyen", function(){
        			self.getFieldElement("xaphuong").data("gonrin").setFilters({"quanhuyen_id": { "$eq": self.model.get("quanhuyen_id")}});

    			});
    		}
    		
			
    	},
    	
    });

});