define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/danhmuc/hangsanxuat/tpl/collection.html'),
		schema = require('json!schema/HangSanXuatSchema.json');

	return Gonrin.CollectionView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "hangsanxuat",
		bindings: "data-hangsanxuat-bind",
		uiControl: {
			fields: [
				{
					field: "stt",
					label: "STT",
					width: "30px",
				},
				{ field: "ma", label: "Mã", width: 200 },
				{ field: "ten", label: "Tên", width: 350 },
			],
			onRowClick: function (event) {
				if (event.rowId) {
					var path = this.collectionName + '/model?id=' + event.rowId;
					this.getApp().getRouter().navigate(path);
				}
				//this.getApp().loading(); 
				//this.getApp().alert("haha");

			}
		},
		render: function () {
			this.applyBindings();
			this.locData();

			return this;
		},
		locData: function () {
			var self = this;
			$.ajax({
				url: self.getApp().serviceURL + "/api/v1/hangsanxuat?results_per_page=100000&max_results_per_page=1000000",
				method: "GET",
				data: { "q": JSON.stringify({ "order_by": [{ "field": "updated_at", "direction": "desc" }] }) },
				contentType: "application/json",
				success: function (data) {
					var arr = [];
					data.objects.forEach(function (item, index) {
						item.stt = index + 1;
						arr.push(item)
					})
					console.log(arr)
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
						width: "30px",
					},
					{ field: "ma", label: "Mã", width: 250 },
					{ field: "ten", label: "Tên", width: 250 },
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
						self.getApp().getRouter().navigate("hangsanxuat/model?id=" + e.rowId);
					},
				},
			});

		},

	});

});