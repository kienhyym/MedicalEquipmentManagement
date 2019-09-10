define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');

    var template = require('text!app/danhmuc/QuanHuyen/tpl/collection.html'),
        schema = require('json!schema/QuanHuyenSchema.json');

    return Gonrin.CollectionView.extend({
        template: template,
        modelSchema: schema,
        urlPrefix: "/api/v1/",
        collectionName: "quanhuyen",
        bindings:"data-quanhuyen-bind",
        uiControl: {
            fields: [
                { field: "ma", label: "Mã", width:250},
                { field: "ten", label: "Tên", width:250},
                {
                    field: "tinhthanh_id",
                    label: "Tỉnh thành",
                    foreign: "tinhthanh",
                    foreignValueField: "id",
                    foreignTextField: "ten",
                    width:250
                },

            ],
            pagination: {
            	page: 1,
            	pageSize: 100
            },
            onRowClick: function (event) {
                if (event.rowId) {
                    var path = this.collectionName + '/model?id=' + event.rowId;
                    this.getApp().getRouter().navigate(path);
                }
            }
        },
        render: function () {
        	var self = this;
        	var currentUser = this.getApp().currentUser;
            if (currentUser!==null && currentUser!== undefined && this.getApp().data("tinhthanh_id") !== null &&  currentUser.donvi.tuyendonvi_id>=2 && currentUser.donvi.tuyendonvi_id!==10) {
                this.uiControl.filters = { "tinhthanh_id": { "$eq": this.getApp().data("tinhthanh_id") } };
            }
            self.uiControl.orderBy = [{"field": "ten", "direction": "desc"}];
            this.applyBindings();
            return this;
        }
    });
});