define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!app/cosokcb/tpl/collection.html'),
    	danhsachchuyenkhoa 	= require('json!app/enum/danhsachchuyenkhoa.json');
    var CustomFilterView      = require('app/base/view/CustomFilterView');
    var schema = {
    		"id": {
    	        "type": "string",
    	        "primary": true
    	    },
    	    "name": {
    	        "type": "string"
    	    },
    	    "short_name": {
    	        "type": "string"
    	    },
    	    "code": {
    	        "type": "string"
    	    },
    	    "price": {
    	        "type": "string"
    	    }
    }
    return Gonrin.CollectionDialogView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/static/app/enum/",
    	textField: "name",
		collectionName: "danhsachchuyenkhoa.json",
    	tools : [
    	    {
    	    	name: "defaultgr",
    	    	type: "group",
    	    	groupClass: "toolbar-group",
    	    	buttons: [
					{
		    	    	name: "select",
		    	    	type: "button",
		    	    	buttonClass: "btn-success btn-sm",
		    	    	label: "TRANSLATE:SELECT",
		    	    	command: function(){
		    	    		var self = this;
		    	    		var data_onSelected = this.uiControl.selectedItems;
		    	    		self.trigger("onSelected", data_onSelected);
//		    	    		self.trigger("onSelected");
		    	    		self.close();
		    	    	}
		    	    },
    	    	]
    	    },
    	],
    	uiControl:{
    		fields: [
    			{ field: "code", label: "Mã"},
		     	{ field: "name", label: "Tên"},
		    ],
		    onRowClick: function(event){
		    	this.uiControl.selectedItems = event.selectedItems;
	    	},
    	},
    	render:function(){
    		
    		var self= this;
    		var filter = new CustomFilterView({
    			el: self.$el.find("#grid_search"),
    			sessionKey: self.collectionName +"_filter"
    		});
    		filter.render();
    		
    		if(!filter.isEmptyFilter()) {
    			var text = !!filter.model.get("text") ? filter.model.get("text").trim() : "";
    			var filters = { "$or": [
					{"name": {"$likeI": text }},
				] };
    			self.uiControl.filters = filters;
    		}
    		self.uiControl.orderBy = [{"field": "name", "direction": "desc"}];
//    		self.applyBindings();
    		
    		filter.on('filterChanged', function(evt) {
    			var $col = self.getCollectionElement();
    			var text = !!evt.data.text ? evt.data.text.trim() : "";
				if ($col) {
					if (text !== null){
						var filters = { "$or": [
							{"name": {"$likeI": text }},
						] };
						$col.data('gonrin').filter(filters);
						self.uiControl.filters = filters;
					} else {
					}
				}
				self.uiControl.orderBy = [{"field": "name", "direction": "desc"}];
//				self.applyBindings();
    		});
    		self.applyBindings();
    		return this;
    	},
    	
    });

});