define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');
    var template = require('text!app/hoso/BienBanXacNhanTiepXucYeuToCoHai/tpl/collection.html'),
	schema = require('json!schema/BienBanXacNhanTiepXucYeuToCoHaiGayBenhNgheNghiepSchema.json');
    return Gonrin.CollectionView.extend({
        template: template,
        modelSchema: schema,
        urlPrefix: "/api/v1/",
        collectionName: "bienbanxacnhantiepxucyeutocohaigaybenhnghenghiep",
        uiControl:{
            fields: [
                {
                    field: "hoten", label: "Tên cơ quan giới thiệu", width: 250, readonly: true,
                },
                {
                    field: "tuoi", label: "Tuổi", width: 250, readonly: true,
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