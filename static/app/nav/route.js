define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');
	return [
		{
			"collectionName": "danhmucdoanhnghiep",
			"route": "danhmucdoanhnghiep/collection",
			"$ref": "app/danhmucdoanhnghiep/view/CollectionView",
		},
		{
			"collectionName": "danhmucdoanhnghiep",
			"route": "danhmucdoanhnghiep/model(/:id)",
			"$ref": "app/danhmucdoanhnghiep/view/ModelView",
		},
		{
			"collectionName": "kehoachthanhtra",
			"route": "kehoachthanhtra/collection",
			"$ref": "app/kehoachthanhtra/view/CollectionView",
		},
		{
			"collectionName": "kehoachthanhtra",
			"route": "kehoachthanhtra/model(/:id)",
			"$ref": "app/kehoachthanhtra/view/ModelView",
		},
		{
			"collectionName": "user",
			"route": "user/collection",
			"$ref": "app/hethong/user/view/CollectionView",
		},
		{
			"collectionName": "user",
			"route": "user/model(/:id)",
			"$ref": "app/hethong/user/view/ModelView",
		},
		{
			"collectionName": "lichthanhtra",
			"route": "lichthanhtra/model",
			"$ref": "app/lichthanhtra/view/ModelView",
		},
		{
			"collectionName": "kehoachthanhtra",
			"route": "kehoachthanhtra/collection_approved",
			"$ref": "app/kehoachthanhtra/view/CollectionView_approved",
		},
		{
			"collectionName": "kehoachthanhtra",
			"route": "kehoachthanhtra/model_step_plan(/:id)",
			"$ref": "app/kehoachthanhtra/view/ModelView_12step_plan",
		},
		{
			"collectionName": "userdubaosotxuathuyet",
			"route":"userdubaosotxuathuyet/collection",
			"$ref": "app/userdubaosotxuathuyet/js/CollectionView",
		},
		{
			"collectionName": "userdubaosotxuathuyet",
			"route":"userdubaosotxuathuyet/model(/:id)",
			"$ref": "app/userdubaosotxuathuyet/js/ModelView",
		},
	];

});


