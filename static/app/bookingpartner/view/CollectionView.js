define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    
    var template 				= require('text!app/bookingpartner/tpl/collection.html'),
	schema 				= require('json!schema/UserSchema.json');
    var TemplateHelper		= require('app/base/view/TemplateHelper');
    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "bookingpartner",
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
		    	    	label: "TRANSLATE:CREATE",
		    	    	command: function(){
		    	    		var self = this;
		    	    		self.getApp().getRouter().navigate('bookingpartner/model');
		    	    	}
		    	    },
    	    	]
    	    },
    	],
    	uiControl:{
    		fields: [
    			{
	            	 field: "last_name", 
	            	 label: "Họ tên",
	            	 template:function(rowData){
	            		 if (!!rowData && !!rowData.first_name && !!rowData.last_name){
	            			 return rowData.first_name + " " + rowData.last_name;
	            		 }else if (!!rowData.last_name){
		            		 return rowData.last_name;

	            		 }
	            		 return "";
	            	 }
	           	 },
	           	{ field: "phone_number", label: "Điện thoại"},
	           	{
	               	 field: "type", 
	               	 label: "Thuộc nhóm",
	               	 foreignValueField: "value",
	               	 foreignTextField: "text",
		             foreignValues: [
		            	 { value: "viettel", text: "Viettel" },
	                     { value: "ytecoso", text: "Y Tế Cơ Sở" },
	                     { value: "benhvien", text: "Bệnh Viện" },
	                     { value: "phongkham", text: "Phòng khám" },
	                     { value: "trungtam_tiemchung", text: "Trung tâm tiêm chủng" },
	                     { value: "khac", text: "Loại khác" }
		           	 ],
	            },
	           	{
	            	 field: "tinhthanh_id", 
	            	 label: "Tỉnh thành",
	            	 foreign: "tinhthanh",
	            	 foreignValueField: "id",
					 foreignTextField: "ten",
	           	 },
	           	{
	            	 field: "quanhuyen_id", 
	            	 label: "Quận/Huyện",
	            	 foreign: "quanhuyen",
	            	 foreignValueField: "id",
					 foreignTextField: "ten",
	           	 },
	           	{
	            	 field: "xaphuong_id", 
	            	 label: "Xã/Phường/Thị trấn",
	            	 foreign: "xaphuong",
	            	 foreignValueField: "id",
					 foreignTextField: "ten",
	           	 },
	     ],
	    	onRowClick: function(event){
	    		if(event.rowId){
	        		var path = this.collectionName + '/model?id='+ event.rowId;
	        		this.getApp().getRouter().navigate(path);
	        	}
	    	}
    },
	     
	     render:function(){
	    	 var self = this;
	    	 var currentUser = self.getApp().currentUser;
	    	 if (!currentUser && currentUser.hasRole("Admin")){
	    		 self.getApp().getRouter().navigate("login");
	    	 }
	    	 
	    	 this.applyBindings();
	    	 return this;
    	}
    });

});