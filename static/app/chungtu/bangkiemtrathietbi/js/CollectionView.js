define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');

    var template = require('text!app/chungtu/bangkiemtrathietbi/tpl/collection.html'),
		schema = require('json!schema/BangKiemTraThietBiSchema.json');

    return Gonrin.CollectionView.extend({
        template: template,
        modelSchema: schema,
        urlPrefix: "/api/v1/",
        collectionName: "bangkiemtrathietbi",
        uiControl:{
            fields: [
                {
                    field: "tenthietbi", label: "Tên thiết bị", width: 250, readonly: true,
                },
                {
                    field: "ngay", label: "Ngày viết",
                    template: function (rowData) {
                        if (!!rowData && rowData.ngay) {
                    
                            var utcTolocal = function (times, format) {
                                return moment(times * 1000).local().format(format);
                            }
                            // return template_helper.datetimeFormat(rowData.ngaythanhtra, "DD/MM/YYYY");
                            return utcTolocal(rowData.ngay, "DD/MM/YYYY");
                        }
                        return "";
                    },
                    width: 150, 
                },
                {
                    field: "tinhtrang", label: "Tình trạng", width: 250, readonly: true,
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