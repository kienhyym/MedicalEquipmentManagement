define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!app/user/role/tpl/collection.html'),
    	schema 				= require('json!schema/RoleSchema.json');
    
    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
		collectionName: "role",
    	tools:[
    	       {
					name: "create",
					type: "button",
					buttonClass: "btn-success btn-sm margin-2",
					label: "TRANSLATE:CREATE",
					command: function(){
						var self = this;
						self.getApp().getRouter().navigate(self.collectionName + "/model");

					}
				}
    	],
    	uiControl:{
    		fields: [
	    	     { 
	    	    	field: "_id",label:"ID",width:150,readonly: true, visible: false
	    	     },
	    	     { field: "role_name", label: "Vai Trò"},
	    	     { field: "description", label: "Ghi chú", visible: false},
	    	     { field: "active", label: "Kích hoạt",
	    	    	 cssClassField: "cssClass",
	    	    	 foreignValues: [
										{ value: 1, text: "Có" },
										{ value: 0, text: "Không" },
		     	                     ],
		     	     foreignValueField: "value",
		     	     foreignTextField: "text"
		     	 },
		     	     
		     ],
		     onRowClick: function(event){
		    	 var self = this;
		    	 if(event.rowData['_id']){
					 var path = this.collectionName + '/model?id='+ event.rowData['_id'];
					 this.getApp().getRouter().navigate(path);
		        }
		    }
    	},
	    render:function(){
    		var self = this;
	    	this.applyBindings();
	    	return this;
    	},
    });
  
});