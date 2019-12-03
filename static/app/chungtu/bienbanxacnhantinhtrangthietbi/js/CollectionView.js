define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');

    var template = require('text!app/chungtu/bienbanxacnhantinhtrangthietbi/tpl/collection.html'),
		schema = require('json!schema/BienBanXacNhanTinhTrangThietBiSchema.json');

    return Gonrin.CollectionView.extend({
        template: template,
        modelSchema: schema,
        urlPrefix: "/api/v1/",
        collectionName: "bienbanxacnhantinhtrangthietbi",
        uiControl:{
            fields: [
                {
                    field: "tenthietbi", label: "Tên thiết bị", width: 350, readonly: true,
                },
                {
                    field: "model_serial_number", label: "Serial", width: 100, readonly: true,
                },
                {
                    field: "ma_qltb", label: "Mã QLTB", width: 150, readonly: true,
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
                    field: "ketquakiemtra", label: "Kết qủa kiểm tra", readonly: true,
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