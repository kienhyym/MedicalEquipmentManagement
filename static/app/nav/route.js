define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');
	return [
		{
			"collectionName": "giaykhamsuckhoedungchonguoitudu18tuoi",
			"route": "giaykhamsuckhoedungchonguoitudu18tuoi/collection",
			"$ref": "app/hosonguoilaodong/mobilegiaykhamsuckhoedungchonguoitudu18tuoi/js/CollectionView",
		},
		{
			"collectionName": "giaykhamsuckhoedungchonguoitudu18tuoi",
			"route": "giaykhamsuckhoedungchonguoitudu18tuoi/model(/:id)",
			"$ref": "app/hosonguoilaodong/mobilegiaykhamsuckhoedungchonguoitudu18tuoi/js/ModelView",
		},

		{
			"collectionName": "hsqlsuckhoevabenhtatnguoilaodong",
			"route": "mobilehososuckhoevabenhtat/collection",
			"$ref": "app/hosonguoilaodong/mobilehososuckhoevabenhtat/js/CollectionView",
		},
		{
			"collectionName": "hsqlsuckhoevabenhtatnguoilaodong",
			"route": "mobilehososuckhoevabenhtat/model(/:id)",
			"$ref": "app/hosonguoilaodong/mobilehososuckhoevabenhtat/js/ModelView",
		},

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

			"route": "baocao/phuluc1/model",
			"$ref": "app/baocao/phuluc1/js/ModelView",
		},
		{
			"collectionName": "hsqlsuckhoevabenhtatnguoilaodong",
			"route": "hsqlsuckhoevabenhtatnguoilaodong/collection",
			"$ref": "app/baocao/phuluc2/js/CollectionView",
		},
		{
			"collectionName": "hsqlsuckhoevabenhtatnguoilaodong",
			"route": "hsqlsuckhoevabenhtatnguoilaodong/model(/:id)",
			"$ref": "app/baocao/phuluc2/js/ModelView",
		},

		{
			"collectionName": "hscctainanlaodongtaicosolaodong",
			"route": "hscctainanlaodongtaicosolaodong/collection",
			"$ref": "app/baocao/phuluc3/js/CollectionView",
		},
		{
			"collectionName": "hscctainanlaodongtaicosolaodong",
			"route": "hscctainanlaodongtaicosolaodong/model(/:id)",
			"$ref": "app/baocao/phuluc3/js/ModelView",
		},


		{

			"route": "baocao/phuluc4/model",
			"$ref": "app/baocao/phuluc4/js/ModelView",
		},
		{

			"route": "baocao/phuluc5/model",
			"$ref": "app/baocao/phuluc5/js/ModelView",
		},
		{

			"route": "baocao/phuluc6/model",
			"$ref": "app/baocao/phuluc6/js/ModelView",
		},
		{

			"collectionName": "sotheodoicongtachuanluyensocuucapcuutainoilamviec",
			"route": "sotheodoicongtachuanluyensocuucapcuutainoilamviec/collection",
			"$ref": "app/baocao/phuluc7/js/CollectionView",
		},
		{

			"collectionName": "sotheodoicongtachuanluyensocuucapcuutainoilamviec",
			"route": "sotheodoicongtachuanluyensocuucapcuutainoilamviec/model(/:id)",
			"$ref": "app/baocao/phuluc7/js/ModelView",
		},
		{

			"collectionName": "baocaoytelaodongcuacosolaodong",
			"route": "baocaoytelaodongcuacosolaodong/collection",
			"$ref": "app/baocao/phuluc8/js/CollectionView",
		},
		{

			"collectionName": "baocaoytelaodongcuacosolaodong",
			"route": "baocaoytelaodongcuacosolaodong/model(/:id)",
			"$ref": "app/baocao/phuluc8/js/ModelView",
		},
		{

			"collectionName": "baocaohoatdongytelaodong6thangnamtuyenhuyen",
			"route": "baocaohoatdongytelaodong6thangnamtuyenhuyen/collection",
			"$ref": "app/baocao/phuluc9/js/CollectionView",
		},
		{

			"collectionName": "baocaohoatdongytelaodong6thangnamtuyenhuyen",
			"route": "baocaohoatdongytelaodong6thangnamtuyenhuyen/model(/:id)",
			"$ref": "app/baocao/phuluc9/js/ModelView",
		},
		{

			"collectionName": "baocaohoatdongytelaodong6thangnam",
			"route": "baocaohoatdongytelaodong6thangnam/collection",
			"$ref": "app/baocao/phuluc10/js/CollectionView",
		},
		{

			"collectionName": "baocaohoatdongytelaodong6thangnam",
			"route": "baocaohoatdongytelaodong6thangnam/model(/:id)",
			"$ref": "app/baocao/phuluc10/js/ModelView",
		},
		{

			"collectionName": "chungchidaotaovebaocaotochucdudieukienquantracmoitruonglaodongduoccongboquantracmoitruonglaodong",
			"route": "baocaotochucdudieukienquantracmoitruonglaodongduoccongbo/collection",
			"$ref": "app/baocao/phuluc11/js/CollectionView",
		},
		{

			"collectionName": "baocaotochucdudieukienquantracmoitruonglaodongduoccongbo",
			"route": "baocaotochucdudieukienquantracmoitruonglaodongduoccongbo/model(/:id)",
			"$ref": "app/baocao/phuluc11/js/ModelView",
		},
		{

			"route": "baocao/phuluc12/model",
			"$ref": "app/baocao/phuluc12/js/ModelView",
		},
		{

			"collectionName": "chungchidaotaovequantracmoitruonglaodong",
			"route": "chungchidaotaovequantracmoitruonglaodong/collection",
			"$ref": "app/baocao/phuluc13/js/CollectionView",
		},
		{

			"collectionName": "chungchidaotaovequantracmoitruonglaodong",
			"route": "chungchidaotaovequantracmoitruonglaodong/model(/:id)",
			"$ref": "app/baocao/phuluc13/js/ModelView",
		},
		{

			"collectionName": "sokhamsuckhoedinhkycuanguoilaixeoto",
			"route": "sokhamsuckhoedinhkycuanguoilaixeoto/collection",
			"$ref": "app/baocao2/phuluc21/js/CollectionView",
		},
		{

			"collectionName": "sokhamsuckhoedinhkycuanguoilaixeoto",
			"route": "sokhamsuckhoedinhkycuanguoilaixeoto/model(/:id)",
			"$ref": "app/baocao2/phuluc21/js/ModelView",
		},
		{

			"collectionName": "giaygioithieu",
			"route": "giaygioithieu/collection",
			"$ref": "app/baocao2/phuluc1/js/CollectionView",
		},
		{

			"collectionName": "giaygioithieu",
			"route": "giaygioithieu/model(/:id)",
			"$ref": "app/baocao2/phuluc1/js/ModelView",
		},


		{
			"collectionName": "phieukhamsuckhoetruockhibotrilamviec",
			"route": "phieukhamsuckhoetruockhibotrilamviec/collection",
			"$ref": "app/baocao2/phuluc2/js/CollectionView",
		},
		{
			"collectionName": "phieukhamsuckhoetruockhibotrilamviec",
			"route": "phieukhamsuckhoetruockhibotrilamviec/model(/:id)",
			"$ref": "app/baocao2/phuluc2/js/ModelView",
		},

		{
			"collectionName": "sokhamsuckhoephathienbenhnghenghiep",
			"route": "sokhamsuckhoephathienbenhnghenghiep/collection",
			"$ref": "app/baocao2/phuluc3/js/CollectionView",
		},
		{
			"collectionName": "sokhamsuckhoephathienbenhnghenghiep",
			"route": "sokhamsuckhoephathienbenhnghenghiep/model(/:id)",
			"$ref": "app/baocao2/phuluc3/js/ModelView",
		},
		{

			"route": "baocao2/phuluc4/model",
			"$ref": "app/baocao2/phuluc4/js/ModelView",
		},
		{
			"collectionName": "bienbanxacnhantiepxucyeutocohaigaybenhnghenghiep",
			"route": "bienbanxacnhantiepxucyeutocohaigaybenhnghenghiep/collection",
			"$ref": "app/baocao2/phuluc5/js/CollectionView",
		},
		{
			"collectionName": "bienbanxacnhantiepxucyeutocohaigaybenhnghenghiep",
			"route": "bienbanxacnhantiepxucyeutocohaigaybenhnghenghiep/model(/:id)",
			"$ref": "app/baocao2/phuluc5/js/ModelView",
		},


		{

			"route": "baocao2/phuluc6/model",
			"$ref": "app/baocao2/phuluc6/js/ModelView",
		},

		{
			"collectionName": "hosobenhnghenghiep",
			"route": "hosobenhnghenghiep/collection",
			"$ref": "app/baocao2/phuluc7/js/CollectionView",
		},
		{
			"collectionName": "hosobenhnghenghiep",
			"route": "hosobenhnghenghiep/model(/:id)",
			"$ref": "app/baocao2/phuluc7/js/ModelView",
		},

		{
			"collectionName": "bienbanhoichanbenhnghenghiep",
			"route": "bienbanhoichanbenhnghenghiep/collection",
			"$ref": "app/baocao2/phuluc8/js/CollectionView",
		},
		{
			"collectionName": "bienbanhoichanbenhnghenghiep",
			"route": "bienbanhoichanbenhnghenghiep/model(/:id)",
			"$ref": "app/baocao2/phuluc8/js/ModelView",
		},
		{
			"collectionName": "baocaotruonghopnguoilaodongmacbenhnghenghiep",
			"route": "baocaotruonghopnguoilaodongmacbenhnghenghiep/collection",
			"$ref": "app/baocao2/phuluc9/js/CollectionView",
		},
		{
			"collectionName": "baocaotruonghopnguoilaodongmacbenhnghenghiep",
			"route": "baocaotruonghopnguoilaodongmacbenhnghenghiep/model(/:id)",
			"$ref": "app/baocao2/phuluc9/js/ModelView",
		},
		{
			"collectionName": "tonghopketquadotkhamsuckhoephathienbenhnghenghiep",
			"route": "tonghopketquadotkhamsuckhoephathienbenhnghenghiep/collection",
			"$ref": "app/baocao2/phuluc10/js/CollectionView",
		},
		{
			"collectionName": "tonghopketquadotkhamsuckhoephathienbenhnghenghiep",
			"route": "tonghopketquadotkhamsuckhoephathienbenhnghenghiep/model(/:id)",
			"$ref": "app/baocao2/phuluc10/js/ModelView",
		},
		{
			"collectionName": "tonghopketquakhamdinhkynguoimacbenhnghenghiep",
			"route": "tonghopketquakhamdinhkynguoimacbenhnghenghiep/collection",
			"$ref": "app/baocao2/phuluc11/js/CollectionView",
		},
		{
			"collectionName": "tonghopketquakhamdinhkynguoimacbenhnghenghiep",
			"route": "tonghopketquakhamdinhkynguoimacbenhnghenghiep/model(/:id)",
			"$ref": "app/baocao2/phuluc11/js/ModelView",
		},
		{
			"collectionName": "baocaodanhsachcaccosolaodongconguoilaodongmacbenhlaodong",
			"route": "baocaodanhsachcaccosolaodongconguoilaodongmacbenhlaodong/collection",
			"$ref": "app/baocao2/phuluc12/js/CollectionView",
		},
		{
			"collectionName": "baocaodanhsachcaccosolaodongconguoilaodongmacbenhlaodong",
			"route": "baocaodanhsachcaccosolaodongconguoilaodongmacbenhlaodong/model(/:id)",
			"$ref": "app/baocao2/phuluc12/js/ModelView",
		},
	];

});


