define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!app/dangkykham/tpl/model.html'),
    	schema 				= require('json!schema/DangKyKhamSchema.json');
    var CoSoKCB = require('app/cosokcb/view/SelectView');
    var ChuyenKhoaSelectView = require('app/dangkykham/view/ChuyenKhoaSelectView');
	var TinhThanhSelectView = require('app/DanhMuc/TinhThanh/view/SelectView');

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
//    			{
//					field:"ngaysinh",
//					textFormat:"DD/MM/YYYY",
//					extraFormats:["DDMMYYYY"]
//				},
//            	{
//   					field:"gioitinh",
//   					uicontrol:"combobox",
//   					textField: "text",
//                    valueField: "value",
//   					dataSource: [
//                        { value: 1, text: "Nam" },
//                        { value: 0, text: "Nữ" },
//                    ],
//   				},
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
                        { value: 1, text: "Xác nhận của cơ sở KCB" },
                        { value: 2, text: "Đã tới khám" },
                        { value: 3, text: "đã trả kết quả" },
                    ],
   				},
//				{
//					field: "chuyenkhoa",
//					uicontrol:"ref",
//					textField: "name",
////					valueField: "code",
//					dataSource: ChuyenKhoaSelectView,
//					selectionMode: "multiple"
//				},
				{
					field: "tinhthanh",
					uicontrol: "ref",
					textField: "ten",
					foreignRemoteField: "id",
					foreignField: "tinhthanh_id",
					dataSource: TinhThanhSelectView
				}
        	]
    	},
    	render:function(){
    		var self = this;
    		self.$el.find("#thongtinketqua").hide();
    		self.getCoSoKCB();
    		self.bindEventSelect();
			var currentUser = self.getApp().currentUser;
    		if (currentUser.hasRole('Admin') || currentUser.hasRole("CoSoKCB")){
    			self.$el.find('.card-header').show();
    		}else{
    			self.$el.find('.card-header').hide();
    		}
    		
    		self.$el.find("#btndatkham").unbind("click").bind("click", function(){
    			self.process_datkham();
    		});
    		
    		var id = this.getApp().getRouter().getParam("id");
    		if(id){
    			this.model.set('id',id);
        		this.model.fetch({
        			success: function(data){
        				self.$el.find("#form-content").find("input").prop("disabled", true );
        				self.$el.find("#trangthai").removeClass("hidden");
        				var currentUser = self.getApp().currentUser;
        				if(self.model.get("user_id") !== currentUser.id){
        					self.$el.find("#btndatkham").hide();
        				}
        				

        				if(self.model.get("trangthai") > 0){
        					self.$el.find("#thongtinketqua").show();
        					self.$el.find("#btndatkham").hide();
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
//                               	 self.$el.find("#no_res_donthuoc").hide();
                                }
            				});
        				} else {
        					self.$el.find("#btndatkham").html("Lưu thông tin");
        					self.$el.find("#thongtinketqua").hide();
        				}
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
//        			self.model.set("nguoibenh_id", viewData.id);
//        			self.model.set("hosobenhnhan", viewData);
        			self.model.set("user_id",viewData.user_id);
    			}else{
//    	    		self.getApp().getRouter().navigate('hosobenhnhan/model');
//    	    		return;
    			}
    			self.applyBindings();
    		}
    		
    	},
    	getCoSoKCB: function(){
    		var self = this;
    		$.ajax({
    			url: self.getApp().serviceURL + "/api/v1/cosokcb",
    			method: "GET",
        		data: {"q": JSON.stringify({"order_by":[{"field": "updated_at", "direction": "desc"}], "page":1,"results_per_page":10000})},
//    			data:JSON.stringify({"username":username,"password":password, "type":type, "id_cosokcb":id_cosokcb}),
    			contentType: "application/json",
    			success: function (data) {
    				self.$el.find("#multiselect_cosokcb").html("");
    				for(var i=0; i< data.objects.length; i++){
    					var item = data.objects[i];
    					var data_str = encodeURIComponent(JSON.stringify(item));
    					var option_elm = $('<option>').attr({'value':item.id,'data-ck':data_str}).html(item.ten_coso)
    					self.$el.find("#multiselect_cosokcb").append(option_elm);
    				}
    				var cosokcb = self.model.get("cosokcb");
    				var val_cosokcb ="";
    				if(cosokcb!==null){
    					val_cosokcb = cosokcb.id
    				}
    				self.$el.find("#multiselect_cosokcb").selectpicker('val',val_cosokcb);

    				
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
    	process_datkham: function(){
    		var self = this;
    		//validate
			var phone = self.model.get("dienthoai");
			if(self.validatePhone(phone) === false){
				self.getApp().notify("Số điện thoại không đúng, vui lòng kiểm tra lại ");
				return;
			}
			var check_validate = true;
    		var forms = document.getElementsByClassName('needs-validation');
    		// Loop over them and prevent submission
    		var validation = Array.prototype.filter.call(forms, function(form) {
    			
	    		if (form.checkValidity() === false) {
	    			event.preventDefault();
	    			event.stopPropagation();
	    			check_validate = false;
	    		}
	    		form.classList.add('was-validated');
    		});
        	if(check_validate === false){
        		return false;
        	}
        	//end validate
			
			var chuyenkhoa = [];
			self.$el.find("#multiselect_chuyenkhoa option:selected").each(function() {
				var data_ck = $(this).attr('data-ck');
				var my_object = JSON.parse(decodeURIComponent(data_ck));
				if (my_object !==null){
					chuyenkhoa.push(my_object);
				}
			});
			self.model.set("chuyenkhoa",chuyenkhoa);
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
    	},
    	bindEventSelect: function(){
    		var self = this;
    		self.$el.find('#multiselect_cosokcb').on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {
    			var data_ck = self.$el.find('#multiselect_cosokcb option:selected').attr('data-ck');
    			if(data_ck!== undefined && data_ck !== null){
    				var my_object = JSON.parse(decodeURIComponent(data_ck));
    				if (my_object !== null){
    					self.model.set("cosokcb",my_object);
    				}
    			}
    			
    		});
    		self.model.on('change:cosokcb', function(){
    			var cosokcb  = self.model.get("cosokcb");
    			if(cosokcb !== null){
    				self.model.set("noikham",cosokcb.diachi);
    			}
    			if(!!cosokcb.required_fields && cosokcb.required_fields.length>0){
    				for(var i=0; i<cosokcb.required_fields.length; i++){
    					var field = cosokcb.required_fields[i];
    					self.$el.find("."+field).removeClass("d-none");
    				}
    			}
    			
    			if(!!cosokcb.danhsachchuyenkhoa && cosokcb.danhsachchuyenkhoa.length>0){
    				self.$el.find("#multiselect_chuyenkhoa").html("");
    				for(var i=0; i< cosokcb.danhsachchuyenkhoa.length; i++){
    					var item = cosokcb.danhsachchuyenkhoa[i];
    					var data_str = encodeURIComponent(JSON.stringify(item));
    					var option_elm = $('<option>').attr({'value':item.code,'data-ck':data_str}).html(item.name)
    					self.$el.find("#multiselect_chuyenkhoa").append(option_elm);
    				}
    				

    			}
    			$.fn.selectpicker.Constructor.DEFAULTS.multipleSeparator = ' | ';
    			var chuyenkhoa = self.model.get("chuyenkhoa");
    			var val_chuyenkhoa =[];
    			if(chuyenkhoa !== null){
    				for(var i =0; i< chuyenkhoa.length; i++){
    					val_chuyenkhoa.push(chuyenkhoa[i].code);
    				}
    			}
    			
    			self.$el.find("#multiselect_chuyenkhoa").selectpicker('val',val_chuyenkhoa);
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