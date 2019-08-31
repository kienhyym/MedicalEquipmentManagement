define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');
    var template = require('text!app/baocao2/phuluc8/tpl/collection.html'),
	schema = require('json!schema/BienBanHoiChanBenhNgheNghiepSchema.json');
    return Gonrin.CollectionView.extend({
        template: template,
        modelSchema: schema,
        urlPrefix: "/api/v1/",
        collectionName: "bienbanhoichanbenhnghenghiep",
        uiControl:{
            fields: [
                {
                    field: "chutichhoidong_ten", label: "Tên chủ tịch", width: 250, readonly: true,
                },
                {
                    field: "chutichhoidong_chucvu", label: "Chức vụ", width: 250, readonly: true,
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