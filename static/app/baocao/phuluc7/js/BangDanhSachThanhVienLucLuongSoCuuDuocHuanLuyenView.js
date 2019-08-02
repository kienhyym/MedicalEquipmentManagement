define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');
    var itemTemplate = require('text!app/baocao/phuluc7/tpl/bangdanhsachthanhvienlucluongsocuuduochuanluyen.html'),
        itemSchema = require('json!schema/BangDanhSachThanhVienLucLuongSoCuuDuocHuanLuyenSchema.json');

    return Gonrin.ItemView.extend({
        bindings: "dslucluong-bind",
        template: itemTemplate,
        tagName: 'tr',
        modelSchema: itemSchema,
        urlPrefix: "/api/v1/",
        collectionName: "bangdanhsachthanhvienlucluongsocuuduochuanluyen",
        foreignRemoteField: "id",
        foreignField: "sotheodoicongtachuanluyensocuucapcuutainoilamviec_id",

        uiControl: {
            fields: [
                {
					field: "hovaten",
					cssClass: false,
                },
                {
					field: "namsinhnam",
					cssClass: false,
                },
                {
					field: "namsinhnu",
					cssClass: false,
                },
                {
					field: "vitrilamviec",
					cssClass: false,
                },
                
            ]
        },
        render: function () {
            var self = this;
            self.applyBindings();
            self.registerEvent();
        
        },
        registerEvent: function () {
            const self = this;
            self.$el.find("#itemRemove").unbind("click").bind("click", function () {
                self.remove(true);
            });
        }
    });
});