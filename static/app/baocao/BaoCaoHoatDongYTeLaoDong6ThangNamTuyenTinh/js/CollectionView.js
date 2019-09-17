define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');
    var template = require('text!app/baocao/BaoCaoHoatDongYTeLaoDong6ThangNamTuyenTinh/tpl/collection.html'),
		schema = require('json!schema/BaoCaoHoatDongYTeLaoDong6ThangNamSchema.json');
    return Gonrin.CollectionView.extend({
        template: template,
        modelSchema: schema,
        urlPrefix: "/api/v1/",
        collectionName: "baocaohoatdongytelaodong6thangnam",
        uiControl:{
            fields: [
                {
                    field: "donvibaocao", label: " đơn vị ", width: 250, readonly: true,
                },
                {
                    field: "baocaonam", label: " báo cáo năm ", width: 250, readonly: true,
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