define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');
    var template = require('text!app/baocao2/phuluc3/tpl/collection.html'),
	schema = require('json!schema/SoKhamSucKhoePhatHienBenhNgheNghiepSchema.json');
    return Gonrin.CollectionView.extend({
        template: template,
        modelSchema: schema,
        urlPrefix: "/api/v1/",
        collectionName: "sokhamsuckhoephathienbenhnghenghiep",
        uiControl:{
            fields: [
                {
                    field: "hoten", label: "Họ và tên", width: 250, readonly: true,
                },
                {
                    field: "congviec_hientai", label: "công việc hiện tại", width: 250, readonly: true,
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