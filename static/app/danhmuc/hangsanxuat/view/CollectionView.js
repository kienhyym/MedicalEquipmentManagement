define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!app/danhmuc/hangsanxuat/tpl/collection.html'),
    	schema 				= require('json!schema/HangSanXuatSchema.json');
    
    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
		collectionName: "hangsanxuat",
		bindings:"data-hangsanxuat-bind",
    	uiControl:{
    		fields: [
				{
					field: "stt",
					label: "STT",
					width: "30px",
				},
	    	     { field: "ma", label: "Mã", width:200},
		     	 { field: "ten", label: "Tên", width:350},
		     ],
		     onRowClick: function(event){
		    	if(event.rowId){
		        		var path = this.collectionName + '/model?id='+ event.rowId;
		        		this.getApp().getRouter().navigate(path);
		        }
		    	 //this.getApp().loading(); 
		    	 //this.getApp().alert("haha");
		    	
		    }
    	},
	    render:function(){
	    	 this.applyBindings();
	    	 return this;
    	},
    });

});