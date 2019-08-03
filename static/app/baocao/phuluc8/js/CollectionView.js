define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');
    var template = require('text!app/baocao/phuluc8/tpl/collection.html'),
		schema = require('json!schema/BaoCaoYTeLaoDongCuaCoSoLaoDongSchema.json');
    return Gonrin.CollectionView.extend({
        template: template,
        modelSchema: schema,
        urlPrefix: "/api/v1/",
        collectionName: "baocaoytelaodongcuacosolaodong",
        uiControl:{
            fields: [
                {
                    field: "donvibaocao", label: "Đơn vị báo cáo", width: 250, readonly: true,
                },
                {
                    field: "nam", label: "Năm", width: 250, readonly: true,
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