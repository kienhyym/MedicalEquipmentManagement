define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/cosokcb/tpl/model.html'),
		schema = require('json!schema/CoSoKCBSchema.json');
	var XaPhuongSelectView = require('app/DanhMuc/XaPhuong/view/SelectView');
	var QuanHuyenSelectView = require('app/DanhMuc/QuanHuyen/view/SelectView');
	var TinhThanhSelectView = require('app/DanhMuc/TinhThanh/view/SelectView');
	var AppInfoSelectView = require('app/appinfo/view/SelectView');

	return Gonrin.ModelView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "cosokcb",
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
							if(self.getApp().currentUser.hasRole("Admin")){
								self.getApp().getRouter().navigate(self.collectionName + "/collection");
							}
						},
						visible:function(){
							return this.getApp().currentUser.hasRole("Admin");
						}
					},
					{
						name: "save",
						type: "button",
						buttonClass: "btn-success btn-sm",
						label: "TRANSLATE:SAVE",
						visible:function(){
							return this.getApp().currentUser.hasRole("Admin");
						},
						command: function () {
							var self = this;
							self.model.save(null, {
								success: function (model, respose, options) {
									self.getApp().notify("Lưu thông tin thành công");
//									self.getApp().getRouter().navigate(self.collectionName + "/collection");

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
						}
					},
					{
						name: "delete",
						type: "button",
						buttonClass: "btn-danger btn-sm",
						label: "TRANSLATE:DELETE",
						visible: function () {
							return (this.getApp().currentUser.hasRole("Admin") && this.getApp().getRouter().getParam("id") !== null);
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
										if (($.parseJSON(error.xhr.responseText).error_code) === "SESSION_EXPIRED"){
											self.getApp().notify("Hết phiên làm việc, vui lòng đăng nhập lại!");
											self.getApp().getRouter().navigate("login");
										} else {
										  self.getApp().notify({ message: $.parseJSON(error.xhr.responseText).error_message }, { type: "danger", delay: 1000 });
										}
									}
									catch (err) {
									  self.getApp().notify({ message: "Xóa dữ liệu không thành công"}, { type: "danger", delay: 1000 });
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
					field: "appinfo",
					uicontrol: "ref",
					textField: "name",
					foreignRemoteField: "id",
					foreignField: "app_id",
					dataSource: AppInfoSelectView
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
				{
					field: "loai_coso",
					uicontrol: "combobox",
					textField: "text",
					valueField: "value",
					dataSource: [
						{ "value": "0", "text": "Bệnh Viện Trung Ương, khu vực" },
						{ "value": "1", "text": "Bệnh Viện cấp Tỉnh/Thành phố" },
						{ "value": "2", "text": "Bệnh Viện cấp Quận/Huyện/Thị Xã" },
						{ "value": "3", "text": "Bệnh Viện thuộc Bộ Công An/ Quân Đội" },
						{ "value": "4", "text": "Phòng khám đa khoa" },
					],
				},
			]
		},
		render: function () {
			var self = this;
			var id = this.getApp().getRouter().getParam("id");
			self.$el.find("#appinfo").hide();
			if(self.getApp().currentUser.hasRole("Admin")){
				self.$el.find("#appinfo").show();
			}else if(self.getApp().currentUser.hasRole("CoSoKCB")){
//				self.$el.find(".card-header").addClass('d-none');
				id = self.getApp().currentUser.id_cosokcb;
				
			}
			
			self.$el.find("#upload_chuyenkhoa").on("change",function(){
				
				var reader = new FileReader();
				reader.onload = function(event) {
					var jsonObj = JSON.parse(event.target.result);
					console.log("jsonObj==",jsonObj);
					if(jsonObj!==null && jsonObj.objects!==null && jsonObj.objects.length>0){
						self.model.set("danhsachchuyenkhoa",jsonObj.objects);
						self.$el.find("#preview_json_chuyenkhoa").removeClass("d-none");
						self.$el.find("#preview_json_chuyenkhoa pre").html(JSON.stringify(jsonObj.objects, undefined, 2));
					}else{
					    self.getApp().notify({ message: "File không đúng định dạng JSON"}, { type: "danger", delay: 1000 });
					    return;
					}
				}
				reader.readAsText(event.target.files[0]);
				$(this).next('.custom-file-label').html(event.target.files[0].name);
				
				
				
//				$.ajax({
//					url: self.getApp().serviceURL + "/api/v1/cosokcb/updateuser",
//					method: "POST",
//					data:JSON.stringify({"username":username,"password":password, "type":type, "id_cosokcb":id_cosokcb}),
//					contentType: "application/json",
//					success: function (data) {
//						self.getApp().notify("Cập nhật thành công!");
//					},
//					error: function (xhr, status, error) {
//						try {
//							if (($.parseJSON(error.xhr.responseText).error_code) === "SESSION_EXPIRED"){
//							    self.getApp().notify({ message: "Hết phiên làm việc, vui lòng đăng nhập lại!"}, { type: "danger", delay: 1000 });
//								self.getApp().getRouter().navigate("login");
//							} else {
//							    self.getApp().notify({ message: $.parseJSON(error.xhr.responseText).error_message }, { type: "danger", delay: 1000 });
//							}
//						}catch (err) {
//						    self.getApp().notify({ message: "Lỗi không lấy được dữ liệu"}, { type: "danger", delay: 1000 });
//						}
//					}
//				});
			});
			$.fn.selectpicker.Constructor.DEFAULTS.multipleSeparator = ' | ';
			self.$el.find("#multiselect_required").selectpicker();
			
			self.$el.find("#cosokcb_info").unbind('click').bind('click',function(){
				
				//validate
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
            	
            	var required_fields = self.$el.find("#multiselect_required").val();
            	if(required_fields !== null){
					self.model.set("required_fields",required_fields);
				}
            	self.model.save(null, {
					success: function (model, respose, options) {
						self.getApp().notify("Lưu thông tin thành công");
//						self.getApp().getRouter().navigate(self.collectionName + "/collection");

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
			self.$el.find("#cosokcb_user").unbind('click').bind('click',function(){
				var id_cosokcb = self.model.get("id");
				if (id_cosokcb === null || id_cosokcb === undefined || id_cosokcb ===""){
					self.getApp().notify({ message: "Vui lòng cập nhật đầy đủ thông tin của cơ sở khám trước khi tạo tài khoản!"}, { type: "danger", delay: 1000 });
					return;
				}
				
				var username = self.$el.find("#username").val().toLowerCase();
				var password = self.$el.find("#password").val();
				var confirm_password = self.$el.find("#confirm_password").val();
				if (password !== confirm_password){
				    self.getApp().notify({ message: "mật khẩu không khớp"}, { type: "danger", delay: 1000 });
					return;
				}
				var type = "";
				if (self.validateEmail(username) === true){
					type = "email";
				}else if (self.validatePhone(username) === true){
					type = "phone";
				}else{
					self.getApp().notify({ message: "vui lòng nhập lại số điện thoại hoặc email hợp lệ"}, { type: "danger", delay: 1000 });
					return;
				}
				
				$.ajax({
					url: self.getApp().serviceURL + "/api/v1/cosokcb/updateuser",
					method: "POST",
					data:JSON.stringify({"username":username,"password":password, "type":type, "id_cosokcb":id_cosokcb}),
					contentType: "application/json",
					success: function (data) {
						self.getApp().notify("Cập nhật thành công!");
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
			});
			
			if (id) {
				this.model.set('id', id);
				this.model.fetch({
					success: function (data) {
						var danhsachchuyenkhoa = self.model.get("danhsachchuyenkhoa");
						if (danhsachchuyenkhoa == null){
							danhsachchuyenkhoa = [];
						}else{
							self.$el.find("#preview_json_chuyenkhoa").removeClass("d-none");
							self.$el.find("#preview_json_chuyenkhoa pre").html(JSON.stringify(danhsachchuyenkhoa, undefined, 2));
						}
						self.applyBindings();
						if (self.model.get("required_fields") === null){
							self.model.set("required_fields", []);
						}
						self.$el.find("#multiselect_required").selectpicker('val',self.model.get("required_fields"));

						self.model.on("change:tinhthanh_id", function(){
        					self.getFieldElement("quanhuyen").data("gonrin").setFilters({"tinhthanh_id": { "$eq": self.model.get("tinhthanh_id")}});
        				});
        	    		self.model.on("change:quanhuyen_id", function(){
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
						}catch (err) {
						    self.getApp().notify({ message: "Lỗi không lấy được dữ liệu"}, { type: "danger", delay: 1000 });
						}
					}
				});
			} else {
				self.applyBindings();
				self.model.on("change:tinhthanh_id", function(){
					console.log("change tinh thanh", self.model.get("tinhthanh_id"));
					self.getFieldElement("quanhuyen").data("gonrin").setFilters({"tinhthanh_id": { "$eq": self.model.get("tinhthanh_id")}});
				});
	    		self.model.on("change:quanhuyen_id", function(){
	    			self.getFieldElement("xaphuong").data("gonrin").setFilters({"quanhuyen_id": { "$eq": self.model.get("quanhuyen_id")}});
	    			console.log("change quanhuyen", self.model.get("quanhuyen_id"));
				});
			}
			
		},
		validateEmail: function (email) {
			var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(String(email).toLowerCase());
		},
		validatePhone: function(inputPhone) {
			if (inputPhone == null || inputPhone == undefined) {
				return false;
			}
            var phoneno = /(09|08|07|05|03)+[0-9]{8}/g;
            const result = inputPhone.match(phoneno);
            if (result && result == inputPhone) {
                return true;
            } else {
                return false;
            }
        }
	});

});