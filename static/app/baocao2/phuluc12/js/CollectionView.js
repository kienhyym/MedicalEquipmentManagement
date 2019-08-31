define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');
    var template = require('text!app/baocao2/phuluc12/tpl/collection.html'),
	schema = require('json!schema/BaoCaoDanhSachCacCoSoLaoDongCoNguoiLaoDongMacBenhNgheNgiepSchema.json');
    return Gonrin.CollectionView.extend({
        template: template,
        modelSchema: schema,
        urlPrefix: "/api/v1/",
        collectionName: "baocaodanhsachcaccosolaodongconguoilaodongmacbenhlaodong",
        uiControl:{
            fields: [
                {
                    field: "kinhgui", label: "Kính gửi", width: 250, readonly: true,
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