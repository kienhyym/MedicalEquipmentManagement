define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');
    var itemTemplate = require('text!app/baocao/phuluc2/tpl/bangquanlybenhmantinhtheotungbenh.html'),
        itemSchema = require('json!schema/BangQuanLyBenhManTinhTheoTungBenhSchema.json');
    var BangQuanLyBenhManTinhTheoTungBenhChiTietItemView = require('app/baocao/phuluc2/js/BangQuanLyBenhManTinhTheoTungBenhChiTietView');

    return Gonrin.ItemView.extend({
        bindings: "bangquanlybenhmantinhtheotungbenh-bind",
        template: itemTemplate,
        tagName: 'div',
        modelSchema: itemSchema,
        urlPrefix: "/api/v1/",
        collectionName: "bangquanlybenhmantinhtheotungbenh",
        foreignRemoteField: "id",
        foreignField: "hsqlsuckhoevabenhtatnguoilaodong_id",
        uiControl: {
            fields: [
                {
                    field: "tenbenh",
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
            self.$el.find(".content").attr({ "id": self.model.get("id") });
            if (this.model.get('id')) {
                this.model.fetch({
                    success: function (data) {
                        self.applyBindings();
                        self.registerEvent();
                        self.renderChiTietRows();
                    },
                    error: function () {
                        self.getApp().notify("Get data Eror");
                    },
                });
            } else {
                self.applyBindings();
                self.registerEvent();
                self.renderChiTietRows();
            }
        },
        registerEvent: function () {
            const self = this;
            self.$el.find("#itemRemove").unbind("click").bind("click", function () {
                self.remove(true);
            });

            self.model.on("change:tenbenh", () => {
                self.model.save(null, {
                    success: function (model, respose, options) {
                        // NOTIFY TO GRANPARENT
                        self.trigger("change", self.model.toJSON());
                    },
                    error: function (xhr, status, error) {
                    }
                });
            });
        },

        renderChiTietRows: function () {
            const self = this;
            var ds_bangquanlybenhmantinhtheotungbenhchitietfield = self.model.get("bangquanlybenhmantinhtheotungbenhchitietfield");
            if (!ds_bangquanlybenhmantinhtheotungbenhchitietfield) {
                ds_bangquanlybenhmantinhtheotungbenhchitietfield = [];
            }
            var containerEl = self.$el.find("#tbl_bangquanlybenhmantinhtheotungbenh");
            containerEl.empty();

            var dataSource = lodash.orderBy(ds_bangquanlybenhmantinhtheotungbenhchitietfield, ['created_at'], ['asc']);
            dataSource.forEach((item, index) => {
                var view = new BangQuanLyBenhManTinhTheoTungBenhChiTietItemView();
                view.model.set(item);
                view.render();
                $(view.el).hide().appendTo(containerEl).fadeIn();

                view.on("change", (data) => {
                    var ds_bangquanlybenhmantinhtheotungbenhchitietfield = self.model.get("bangquanlybenhmantinhtheotungbenhchitietfield");
                    ds_bangquanlybenhmantinhtheotungbenhchitietfield.forEach((item, index) => {
                        if (item.id == data.id) {
                            ds_bangquanlybenhmantinhtheotungbenhchitietfield[index] = data;
                        }
                    });
                    self.model.set("bangquanlybenhmantinhtheotungbenhchitietfield", ds_bangquanlybenhmantinhtheotungbenhchitietfield);
                    self.model.save(null, {
                        success: function (model, respose, options) {
                            // NOTIFY TO GRANPARENT
                            self.trigger("change", self.model.toJSON());
                        },
                        error: function (xhr, status, error) {
                        }
                    });
                });
            });

            self.$el.find("#btn_add_bangquanlybenhmantinhtheotungbenhchitiet").unbind("click").bind("click", () => {
                var view = new BangQuanLyBenhManTinhTheoTungBenhChiTietItemView();

                view.model.save(null, {
                    success: function (model, respose, options) {
                        view.model.set(respose);
                        view.render();
                        $(view.el).hide().appendTo(containerEl).fadeIn();

                        // PUSH THE CHILD TO LIST
                        var ds_bangquanlybenhmantinhtheotungbenhchitietfield = self.model.get("bangquanlybenhmantinhtheotungbenhchitietfield");
                        if (!ds_bangquanlybenhmantinhtheotungbenhchitietfield) {
                            ds_bangquanlybenhmantinhtheotungbenhchitietfield = [];
                        }
                        ds_bangquanlybenhmantinhtheotungbenhchitietfield.push(view.model.toJSON());
                        self.model.set("bangquanlybenhmantinhtheotungbenhchitietfield", ds_bangquanlybenhmantinhtheotungbenhchitietfield);
                        self.model.save(null, {
                            success: function (model, respose, options) {
                                // NOTIFY TO GRANPARENT
                                self.trigger("change", self.model.toJSON());
                            },
                            error: function (xhr, status, error) {
                            }
                        });

                        view.on("change", (data) => {
                            var ds_bangquanlybenhmantinhtheotungbenhchitietfield = self.model.get("bangquanlybenhmantinhtheotungbenhchitietfield");
                            if (!ds_bangquanlybenhmantinhtheotungbenhchitietfield) {
                                ds_bangquanlybenhmantinhtheotungbenhchitietfield = [];
                            }
                            ds_bangquanlybenhmantinhtheotungbenhchitietfield.forEach((item, index) => {
                                if (item.id == data.id) {
                                    ds_bangquanlybenhmantinhtheotungbenhchitietfield[index] = data;
                                }
                            });

                            self.model.set("bangquanlybenhmantinhtheotungbenhchitietfield", ds_bangquanlybenhmantinhtheotungbenhchitietfield);
                            self.model.save(null, {
                                success: function (model, respose, options) {
                                    // NOTIFY TO GRANPARENT
                                    self.trigger("change", self.model.toJSON());
                                },
                                error: function (xhr, status, error) {
                                }
                            });
                        });
                    },
                    error: function (xhr, status, error) {
                        // HANDLE ERROR
                    }
                });

            });
        }
    });
});