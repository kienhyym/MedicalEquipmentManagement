define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');
    var itemTemplate = require('text!app/baocao/phuluc2/tpl/bangsotruonghopmaccacloaibenhthongthuong.html'),
        itemSchema = require('json!schema/BangSoTruongHopMacCacLoaiBenhThongThuongSchema.json');

    return Gonrin.ItemView.extend({
        bindings: "cacbenhthongthuong-bind",
        template: itemTemplate,
        tagName: 'tr',
        modelSchema: itemSchema,
        urlPrefix: "/api/v1/",
        collectionName: "bangsotruonghopmaccacloaibenhthongthuong",
        foreignRemoteField: "id",
        foreignField: "hsqlsuckhoevabenhtatnguoilaodong_id",

        uiControl: {
            fields: [
                // {
				// 	field: "phanloaisuckhoe",
				// 	uicontrol: "radio",
				// 	textField: "name",
				// 	valueField: "id",
				// 	cssClassField: "cssClass",
				// 	dataSource: [
				// 		{ name: "", id: 1 },
				// 		{ name: "", id: 2},
				// 		{ name: "", id: 3 },
				// 		{ name: "", id: 4 },
				// 		{ name: "", id: 5 },
				// 	],
                // },
                {
					field: "nhombenh",
					cssClass: false,
                },
                {
					field: "sotruonghopquy1",
					cssClass: false,
                },
                {
					field: "sotruonghopquy2",
					cssClass: false,
                },
                {
					field: "sotruonghopquy3",
					cssClass: false,
                },
                {
					field: "sotruonghopquy4",
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