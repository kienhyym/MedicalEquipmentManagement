define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');
    var template = require('text!app/baocao/BaoCaoTruongHopNguoiLaoDongMacBNN/tpl/collection.html'),
	schema = require('json!schema/BaoCaoTruongHopNguoiLaoDongMacBenhNgheNghiepSchema.json');
    return Gonrin.CollectionView.extend({
        template: template,
        modelSchema: schema,
        urlPrefix: "/api/v1/",
        collectionName: "baocaotruonghopnguoilaodongmacbenhnghenghiep",
        uiControl:{
            fields: [
                {
                    field: "truonghopmacbenhnghenghiep_ten", label: "Tên trường hợp mắc bệnh", width: 250, readonly: true,
                },
                {
                    field: "truonghopmacbenhnghenghiep_tenbenh", label: "Tên bệnh", width: 250, readonly: true,
                },
            ],
            onRowClick: function (event) {
                if (event.rowId) {
                    var path =  this.collectionName + '/model?id=' + event.rowId;
                    this.getApp().getRouter().navigate(path);
                }
            }
        },
        render: function () {
            
            this.applyBindings();   
            console.log(this);
            return this;
        },
        
    });
});