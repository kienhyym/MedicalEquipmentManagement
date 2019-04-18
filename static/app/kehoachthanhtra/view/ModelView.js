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
    		if (currentUser.hasRole('ChuyenVien')){
    			self.$el.find('.card-header').show();
    			self.$el.find("#btn_review").hide();
    			self.$el.find("#btn_approve").show();
    			self.$el.find("#btn_cancel").hide();
    		}else if (currentUser.hasRole('TruongPhong')){
    			self.$el.find('.card-header').hide();
    			self.$el.find("#btn_approve").hide();
    			self.$el.find("#btn_review").show();
    			self.$el.find("#btn_cancel").show();
    			
    		}else if (currentUser.hasRole('CucPho')){
    			self.$el.find('.card-header').hide();
    			self.$el.find("#btn_approve").hide();
    			self.$el.find("#btn_review").show();
    			self.$el.find("#btn_cancel").show();
    			
    		}else if (currentUser.hasRole('CucTruong')){
    			self.$el.find('.card-header').hide();
    			self.$el.find("#btn_approve").show();
    			self.$el.find("#btn_review").hide();
    			self.$el.find("#btn_cancel").show();
    			
    		}
    		
    		
    		var id = this.getApp().getRouter().getParam("id");
    		if(id){
    			this.model.set('id',id);
        		this.model.fetch({
        			success: function(data){
        				self.$el.find("#form-content").find("input").prop("disabled", true );
        				self.$el.find("#trangthai").removeClass("hidden");
        				
        				self.applyBindings();
    	    			self.$el.find("#multiselect_donvidoanhnghiep").selectpicker('val',self.model.get("madoanhnghiep"));
    	    			self.updateUI_Timeline(data);
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
    			self.$el.find("#timeline").hide();
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
    		
    		self.$el.find("#btn_save").unbind("click").bind("click", function(){
				self.model.save(null, {
					success: function (model, response, options) {
						self.updateUI_Timeline(response);
						self.getApp().notify("Lưu thông tin thành công");
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
						  self.getApp().notify({ message: "Lưu thông tin không thành công"}, { type: "danger", delay: 1000 });
						}
					}
				});
    			
    		});
    		self.$el.find("#btn_review").unbind("click").bind("click", function(){
    			self.confirm_kehoach();
    		});
    		self.$el.find("#btn_approve").unbind("click").bind("click", function(){
    			self.confirm_kehoach();
    		});
    		self.$el.find("#btn_cancel").unbind("click").bind("click", function(){
    			self.cancel_kehoach();
    		});
    		self.$el.find("#upload_files").on("change",function(){
    			var http = new XMLHttpRequest();
                var fd       = new FormData();
           
                fd.append('file', self.$el.find("#upload_files").files[0]);
                http.open('POST', '/api/v1/upload/file');
                http.upload.addEventListener('progress', function(evt){
                  if(evt.lengthComputable){
                    var percent = evt.loaded/evt.total;
                    percent = parseInt(percent*100);
                    console.log(percent);
//                    progess.attr('value',percent);
//                    if(percent == 100)
//                    {
//                        plink.html("Upload 100%");
//                    }
                  }
                },false);
                http.addEventListener('error',function(){
                    console.log("Upload error!");
                },false);

                http.onreadystatechange = function () {
                    if (http.status === 200){
                        if( http.readyState === 4) {
	                       var res = JSON.parse(http.responseText), link, p, t;
	                       console.log("upload success===",res);
	                        link = res.data.link;
//	                        plink.html('');
//	                        plink.html(link);
//	                        status.show();
//	                        progess.hide();
//	                        totalupload=totalupload+1;
//	                        txt_uploaded.val(totalupload+" file uploaded");
	
	                    }
                    } else {
//                            status.addClass('glyphicon glyphicon-exclamation-sign');
//                            status.show();
//                            plink.html("Upload Error!");
//                            progess.val(50);
                        }
                };
                http.send(fd);
			});
    	},
    	confirm_kehoach: function(type){
    		var self = this;
    		var id = self.model.get("id");
    		$.ajax({
    			url: self.getApp().serviceURL + "/api/v1/kehoachthanhtra/confirm",
    			method: "POST",
    			data:JSON.stringify({"id":id}),
    			contentType: "application/json",
    			success: function (data) {
    				if (data !== null){
    					self.model.set(data);
    					self.updateUI_Timeline(data);
    					self.getApp().notify("Xác nhận thành công!");
    					return;
    				}
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
    	cancel_kehoach: function(id, element,lydo){
    		var self = this;
    		
    			    $.ajax({
    					url: self.getApp().serviceURL + "/api/v1/kehoachthanhtra/cancel",
    					method: "POST",
    					data:JSON.stringify({"id":id,"lydo":lydo}),
    					contentType: "application/json",
    					success: function (data) {
    						if (data !== null){
    							self.model.set(data);
    							self.updateUI_Timeline(data);
    							self.getApp().notify("Từ chối xét duyệt thành công!");
    							return;
    						}
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
    						    self.getApp().notify({ message: "Có lỗi xảy ra, vui lòng thử lại sau"}, { type: "danger", delay: 1000 });
    						}
    					}
    				});
    			  
    		
    	},
    	updateUI_Timeline:function(data){
    		var self = this;
    		var el_status_new = self.$el.find("#timeline .kehoach_new");
			el_status_new.addClass("complete");
			el_status_new.find('.author').html(data.username_nguoisoanthao);
			var template_helper = new TemplateHelper();
			var ngaysoanthao = template_helper.datetimeFormat(data.ngaysoanthao, "DD/MM/YYYY");
			el_status_new.find('.date').html(ngaysoanthao);
			var arr_timeline_capphong = ["send_review_pct","cancel_reviewed_pct","send_approved","approved","cancel_approved",checked]
			if(data.trangthai != "new" && data.trangthai != "send_review_truongphong" && 
					data.trangthai != "cancel_reviewed_truongphong"){
				var el_status_capphong = self.$el.find("#timeline .kehoach_send_review_capphong");
				el_status_capphong.addClass("complete");
				el_status_capphong.find('.author').html(data.username_phongduyet);
				var template_helper = new TemplateHelper();
				var ngaypheduyet_phong = template_helper.datetimeFormat(data.ngaypheduyet_phong, "DD/MM/YYYY");
				el_status_capphong.find('.date').html(ngaypheduyet_phong);
			}
			var arr_timeline_cucpho = ["completed","result_checked","checked","cancel_approved","approved","send_approved"]
			if(arr_timeline_cucpho.indexOf(data.trangthai)>=0){
				var el_status_cucpho = self.$el.find("#timeline .kehoach_send_review_pct");
				el_status_cucpho.addClass("complete");
				el_status_cucpho.find('.author').html(data.username_pctduyet);
				var template_helper = new TemplateHelper();
				var ngaypheduyet_cucpho = template_helper.datetimeFormat(data.ngaypheduyet_pct, "DD/MM/YYYY");
				ngaypheduyet_cucpho.find('.date').html(ngaypheduyet_cucpho);
			
			var arr_timeline_cuctruong = ["completed","result_checked","checked","approved"]
			if(arr_timeline_cuctruong.indexOf(data.trangthai)>=0){
				var el_status_cuctruong = self.$el.find("#timeline .kechoach_approved");
				el_status_cuctruong.addClass("complete");
				el_status_cuctruong.find('.author').html(data.username_quyetdinh);
				var template_helper = new TemplateHelper();
				var ngaypheduyet_quyetdinh = template_helper.datetimeFormat(data.ngaypheduyet_quyetdinh, "DD/MM/YYYY");
				el_status_cuctruong.find('.date').html(ngaypheduyet_quyetdinh);
				
			var arr_timeline_checked = ["completed","result_checked","checked"]
			if(arr_timeline_checked.indexOf(data.trangthai)>=0){
				var el_status_checked = self.$el.find("#timeline .kechoach_checked");
				el_status_checked.addClass("complete");
				el_status_checked.find('.author').html('&nbsp;');
				var template_helper = new TemplateHelper();
				var ngaythanhtra = template_helper.datetimeFormat(data.ngaythanhtra, "DD/MM/YYYY");
				el_status_checked.find('.date').html(ngaythanhtra);
				
			var arr_timeline_completed = ["completed","result_checked"]
			if(arr_timeline_completed.indexOf(data.trangthai)>=0){
				var el_status_completed = self.$el.find("#timeline .kechoach_completed");
				el_status_completed.addClass("complete");
				el_status_completed.find('.author').html('&nbsp;');
				var template_helper = new TemplateHelper();
				var ngayketthuc = template_helper.datetimeFormat(data.ngayketthuc, "DD/MM/YYYY");
				el_status_completed.find('.date').html(ngayketthuc);
    				
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