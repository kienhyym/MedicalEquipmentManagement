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

			"route": "thongtu/QuyDinhVeCongTrinhVeSinh/model",
			"$ref": "app/thongtu/QuyDinhVeCongTrinhVeSinh/js/ModelView",
		},
		{
			"collectionName": "hsqlsuckhoevabenhtatnguoilaodong",
			"route": "hsqlsuckhoevabenhtatnguoilaodong/collection",
			"$ref": "app/hoso/HoSoSucKhoeVaBenhTat/js/CollectionView",
		},
		{
			"collectionName": "hsqlsuckhoevabenhtatnguoilaodong",
			"route": "hsqlsuckhoevabenhtatnguoilaodong/model(/:id)",
			"$ref": "app/hoso/HoSoSucKhoeVaBenhTat/js/ModelView",
		},

		{
			"collectionName": "hscctainanlaodongtaicosolaodong",
			"route": "hscctainanlaodongtaicosolaodong/collection",
			"$ref": "app/hoso/HoSoCapCuuTaiNan/js/CollectionView",
		},
		{
			"collectionName": "hscctainanlaodongtaicosolaodong",
			"route": "hscctainanlaodongtaicosolaodong/model(/:id)",
			"$ref": "app/hoso/HoSoCapCuuTaiNan/js/ModelView",
		},


		{

			"route": "thongtu/QuyDinhVeTuiSoCuu/model",
			"$ref": "app/thongtu/QuyDinhVeTuiSoCuu/js/ModelView",
		},
		{

			"route": "thongtu/TrangThietBiKhuVucSoCuuCapCuu/model",
			"$ref": "app/thongtu/TrangThietBiKhuVucSoCuuCapCuu/js/ModelView",
		},
		{

			"route": "thongtu/NoiDungVaThoiGianHuanLuyenSoCuu/model",
			"$ref": "app/thongtu/NoiDungVaThoiGianHuanLuyenSoCuu/js/ModelView",
		},
		{

			"collectionName": "sotheodoicongtachuanluyensocuucapcuutainoilamviec",
			"route": "sotheodoicongtachuanluyensocuucapcuutainoilamviec/collection",
			"$ref": "app/hoso/SoTheoDoiHuanLuyenSoCuuCapCuu/js/CollectionView",
		},
		{

			"collectionName": "sotheodoicongtachuanluyensocuucapcuutainoilamviec",
			"route": "sotheodoicongtachuanluyensocuucapcuutainoilamviec/model(/:id)",
			"$ref": "app/hoso/SoTheoDoiHuanLuyenSoCuuCapCuu/js/ModelView",
		},
		{

			"collectionName": "baocaoytelaodongcuacosolaodong",
			"route": "baocaoytelaodongcuacosolaodong/collection",
			"$ref": "app/baocao/BaoCaoYTeLaoDongCuaCoSoLaoDong/js/CollectionView",
		},
		{

			"collectionName": "baocaoytelaodongcuacosolaodong",
			"route": "baocaoytelaodongcuacosolaodong/model(/:id)",
			"$ref": "app/baocao/BaoCaoYTeLaoDongCuaCoSoLaoDong/js/ModelView",
		},
		{

			"collectionName": "baocaohoatdongytelaodong6thangnamtuyenhuyen",
			"route": "baocaohoatdongytelaodong6thangnamtuyenhuyen/collection",
			"$ref": "app/baocao/BaoCaoHoatDongYTeLaoDong6ThangNamTuyenHuyen/js/CollectionView",
		},
		{

			"collectionName": "baocaohoatdongytelaodong6thangnamtuyenhuyen",
			"route": "baocaohoatdongytelaodong6thangnamtuyenhuyen/model(/:id)",
			"$ref": "app/baocao/BaoCaoHoatDongYTeLaoDong6ThangNamTuyenHuyen/js/ModelView",
		},
		{

			"collectionName": "baocaohoatdongytelaodong6thangnam",
			"route": "baocaohoatdongytelaodong6thangnam/collection",
			"$ref": "app/baocao/BaoCaoHoatDongYTeLaoDong6ThangNamTuyenTinh/js/CollectionView",
		},
		{

			"collectionName": "baocaohoatdongytelaodong6thangnam",
			"route": "baocaohoatdongytelaodong6thangnam/model(/:id)",
			"$ref": "app/baocao/BaoCaoHoatDongYTeLaoDong6ThangNamTuyenTinh/js/ModelView",
		},
		{

			"collectionName": "chungchidaotaovebaocaotochucdudieukienquantracmoitruonglaodongduoccongboquantracmoitruonglaodong",
			"route": "baocaotochucdudieukienquantracmoitruonglaodongduoccongbo/collection",
			"$ref": "app/baocao/BaoCaoToChucDuDieuKienQuanTracMTLD/js/CollectionView",
		},
		{

			"collectionName": "baocaotochucdudieukienquantracmoitruonglaodongduoccongbo",
			"route": "baocaotochucdudieukienquantracmoitruonglaodongduoccongbo/model(/:id)",
			"$ref": "app/baocao/BaoCaoToChucDuDieuKienQuanTracMTLD/js/ModelView",
		},
		{

			"route": "thongtu/KhungChuongTrinhDaoTao/model",
			"$ref": "app/thongtu/KhungChuongTrinhDaoTao/js/ModelView",
		},
		{

			"collectionName": "chungchidaotaovequantracmoitruonglaodong",
			"route": "chungchidaotaovequantracmoitruonglaodong/collection",
			"$ref": "app/hoso/ChungTriDaoTaoQuanTracMoiTruong/js/CollectionView",
		},
		{

			"collectionName": "chungchidaotaovequantracmoitruonglaodong",
			"route": "chungchidaotaovequantracmoitruonglaodong/model(/:id)",
			"$ref": "app/hoso/ChungTriDaoTaoQuanTracMoiTruong/js/ModelView",
		},
		{

			"collectionName": "sokhamsuckhoedinhkycuanguoilaixeoto",
			"route": "sokhamsuckhoedinhkycuanguoilaixeoto/collection",
			"$ref": "app/hoso/SoKhamDInhKyNguoiLaiXeOTo/js/CollectionView",
		},
		{

			"collectionName": "sokhamsuckhoedinhkycuanguoilaixeoto",
			"route": "sokhamsuckhoedinhkycuanguoilaixeoto/model(/:id)",
			"$ref": "app/hoso/SoKhamDInhKyNguoiLaiXeOTo/js/ModelView",
		},
		{

			"collectionName": "giaygioithieu",
			"route": "giaygioithieu/collection",
			"$ref": "app/hoso/GiayGioiThieu/js/CollectionView",
		},
		{

			"collectionName": "giaygioithieu",
			"route": "giaygioithieu/model(/:id)",
			"$ref": "app/hoso/GiayGioiThieu/js/ModelView",
		},


		{
			"collectionName": "phieukhamsuckhoetruockhibotrilamviec",
			"route": "phieukhamsuckhoetruockhibotrilamviec/collection",
			"$ref": "app/hoso/PhieuKhamSucKhoeTruocKhiBoTriLamViec/js/CollectionView",
		},
		{
			"collectionName": "phieukhamsuckhoetruockhibotrilamviec",
			"route": "phieukhamsuckhoetruockhibotrilamviec/model(/:id)",
			"$ref": "app/hoso/PhieuKhamSucKhoeTruocKhiBoTriLamViec/js/ModelView",
		},

		{
			"collectionName": "sokhamsuckhoephathienbenhnghenghiep",
			"route": "sokhamsuckhoephathienbenhnghenghiep/collection",
			"$ref": "app/hoso/SoKhamPhatHienBNN/js/CollectionView",
		},
		{
			"collectionName": "sokhamsuckhoephathienbenhnghenghiep",
			"route": "sokhamsuckhoephathienbenhnghenghiep/model(/:id)",
			"$ref": "app/hoso/SoKhamPhatHienBNN/js/ModelView",
		},
		{

			"route": "thongtu/NoiDungKhamChuyenKhoa/model",
			"$ref": "app/thongtu/NoiDungKhamChuyenKhoa/js/ModelView",
		},
		{
			"collectionName": "bienbanxacnhantiepxucyeutocohaigaybenhnghenghiep",
			"route": "bienbanxacnhantiepxucyeutocohaigaybenhnghenghiep/collection",
			"$ref": "app/hoso/BienBanXacNhanTiepXucYeuToCoHai/js/CollectionView",
		},
		{
			"collectionName": "bienbanxacnhantiepxucyeutocohaigaybenhnghenghiep",
			"route": "bienbanxacnhantiepxucyeutocohaigaybenhnghenghiep/model(/:id)",
			"$ref": "app/hoso/BienBanXacNhanTiepXucYeuToCoHai/js/ModelView",
		},


		{

			"route": "thongtu/ThoiGianVaNoiDungKhamDinhKyNLDMacBNN/model",
			"$ref": "app/thongtu/ThoiGianVaNoiDungKhamDinhKyNLDMacBNN/js/ModelView",
		},

		{
			"collectionName": "hosobenhnghenghiep",
			"route": "hosobenhnghenghiep/collection",
			"$ref": "app/hoso/HoSoBenhNgheNghiep/js/CollectionView",
		},
		{
			"collectionName": "hosobenhnghenghiep",
			"route": "hosobenhnghenghiep/model(/:id)",
			"$ref": "app/hoso/HoSoBenhNgheNghiep/js/ModelView",
		},

		{
			"collectionName": "bienbanhoichanbenhnghenghiep",
			"route": "bienbanhoichanbenhnghenghiep/collection",
			"$ref": "app/hoso/BienBanHoiChanBNN/js/CollectionView",
		},
		{
			"collectionName": "bienbanhoichanbenhnghenghiep",
			"route": "bienbanhoichanbenhnghenghiep/model(/:id)",
			"$ref": "app/hoso/BienBanHoiChanBNN/js/ModelView",
		},
		{
			"collectionName": "baocaotruonghopnguoilaodongmacbenhnghenghiep",
			"route": "baocaotruonghopnguoilaodongmacbenhnghenghiep/collection",
			"$ref": "app/baocao/BaoCaoTruongHopNguoiLaoDongMacBNN/js/CollectionView",
		},
		{
			"collectionName": "baocaotruonghopnguoilaodongmacbenhnghenghiep",
			"route": "baocaotruonghopnguoilaodongmacbenhnghenghiep/model(/:id)",
			"$ref": "app/baocao/BaoCaoTruongHopNguoiLaoDongMacBNN/js/ModelView",
		},
		{
			"collectionName": "tonghopketquadotkhamsuckhoephathienbenhnghenghiep",
			"route": "tonghopketquadotkhamsuckhoephathienbenhnghenghiep/collection",
			"$ref": "app/hoso/TongHopKetQuaDotKhamPhatHienBNN/js/CollectionView",
		},
		{
			"collectionName": "tonghopketquadotkhamsuckhoephathienbenhnghenghiep",
			"route": "tonghopketquadotkhamsuckhoephathienbenhnghenghiep/model(/:id)",
			"$ref": "app/hoso/TongHopKetQuaDotKhamPhatHienBNN/js/ModelView",
		},
		{
			"collectionName": "tonghopketquakhamdinhkynguoimacbenhnghenghiep",
			"route": "tonghopketquakhamdinhkynguoimacbenhnghenghiep/collection",
			"$ref": "app/hoso/TongHopKetQuaKhamDinhKyNguoiMacBNN/js/CollectionView",
		},
		{
			"collectionName": "tonghopketquakhamdinhkynguoimacbenhnghenghiep",
			"route": "tonghopketquakhamdinhkynguoimacbenhnghenghiep/model(/:id)",
			"$ref": "app/hoso/TongHopKetQuaKhamDinhKyNguoiMacBNN/js/ModelView",
		},
		{
			"collectionName": "baocaodanhsachcaccosolaodongconguoilaodongmacbenhlaodong",
			"route": "baocaodanhsachcaccosolaodongconguoilaodongmacbenhlaodong/collection",
			"$ref": "app/baocao/DanhSachCacCoSoLaoDongCoNguoiLaoDongMacBNN/js/CollectionView",
		},
		{
			"collectionName": "baocaodanhsachcaccosolaodongconguoilaodongmacbenhlaodong",
			"route": "baocaodanhsachcaccosolaodongconguoilaodongmacbenhlaodong/model(/:id)",
			"$ref": "app/baocao/DanhSachCacCoSoLaoDongCoNguoiLaoDongMacBNN/js/ModelView",
		},
	];

});


