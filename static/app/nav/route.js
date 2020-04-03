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
			"collectionName": "department",
			"route": "department/collection",
			"$ref": "app/hethong/department/view/CollectionView",
		},
		{
			"collectionName": "department",
			"route": "department/model(/:id)",
			"$ref": "app/hethong/department/view/ModelView",
		},


		{
			"collectionName": "room",
			"route": "room/collection",
			"$ref": "app/hethong/room/view/CollectionView",
		},
		{
			"collectionName": "room",
			"route": "room/model(/:id)",
			"$ref": "app/hethong/room/view/ModelView",
		},





		{
			"collectionName": "rank",
			"route": "rank/collection",
			"$ref": "app/hethong/rank/js/CollectionView",
		},
		{
			"collectionName": "rank",
			"route": "rank/model(/:id)",
			"$ref": "app/hethong/rank/js/ModelView",
		},
		{
			"collectionName": "organization",
			"route": "organization/collection",
			"$ref": "app/danhmuc/organization/js/CollectionView",
		},
		{
			"collectionName": "organization",
			"route": "organization/model(/:id)",
			"$ref": "app/danhmuc/organization/js/ModelView",
		},
		{
			"collectionName": "medicalequipment",
			"route": "medicalequipment/collection",
			"$ref": "app/danhmuc/medicalequipment/js/CollectionView",
		},
		{
			"collectionName": "medicalequipment",
			"route": "medicalequipment/model(/:id)",
			"$ref": "app/danhmuc/medicalequipment/js/ModelView",
		},

		{
			"collectionName": "preparationtools",
			"route": "preparationtools/collection",
			"$ref": "app/danhmuc/preparationtools/view/CollectionView",
		},
		{
			"collectionName": "preparationtools",
			"route": "preparationtools/model(/:id)",
			"$ref": "app/danhmuc/preparationtools/view/ModelView",
		},

		{
			"collectionName": "equipmentdetails",
			"route": "equipmentdetails/collection",
			"$ref": "app/equipmentdetails/js/CollectionView",
		},
		{
			"collectionName": "equipmentdetails",
			"route": "equipmentdetails/model(/:id)",
			"$ref": "app/equipmentdetails/js/ModelView",
		},
		{
			"collectionName": "equipmentinspectionform",
			"route": "equipmentinspectionform/collection",
			"$ref": "app/chungtu/equipmentinspectionform/js/CollectionView",
		},
		{
			"collectionName": "equipmentinspectionform",
			"route": "equipmentinspectionform/model(/:id)",
			"$ref": "app/chungtu/equipmentinspectionform/js/ModelView",
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
			"collectionName": "devicestatusverificationform",
			"route": "devicestatusverificationform/collection",
			"$ref": "app/chungtu/devicestatusverificationform/js/CollectionView",
		},
		{
			"collectionName": "devicestatusverificationform",
			"route": "devicestatusverificationform/model(/:id)",
			"$ref": "app/chungtu/devicestatusverificationform/js/ModelView",
		},

		{
			"collectionName": "repairrequestform",
			"route": "repairrequestform/collection",
			"$ref": "app/chungtu/repairrequestform/js/CollectionView",
		},
		{
			"collectionName": "repairrequestform",
			"route": "repairrequestform/model(/:id)",
			"$ref": "app/chungtu/repairrequestform/js/ModelView",
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
			"collectionName": "manufacturer",
			"route": "manufacturer/collection",
			"$ref": "app/danhmuc/manufacturer/view/CollectionView",
		},
		{
			"collectionName": "manufacturer",
			"route": "manufacturer/model(/:id)",
			"$ref": "app/danhmuc/manufacturer/view/ModelView",
		},
		{
			"collectionName": "nation",
			"route": "nation/collection",
			"$ref": "app/danhmuc/Nation/view/CollectionView",
		},
		{
			"collectionName": "nation",
			"route": "nation/model(/:id)",
			"$ref": "app/danhmuc/Nation/view/ModelView",
		},

		{
			"collectionName": "province",
			"route": "province/collection",
			"$ref": "app/danhmuc/Province/view/CollectionView",
		},
		{
			"collectionName": "province",
			"route": "province/model(/:id)",
			"$ref": "app/danhmuc/Province/view/ModelView",
		},

		{
			"collectionName": "district",
			"route": "district/collection",
			"$ref": "app/danhmuc/District/view/CollectionView",
		},
		{
			"collectionName": "district",
			"route": "district/model(/:id)",
			"$ref": "app/danhmuc/District/view/ModelView",
		},

		{
			"collectionName": "wards",
			"route": "wards/collection",
			"$ref": "app/danhmuc/Wards/view/CollectionView",
		},
		{
			"collectionName": "wards",
			"route": "wards/model(/:id)",
			"$ref": "app/danhmuc/Wards/view/ModelView",
		},

		{
			"collectionName": "certificateform",
			"route": "certificateform/collection",
			"$ref": "app/chungtu/certificateform/js/CollectionView",
		},
		{
			"collectionName": "certificateform",
			"route": "certificateform/model(/:id)",
			"$ref": "app/chungtu/certificateform/js/ModelView",
		},
		{

			"collectionName": "thietbiduockiemtra",
			"route": "lichthanhtra/collection",
			"$ref": "app/lichthanhtra/view/ModelView",

		},
		{
			"collectionName": "item",
			"route": "item/collection",
			"$ref": "app/item/view/CollectionView",
		},
		{
			"collectionName": "item",
			"route": "item/model(/:id)",
			"$ref": "app/item/view/ModelView",
		},

		{
			"collectionName": "purchaseorder",
			"route": "purchaseorder/collection",
			"$ref": "app/purchaseorder/view/CollectionView",
		},
		{
			"collectionName": "purchaseorder",
			"route": "purchaseorder/model(/:id)",
			"$ref": "app/purchaseorder/view/ModelView",
		},


		{
			"collectionName": "contact",
			"route": "contact/collection",
			"$ref": "app/contact/view/CollectionView",
		},
		{
			"collectionName": "contact",
			"route": "contact/model(/:id)",
			"$ref": "app/contact/view/ModelView",
		},

		{
			"collectionName": "goodsreciept",
			"route": "goodsreciept/collection",
			"$ref": "app/goods-reciept/view/CollectionView",
		},
		{
			"collectionName": "goodsreciept",
			"route": "goodsreciept/model(/:id)",
			"$ref": "app/goods-reciept/view/ModelView",
		},

		{
			"collectionName": "warehouse",
			"route": "warehouse/collection",
			"$ref": "app/warehouse/view/CollectionView",
		},
		{
			"collectionName": "warehouse",
			"route": "warehouse/model(/:id)",
			"$ref": "app/warehouse/view/ModelView",
		},

		{
			"collectionName": "currency",
			"route": "currency/collection",
			"$ref": "app/currency/view/CollectionView",
		},
		{
			"collectionName": "currency",
			"route": "currency/model(/:id)",
			"$ref": "app/currency/view/ModelView",
		},

		{
			"collectionName": "organization",
			"route": "organization/collection",
			"$ref": "app/organization/view/CollectionView",
		},
		{
			"collectionName": "organization",
			"route": "organization/model(/:id)",
			"$ref": "app/organization/view/ModelView",
		},
	];

});


