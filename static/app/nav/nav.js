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
		{
			"text": "Nhà cung cấp thiết bị",
			"icon": "fa fa-home",
			"type": "view",
			"collectionName": "donvi",
			"route": "donvi/collection",
			"$ref": "app/donvi/js/CollectionView",
			"visible": function () {
				return true

			}
		},
		{
			"text": "Đơn vị",
			"icon": "fa fa-home",
			"type": "view",
			"collectionName": "donvi",
			"route": "donvi/model(/:id)",
			"$ref": "app/donvi/js/ModelView",
			"visible": function () {
				return false;
			}
		},

		{
			"text": " Danh sách thiết bị",
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
		{
			"text": "Quản lý thiết bị",
			"icon": "fa fa-home",
			"type": "view",
			"collectionName": "chitietthietbi",
			"route": "chitietthietbi/collection",
			"$ref": "app/chitietthietbi/js/CollectionView",
			"visible": function () {
				return true

			}
		},
		{
			"type": "view",
			"collectionName": "chitietthietbi",
			"route": "chitietthietbi/model(/:id)",
			"$ref": "app/chitietthietbi/js/ModelView",
			"visible": function () {
				return false;
			}
		},
		{
			"text": "Hồ sơ kiểm tra thiết bị",
			"icon": "fa fa-home",
			"type": "view",
			"collectionName": "bangkiemtrathietbi",
			"route": "bangkiemtrathietbi/collection",
			"$ref": "app/bangkiemtrathietbi/js/CollectionView",
			"visible": function () {
				return true

			}
		},
		{
			"type": "view",
			"collectionName": "bangkiemtrathietbi",
			"route": "bangkiemtrathietbi/model(/:id)",
			"$ref": "app/bangkiemtrathietbi/js/ModelView",
			"visible": function () {
				return false;
			}
		},
		
		{
			"text": "Kế hoạch kiểm tra năm",
			"icon": "fa fa-home",
			"type": "view",
			"collectionName": "bangkehoachkiemtrathietbitheonam",
			"route": "bangkehoachkiemtrathietbitheonam/collection",
			"$ref": "app/bangkehoachkiemtrathietbitheonam/js/CollectionView",
			"visible": function () {
				return true

			}
		},
		{
			"type": "view",
			"collectionName": "bangkehoachkiemtrathietbitheonam",
			"route": "bangkehoachkiemtrathietbitheonam/model(/:id)",
			"$ref": "app/bangkehoachkiemtrathietbitheonam/js/ModelView",
			"visible": function () {
				return false;
			}
		},
		{
			"text": "Chứng từ",
			"icon": "fa fa-home",
			"type": "category",
			"entries": [
				{
					"text": "DS phiếu sửa chữa",
					"icon": "fa fa-home",
					"type": "view",
					"collectionName": "phieuyeucausuachua",
					"route": "phieuyeucausuachua/collection",
					"$ref": "app/chungtu/phieuyeucausuachua/js/CollectionView",
					"visible": function () {
						return true
		
					}
				},
				{
					"type": "view",
					"collectionName": "phieuyeucausuachua",
					"route": "phieuyeucausuachua/model(/:id)",
					"$ref": "app/chungtu/phieuyeucausuachua/js/ModelView",
					"visible": function () {
						return false;
					}
				},
				{
					"text": "Tình trạng thiết bị",
					"icon": "fa fa-home",
					"type": "view",
					"collectionName": "bienbanxacnhantinhtrangthietbi",
					"route": "bienbanxacnhantinhtrangthietbi/collection",
					"$ref": "app/chungtu/bienbanxacnhantinhtrangthietbi/js/CollectionView",
					"visible": function () {
						return true
		
					}
				},
				{
					"type": "view",
					"collectionName": "bienbanxacnhantinhtrangthietbi",
					"route": "bienbanxacnhantinhtrangthietbi/model(/:id)",
					"$ref": "app/chungtu/bienbanxacnhantinhtrangthietbi/js/ModelView",
					"visible": function () {
						return false;
					}
				},
				{
					"text": "Dự toán sửa chữa",
					"icon": "fa fa-home",
					"type": "view",
					"collectionName": "dutoansuachuanam",
					"route": "dutoansuachuanam/collection",
					"$ref": "app/chungtu/dutoansuachuanam/js/CollectionView",
					"visible": function () {
						return true
		
					}
				},
				{
					"type": "view",
					"collectionName": "dutoansuachuanam",
					"route": "dutoansuachuanam/model(/:id)",
					"$ref": "app/chungtu/dutoansuachuanam/js/ModelView",
					"visible": function () {
						return false;
					}
				},
			]
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


