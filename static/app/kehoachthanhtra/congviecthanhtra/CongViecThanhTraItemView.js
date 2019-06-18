define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template = require('text!app/kehoachthanhtra/congviecthanhtra/tpl/item.html'),
		schema = require('json!app/kehoachthanhtra/congviecthanhtra/Schema.json');
    
    
    
    return Gonrin.ItemView.extend({
	    	template : template,
	    	tagName: 'tr',
	    	bindings:"data-task-bind",
	    	modelSchema	: schema,
	    	urlPrefix: "/api/v1/",
	    	collectionName: "kehoachthanhtra_congviec",
	    	foreignRemoteField: "id",
	    	foreignField: "kehoach_id",
	    	uiControl:{
	    		fields: [
	    		    
	    		]
	    	},
	    	render:function() {
	    		var self = this;
	    		
	    		if (self.model.get("id") == null){
	    			self.model.set("id", gonrin.uuid());
	    		}
	    		this.applyBindings();
	    		
	    		self.$el.find("#itemRemove").unbind("click").bind("click", function(){
	    			self.remove(true);
	    		});
	    	}
	 
    });

});