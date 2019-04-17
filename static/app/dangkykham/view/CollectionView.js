define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    
    var template 				= require('text!app/dangkykham/tpl/collection.html'),
	schema 				= require('json!schema/DangKyKhamSchema.json');
    var TemplateHelper		= require('app/base/view/TemplateHelper');
	var CustomFilterView    = require('app/base/view/CustomFilterView');

    return Gonrin.ModelView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "dangkykham",
    	tools : [
    	    {
    	    	name: "defaultgr",
    	    	type: "group",
    	    	groupClass: "toolbar-group",
    	    	buttons: [
					{
		    	    	name: "create",
		    	    	type: "button",
		    	    	buttonClass: "btn-success btn-sm",
		    	    	label: "TRANSLATE:create_medical",
		    	    	command: function(){
		    	    		var self = this;
		    	    		self.getApp().getRouter().navigate(this.collectionName+'/model');
		    	    	},
		    	    	visible:function(){
							return this.getApp().currentUser.hasRole("Admin") || this.getApp().currentUser.hasRole("BookingPartner");
		    	    	}
		    	    },
    	    	]
    	    },
    	],
    	render:function(){
    		
	    	 var self = this;
//	    	 var currentUser = self.getApp().currentUser;
//	    	 var filters_common = "";
//	    	 if (!!currentUser && currentUser.hasRole("CoSoKCB")){
//	    		 filters_common = {"cosokcb_id":{"$eq": currentUser.id_cosokcb}};
//	    	 } else if (!!currentUser && currentUser.hasRole("User")){
//	    		 filters_common = {"$or":[{"user_id":{"$eq": currentUser.id}},{"sochamsoc_id":{"$eq": currentUser.sochamsoc_id}}]};
//	    	 }else if (!!currentUser && currentUser.hasRole("Admin")){
//	    	 }else{
//	    		 self.getApp().notify("Phiên làm việc hết hạn, vui lòng đăng nhập lại!");
//	    		 self.getApp().getRouter().navigate("login");
//	    		 return;
//	    	 }
	    	var filter_new  = {"trangthai": {"$eq": 0 }};
	    	 
	    	self.getDataSource(0,filter_new,1,100);
	    	self.$el.find("#dangkykham-new-tab").unbind('click').bind('click',function(){
	    		self.getDataSource(0, filter_new,1,100);
	    	});
	    	
	    	self.$el.find("#dangkykham-waitting-tab").unbind('click').bind('click',function(){
	    		var filter_watting = {"trangthai": {"$eq": 1 }};
	    		self.getDataSource(1, filter_watting,1,100);
	    	});
	    	self.$el.find("#dangkykham-finish-tab").unbind('click').bind('click',function(){
	    		var filter_finish = {"trangthai": {"$eq": 2 }};
	    		self.getDataSource(2, filter_finish,1,100);
	    	});
	    	return this;
		},
	getDataSource: function(status, filters, page, results_per_page){
		var self = this;
		$.ajax({
			url: self.getApp().serviceURL + "/api/v1/dangkykham",
			method: "GET",
    		data: {"q": JSON.stringify({"filters": filters, "order_by":[{"field": "updated_at", "direction": "desc"}], "page":page,"results_per_page":results_per_page})},
//			data:JSON.stringify({"username":username,"password":password, "type":type, "id_cosokcb":id_cosokcb}),
			contentType: "application/json",
			success: function (data) {
				self.render_grid(status, data.objects);
				
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
				self.render_grid(status, []);
			}
		});
	},
	render_grid: function(status, dataSource){
		var self = this;
		var element = null;
		if (status==0){
			element = self.$el.find("#grid_new");
		}else if (status === 1){
			element = self.$el.find("#grid_watting");
		} else if (status === 2){
			element = self.$el.find("#grid_finish");
		}
		element.grid({
        	showSortingIndicator: true,
        	orderByMode: "client",
        	language:{
        		no_records_found:"Chưa có dữ liệu"
        	},
        	noResultsClass:"alert alert-default no-records-found",
        	fields: [
        		{
	            	 field: "stt", 
	            	 label: "STT",
	            	 width: "30px"
	           	 },
	           	{
	            	 field: "id", 
	            	 label: "Mã đặt khám",
	           	 },
        	   	{
	            	 field: "hoten", 
	            	 label: "Họ tên"
	           	 },
	           	{
	            	 field: "dienthoai", 
	            	 label: "Điện thoại",
	            	 template:function(rowData){
	            		 var self = this;
	            		 var currentUser = gonrinApp().currentUser;
	            		 var display = "";
	            		 if ((currentUser.hasRole("CoSoKCB") && currentUser.id_cosokcb == rowData.id_cosokcb && rowData.trangthai>0) || currentUser.hasRole("Admin") || currentUser.id === rowData.user_id){
	            			 display = rowData.dienthoai;
	            		 }else{
	            			 display = '**********';
	            		 }
	            		 return '<span class="phone">'+display+'</span>';
	            		 
	            		 
	            	 }
	           	 },
    			{ field: "lydokham", label: "Lý do khám"},
    			{ field: "ngayhenkham", label: "Ngày hẹn khám",
    				template:function(rowData){
	            		 if (!!rowData && rowData.ngayhenkham){
	            			 var template_helper = new TemplateHelper();
	    	    	    	 return template_helper.datetimeFormat(rowData.ngayhenkham, "DD/MM/YYYY");
	            		 }
	            		 return "";
	            	 },
    			},
    			{ field: "updated_at", label: "Thời gian đặt khám",
    				template:function(rowData){
    					console.log("rowData.updated_at===",rowData.updated_at);
	            		 if (!!rowData && rowData.updated_at!== null){
	            			 var template_helper = new TemplateHelper();
	            			 var date = new Date(rowData.updated_at*1000);
	    	    	    	 return template_helper.datetimeFormat(date, "DD/MM/YYYY hh:mm");
	            		 }
	            		 return "";
	            	 },
    			},
		     	{
	            	 field: "cosokcb_id", 
	            	 label: "Nơi khám",
	            	 foreign: "cosokcb",
	            	 foreignValueField: "id",
	            	 foreignTextField: "ten_coso",
	           	 },
		     	{
               	 field: "trangthai", 
               	 label: "Trạng thái",
               	 foreignValueField: "value",
               	 foreignTextField: "text",
	             foreignValues: [
	            	 { value: 0, text: "Tạo mới" },
                     { value: 1, text: "Xác nhận của cơ sở KCB" },
                     { value: 2, text: "Đã tới khám" },
                     { value: 3, text: "đã trả kết quả" }
	           	 ],
	           	 visible:false
              	 },
              	{
        	    	 field: "command", 
        	    	 label:" ",
//        	    	 width:"150px", 
        	    	 command: [
        	    	     {
        	    	       "label":"Xác nhận",
           	    	        "action": function(params, args){
           	    	        	self.confirm_booking(params.rowData.id, "booking", params.el);
           	    	        },
           	    	        "class": function(e){
           	    	        	var currentUser = self.getApp().currentUser;
         	    	        	if(e.rowData.trangthai ===0 && currentUser.hasRole('CoSoKCB') && currentUser.id_cosokcb == e.rowData.cosokcb_id){
         	    	        		return "btn-primary btn-sm px-1 mx-1 booking";	
         	    	        	}else{
         	    	        		return "d-none booking";
         	    	        	}
         	    	        	
         	    	        },
           	    	     },
           	    	     {
          	    	       "label":"Đã tới khám",
             	    	        "action": function(params, args){
               	    	        	self.confirm_booking(params.rowData.id, "arrived", params.el);
             	    	        },
             	    	        "class": function(e){
             	    	        	var currentUser = self.getApp().currentUser;
             	    	        	if(e.rowData.trangthai ===1 && currentUser.hasRole('CoSoKCB') && currentUser.id_cosokcb == e.rowData.cosokcb_id){
             	    	        		return "btn-primary btn-sm px-1 mx-1 arrived";	
             	    	        	}else{
             	    	        		return "d-none arrived";
             	    	        	}
             	    	        	
             	    	        },
             	    	     },
	           	    	  {
             	    	    	"label":"Hủy",
	     	    	        	"action": function(params, args){
     	    	        			var modalConfirm = function(callback){
     	    	     			  
     	    	        			self.$el.find("#confirm-model").modal('show');
     	    	        			self.$el.find("#confirm-model #lydo_huydon").val("");

     	    	        			$("#modal-btn-yes").on("click", function(){
     	    	        				$(this).attr({"disabled":true});
     	    	        				$(this).html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Đang xử lý...')
	     	    	     				  var lydo = self.$el.find("#confirm-model #lydo_huydon").val();
	     	    	     				  if(lydo === null || lydo ==="" || lydo === undefined){
	     	    	     					  self.getApp().notify("Vui lòng nhập lý do hủy đơn khám");
	     	    	     					  return;
	     	    	     				  }
		     	    	     			    callback(true);
		     	    	     			    $("#confirm-model").modal('hide');
		     	    	     			    self.cancel_booking(params.rowData.id, params.el, lydo);
		     	    	     			    return false;
     	    	        			});
     	    	   			  
		     	    	   			$("#modal-btn-no").on("click", function(){
		     	    	   			    callback(false);
		     	    	   			    $("#confirm-model").modal('hide');
		     	    	   			});
	     	    	   			};

	     	    	   			modalConfirm(function(confirm){
//	     	    	   			  if(confirm){
//	     	    	   			    $("#result").html("CONFIRMADO");
//	     	    	   			  }else{
//	     	    	   			    $("#result").html("NO CONFIRMADO");
//	     	    	   			  }
	     	    	   			});

             	    	        },
	     	    	        	"class": function(e){
	     	    	        		var currentUser = self.getApp().currentUser;
             	    	        	if(e.rowData.trangthai ===0 && ((currentUser.hasRole('CoSoKCB') && currentUser.id_cosokcb == e.rowData.cosokcb_id) ||
             	    	        			(currentUser.id == e.rowData.user_id))){
             	    	        		return "btn-danger btn-sm cancel";	
             	    	        	}else{
             	    	        		return "d-none cancel";
             	    	        	}
             	    	        	
             	    	        },
	     	    	     }
        	    	 ],
        	   	 },
             ],
             dataSource: dataSource,
             primaryField:"id",
             selectionMode: false,
             pagination: {
             	page: 1,
             	pageSize: 100
             },
             events:{
           		 "rowclick": function(e){
           			 console.log("rowclick",e);
           			 if(e.rowData.trangthai >=1){
               			 self.getApp().getRouter().navigate("dangkykham/model?id="+e.rowId);
           			 }
           			 
           		 },
             },
        });
	},
	confirm_booking: function(id, type, element){
		var self = this;
		$.ajax({
			url: self.getApp().serviceURL + "/api/v1/dangkykham/confirm/"+type,
			method: "POST",
			data:JSON.stringify({"id":id}),
			contentType: "application/json",
			success: function (data) {
				if (data !== null){
					$(element).find(".booking").hide();
					$(element).find(".cancel").hide();
					$(element).find(".arrived").hide();
					if(type === "booking"){
						$(element).find(".phone").html(data.dienthoai);
					}
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
	cancel_booking: function(id, element,lydo){
		var self = this;
		
			    $.ajax({
					url: self.getApp().serviceURL + "/api/v1/dangkykham/cancel",
					method: "POST",
					data:JSON.stringify({"id":id,"lydo":lydo}),
					contentType: "application/json",
					success: function (data) {
						if (data !== null){
							$(element).find(".booking").hide();
							$(element).find(".cancel").hide();
							$(element).find(".arrived").hide();
							$("#grid_new").data('gonrin').deleteRow(params.el);
							self.getApp().notify("Hủy đơn thành công!");
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
			  
		
	}
	
    });

});