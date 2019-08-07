define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');
    var template = require('text!app/baocao/phuluc9/tpl/collection.html'),
		schema = require('json!schema/BaoCaoHoatDongYTeLaoDong6ThangNamTuyenHuyenSchema.json');
    return Gonrin.CollectionView.extend({
        template: template,
        modelSchema: schema,
        urlPrefix: "/api/v1/",
        collectionName: "baocaohoatdongytelaodong6thangnamtuyenhuyen",
        uiControl:{
            fields: [
                {
                    field: "soyte", label: "Sở y tế", width: 250, readonly: true,
                },
                {
                    field: "trungtamyte", label: "Trung Tâm Y Tế", width: 250, readonly: true,
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