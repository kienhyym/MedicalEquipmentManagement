define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');
    var template = require('text!app/hoso/giaykhamsuckhoedungchonguoitudu18tuoi/tpl/collection.html'),
	schema = require('json!schema/GiayKhamSucKhoeDungChoNguoiTudu18TuoiSchema.json');
    return Gonrin.CollectionView.extend({
        template: template,
        modelSchema: schema,
        urlPrefix: "/api/v1/",
        collectionName: "giaykhamsuckhoedungchonguoitudu18tuoi",
        uiControl:{
            fields: [
                {
                    field: "hovaten", label: "Tên lao động", width: 250, readonly: true,
                },
                {
                    field: "tuoi", label: "Tuổi", width: 250, readonly: true,
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