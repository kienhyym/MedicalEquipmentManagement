define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');
	return [
		

		{
			"collectionName": "user",
			"route": "user/collection",
			"$ref": "app/hethong/user/js/CollectionView",
		},
		{
			"collectionName": "user",
			"route": "user/model(/:id)",
			"$ref": "app/hethong/user/js/ModelView",
		},


		{
			"collectionName": "khoa",
			"route": "khoa/collection",
			"$ref": "app/hethong/khoa/view/CollectionView",
		},
		{
			"collectionName": "khoa",
			"route": "khoa/model(/:id)",
			"$ref": "app/hethong/khoa/view/ModelView",
		},


		{
			"collectionName": "phong",
			"route": "phong/collection",
			"$ref": "app/hethong/phong/view/CollectionView",
		},
		{
			"collectionName": "phong",
			"route": "phong/model(/:id)",
			"$ref": "app/hethong/phong/view/ModelView",
		},





		{
			"collectionName": "vaitro",
			"route": "vaitro/collection",
			"$ref": "app/hethong/vaitro/js/CollectionView",
		},
		{
			"collectionName": "vaitro",
			"route": "vaitro/model(/:id)",
			"$ref": "app/hethong/vaitro/js/ModelView",
		},
		{
			"collectionName": "donvi",
			"route": "donvi/collection",
			"$ref": "app/danhmuc/donvi/js/CollectionView",
		},
		{
			"collectionName": "donvi",
			"route": "donvi/model(/:id)",
			"$ref": "app/danhmuc/donvi/js/ModelView",
		},
		{
			"collectionName": "thietbi",
			"route": "thietbi/collection",
			"$ref": "app/danhmuc/thietbi/js/CollectionView",
		},
		{
			"collectionName": "thietbi",
			"route": "thietbi/model(/:id)",
			"$ref": "app/danhmuc/thietbi/js/ModelView",
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
			"collectionName": "bangkiemtrathietbi",
			"route": "bangkiemtrathietbi/collection",
			"$ref": "app/chungtu/bangkiemtrathietbi/js/CollectionView",
		},
		{
			"collectionName": "bangkiemtrathietbi",
			"route": "bangkiemtrathietbi/model(/:id)",
			"$ref": "app/chungtu/bangkiemtrathietbi/js/ModelView",
		},
		{
			"collectionName": "dutoansuachuanam",
			"route": "dutoansuachuanam/collection",
			"$ref": "app/chungtu/dutoansuachuanam/js/CollectionView",
		},
		{
			"collectionName": "dutoansuachuanam",
			"route": "dutoansuachuanam/model(/:id)",
			"$ref": "app/chungtu/dutoansuachuanam/js/ModelView",
		},

		{
			"collectionName": "bienbanxacnhantinhtrangthietbi",
			"route": "bienbanxacnhantinhtrangthietbi/collection",
			"$ref": "app/chungtu/bienbanxacnhantinhtrangthietbi/js/CollectionView",
		},
		{
			"collectionName": "bienbanxacnhantinhtrangthietbi",
			"route": "bienbanxacnhantinhtrangthietbi/model(/:id)",
			"$ref": "app/chungtu/bienbanxacnhantinhtrangthietbi/js/ModelView",
		},

		{
			"collectionName": "phieuyeucausuachua",
			"route": "phieuyeucausuachua/collection",
			"$ref": "app/chungtu/phieuyeucausuachua/js/CollectionView",
		},
		{
			"collectionName": "phieuyeucausuachua",
			"route": "phieuyeucausuachua/model(/:id)",
			"$ref": "app/chungtu/phieuyeucausuachua/js/ModelView",
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
			"collectionName": "hangsanxuat",
			"route": "hangsanxuat/collection",
			"$ref": "app/danhmuc/hangsanxuat/view/CollectionView",
		},
		{
			"collectionName": "hangsanxuat",
			"route": "hangsanxuat/model(/:id)",
			"$ref": "app/danhmuc/hangsanxuat/view/ModelView",
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

		{
			"collectionName": "bangkiemdinh",
			"route": "bangkiemdinh/collection",
			"$ref": "app/chungtu/bangkiemdinh/js/CollectionView",
		},
		{
			"collectionName": "bangkiemdinh",
			"route": "bangkiemdinh/model(/:id)",
			"$ref": "app/chungtu/bangkiemdinh/js/ModelView",
		},
		{

			"collectionName": "thietbiduockiemtra",
			"route": "lichthanhtra/collection",
			"$ref": "app/lichthanhtra/view/ModelView",

		},

	];

});


