define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');
	return [
		

		{
			"collectionName": "user",
			"route": "user/collection",
			"$ref": "app/user/js/CollectionView",
		},
		{
			"collectionName": "user",
			"route": "user/model(/:id)",
			"$ref": "app/user/js/ModelView",
		},

		{
			"collectionName": "role",
			"route": "role/collection",
			"$ref": "app/role/js/CollectionView",
		},
		{
			"collectionName": "role",
			"route": "role/model(/:id)",
			"$ref": "app/role/js/ModelView",
		},
		{
			"collectionName": "donvi",
			"route": "donvi/collection",
			"$ref": "app/donvi/js/CollectionView",
		},
		{
			"collectionName": "donvi",
			"route": "donvi/model(/:id)",
			"$ref": "app/donvi/js/ModelView",
		},
		{
			"collectionName": "thietbi",
			"route": "thietbi/collection",
			"$ref": "app/thietbi/js/CollectionView",
		},
		{
			"collectionName": "thietbi",
			"route": "thietbi/model(/:id)",
			"$ref": "app/thietbi/js/ModelView",
		},
		{
			"collectionName": "chitietthietbi",
			"route": "chitietthietbi/collection",
			"$ref": "app/chitietthietbi/js/CollectionView",
		},
		{
			"collectionName": "chitietthietbi",
			"route": "chitietthietbi/model(/:id)",
			"$ref": "app/chitietthietbi/js/ModelView",
		},
		{
			"collectionName": "phieuyeucausuachua",
			"route": "phieuyeucausuachua/collection",
			"$ref": "app/phieuyeucausuachua/js/CollectionView",
		},
		{
			"collectionName": "phieuyeucausuachua",
			"route": "phieuyeucausuachua/model(/:id)",
			"$ref": "app/phieuyeucausuachua/js/ModelView",
		},
		{
			"collectionName": "bangkehoachkiemtrathietbitheonam",
			"route": "bangkehoachkiemtrathietbitheonam/collection",
			"$ref": "app/bangkehoachkiemtrathietbitheonam/js/CollectionView",
		},
		{
			"collectionName": "bangkehoachkiemtrathietbitheonam",
			"route": "bangkehoachkiemtrathietbitheonam/model(/:id)",
			"$ref": "app/bangkehoachkiemtrathietbitheonam/js/ModelView",
		},





		{
			"collectionName": "quocgia",
			"route": "quocgia/collection",
			"$ref": "app/danhmuc/QuocGia/view/CollectionView",
		},
		{
			"collectionName": "quocgia",
			"route": "quocgia/model(/:id)",
			"$ref": "app/danhmuc/QuocGia/view/ModelView",
		},

		{
			"collectionName": "tinhthanh",
			"route": "tinhthanh/collection",
			"$ref": "app/danhmuc/TinhThanh/view/CollectionView",
		},
		{
			"collectionName": "tinhthanh",
			"route": "tinhthanh/model(/:id)",
			"$ref": "app/danhmuc/TinhThanh/view/ModelView",
		},

		{
			"collectionName": "quanhuyen",
			"route": "quanhuyen/collection",
			"$ref": "app/danhmuc/QuanHuyen/view/CollectionView",
		},
		{
			"collectionName": "quanhuyen",
			"route": "quanhuyen/model(/:id)",
			"$ref": "app/danhmuc/QuanHuyen/view/ModelView",
		},

		{
			"collectionName": "xaphuong",
			"route": "xaphuong/collection",
			"$ref": "app/danhmuc/XaPhuong/view/CollectionView",
		},
		{
			"collectionName": "xaphuong",
			"route": "xaphuong/model(/:id)",
			"$ref": "app/danhmuc/XaPhuong/view/ModelView",
		},



	];

});


