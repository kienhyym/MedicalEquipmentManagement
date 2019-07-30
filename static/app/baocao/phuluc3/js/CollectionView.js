define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');
    var template = require('text!app/baocao/phuluc3/tpl/collection.html'),
		schema = require('json!schema/HSCCTaiNanLaoDongTaiCoSoLaoDongSchema.json');
    return Gonrin.CollectionView.extend({
        template: template,
        modelSchema: schema,
        urlPrefix: "/api/v1/",
        collectionName: "hscctainanlaodongtaicosolaodong",
        uiControl:{
            fields: [
                {
                    field: "tencosolaodong", label: "Tên cơ sở lao động", width: 250, readonly: true,
                },
                {
                    field: "nganhchuquan", label: "Ngành chủ quản", width: 250, readonly: true,
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