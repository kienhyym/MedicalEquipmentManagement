define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');

    var template = require('text!app/users/tpl/collection.html'),
		schema = require('json!schema/UsersSchema.json');

    return Gonrin.CollectionView.extend({
        template: template,
        modelSchema: schema,
        urlPrefix: "/api/v1/",
        collectionName: "users",
        uiControl:{
            fields: [
                {
                    field: "id", label: "ID", width: 250, readonly: true,
                },
                {
                    field: "fullname", label: "Tên", width: 250, readonly: true,
                },
                {
                    field: "email", label: "Email", width: 250, readonly: true,
                },
                {
                    field: "phone", label: "Số điện thoại", width: 250, readonly: true,
                },
                {
                    field: "password", label: "pass", width: 250, readonly: true,
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