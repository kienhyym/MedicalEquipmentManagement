define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');

    var template = require('text!app/chitietthietbi/tpl/collection.html'),
		schema = require('json!schema/ChiTietThietBiSchema.json');

    return Gonrin.CollectionView.extend({
        template: template,
        modelSchema: schema,
        urlPrefix: "/api/v1/",
        collectionName: "chitietthietbi",
        uiControl:{
            fields: [
                {
                    field: "tenthietbi", label: "Tên thiết bị", width: 250, readonly: true,
                },
                {
                    field: "model_serial_number", label: "Serial", width: 250, readonly: true,
                },
                {
                    field: "nhanhieu", label: "Nhãn hiệu", width: 250, readonly: true,
                },
                {
                    field: "made_in", label: "Nơi sản xuất", width: 250, readonly: true,
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