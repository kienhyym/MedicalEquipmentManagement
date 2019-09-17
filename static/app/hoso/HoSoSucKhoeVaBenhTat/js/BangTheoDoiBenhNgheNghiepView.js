define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');
    var itemTemplate = require('text!app/hoso/HoSoSucKhoeVaBenhTat/tpl/bangtheodoibenhnghenghiep.html'),
        itemSchema = require('json!schema/BangTheoDoiBenhNgheNghiepSchema.json');

    return Gonrin.ItemView.extend({
        bindings: "theodeobenhnghenghiep-bind",
        template: itemTemplate,
        tagName: 'tr',
        modelSchema: itemSchema,
        urlPrefix: "/api/v1/",
        collectionName: "bangtheodoibenhnghenghiep",
        foreignRemoteField: "id",
        foreignField: "hsqlsuckhoevabenhtatnguoilaodong_id",
        uiControl:{
            fields:[
                {
                    field: "tongsokham",
                    cssClass: false,
                },
                {
                    field: "tongsokhamnu",
                    cssClass: false,
                },
                {
                    field: "tongsochuandoan",
                    cssClass: false,
                },
                {
                    field: "tongsochuandoannu",
                    cssClass: false,
                },
                {
                    field: "tongsogiamdinh",
                    cssClass: false,
                },
                {
                    field: "tongsogiamdinhnu",
                    cssClass: false,
                },
                {
                    field: "tongsogiamdinhnhohon5phantram",
                    cssClass: false,
                },
                {
                    field: "tongsogiamdinhnhohon5phantramnu",
                    cssClass: false,
                },{
                    field: "tongsogiamdinhlonhon31phantram",
                    cssClass: false,
                },
                {
                    field: "tongsogiamdinhlonhon31phantramnu",
                    cssClass: false,
                },
                {
                    field: "tongsogiamdinhlonhon5nhohon31phantram",
                    cssClass: false,
                },
                {
                    field: "tongsogiamdinhlonhon5nhohon31phantramnu",
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
        registerEvent: function () {
            const self = this;
            self.$el.find("#itemRemove").unbind("click").bind("click", function () {
                self.remove(true);
            });
        }
    });
});