define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!app/appinfo/tpl/collection.html'),
    	schema 				= require('json!app/appinfo/Schema.json');
    
    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "appinfo",
    	uiControl:{
    		fields: [
	    	     { field: "name", label: "Tên ứng dụng"},
	    	     { field: "description", label: "Mô tả"},
	    	     { field: "appkey"},
	    	     { field: "status", label: "Trạng thái",
	    	    	 cssClassField: "cssClass",
	    	    	 foreignValues: [
										{ value: 0, text: "Bình thường" },
										{ value: 1, text: "Không xác định" },
										{ value: 2, text: "đã khoá" , cssClass: "yeallow"},
		     	                     ],
		     	     foreignValueField: "value",
		     	     foreignTextField: "text"
		     	 },
		     	     
		     ],
		     noResultsClass:"alert alert-default no-records-found",
		     onRowClick: function(event){
		    	if(event.rowId){
		        		var path = this.collectionName + '/model?id='+ event.rowId;
		        		this.getApp().getRouter().navigate(path);
		        }
		    }
    	},
	    render:function(){
	    	this.applyBindings();
	    	 return this;
    	},
    });

});