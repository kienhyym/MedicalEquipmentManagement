define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');
    var template = require('text!app/baocao2/phuluc1/tpl/collection.html'),
	schema = require('json!schema/GiayGioiThieuSchema.json');
    return Gonrin.CollectionView.extend({
        template: template,
        modelSchema: schema,
        urlPrefix: "/api/v1/",
        collectionName: "giaygioithieu",
        uiControl:{
            fields: [
                {
                    field: "ten_coquan_gioithieu", label: "Tên cơ quan giới thiệu", width: 250, readonly: true,
                },
                {
                    field: "gioithieu_ong_ba", label: "Giới thiệu ông bà", width: 250, readonly: true,
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