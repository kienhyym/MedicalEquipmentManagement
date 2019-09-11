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
				return this.userHasRole("company");

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
				return this.userHasRole("company");

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
			"text": "Đơn vị",
			"icon": "fa fa-home",
			"type": "view",
			"collectionName": "donvi",
			"route": "donvi/collection",
			"$ref": "app/donvi/js/CollectionView",
			"visible": function () {
				return this.userHasRole("company");

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

		{
			"text": "Hồ sơ",
			"icon": "fa fa-home",
			"type": "category",
			
			// "visible": function(){
			// 	//console.log(this.checkHasRole("Admin"));
			// 	return this.checkHasRole("Admin") ;
			// },
			"entries": [
				{
					"text": "Hồ sơ sức khỏe và bệnh tật",
					"type": "view",
					"icon": "far fa-clipboard",
					"collectionName": "hsqlsuckhoevabenhtatnguoilaodong",
					"route": "hsqlsuckhoevabenhtatnguoilaodong/collection",
					"$ref": "app/baocao/phuluc2/js/CollectionView",
					"visible": function () {
						return this.userHasRole("worker")|| this.userHasRole("company");

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
					"text": "Hồ sơ cấp cứu tai nạn lao động tại cơ sở lao động",
					"type": "view",
					"icon": "far fa-clipboard",
					"collectionName": "hscctainanlaodongtaicosolaodong",
					"route": "hscctainanlaodongtaicosolaodong/collection",
					"$ref": "app/baocao/phuluc3/js/CollectionView",
					"visible": function () {
						return this.userHasRole("company");

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
					"text": "Sổ theo dõi công tác huấn luyện sơ cứu, cấp cứu tại nơi làm việc",
					"type": "view",
					"icon": "far fa-clipboard",
					"collectionName": "sotheodoicongtachuanluyensocuucapcuutainoilamviec",
					"route": "sotheodoicongtachuanluyensocuucapcuutainoilamviec/collection",
					"$ref": "app/baocao/phuluc7/js/CollectionView",
					"visible": function () {
						return this.userHasRole("company");

					}

				},
				{
					"type": "view",
					"collectionName": "sotheodoicongtachuanluyensocuucapcuutainoilamviec",
					"route": "sotheodoicongtachuanluyensocuucapcuutainoilamviec/model(/:id)",
					"$ref": "app/baocao/phuluc7/js/ModelView",
					"visible": function () {
						return false;
					}
				},
				{
					"text": "Giấy chứng chỉ đào tạo về quan trắc môi trường lao động",
					"type": "view",
					"icon": "far fa-clipboard",
					"collectionName": "chungchidaotaovequantracmoitruonglaodong",
					"route": "chungchidaotaovequantracmoitruonglaodong/collection",
					"$ref": "app/baocao/phuluc13/js/CollectionView",
					"visible": function () {
						return this.userHasRole("company");

					}

				},
				{
					"type": "view",
					"collectionName": "chungchidaotaovequantracmoitruonglaodong",
					"route": "chungchidaotaovequantracmoitruonglaodong/model(/:id)",
					"$ref": "app/baocao/phuluc13/js/ModelView",
					"visible": function () {
						return false;
					}
				},
				{
					"text": "Tổng hợp kết quả đợt khám sức khỏe phát hiện bệnh nghề nghiệp",
					"type": "view",
					"icon": "far fa-clipboard",
					"collectionName": "tonghopketquadotkhamsuckhoephathienbenhnghenghiep",
					"route": "tonghopketquadotkhamsuckhoephathienbenhnghenghiep/collection",
					"$ref": "app/baocao2/phuluc10/js/CollectionView",
					"visible": function () {
						return this.userHasRole("company");

					}

				},
				{
					"type": "view",
					"collectionName": "tonghopketquadotkhamsuckhoephathienbenhnghenghiep",
					"route": "tonghopketquadotkhamsuckhoephathienbenhnghenghiep/model(/:id)",
					"$ref": "app/baocao2/phuluc10/js/ModelView",
					"visible": function () {
						return false;
					}
				},
				{
					"text": "Tổng hợp kết quả khám định kỳ người mắc bệnh nghề nghiệp",
					"type": "view",
					"icon": "far fa-clipboard",
					"collectionName": "tonghopketquakhamdinhkynguoimacbenhnghenghiep",
					"route": "tonghopketquakhamdinhkynguoimacbenhnghenghiep/collection",
					"$ref": "app/baocao2/phuluc11/js/CollectionView",
					"visible": function () {
						return this.userHasRole("company");

					}

				},
				{
					"type": "view",
					"collectionName": "tonghopketquakhamdinhkynguoimacbenhnghenghiep",
					"route": "tonghopketquakhamdinhkynguoimacbenhnghenghiep/model(/:id)",
					"$ref": "app/baocao2/phuluc11/js/ModelView",
					"visible": function () {
						return false;
					}
				},
				{
					"text": "Hồ sơ bệnh nghề nghiệp",
					"type": "view",
					"icon": "far fa-clipboard",
					"collectionName": "hosobenhnghenghiep",
					"route": "hosobenhnghenghiep/collection",
					"$ref": "app/baocao2/phuluc7/js/CollectionView",
					"visible": function () {
						return this.userHasRole("company");

					}

				},
				{
					"type": "view",
					"collectionName": "hosobenhnghenghiep",
					"route": "hosobenhnghenghiep/model(/:id)",
					"$ref": "app/baocao2/phuluc7/js/ModelView",
					"visible": function () {
						return false;
					}
				},
				{
					"text": "Biên bản hội chấn bệnh nghề nghiệp",
					"type": "view",
					"icon": "far fa-clipboard",
					"collectionName": "bienbanhoichanbenhnghenghiep",
					"route": "bienbanhoichanbenhnghenghiep/collection",
					"$ref": "app/baocao2/phuluc8/js/CollectionView",
					"visible": function () {
						return this.userHasRole("company");

					}

				},
				{
					"type": "view",
					"collectionName": "bienbanhoichanbenhnghenghiep",
					"route": "bienbanhoichanbenhnghenghiep/model(/:id)",
					"$ref": "app/baocao2/phuluc8/js/ModelView",
					"visible": function () {
						return false;
					}
				},
				{
					"text": "Sổ khám sức khỏe định kỳ của người lái xe ô tô",
					"type": "view",
					"icon": "far fa-clipboard",
					"collectionName": "sokhamsuckhoedinhkycuanguoilaixeoto",
					"route": "sokhamsuckhoedinhkycuanguoilaixeoto/collection",
					"$ref": "app/baocao2/phuluc21/js/CollectionView",
					"visible": function () {
						return this.userHasRole("company");

					}

				},
				{
					"type": "view",
					"collectionName": "sokhamsuckhoedinhkycuanguoilaixeoto",
					"route": "sokhamsuckhoedinhkycuanguoilaixeoto/model(/:id)",
					"$ref": "app/baocao2/phuluc21/js/ModelView",
					"visible": function () {
						return false;
					}
				},
				{
					"text": "Giấy giới thiệu",
					"type": "view",
					"icon": "far fa-clipboard",
					"collectionName": "giaygioithieu",
					"route": "giaygioithieu/collection",
					"$ref": "app/baocao2/phuluc1/js/CollectionView",
					"visible": function () {
						return this.userHasRole("company");

					}

				},
				{
					"type": "view",
					"collectionName": "giaygioithieu",
					"route": "giaygioithieu/model(/:id)",
					"$ref": "app/baocao2/phuluc1/js/ModelView",
					"visible": function () {
						return false;
					}
				},
				{
					"text": "Phiếu khám sức khỏe trước khi bố trí làm việc",
					"type": "view",
					"icon": "far fa-clipboard",
					"collectionName": "phieukhamsuckhoetruockhibotrilamviec",
					"route": "phieukhamsuckhoetruockhibotrilamviec/collection",
					"$ref": "app/baocao2/phuluc2/js/CollectionView",
					"visible": function () {
						return this.userHasRole("company");

					}

				},
				{
					"type": "view",
					"collectionName": "phieukhamsuckhoetruockhibotrilamviec",
					"route": "phieukhamsuckhoetruockhibotrilamviec/model(/:id)",
					"$ref": "app/baocao2/phuluc3/js/ModelView",
					"visible": function () {
						return false;
					}
				},

				{
					"text": "Sổ khám sức khỏe phát hiện bệnh nghề nghiệp",
					"type": "view",
					"icon": "far fa-clipboard",
					"collectionName": "sokhamsuckhoephathienbenhnghenghiep",
					"route": "sokhamsuckhoephathienbenhnghenghiep/collection",
					"$ref": "app/baocao2/phuluc3/js/CollectionView",
					"visible": function () {
						return this.userHasRole("company");

					}

				},
				{
					"type": "view",
					"collectionName": "sokhamsuckhoephathienbenhnghenghiep",
					"route": "sokhamsuckhoephathienbenhnghenghiep/model(/:id)",
					"$ref": "app/baocao2/phuluc3/js/ModelView",
					"visible": function () {
						return false;
					}
				},

				{
					"text": "Biên bản xác nhận tiếp xúc với yếu tố có hại gây bệnh nghề nghiệp cấp tính",
					"type": "view",
					"icon": "far fa-clipboard",
					"collectionName": "bienbanxacnhantiepxucyeutocohaigaybenhnghenghiep",
					"route": "bienbanxacnhantiepxucyeutocohaigaybenhnghenghiep/collection",
					"$ref": "app/baocao2/phuluc5/js/CollectionView",
					"visible": function () {
						return this.userHasRole("company");

					}

				},
				{
					"type": "view",
					"collectionName": "bienbanxacnhantiepxucyeutocohaigaybenhnghenghiep",
					"route": "bienbanxacnhantiepxucyeutocohaigaybenhnghenghiep/model(/:id)",
					"$ref": "app/baocao2/phuluc5/js/ModelView",
					"visible": function () {
						return false;
					}
				},
				{
					"text": "Giấy khám sức khỏe định kỳ",
					"icon": "far fa-clipboard",
					"type": "view",
					"collectionName": "giaykhamsuckhoedungchonguoitudu18tuoi",
					"route": "giaykhamsuckhoedungchonguoitudu18tuoi/collection",
					"$ref": "app/hoso/mobilegiaykhamsuckhoedungchonguoitudu18tuoi/js/CollectionView",
					"visible": function () {
						return this.userHasRole("worker");
		
					}
				},
				{
					"icon": "far fa-clipboard",
					"type": "view",
					"collectionName": "giaykhamsuckhoedungchonguoitudu18tuoi",
					"route": "giaykhamsuckhoedungchonguoitudu18tuoi/model(/:id)",
					"$ref": "app/hoso/mobilegiaykhamsuckhoedungchonguoitudu18tuoi/js/ModelView",
					"visible": function () {
						return false;
					}
				},


			],
			"visible": function () {
				return this.userHasRole("worker")|| this.userHasRole("company");

			}
		},
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
					"text": "Báo cáo y tế lao động của cơ sở lao động",
					"type": "view",
					"icon": "far fa-clipboard",
					"collectionName": "baocaoytelaodongcuacosolaodong",
					"route": "baocaoytelaodongcuacosolaodong/collection",
					"$ref": "app/baocao/phuluc8/js/CollectionView",
					"visible": function () {
						return this.userHasRole("company");

					}

				},
				{
					"type": "view",
					"collectionName": "baocaoytelaodongcuacosolaodong",
					"route": "baocaoytelaodongcuacosolaodong/model(/:id)",
					"$ref": "app/baocao/phuluc8/js/ModelView",
					"visible": function () {
						return false;
					}
				},
				{
					"text": "Báo cáo hoạt động y tế lao động 6 tháng/năm tuyến huyện",
					"type": "view",
					"icon": "far fa-clipboard",
					"collectionName": "baocaohoatdongytelaodong6thangnamtuyenhuyen",
					"route": "baocaohoatdongytelaodong6thangnamtuyenhuyen/collection",
					"$ref": "app/baocao/phuluc9/js/CollectionView",
					"visible": function () {
						return this.userHasRole("company");

					}

				},
				{
					"type": "view",
					"collectionName": "baocaohoatdongytelaodong6thangnamtuyenhuyen",
					"route": "baocaohoatdongytelaodong6thangnamtuyenhuyen/model(/:id)",
					"$ref": "app/baocao/phuluc9/js/ModelView",
					"visible": function () {
						return false;
					}
				},
				{
					"text": "Báo cáo hoạt động y tế lao động 6 tháng/năm tuyến tỉnh",
					"type": "view",
					"icon": "far fa-clipboard",
					"collectionName": "baocaohoatdongytelaodong6thangnam",
					"route": "baocaohoatdongytelaodong6thangnam/collection",
					"$ref": "app/baocao/phuluc10/js/CollectionView",
					"visible": function () {
						return this.userHasRole("company");

					}

				},
				{
					"type": "view",
					"collectionName": "baocaohoatdongytelaodong6thangnam",
					"route": "baocaohoatdongytelaodong6thangnam/model(/:id)",
					"$ref": "app/baocao/phuluc10/js/ModelView",
					"visible": function () {
						return false;
					}
				},


				{
					"text": "Báo cáo tổ chức đủ điều kiện quan trắc môi trường lao động được công bố",
					"type": "view",
					"icon": "far fa-clipboard",
					"collectionName": "chungchidaotaovebaocaotochucdudieukienquantracmoitruonglaodongduoccongboquantracmoitruonglaodong",
					"route": "baocaotochucdudieukienquantracmoitruonglaodongduoccongbo/collection",
					"$ref": "app/baocao/phuluc11/js/CollectionView",
					"visible": function () {
						return this.userHasRole("company");

					}

				},
				{
					"type": "view",
					"collectionName": "baocaotochucdudieukienquantracmoitruonglaodongduoccongbo",
					"route": "baocaotochucdudieukienquantracmoitruonglaodongduoccongbo/model(/:id)",
					"$ref": "app/baocao/phuluc11/js/ModelView",
					"visible": function () {
						return false;
					}
				},



				{
					"text": "Báo cáo danh sách các cơ sở lao động có người lao động mắc bệnh nghề nghiệp",
					"type": "view",
					"icon": "far fa-clipboard",
					"collectionName": "baocaodanhsachcaccosolaodongconguoilaodongmacbenhlaodong",
					"route": "baocaodanhsachcaccosolaodongconguoilaodongmacbenhlaodong/collection",
					"$ref": "app/baocao2/phuluc12/js/CollectionView",
					"visible": function () {
						return this.userHasRole("company");

					}

				},
				{
					"type": "view",
					"collectionName": "baocaodanhsachcaccosolaodongconguoilaodongmacbenhlaodong",
					"route": "baocaodanhsachcaccosolaodongconguoilaodongmacbenhlaodong/model(/:id)",
					"$ref": "app/baocao2/phuluc12/js/ModelView",
					"visible": function () {
						return false;
					}
				},
				{
					"text": "Báo cáo trường hợp người lao động mắc bệnh nghề nghiệp",
					"type": "view",
					"icon": "far fa-clipboard",
					"collectionName": "baocaotruonghopnguoilaodongmacbenhnghenghiep",
					"route": "baocaotruonghopnguoilaodongmacbenhnghenghiep/collection",
					"$ref": "app/baocao2/phuluc9/js/CollectionView",
					"visible": function () {
						return this.userHasRole("company");

					}

				},
				{
					"type": "view",
					"collectionName": "baocaotruonghopnguoilaodongmacbenhnghenghiep",
					"route": "baocaotruonghopnguoilaodongmacbenhnghenghiep/model(/:id)",
					"$ref": "app/baocao2/phuluc9/js/ModelView",
					"visible": function () {
						return false;
					}
				},

			],
			"visible": function () {
				return this.userHasRole("company");

			}
		},


		{
			"text": "Thông tư",
			"icon": "fa fa-home",
			"type": "category",

			// "visible": function(){
			// 	//console.log(this.checkHasRole("Admin"));
			// 	return this.checkHasRole("Admin") ;
			// },
			"entries": [
				{
					"text": "Quy định về công trình vệ sinh phúc lợi tại nơi làm việc",
					"icon": "far fa-clipboard",
					"type": "view",
					// "collectionName": "baocao",
					"route": "baocao/phuluc1/model",
					// "$ref": "app/baocao/phuluc7/js/ModelView",
					"visible": function () {
						return this.userHasRole("company");

					}
				},

				{
					"text": "Quy định về túi sơ cứu tại nơi làm việc",
					"icon": "far fa-clipboard",
					"type": "view",
					// "collectionName": "baocao",
					"route": "baocao/phuluc4/model",
					// "$ref": "app/baocao/phuluc7/js/ModelView",
					"visible": function () {
						return this.userHasRole("company");

					}
				},
				{
					"text": "Danh mục trang thiết bị của khu vực sơ cứu, cấp cứu",
					"icon": "far fa-clipboard",
					"type": "view",
					// "collectionName": "baocao",
					"route": "baocao/phuluc5/model",
					// "$ref": "app/baocao/phuluc7/js/ModelView",
					"visible": function () {
						return this.userHasRole("company");

					}
				},
				{
					"text": "Nội dung và thời gian huấn luyện về sơ cứu tại cơ sở lao động",
					"icon": "far fa-clipboard",
					"type": "view",
					// "collectionName": "baocao",
					"route": "baocao/phuluc6/model",
					// "$ref": "app/baocao/phuluc7/js/ModelView",
					"visible": function () {
						return this.userHasRole("company");

					}
				},





				{
					"text": "Khung chương trình đào tạo quan trắc môi trường lao động, bênh nghề nghiệp",
					"icon": "far fa-clipboard",
					"type": "view",
					// "collectionName": "baocao",
					"route": "baocao/phuluc12/model",
					// "$ref": "app/baocao/phuluc7/js/ModelView",
					"visible": function () {
						return this.userHasRole("company");

					}
				},
				{
					"text": "Nội dung khám chuyên khoa phát hiện bệnh nghề nghiệp trong danh mục bệnh nghề nghiệp được bảo hiểm",
					"icon": "far fa-clipboard",
					"type": "view",
					// "collectionName": "baocao",
					"route": "baocao2/phuluc4/model",
					// "$ref": "app/baocao2/phuluc7/js/ModelView",
					"visible": function () {
						return this.userHasRole("company");

					}
				},
				{
					"text": "Thời gian và nội dung khám định kỳ cho người lao động mắc bệnh nghề nghiệp",
					"icon": "far fa-clipboard",
					"type": "view",
					// "collectionName": "baocao",
					"route": "baocao2/phuluc6/model",
					// "$ref": "app/baocao2/phuluc7/js/ModelView",
					"visible": function () {
						return this.userHasRole("company");

					}
				},

			],
			"visible": function () {
				return this.userHasRole("company");

			}
		},

	];

});


