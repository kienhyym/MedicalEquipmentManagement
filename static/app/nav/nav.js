define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');
	return [
		
		{
			"text": "Danh sách người dùng",
			"icon": "fa fa-home",
			"type": "view",
			"collectionName": "user",
			"route": "user/collection",
			"$ref": "app/user/js/CollectionView",
			"visible": function () {
				return true

			}
		},
		{
			"text": "Danh sách người dùng",
			"icon": "fa fa-home",
			"type": "view",
			"collectionName": "user",
			"route": "user/model",
			"$ref": "app/user/js/ModelView",
			"visible": function () {
				return false;
			}
		},
		{
			"text": "Vai trò",
			"icon": "fa fa-home",
			"type": "view",
			"collectionName": "role",
			"route": "role/collection",
			"$ref": "app/role/js/CollectionView",
			"visible": function () {
				return true

			}
		},
		{
			"text": "Vai trò",
			"icon": "fa fa-home",
			"type": "view",
			"collectionName": "role",
			"route": "role/model(/:id)",
			"$ref": "app/role/js/ModelView",
			"visible": function () {
				return false;
			}
		},
		// {
		// 	"text": "Đơn vị",
		// 	"icon": "fa fa-home",
		// 	"type": "view",
		// 	"collectionName": "donvi",
		// 	"route": "donvi/collection",
		// 	"$ref": "app/donvi/js/CollectionView",
		// 	"visible": function () {
		// 		return true

		// 	}
		// },
		// {
		// 	"text": "Đơn vị",
		// 	"icon": "fa fa-home",
		// 	"type": "view",
		// 	"collectionName": "donvi",
		// 	"route": "donvi/model(/:id)",
		// 	"$ref": "app/donvi/js/ModelView",
		// 	"visible": function () {
		// 		return false;
		// 	}
		// },

		{
			"text": "Thiết bị",
			"icon": "fa fa-home",
			"type": "view",
			"collectionName": "thietbi",
			"route": "thietbi/collection",
			"$ref": "app/thietbi/js/CollectionView",
			"visible": function () {
				return true

			}
		},
		{
			"type": "view",
			"collectionName": "thietbi",
			"route": "thietbi/model(/:id)",
			"$ref": "app/thietbi/js/ModelView",
			"visible": function () {
				return false;
			}
		},
		// {
		// 	"text": "Danh mục",
		// 	"icon": "fa fa-home",
		// 	"type": "category",

		// 	// "visible": function(){
		// 	// 	//console.log(this.checkHasRole("Admin"));
		// 	// 	return this.checkHasRole("Admin") ;
		// 	// },
		// 	"entries": [
		// 		{
		// 			"text": "Quốc gia",
		// 			"icon": "far fa-clipboard",
		// 			"type": "view",
		// 			"collectionName": "quocgia",
		// 			"route": "quocgia/collection",
		// 			"$ref": "app/danhmuc/QuocGia/view/CollectionView",
		// 			// "visible": function(){
		// 			// 	//console.log(this.checkHasRole("Admin"));
		// 			// 	return this.checkHasRole("Admin") ;
		// 			// }
		// 		},
		// 		{
		// 			"type": "view",
		// 			"icon": "far fa-clipboard",
		// 			"collectionName": "quocgia",
		// 			"route": "quocgia/model(/:id)",
		// 			"$ref": "app/danhmuc/QuocGia/view/ModelView",
		// 			"visible": false
		// 		},
		// 		{
		// 			"text": "Tỉnh thành",
		// 			"icon": "far fa-clipboard",
		// 			"type": "view",
		// 			"collectionName": "tinhthanh",
		// 			"route": "tinhthanh/collection",
		// 			"$ref": "app/danhmuc/TinhThanh/view/CollectionView",
		// 			// "visible": function(){
		// 			// 	return this.checkHasRole("Admin") ;
		// 			// }
		// 		},
		// 		{
		// 			"type": "view",
		// 			"icon": "far fa-clipboard",
		// 			"collectionName": "tinhthanh",
		// 			"route": "tinhthanh/model(/:id)",
		// 			"$ref": "app/danhmuc/TinhThanh/view/ModelView",
		// 			"visible": false
		// 		},
		// 		{
		// 			"text": "Quận huyện",
		// 			"icon": "far fa-clipboard",
		// 			"type": "view",
		// 			"collectionName": "quanhuyen",
		// 			"route": "quanhuyen/collection",
		// 			"$ref": "app/danhmuc/QuanHuyen/view/CollectionView",
		// 			// "visible": function(){
		// 			// 	return this.checkHasRole("Admin") ;
		// 			// }
		// 		},
		// 		{
		// 			"type": "view",
		// 			"icon": "far fa-clipboard",
		// 			"collectionName": "quanhuyen",
		// 			"route": "quanhuyen/model(/:id)",
		// 			"$ref": "app/danhmuc/QuanHuyen/view/ModelView",
		// 			"visible": false
		// 		},
		// 		{
		// 			"text": "Xã phường",
		// 			"icon": "far fa-clipboard",
		// 			"type": "view",
		// 			"collectionName": "xaphuong",
		// 			"route": "xaphuong/collection",
		// 			"$ref": "app/danhmuc/XaPhuong/view/CollectionView",
		// 			// "visible": function(){
		// 			// 	return this.checkHasRole("Admin") ;
		// 			// }
		// 		},
		// 		{
		// 			"type": "view",
		// 			"icon": "far fa-clipboard",
		// 			"collectionName": "xaphuong",
		// 			"route": "xaphuong/model(/:id)",
		// 			"$ref": "app/danhmuc/XaPhuong/view/ModelView",
		// 			"visible": false
		// 		},
		// 	]
		// },

		
	];

});


