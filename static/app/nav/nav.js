define(function (require) {
	"use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    return [
	    	{
	    		"text":"Ứng dụng kết nối",
	    		"icon":"fa fa-adn",
	    		"type":"view",
	    		"collectionName":"appinfo",
			    "route":"appinfo/collection",
			    "$ref": "app/appinfo/js/CollectionView",
			    "visible": function(){
			     	return  this.userHasRole("Admin");
			     }
	        },
	        {
	    		"text":"Ứng dụng kết nối",
	    		"icon":"fa fa-adn",
	    		"type":"view",
	    		"collectionName":"appinfo",
			    "route":"appinfo/model",
			    "$ref": "app/appinfo/js/ModelView",
			    "visible": function(){
			     	return false;
			     }
	        },
			{
        		"text":"Danh sách Cơ sở KCB",
        		"icon":"fa fa-home",
        		"type":"view",
        		"collectionName":"cosokcb",
			    "route":"cosokcb/collection",
			    "$ref": "app/cosokcb/js/CollectionView",
			    "visible": function(){
			     	return  this.userHasRole("Admin");
			     }
            },
            {
        		"text":"Cơ sở KCB",
        		"icon":"fa fa-home",
        		"type":"view",
        		"collectionName":"cosokcb",
			    "route":"cosokcb/model",
			    "$ref": "app/cosokcb/js/ModelView",
			    "visible": function(){
			    	return  this.userHasRole("CoSoKCB");
			     }
            },
            {
			    "text":"Danh sách đặt khám",
			    "icon":"fa fa-book",
			    "type":"view",
			    "collectionName":"dangkykham",
			    "route":"dangkykham/collection",
			    "$ref": "app/dangkykham/view/CollectionView",
			     "visible": function(){
			     	return  this.userHasRole("CoSoKCB") || this.userHasRole("BookingPartner");
			     }
			},
            {
			    "text":"Thông tin đặt khám",
			    "icon":"fa fa-book",
			    "type":"view",
			    "collectionName":"dangkykham",
			    "route":"dangkykham/model",
			    "$ref": "app/dangkykham/view/ModelView",
			     "visible": function(){
			    	 return false;
			     }
			},
			{
			    "text":"Danh sách bệnh nhân",
			    "icon":"fa fa-book",
			    "type":"view",
			    "collectionName":"hosobenhnhan",
			    "route":"hosobenhnhan/collection",
			    "$ref": "app/hosobenhnhan/view/CollectionView",
			     "visible": function(){
			     	return  this.userHasRole("Admin");
			     }
			},
            {
			    "text":"Danh sách bệnh nhân",
			    "icon":"fa fa-book",
			    "type":"view",
			    "collectionName":"hosobenhnhan",
			    "route":"hosobenhnhan/model",
			    "$ref": "app/hosobenhnhan/view/ModelView",
			     "visible": function(){
			     	return  false;
			     }
			},
			{
			    "text":"Danh sách cộng tác viên",
			    "icon":"fa fa-user",
			    "type":"view",
			    "collectionName":"bookingpartner",
			    "route":"bookingpartner/collection",
			    "$ref": "app/bookingpartner/view/CollectionView",
			     "visible": function(){
			     	return  this.userHasRole("Admin");
			     }
			},
            {
			    "text":"Thông tin cá nhân",
			    "icon":"fa fa-user",
			    "type":"view",
			    "collectionName":"bookingpartner",
			    "route":"bookingpartner/model",
			    "$ref": "app/bookingpartner/view/ModelView",
			     "visible": function(){
			    	 return  this.userHasRole("BookingPartner");
			     }
			},
        ];

});


