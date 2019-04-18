define(function (require) {
	"use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    return [
			{
        		"text":"Danh sách đơn vị",
        		"icon":"fa fa-home",
        		"type":"view",
        		"collectionName":"danhmucdoanhnghiep",
			    "route":"danhmucdoanhnghiep/collection",
			    "$ref": "app/danhmucdoanhnghiep/js/CollectionView",
			    "visible": function(){
			     	return  true;
			     }
            },
            {
        		"text":"Chi tiết đơn vị",
        		"icon":"fa fa-home",
        		"type":"view",
        		"collectionName":"danhmucdoanhnghiep",
			    "route":"danhmucdoanhnghiep/model",
			    "$ref": "app/danhmucdoanhnghiep/js/ModelView",
			    "visible": function(){
			    	return false;
			     }
            },
            {
			    "text":"Danh sách kế hoạch ",
			    "icon":"fa fa-book",
			    "type":"view",
			    "collectionName":"kehoachthanhtra",
			    "route":"kehoachthanhtra/collection",
			    "$ref": "app/kehoachthanhtra/view/CollectionView",
			     "visible": function(){
			     	return true;
			     }
			},
            {
			    "text":"Thông tin kế hoạch",
			    "icon":"fa fa-book",
			    "type":"view",
			    "collectionName":"kehoachthanhtra",
			    "route":"kehoachthanhtra/model",
			    "$ref": "app/kehoachthanhtra/view/ModelView",
			     "visible": function(){
			    	 return false;
			     }
			},
			{
			    "text":"Danh sách người dùng",
			    "icon":"fa fa-book",
			    "type":"view",
			    "collectionName":"user",
			    "route":"user/collection",
			    "$ref": "app/user/view/CollectionView",
			     "visible": function(){
			     	return  this.userHasRole("CucTruong");
			     }
			},
            {
			    "text":"Thông tin người dùng",
			    "icon":"fa fa-book",
			    "type":"view",
			    "collectionName":"user",
			    "route":"user/model",
			    "$ref": "app/user/view/ModelView",
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


