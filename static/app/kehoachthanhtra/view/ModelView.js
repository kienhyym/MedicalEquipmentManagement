define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!app/kehoachthanhtra/tpl/model.html'),
    	schema 				= require('json!schema/KeHoachThanhTraSchema.json');
	var TinhThanhSelectView = require('app/DanhMuc/TinhThanh/view/SelectView');

    return Gonrin.ModelView.extend({
    	template : template,
    	urlPrefix: "/api/v1/",
    	modelSchema	: schema,
    	collectionName: "kehoachthanhtra",
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
					field:"ngaysoanthao",
					textFormat:"DD/MM/YYYY",
					extraFormats:["DDMMYYYY"]
				},
				{
					field:"ngaypheduyet",
					textFormat:"DD/MM/YYYY",
					extraFormats:["DDMMYYYY"]
				},
				{
					field:"ngaythanhtra",
					textFormat:"DD/MM/YYYY",
					extraFormats:["DDMMYYYY"]
				},
    			{
					field:"trangthai",
					label:"Trạng thái",
   					uicontrol:"combobox",
   					textField: "text",
                    valueField: "value",
                    cssClass:"form-control",
   					dataSource: [
   						{ value: "new", text: "Tạo mới" },
                        { value: "send_review_truongphong", text: "Chờ cấp phòng duyệt" },
                        { value: "cancel_reviewed_truongphong", text: "Phòng từ chối" },
                        { value: "send_review_pct", text: "Chờ PCT duyệt" },
                        { value: "cancel_reviewed_pct", text: "PCT từ chối" },
                        { value: "send_approved", text: "Chờ CT duyệt" },
                        { value: "cancel_approved", text: "CT từ chối" },
                        { value: "approved", text: "CT đã duyệt quyết định" },
                        { value: "checked", text: "Đã kiểm tra" },
                        { value: "result_checked", text: "Đã có kết luận" },
                        { value: "completed", text: "Hoàn thành" }
                    ],
   				},
        	]
    	},
    	render:function(){
    		var self = this;
    		self.getDoanhNghiep();
    		self.bindEventSelect();
			var currentUser = self.getApp().currentUser;
    		if (currentUser.hasRole('ChuyenVien') || currentUser.hasRole("TruongPhong")){
    			self.$el.find('.card-header').show();
    		}else{
    			self.$el.find('.card-header').hide();
    		}
    		
    		self.$el.find("#btndatkham").unbind("click").bind("click", function(){
    		});
    		
    		var id = this.getApp().getRouter().getParam("id");
    		if(id){
    			this.model.set('id',id);
        		this.model.fetch({
        			success: function(data){
        				self.$el.find("#form-content").find("input").prop("disabled", true );
        				self.$el.find("#trangthai").removeClass("hidden");
        				var currentUser = self.getApp().currentUser;
        				

        				if(self.model.get("trangthai") > 0){
        					self.$el.find("#btndatkham").hide();
        				} else {
        					self.$el.find("#btndatkham").html("Lưu thông tin");
        				}
        				self.applyBindings();
    	    			self.$el.find("#multiselect_donvidoanhnghiep").selectpicker('val',self.model.get("madoanhnghiep"));

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
    			self.model.set("trangthai","new");
    			self.$el.find("#trangthai").hide();
    			self.applyBindings();
    		}
    		
    	},
    	getDoanhNghiep: function(){
    		var self = this;
    		$.ajax({
    			url: self.getApp().serviceURL + "/api/v1/danhmucdoanhnghiep",
    			method: "GET",
        		data: {"q": JSON.stringify({"order_by":[{"field": "name", "direction": "desc"}], "page":1,"results_per_page":10000})},
    			contentType: "application/json",
    			success: function (data) {
    				self.$el.find("#multiselect_donvidoanhnghiep").html("");
    				for(var i=0; i< data.objects.length; i++){
    					var item = data.objects[i];
    					var data_str = encodeURIComponent(JSON.stringify(item));
    					var option_elm = $('<option>').attr({'value':item.id,'data-ck':data_str}).html(item.name)
    					self.$el.find("#multiselect_donvidoanhnghiep").append(option_elm);
    				}
    				var madoanhnghiep = self.model.get("madoanhnghiep");
    				self.$el.find("#multiselect_donvidoanhnghiep").selectpicker('val',madoanhnghiep);

    				
    			},
    			error: function (xhr, status, error) {
    				try {
    					if (($.parseJSON(error.xhr.responseText).error_code) === "SESSION_EXPIRED"){
    						self.getApp().notify("Hết phiên làm việc, vui lòng đăng nhập lại!");
    						self.getApp().getRouter().navigate("login");
    					} else {
    					    self.getApp().notify({ message: $.parseJSON(error.xhr.responseText).error_message }, { type: "danger", delay: 1000 });
    					}
    				}catch (err) {
    				    self.getApp().notify({ message: "Lỗi không lấy được dữ liệu"}, { type: "danger", delay: 1000 });
    				}
    			}
    		});
    	},
    	bindEventSelect: function(){
    		var self = this;
    		self.$el.find('#multiselect_donvidoanhnghiep').on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {
    			var data_ck = self.$el.find('#multiselect_donvidoanhnghiep option:selected').attr('data-ck');
    			if(data_ck!== undefined && data_ck !== null){
    				var my_object = JSON.parse(decodeURIComponent(data_ck));
    				if (my_object !== null){
    					self.model.set("doanhnghiep",my_object);
    					self.model.set("madoanhnghiep",my_object.id);
    					self.model.set("tendoanhnghiep",my_object.name);
    				}
    			}
    			
    		});
    	},
    	validatePhone: function(inputPhone) {
			if (inputPhone == null || inputPhone == undefined) {
				return false;
			}
			var phoneno = /^0([1-9]{1})([0-9]{8})$/;
            const result = inputPhone.match(phoneno);
            if (result!==null && result.indexOf(inputPhone)>=0) {
                return true;
            } else {
                return false;
            }
        }
    });

});