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