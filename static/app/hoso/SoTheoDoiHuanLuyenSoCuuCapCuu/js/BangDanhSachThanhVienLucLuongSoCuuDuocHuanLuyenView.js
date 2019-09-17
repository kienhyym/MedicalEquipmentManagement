define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');
    var itemTemplate = require('text!app/hoso/SoTheoDoiHuanLuyenSoCuuCapCuu/tpl/bangdanhsachthanhvienlucluongsocuuduochuanluyen.html'),
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


        render: function () {
            var self = this;
            self.applyBindings();
            self.registerEvent();
            if(!self.model.get("id")){
                self.model.set("id", gonrin.uuid())
            }
        
        },
        registerEvent: function () {
            const self = this;
            self.$el.find("#itemRemove").unbind("click").bind("click", function () {
                self.remove(true);
            });
        }
    });
});