define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');
	return [
		// {
		// 	"text":"Danh sách người dùng",
		// 	"icon":"fa fa-home",
		// 	"type":"view",
		// 	"collectionName":"user",
		//     "route":"user/collection",
		//     "$ref": "app/user/js/CollectionView",
		//     "visible": function(){
		//      	return  true;
		//      }
		// },
		// {
		// 	"text":"Danh sách người dùng",
		// 	"icon":"fa fa-home",
		// 	"type":"view",
		// 	"collectionName":"user",
		//     "route":"user/model",
		//     "$ref": "app/user/js/ModelView",
		//     "visible": function(){
		//      	return  false;
		//      }
		// },
		// {
		// 	"text":"Vai trò",
		// 	"icon":"fa fa-home",
		// 	"type":"view",
		// 	"collectionName":"role",
		//     "route":"role/collection",
		//     "$ref": "app/role/js/CollectionView",
		//     "visible": function(){
		//      	return  true;
		//      }
		// },
		// {
		// 	"text":"Vai trò",
		// 	"icon":"fa fa-home",
		// 	"type":"view",
		// 	"collectionName":"role",
		//     "route":"role/model",
		//     "$ref": "app/role/js/ModelView",
		//     "visible": function(){
		//      	return  false;
		//      }
		// },

		// {
		// 	"text":"Danh mục",
		// 	"icon":"fa fa-home",
		// 	"type":"category",

		// 	// "visible": function(){
		//     // 	//console.log(this.checkHasRole("Admin"));
		//     // 	return this.checkHasRole("Admin") ;
		//     // },
		// 	"entries":[
		// 		{
		// 		    "text":"Quốc gia",
		// 		    "type":"view",
		// 		    "collectionName":"quocgia",
		// 		    "route":"quocgia/collection",
		// 		    "$ref": "app/DanhMuc/QuocGia/view/CollectionView",
		// 		    // "visible": function(){
		// 		    // 	//console.log(this.checkHasRole("Admin"));
		// 		    // 	return this.checkHasRole("Admin") ;
		// 		    // }
		// 		},
		// 		{
		// 		    "type":"view",
		// 		    "collectionName":"quocgia",
		// 		    "route":"quocgia/model(/:id)",
		// 		    "$ref": "app/DanhMuc/QuocGia/view/ModelView",
		// 		    "visible": false
		// 		},
		// 		{
		// 		    "text":"Tỉnh thành",
		// 		    "type":"view",
		// 		    "collectionName":"tinhthanh",
		// 		    "route":"tinhthanh/collection",
		// 		    "$ref": "app/DanhMuc/TinhThanh/view/CollectionView",
		// 		    // "visible": function(){
		// 		    // 	return this.checkHasRole("Admin") ;
		// 		    // }
		// 		},
		// 		{
		// 		    "type":"view",
		// 		    "collectionName":"tinhthanh",
		// 		    "route":"tinhthanh/model(/:id)",
		// 		    "$ref": "app/DanhMuc/TinhThanh/view/ModelView",
		// 		    "visible": false
		// 		},
		// 		{
		// 		    "text":"Quận huyện",
		// 		    "type":"view",
		// 		    "collectionName":"quanhuyen",
		// 		    "route":"quanhuyen/collection",
		// 		    "$ref": "app/DanhMuc/QuanHuyen/view/CollectionView",
		// 		    // "visible": function(){
		// 		    // 	return this.checkHasRole("Admin") ;
		// 		    // }
		// 		},
		// 		{
		// 		    "type":"view",
		// 		    "collectionName":"quanhuyen",
		// 		    "route":"quanhuyen/model(/:id)",
		// 		    "$ref": "app/DanhMuc/QuanHuyen/view/ModelView",
		// 		    "visible": false
		// 		},
		// 		{
		// 		    "text":"Xã phường",
		// 		    "type":"view",
		// 		    "collectionName":"xaphuong",
		// 		    "route":"xaphuong/collection",
		// 		    "$ref": "app/DanhMuc/XaPhuong/view/CollectionView",
		// 		    // "visible": function(){
		// 		    // 	return this.checkHasRole("Admin") ;
		// 		    // }
		// 		},
		// 		{
		// 		    "type":"view",
		// 		    "collectionName":"xaphuong",
		// 		    "route":"xaphuong/model(/:id)",
		// 		    "$ref": "app/DanhMuc/XaPhuong/view/ModelView",
		// 		    "visible": false
		// 		},
		// 	]
		// },

		{
			"text": "Báo cáo",
			"icon": "fa fa-home",
			"type": "category",

			// "visible": function(){
			// 	//console.log(this.checkHasRole("Admin"));
			// 	return this.checkHasRole("Admin") ;
			// },
			"entries": [
				{
					"text": "phụ lục 1",
					"icon": "fa fa-home",
					"type": "view",
					// "collectionName": "baocao",
					"route": "baocao/phuluc1/model",
					// "$ref": "app/baocao/phuluc7/js/ModelView",
					"visible": function () {
						return true;
					}
				},
				{
					"text": "phụ lục 2",
					"type": "view",
					"icon": "fa fa-home",
					"collectionName": "hsqlsuckhoevabenhtatnguoilaodong",
					"route": "hsqlsuckhoevabenhtatnguoilaodong/collection",
					"$ref": "app/baocao/phuluc2/js/CollectionView",
					"visible": function () {
						return true;
					}
				},
				{
					
				
					"type": "view",
					"collectionName": "hsqlsuckhoevabenhtatnguoilaodong",
					"route": "hsqlsuckhoevabenhtatnguoilaodong/model(/:id)",
					"$ref": "app/baocao/phuluc2/js/ModelView",
					"visible": function () {
						return false;
					}
				},
				{
					"text": "phụ lục 3",
					"type": "view",
					"icon": "fa fa-home",
					"collectionName": "hscctainanlaodongtaicosolaodong",
					"route": "hscctainanlaodongtaicosolaodong/collection",
					"$ref": "app/baocao/phuluc3/js/CollectionView",
					"visible": function () {
						return true;
					}
				
				},
				{
					"type": "view",
					"collectionName": "hscctainanlaodongtaicosolaodong",
					"route": "hscctainanlaodongtaicosolaodong/model(/:id)",
					"$ref": "app/baocao/phuluc3/js/ModelView",
					"visible": function () {
						return false;
					}
				},

				{
					"text": "phụ lục 4",
					"icon": "fa fa-home",
					"type": "view",
					// "collectionName": "baocao",
					"route": "baocao/phuluc4/model",
					// "$ref": "app/baocao/phuluc7/js/ModelView",
					"visible": function () {
						return true;
					}
				},
				{
					"text": "phụ lục 5",
					"icon": "fa fa-home",
					"type": "view",
					// "collectionName": "baocao",
					"route": "baocao/phuluc5/model",
					// "$ref": "app/baocao/phuluc7/js/ModelView",
					"visible": function () {
						return true;
					}
				},
				{
					"text": "phụ lục 6",
					"icon": "fa fa-home",
					"type": "view",
					// "collectionName": "baocao",
					"route": "baocao/phuluc6/model",
					// "$ref": "app/baocao/phuluc7/js/ModelView",
					"visible": function () {
						return true;
					}
				},
				{
					"text": "phụ lục 7",
					"icon": "fa fa-home",
					"type": "view",
					// "collectionName": "baocao",
					"route": "baocao/phuluc7/model",
					// "$ref": "app/baocao/phuluc7/js/ModelView",
					"visible": function () {
						return true;
					}
				},
				{
					"text": "phụ lục 8",
					"icon": "fa fa-home",
					"type": "view",
					// "collectionName": "baocao",
					"route": "baocao/phuluc8/model",
					// "$ref": "app/baocao/phuluc7/js/ModelView",
					"visible": function () {
						return true;
					}
				},
				{
					"text": "phụ lục 9",
					"icon": "fa fa-home",
					"type": "view",
					// "collectionName": "baocao",
					"route": "baocao/phuluc9/model",
					// "$ref": "app/baocao/phuluc7/js/ModelView",
					"visible": function () {
						return true;
					}
				},
				{
					"text": "phụ lục 10",
					"icon": "fa fa-home",
					"type": "view",
					// "collectionName": "baocao",
					"route": "baocao/phuluc10/model",
					// "$ref": "app/baocao/phuluc7/js/ModelView",
					"visible": function () {
						return true;
					}
				},
				{
					"text": "phụ lục 11",
					"icon": "fa fa-home",
					"type": "view",
					// "collectionName": "baocao",
					"route": "baocao/phuluc11/model",
					// "$ref": "app/baocao/phuluc7/js/ModelView",
					"visible": function () {
						return true;
					}
				},
				{
					"text": "phụ lục 12",
					"icon": "fa fa-home",
					"type": "view",
					// "collectionName": "baocao",
					"route": "baocao/phuluc12/model",
					// "$ref": "app/baocao/phuluc7/js/ModelView",
					"visible": function () {
						return true;
					}
				},
				{
					"text": "phụ lục 13",
					"icon": "fa fa-home",
					"type": "view",
					// "collectionName": "baocao",
					"route": "baocao/phuluc13/model",
					// "$ref": "app/baocao/phuluc7/js/ModelView",
					"visible": function () {
						return true;
					}
				},
			]
		},
		{
			"text": "Báo cáo 2",
			"icon": "fa fa-home",
			"type": "category",

			"entries": [
				{
					"text": "SỔ KHÁM SỨC KHỎE ĐỊNH KỲ CỦA NGƯỜI LÁI XE Ô TÔ",
					"icon": "fa fa-home",
					"type": "view",
					// "collectionName": "baocao",
					"route": "baocao2/phuluc21/model",
					// "$ref": "app/baocao2/phuluc7/js/ModelView",
					"visible": function () {
						return true;
					}
				},
				{
					"text": "phục luc 1",
					"icon": "fa fa-home",
					"type": "view",
					// "collectionName": "baocao",
					"route": "baocao2/phuluc1/model",
					// "$ref": "app/baocao2/phuluc7/js/ModelView",
					"visible": function () {
						return true;
					}
				},
				{
					"text": "phục luc 2",
					"icon": "fa fa-home",
					"type": "view",
					// "collectionName": "baocao",
					"route": "baocao2/phuluc2/model",
					// "$ref": "app/baocao2/phuluc7/js/ModelView",
					"visible": function () {
						return true;
					}
				},
				{
					"text": "phục luc 3",
					"icon": "fa fa-home",
					"type": "view",
					// "collectionName": "baocao",
					"route": "baocao2/phuluc3/model",
					// "$ref": "app/baocao2/phuluc7/js/ModelView",
					"visible": function () {
						return true;
					}
				},
				{
					"text": "phục luc 4",
					"icon": "fa fa-home",
					"type": "view",
					// "collectionName": "baocao",
					"route": "baocao2/phuluc4/model",
					// "$ref": "app/baocao2/phuluc7/js/ModelView",
					"visible": function () {
						return true;
					}
				},
				{
					"text": "phục luc 5",
					"icon": "fa fa-home",
					"type": "view",
					// "collectionName": "baocao",
					"route": "baocao2/phuluc5/model",
					// "$ref": "app/baocao2/phuluc7/js/ModelView",
					"visible": function () {
						return true;
					}
				},
				{
					"text": "phục luc 6",
					"icon": "fa fa-home",
					"type": "view",
					// "collectionName": "baocao",
					"route": "baocao2/phuluc6/model",
					// "$ref": "app/baocao2/phuluc7/js/ModelView",
					"visible": function () {
						return true;
					}
				},
				{
					"text": "phục luc 7",
					"icon": "fa fa-home",
					"type": "view",
					// "collectionName": "baocao",
					"route": "baocao2/phuluc7/model",
					// "$ref": "app/baocao2/phuluc7/js/ModelView",
					"visible": function () {
						return true;
					}
				},
				{
					"text": "phục luc 8",
					"icon": "fa fa-home",
					"type": "view",
					// "collectionName": "baocao",
					"route": "baocao2/phuluc8/model",
					// "$ref": "app/baocao2/phuluc7/js/ModelView",
					"visible": function () {
						return true;
					}
				},
				{
					"text": "phục luc 9",
					"icon": "fa fa-home",
					"type": "view",
					// "collectionName": "baocao",
					"route": "baocao2/phuluc9/model",
					// "$ref": "app/baocao2/phuluc7/js/ModelView",
					"visible": function () {
						return true;
					}
				},
				{
					"text": "phục luc 10",
					"icon": "fa fa-home",
					"type": "view",
					// "collectionName": "baocao",
					"route": "baocao2/phuluc10/model",
					// "$ref": "app/baocao2/phuluc7/js/ModelView",
					"visible": function () {
						return true;
					}
				},
				{
					"text": "phục luc 11",
					"icon": "fa fa-home",
					"type": "view",
					// "collectionName": "baocao",
					"route": "baocao2/phuluc11/model",
					// "$ref": "app/baocao2/phuluc7/js/ModelView",
					"visible": function () {
						return true;
					}
				},
				{
					"text": "phục luc 12",
					"icon": "fa fa-home",
					"type": "view",
					// "collectionName": "baocao",
					"route": "baocao2/phuluc12/model",
					// "$ref": "app/baocao2/phuluc7/js/ModelView",
					"visible": function () {
						return true;
					}
				},


			]
		},
	];

});


