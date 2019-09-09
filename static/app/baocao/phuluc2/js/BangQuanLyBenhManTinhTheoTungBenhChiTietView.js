define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');
    var itemTemplate = require('text!app/baocao/phuluc2/tpl/bangquanlybenhmantinhtheotungbenhchitiet.html'),
        itemSchema = require('json!schema/BangQuanLyBenhManTinhTheoTungBenhChiTietSchema.json');

    return Gonrin.ItemView.extend({
        bindings: "bangquanlybenhmantinhtheotungbenhchitiet-bind",
        template: itemTemplate,
        tagName: 'tr',
        modelSchema: itemSchema,
        urlPrefix: "/api/v1/",
        collectionName: "bangquanlybenhmantinhtheotungbenhchitiet",
        foreignRemoteField: "id",
        foreignField: "bangquanlybenhmantinhtheotungbenh_id",
        uiControl: {
            fields: [
                {
                    field: "tuoinam",
                    cssClass: false,
                },
                {
                    field: "tuoinu",
                    cssClass: false,
                },
                {
                    field: "tuoinghe",
                    cssClass: false,
                },
                // {
                // 	field: "bangquanlybenhmantinhtheotungbenhchitietfield",
                // 	uicontrol: false,
                // 	itemView: BangQuanLyBenhManTinhTheoTungBenhChiTietItemView,
                // 	tools: [{
                // 		name: "create",
                // 		type: "button",
                // 		buttonClass: "btn btn-outline-success btn-sm",
                // 		label: "<span class='fa fa-plus'></span>",
                // 		command: "create"
                // 	}],
                // 	toolEl: "#add_row_child"
                // },
            ]
        },
        render: function () {
            var self = this;
            self.applyBindings();
            self.registerEvent();
        },

        registerEvent: function () {
            const self = this;
            self.model.on("change", () => {
                self.trigger("change", self.model.toJSON());
            });

            self.$el.find("#itemRemove").unbind("click").bind("click", function () {
                self.remove(true);
            });
        }
    });
});