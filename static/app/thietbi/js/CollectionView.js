define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');

    var template = require('text!app/thietbi/tpl/collection.html'),
		schema = require('json!schema/ThietBiSchema.json');

    return Gonrin.CollectionView.extend({
        template: template,
        modelSchema: schema,
        urlPrefix: "/api/v1/",
        collectionName: "thietbi",
        uiControl:{
            fields: [
                {
                    field: "stt",
                    label: "STT",
                    width: "30px",
                },
                {
                    field: "ten", label: "Tên", width: 150, readonly: true,
                },
                {
                    field: "soluong", label: "Số lượng", width: 50, readonly: true,
                },
                {
                    field: "congdung", label: "Công dụng", width: 350, readonly: true,
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