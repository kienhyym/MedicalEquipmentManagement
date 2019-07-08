define(function (require) {
	"use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    return [
            {
        		"text":"Danh sách người dùng",
        		"icon":"fa fa-home",
        		"type":"view",
        		"collectionName":"user",
			    "route":"user/collection",
			    "$ref": "app/user/js/CollectionView",
			    "visible": function(){
			     	return  true;
			     }
			},
			{
        		"text":"Danh sách người dùng",
        		"icon":"fa fa-home",
        		"type":"view",
        		"collectionName":"user",
			    "route":"user/model",
			    "$ref": "app/user/js/ModelView",
			    "visible": function(){
			     	return  false;
			     }
			},
			{
        		"text":"Vai trò",
        		"icon":"fa fa-home",
        		"type":"view",
        		"collectionName":"role",
			    "route":"role/collection",
			    "$ref": "app/role/js/CollectionView",
			    "visible": function(){
			     	return  true;
			     }
			},
			{
        		"text":"Vai trò",
        		"icon":"fa fa-home",
        		"type":"view",
        		"collectionName":"role",
			    "route":"role/model",
			    "$ref": "app/role/js/ModelView",
			    "visible": function(){
			     	return  false;
			     }
            },
        ];

});


