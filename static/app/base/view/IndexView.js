define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 				= require('text!app/base/tpl/index/index.html');
    var point_item_tpl = require('text!app/base/tpl/index/point_item.html');
    var merchant_item_tpl = require('text!app/base/tpl/index/merchant_item.html');
    
    return Gonrin.View.extend({
    	template : template,
    	urlPrefix: "/api/v1/merchant/",
    	collectionName: "index",
    	tools : [],
    	render:function(){
    		var self = this;
    		//console.log("index");
    		var user = self.getApp().currentUser;
    		if (!!user){
    			if (user.role === "admin"){
    				self.fetchPoints();
    				self.fetchMerchants();
    			}else{
    				self.renderPoints(user.points);
    				self.renderMerchants(user.merchants);
    			}
    		} 
    		//self.fetchPoints();
    		self.registerEvents();
    		self.getApp().nav.render();
    	},
    	fetchPoints: function(){
    		var self = this;
			$.ajax({
				url: self.getApp().serviceURL + "/api/v1/merchant/point",
				method: "GET",
				contentType: "application/json",
				success: function (data) {
					var points = [];
					$.each(data.objects, function(idx, obj){
						points.push({
							point_name: obj.name,
							point_logo_url: obj.point_logo_url,
						})
					})
					self.renderPoints(points);
				},
				error: function (xhr, status, error) {
					self.getApp().notify("Get Points data Error");
				},
			});
    	},
    	fetchMerchants: function(){
    		var self = this;
			$.ajax({
				url: self.getApp().serviceURL + "/api/v1/merchant/merchant",
				method: "GET",
				contentType: "application/json",
				success: function (data) {
					var objs = [];
					$.each(data.objects, function(idx, obj){
						objs.push({
							merchant_id: obj.merchant_id,
							merchant_logo_url: obj.merchant_logo_url,
						})
					})
					self.renderMerchants(objs);
				},
				error: function (xhr, status, error) {
					self.getApp().notify("Get Points data Error");
				},
			});
    	},
    	renderPoints: function(data){
    		var self = this;
    		self.$el.find("#points-container").empty();
			$.each(data, function(idx, obj){
				var tpl = gonrin.template(point_item_tpl)(obj);
	            self.$el.find("#points-container").append(tpl);
			});
    	},
    	renderMerchants: function(data){
    		var self = this;
    		self.$el.find("#merchants-container").empty();
			$.each(data, function(idx, obj){
				var tpl = gonrin.template(merchant_item_tpl)(obj);
	            self.$el.find("#merchants-container").append(tpl);
			});
    	},
    	registerEvents: function () {
			var self = this;
			self.$el.find("#create-point").unbind("click").bind("click", function () {
				if (!!user &&  (user.role === "admin")){
					self.getApp().router.navigate("point/model");
	    		}
			});
			self.$el.find("#create-merchant").unbind("click").bind("click", function () {
				if (!!user &&  (user.role === "admin")){
					self.getApp().router.navigate("merchant/model");
	    		}
			});
		},
    });

});