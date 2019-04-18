define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!app/hethong/user/role/tpl/collection.html'),
	schema 				= require('json!schema/RoleSchema.json');

    var CustomFilterView      = require('app/base/view/CustomFilterView');
    return Gonrin.CollectionDialogView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1",
		collectionName: "role",
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
    			{ field: "name", label: "Vai Trò"},
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
    		});
    		self.applyBindings();
    		return this;
    	},
    	
    });

});