define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');

    var template = require('text!app/hethong/user/tpl/collection.html'),
		schema = require('json!schema/UserSchema.json');

    return Gonrin.CollectionView.extend({
        template: template,
        modelSchema: schema,
        urlPrefix: "/api/v1/",
        collectionName: "user",
        uiControl:{
            fields: [
                {
                    field: "stt",
                    label: "STT",
                    width: "30px",
                },
                {
                    field: "name", label: "Tên", width: 250, readonly: true,
                },
                {
                    field: "email", label: "Email", width: 250, readonly: true,
                },
                {
                    field: "phone_number", label: "Số điện thoại", width: 250, readonly: true,
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