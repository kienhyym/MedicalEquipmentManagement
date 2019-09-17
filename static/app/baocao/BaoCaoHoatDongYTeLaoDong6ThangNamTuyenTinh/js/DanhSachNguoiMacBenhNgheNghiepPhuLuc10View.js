define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');
    var itemTemplate = require('text!app/baocao/BaoCaoHoatDongYTeLaoDong6ThangNamTuyenTinh/tpl/danhsachnguoimacbenhnghenghiepphuluc10.html'),
        itemSchema = require('json!schema/DanhSachNguoiMacBenhNgheNghiepPhuLuc10Schema.json');

    return Gonrin.ItemView.extend({
        bindings: "danhsachnguoimacbenhnghenghiepphuluc10-bind",
        template: itemTemplate,
        tagName: 'tr',
        modelSchema: itemSchema,
        urlPrefix: "/api/v1/",
        collectionName: "danhsachnguoimacbenhnghenghiepphuluc10",
        foreignRemoteField: "id",
        foreignField: "baocaohoatdongytelaodong6thangnam_id",
        uiControl:{
            fields:[
                {
					field: "ngay_phathienbenh",
					uicontrol: "datetimepicker",
					textFormat: "DD/MM/YYYY",
					extraFormats: ["DDMMYYYY"],
					parseInputDate: function (val) {
						return moment.unix(val)
					},
					parseOutputDate: function (date) {
						return date.unix()
					}
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