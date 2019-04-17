define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 				= require('text!app/user/user/tpl/model.html'),
    	schema 				= require('json!schema/UserSchema.json');
    
    return Gonrin.ModelView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
		collectionName: "user",
    	uiControl:[
    		{
				field: "active",
				uicontrol: "combobox",
				textField: "text",
				valueField: "value",
				dataSource: [
					{ "value": true, "text": "Active" },
					{ "value": false, "text": "Deactive" },
				],
			},
    	],
    	tools : [
			{
				name: "back",
				type: "button",
				buttonClass: "btn-default btn-sm margin-2",
				label: "TRANSLATE:BACK",
				command: function(){
					var self = this;
					 self.getApp().getRouter().navigate("user/collection");
				}
			},
			{
				name: "save",
				type: "button",
				buttonClass: "btn btn-success btn-sm margin-2",
				label: "TRANSLATE:SAVE",
				command: function(){
					var self = this;
					
					if ((self.model.get("phone_number") || null) == null){
						self.getApp().notify("phone_number is missing");
						return;
					}
					
					if ((self.model.get("_id") || null) == null){
						self.model.set("_id", "user_" + self.model.get("phone_number"));
					}
					else
					{
						self.model.set("_id", self.model.get("_id"));
					}
					
					var method = null;
					var url = self.getApp().serviceURL + "/api/v1/user/"+ self.model.get("_id");
					
					$.ajax({
						url: url,
						data: JSON.stringify(self.model.toJSON()),
						method: "PUT",
						contentType: "application/json",
						success: function (data) {
							self.getApp().getRouter().navigate("user/collection");
						},
						error: function (xhr, status, error) {
							self.getApp().notify("Get Teams data Error");
						},
					});
				},
				visible: function(){
					var user = gonrinApp().currentUser;
		    		if (!!user && user.role === "admin"){
		    			return true;
		    		}
		    		return false;
				}
			},
			{
				name: "delete",
				type: "button",
				buttonClass: "btn-danger btn-sm margin-2",
				label: "TRANSLATE:DELETE",
				visible: function(){
					return (this.getApp().getRouter().getParam("id") !== null);
				},
				command: function(){
					var self = this;
			        self.model.destroy({
			            success: function(model, response) {
			            	self.getApp().notify('Delete Successfully!');
			            	self.getApp().getRouter().navigate("user/collection");
			            },
			            error: function (model, xhr, options) {
			                self.getApp().notify('Delete error');
			            }
			        });
				}
			},
    	],
    	render:function(){
    		var self = this;
    		var id = this.getApp().getRouter().getParam("id");
    		
    		if(id){
        		this.model.fetch({
        			success: function(data){
        				self.applyBindings();
        			},
        			error:function(){
    					self.getApp().notify("Get data Error");
    				},
        		});
    		}else{
    			self.applyBindings();
    		}
		},
    });

});