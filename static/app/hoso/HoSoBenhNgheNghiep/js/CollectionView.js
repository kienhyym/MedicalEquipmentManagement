define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');
    var template = require('text!app/hoso/HoSoBenhNgheNghiep/tpl/collection.html'),
	schema = require('json!schema/HoSoBenhNgheNghiepSchema.json');
    return Gonrin.CollectionView.extend({
        template: template,
        modelSchema: schema,
        urlPrefix: "/api/v1/",
        collectionName: "hosobenhnghenghiep",
        uiControl:{
            fields: [
                {
                    field: "hoso_so", label: "Hồ sơ số", width: 250, readonly: true,
                },
                {
                    field: "hotenbenhnhan", label: "Họ tên bệnh nhân", width: 250, readonly: true,
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
            return this;
        },
        
    });
});