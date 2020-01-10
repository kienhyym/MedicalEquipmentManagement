define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');

    var template = require('text!app/danhmuc/donvi/tpl/collection.html'),
        schema = require('json!schema/DonViSchema.json');
    var TemplateHelper = require('app/base/view/TemplateHelper');
    return Gonrin.CollectionView.extend({
        template: template,
        modelSchema: schema,
        urlPrefix: "/api/v1/",
        collectionName: "donvi",
        uiControl: {
            fields: [
                {
                    field: "stt",
                    label: "STT",
                    width: "30px",
                },
                { field: "ten", label: "Tên" ,width:"350px"},
                {
                    field: "tinhthanh_id",
                    label: "Tỉnh thành",
                    foreign: "tinhthanh",
                    foreignValueField: "id",
                    foreignTextField: "ten",
                },
                {
                    field: "quanhuyen_id",
                    label: "Quận/Huyện",
                    foreign: "quanhuyen",
                    foreignValueField: "id",
                    foreignTextField: "ten",
                },
                {
                    field: "xaphuong_id",
                    label: "Xã/Phường/Thị trấn",
                    foreign: "xaphuong",
                    foreignValueField: "id",
                    foreignTextField: "ten",
                },
            ],
            //  pagination: {
            //         page: 1,
            //         pageSize: 100
            //     },
            //  noResultsClass:"alert alert-default no-records-found",
            onRowClick: function (event) {
                if (event.rowId) {
                    var path = this.collectionName + '/model?id=' + event.rowId;
                    this.getApp().getRouter().navigate(path);
                }
            },
            // onRendered: function (e) {
            //     var self = this;
            //     if (this.uiControl.dataSource == null || this.uiControl.dataSource.length<=0){
            //         self.$el.find("#grid").hide();
            //         self.getApp().getRouter().navigate(this.collectionName + '/model');
            //     }
            // }
        },
        render: function () {
            // var self = this;
            // if(self.getApp().currentUser.hasRole("CoSoKCB") === true){
            //     self.getApp().getRouter().navigate(this.collectionName + '/model');
            //     return;
            // }
            //  self.uiControl.orderBy = [{"field": "name", "direction": "asc"}];
            this.applyBindings();
            this.locData();

			return this;
		},
		locData: function () {
			var self = this;
			$.ajax({
				url: self.getApp().serviceURL + "/api/v1/donvi?results_per_page=100000&max_results_per_page=1000000",
				method: "GET",
				data: { "q": JSON.stringify({ "order_by": [{ "field": "updated_at", "direction": "desc" }] }) },
				contentType: "application/json",
				success: function (data) {
					var arr = [];
					data.objects.forEach(function (item, index) {
						item.stt = index+1;
						arr.push(item)
					})
					self.render_grid(arr);
				}
			})
		},
		render_grid: function (dataSource) {
			var self = this;
			var element = self.$el.find("#grid-data");
			element.grid({
				// showSortingIndicator: true,
				orderByMode: "client",
				language: {
					no_records_found: "Chưa có dữ liệu"
				},
				noResultsClass: "alert alert-default no-records-found",
				fields: [
                    {
                        field: "stt",
                        label: "STT",
                        width: 30,
                    },
                    { field: "ten", label: "Tên"},
                    // {
                    //     field: "tinhthanh_id",
                    //     label: "Tỉnh thành",
                    //     foreign: "tinhthanh",
                    //     foreignValueField: "id",
                    //     foreignTextField: "ten",
                    // },
                    // {
                    //     field: "quanhuyen_id",
                    //     label: "Quận/Huyện",
                    //     foreign: "quanhuyen",
                    //     foreignValueField: "id",
                    //     foreignTextField: "ten",
                    // },
                    // {
                    //     field: "xaphuong_id",
                    //     label: "Xã/Phường/Thị trấn",
                    //     foreign: "xaphuong",
                    //     foreignValueField: "id",
                    //     foreignTextField: "ten",
                    // },
				],
				dataSource: dataSource,
				primaryField: "id",
				refresh: true,
				selectionMode: false,
				pagination: {
					page: 1,
					pageSize: 15
				},
				events: {
					"rowclick": function (e) {
						self.getApp().getRouter().navigate("donvi/model?id=" + e.rowId);
					},
				},
			});
            $(self.$el.find('.grid-data tr')).each(function (index, item) {
                $(item).find('td:first').css('height',$(item).height())

                console.log($(item).find('td:first').addClass('d-flex align-items-center justify-content-center'))

            })
		},

	});

});