define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');
    var itemTemplate = require('text!app/baocao/phuluc7/tpl/giangvienthuchienhuanluyen.html'),
        itemSchema = require('json!schema/GiangVienThucHienHuanLuyenSchema.json');

    return Gonrin.ItemView.extend({
        bindings: "giangvien-bind",
        template: itemTemplate,
        tagName: 'div',
        modelSchema: itemSchema,
        urlPrefix: "/api/v1/",
        collectionName: "giangvienthuchienhuanluyen",
        foreignRemoteField: "id",
        foreignField: "sotheodoicongtachuanluyensocuucapcuutainoilamviec_id",

        uiControl: {
            fields: [
                {
					field: "ten",
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