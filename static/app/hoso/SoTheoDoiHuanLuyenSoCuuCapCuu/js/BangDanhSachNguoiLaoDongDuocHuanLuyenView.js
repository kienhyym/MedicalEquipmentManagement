define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');
    var itemTemplate = require('text!app/hoso/SoTheoDoiHuanLuyenSoCuuCapCuu/tpl/bangdanhsachnguoilaodongduochuanluyen.html'),
        itemSchema = require('json!schema/BangDanhSachNguoiLaoDongDuocHuanLuyenSchema.json');

    return Gonrin.ItemView.extend({
        bindings: "dslaodonghuanluyen-bind",
        template: itemTemplate,
        tagName: 'tr',
        modelSchema: itemSchema,
        urlPrefix: "/api/v1/",
        collectionName: "bangdanhsachnguoilaodongduochuanluyen",
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