define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');
    var itemTemplate = require('text!app/hoso/HoSoSucKhoeVaBenhTat/tpl/bangqlsuckhoetruockhibotrivieclam.html'),
        itemSchema = require('json!schema/BangQLSucKhoeTruocKhiBoTriViecLamSchema.json');

    return Gonrin.ItemView.extend({
        bindings: "quanlysuckhoe-bind",
        template: itemTemplate,
        tagName: 'tr',
        modelSchema: itemSchema,
        urlPrefix: "/api/v1/",
        collectionName: "bangqlsuckhoetruockhibotrivieclam",
        foreignRemoteField: "id",
        foreignField: "hsqlsuckhoevabenhtatnguoilaodong_id",

        uiControl: {
            fields: [
                {
					field: "phanloaisuckhoe",
					uicontrol: "radio",
					textField: "name",
					valueField: "id",
					cssClassField: "cssClass",
					dataSource: [
						{ name: "", id: 1 },
						{ name: "", id: 2 },
						{ name: "", id: 3 },
						{ name: "", id: 4 },
						{ name: "", id: 5 },
					],
                },
                {
					field: "soduockhamtuyennam",
					cssClass: false,
                },
                {
					field: "soduockhamtuyennu",
					cssClass: false,
                },
                {
					field: "ngay_thang_nam",
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
        
        error: function () {
            self.getApp().notify("Get data Eror");
        },
        registerEvent: function () {
            const self = this;
            self.$el.find("#itemRemove").unbind("click").bind("click", function () {
                self.remove(true);
            });
            self.model.on("change", () => {
                self.trigger("change", self.model.toJSON());
            });
        },
    
    });
});