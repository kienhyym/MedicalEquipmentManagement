define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');
	return [
		{
			"collectionName": "appinfo",
			"route": "appinfo/collection",
			"$ref": "app/appinfo/view/CollectionView",
		},
		{
			"collectionName": "appinfo",
			"route": "appinfo/model(/:id)",
			"$ref": "app/appinfo/view/ModelView",
		},
		{
			"collectionName": "cosokcb",
			"route": "cosokcb/collection",
			"$ref": "app/cosokcb/view/CollectionView",
		},
		{
			"collectionName": "cosokcb",
			"route": "cosokcb/model(/:id)",
			"$ref": "app/cosokcb/view/ModelView",
		},
		{
			"collectionName": "dangkykham",
			"route": "dangkykham/collection",
			"$ref": "app/dangkykham/view/CollectionView",
		},
		{
			"collectionName": "dangkykham",
			"route": "dangkykham/model(/:id)",
			"$ref": "app/dangkykham/view/ModelView",
		},
		{
			"collectionName": "hosobenhnhan",
			"route": "hosobenhnhan/collection",
			"$ref": "app/hosobenhnhan/view/CollectionView",
		},
		{
			"collectionName": "hosobenhnhan",
			"route": "hosobenhnhan/model(/:id)",
			"$ref": "app/hosobenhnhan/view/ModelView",
		},
		{
			"collectionName": "bookingpartner",
			"route": "bookingpartner/collection",
			"$ref": "app/bookingpartner/view/CollectionView",
		},
		{
			"collectionName": "bookingpartner",
			"route": "bookingpartner/model(/:id)",
			"$ref": "app/bookingpartner/view/ModelView",
		}
		
	];

});


