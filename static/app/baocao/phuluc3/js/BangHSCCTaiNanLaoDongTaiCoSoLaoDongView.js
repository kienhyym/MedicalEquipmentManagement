define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');
    var itemTemplate = require('text!app/baocao/phuluc3/tpl/banghscctainanlaodongtaicosolaodong.html'),
        itemSchema = require('json!schema/BangHSCCTaiNanLaoDongTaiCoSoLaoDongSchema.json');

    return Gonrin.ItemView.extend({
        bindings: "hosocapcuu-bind",
        template: itemTemplate,
        tagName: 'tr',
        modelSchema: itemSchema,
        urlPrefix: "/api/v1/",
        collectionName: "banghscctainanlaodongtaicosolaodong",
        foreignRemoteField: "id",
        foreignField: "hscctainanlaodongtaicosolaodong_id",

        // uiControl: {
        //     fields: [
        //         {
        //             field: "channelname",
        //             uicontrol: "combobox",
        //             dataSource: [
        //                 { value: "phone_number", text: "Phone" },
        //                 { value: "email", text: "Email" },
        //                 { value: "zalo_id", text: "zalo ID" },
        //                 { value: "somevabe_id", text: "Sổ mẹ và bé ID" },
        //             ],
        //             textField: "text",
        //             valueField: "text"
        //         },
        //     ]
        // },
        render: function () {
            var self = this;
            this.applyBindings();
            // self.$el.find("#itemRemove").unbind("click").bind("click", function () {
            //     self.remove(true);
            // });

            // self.registerEvent();
            self.sothutu();

        },
        // registerEvent: function () {

        //     self.$el.find("#itemRemove").unbind("click").bind("click", function () {
        //         self.remove(true);
        //     });
        // },
        sothutu:function(){
			var self = this;
			// var id = self.getApp().currentUser.id
			var x;
			for(var i=0;i<=4;i++){

				self.$el.find("#stt").val(i);
			}
		}
    });
});