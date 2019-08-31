define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');
    var template = require('text!app/baocao2/phuluc10/tpl/collection.html'),
	schema = require('json!schema/TongHopKetQuaDotKhamSucKhoePhatHienBenhNgheNghiepSchema.json');
    return Gonrin.CollectionView.extend({
        template: template,
        modelSchema: schema,
        urlPrefix: "/api/v1/",
        collectionName: "tonghopketquadotkhamsuckhoephathienbenhnghenghiep",
        uiControl:{
            fields: [
                {
                    field: "kinhgui", label: "Tên cơ sở lao động", width: 250, readonly: true,
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