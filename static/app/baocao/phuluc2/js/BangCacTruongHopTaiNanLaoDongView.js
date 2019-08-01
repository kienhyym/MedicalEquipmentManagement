define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');
    var itemTemplate = require('text!app/baocao/phuluc2/tpl/bangcactruonghoptainanlaodong.html'),
        itemSchema = require('json!schema/BangCacTruongHopTaiNanLaoDongSchema.json');

    return Gonrin.ItemView.extend({
        bindings: "cacbenhnghenghiep-bind",
        template: itemTemplate,
        tagName: 'tr',
        modelSchema: itemSchema,
        urlPrefix: "/api/v1/",
        collectionName: "bangcactruonghoptainanlaodong",
        foreignRemoteField: "id",
        foreignField: "hsqlsuckhoevabenhtatnguoilaodong_id",

        uiControl: {
            fields: [
                {
					field: "nhombenh",
					cssClass: false,
                },
                {
					field: "sotruonghopquy1mac",
					cssClass: false,
                },
                {
					field: "sotruonghopquy1chet",
					cssClass: false,
                },
                {
					field: "sotruonghopquy2mac",
					cssClass: false,
                },
                {
					field: "sotruonghopquy2chet",
					cssClass: false,
                },
                {
					field: "sotruonghopquy3mac",
					cssClass: false,
                },
                {
					field: "sotruonghopquy3chet",
					cssClass: false,
                },
                {
					field: "sotruonghopquy4mac",
					cssClass: false,
                },
                {
					field: "sotruonghopquy4chet",
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