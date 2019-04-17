define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    
    var template 				= require('text!app/hosobenhnhan/tpl/collection.html'),
	schema 				= require('json!schema/HoSoBenhNhanSchema.json');
    var TemplateHelper		= require('app/base/view/TemplateHelper');
    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "hosobenhnhan",
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
		    	    		self.getApp().getRouter().navigate('hosobenhnhan/model');
		    	    	}
		    	    },
    	    	]
    	    },
    	],
    	uiControl:{
    		fields: [
    			{
	            	 field: "hodem", 
	            	 label: "Họ tên",
	            	 template:function(rowData){
	            		 if (!!rowData && rowData.hodem){
	            			 return rowData.hodem + " " + rowData.ten;
	            		 }
	            		 return rowData.ten;
	            	 }
	           	 },
	           	{
	            	 field: "sochamsoc_id", 
	            	 label: "Mã sổ BMTE",
	            	 template:function(rowData){
	            		 return rowData.sochamsoc_id;
	            	 }
	           	 },
	           	{
	            	 field: "ngaysinh", 
	            	 label: "Ngày sinh",
	            	 template:function(rowData){
	            		 if (!!rowData && rowData.ngaysinh){
	            			 var template_helper = new TemplateHelper();
	    	    	    	 return template_helper.datetimeFormat(rowData.ngaysinh, "DD/MM/YYYY");
	            		 }
	            		 return "";
	            	 }
	           	 },
	           	//{ field: "dienthoai", label: "Điện thoại"},
	           	{
	            	 field: "diachi", 
	            	 label: "Địa chỉ",
	            	 template:function(rowData){
	            		 if (!!rowData && rowData.diachi){
	            			 return rowData.diachi;
	            		 }
	            		 return "";
	            	 }
	           	 },
    			
    			{ field: "gioitinh", label: "Giới tính", template:function(rowData){
	        		 if (rowData.gioitinh){
	        			 if(rowData.gioitinh === 1 || rowData.gioitinh === "1"){
	        				 return 'Nam';
	        			 }else{
	        				 return 'Nữ';
	        			 }
	        		 }else{
	        			 return "";
	        		 }
	        	 }},
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
	    	 if (!!currentUser && currentUser.hasRole("CoSoKCB")){
	    		 this.uiControl.filters = {"cosokcb_id":{"$eq": currentUser.id_cosokcb}};
	    	 }else if (!!currentUser && currentUser.hasRole("User")){
	    		 this.uiControl.filters = {"$or":[{"user_id":{"$eq": currentUser.id}},{"sochamsoc_id":{"$eq": currentUser.sochamsoc_id}}]};
	    	 }
	    	 
	    	 this.applyBindings();
	    	 return this;
    	}
    });

});