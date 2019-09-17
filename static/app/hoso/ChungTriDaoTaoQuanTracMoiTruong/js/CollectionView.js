define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');
    var template = require('text!app/hoso/ChungTriDaoTaoQuanTracMoiTruong/tpl/collection.html'),
		schema = require('json!schema/ChungChiDaoTaoVeQuanTracMoiTruongLaoDongSchema.json');
    return Gonrin.CollectionView.extend({
        template: template,
        modelSchema: schema,
        urlPrefix: "/api/v1/",
        collectionName: "chungchidaotaovequantracmoitruonglaodong",
        uiControl:{
            fields: [
                {
                    field: "chungnhanongba", label: "ông bà", width: 250, readonly: true,
                },
                {
                    field: "diachi", label: "địa chỉ", width: 250, readonly: true,
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