define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');

    var template = require('text!app/bangkiemtrathietbi/tpl/collection.html'),
		schema = require('json!schema/BangKiemTraThietBiSchema.json');

    return Gonrin.CollectionView.extend({
        template: template,
        modelSchema: schema,
        urlPrefix: "/api/v1/",
        collectionName: "bangkiemtrathietbi",
        uiControl:{
            fields: [
                {
                    field: "tenthietbi", label: "Tên thiết bị", width: 250, readonly: true,
                },
                {
                    field: "ngay", label: "Ngày kiểm tra", width: 250, readonly: true,
                },
                {
                    field: "tinhtrang", label: "Tình trạng", width: 250, readonly: true,
                },
                {
                    field: "mota", label: "Mô tả tình trạng", width: 250, readonly: true,
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