define(function (require) {

	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin'),
		tpl = require('text!app/search/search.html'),
		template = _.template(tpl);

	return Gonrin.View.extend({
		render: function () {
			var self = this;
			console.log('data')
			this.$el.html(template());
			self.$el.find("#search_pc").unbind("click").bind("click", function () {
				console.log('data')
				self.processSearch();
			});
		},
		processSearch: function () {
			var self = this;
			$.ajax({
				url: (self.getApp().serviceURL || "") + '/api/v1/chitietthietbi',
				type: 'GET',
				data: data,
				headers: {
					'content-type': 'application/json'
				},
				dataType: 'json',
				success: function (data) {
					console.log(data)
					// self.$el.find(".ketqua_txt").removeClass("hidden");
					// if (data === null || data.objects.length === 0) {
					// 	self.$el.find(".ketqua_txt").html("Không tìm thấy sổ chăm sóc nào phù hợp");
					// 	self.$el.find("#grid").html("");
					// } else {
					// 	self.$el.find(".ketqua_txt").html("tìm thấy " + data.objects.length + " sổ chăm sóc phù hợp");
					// 	$("#grid").grid({
					// 		showSortingIndicator: true,
					// 		language: {
					// 			no_records_found: "không tìm thấy kết quả"
					// 		},
					// 		noResultsClass: "alert alert-default no-records-found",
					// 		refresh: true,
					// 		orderByMode: "client",
					// 		tools: [
					// 		],
					// 		fields: [
					// 			{ field: "id", label: "Mã sổ chăm sóc" },
					// 			// { field: "hoten", label: "Họ và tên", sortable: { order: "asc" } },
					// 			// {
					// 			// 	field: "ngaysinh", label: "Ngày sinh", textFormat: "DD/MM/YYYY", template: function (rowData) {
					// 			// 		var template_helper = new TemplateHelper();
					// 			// 		if (parseInt(rowData.ngaysinh) > 0) {
					// 			// 			var valid = new Date(rowData.ngaysinh * 1000).getTime();
					// 			// 			if (valid > 0) {
					// 			// 				return template_helper.timestampFormat(valid, "DD/MM/YYYY");
					// 			// 			}
					// 			// 		} else if (rowData.ngaysinh !== null && rowData.ngaysinh !== "") {
					// 			// 			return template_helper.datetimeFormat(rowData.ngaysinh, "DD/MM/YYYY");
					// 			// 		}
					// 			// 		return "";
					// 			// 	}
					// 			// },
					// 			// { field: "phone_number", label: "Số điện thoại" },
					// 			// //		                         {field: "email", label: "Email"},
					// 			// { field: "tinhthanh", label: "Tỉnh/Thành phố", textField: "ten" },
					// 			// { field: "quanhuyen", label: "Quận/Huyện", textField: "ten" },
					// 			// { field: "xaphuong", label: "Xã/Phường", textField: "ten" },
					// 			// { field: "diachi", label: "Địa chỉ" },
					// 		],
					// 		dataSource: data.objects,
					// 		primaryField: "id",
					// 		selectionMode: false,
					// 		pagination: {
					// 			page: 1,
					// 			pageSize: 20
					// 		},
					// 		// onRowClick: function (event) {
					// 		// 	if (event.rowId) {
					// 		// 		var url_check = '/api/v1/sochamsoc/check/' + event.rowId
					// 		// 		$.ajax({
					// 		// 			url: (self.getApp().serviceURL || "") + url_check,
					// 		// 			type: 'POST',
					// 		// 			headers: {
					// 		// 				'content-type': 'application/json'
					// 		// 			},
					// 		// 			dataType: 'json',
					// 		// 			success: function (data) {
					// 		// 				// if(data!==null && data.read === false && data.write === false){
					// 		// 				// 	var requireDialogView = new RequirePermissionDialogView({viewData:{"sochamsoc_id":event.rowId}});
					// 		// 				// 	requireDialogView.dialog();
					// 		// 				// }else{
					// 		// 				// 	self.getApp().getRouter().navigate("sochamsoc/model?id="+event.rowId);
					// 		// 				// 	return;
					// 		// 				// }
					// 		// 			},
					// 		// 			error: function (xhr, status, error) {
					// 		// 				try {
					// 		// 					self.getApp().notify($.parseJSON(xhr.responseText).error_message);
					// 		// 				}
					// 		// 				catch (err) {
					// 		// 					self.getApp().notify("có lỗi xảy ra, vui lòng thử lại sau ");
					// 		// 				}

					// 		// 			}
					// 		// 		});
					// 		// 	}
					// 		// },
					// 	});
					// }
				},
				error: function (xhr, status, error) {
					try {
						self.getApp().notify($.parseJSON(xhr.responseText).error_message);
					}
					catch (err) {
						self.getApp().notify("có lỗi xảy ra, vui lòng thử lại sau ");
					}

				}
			});
		},

	});

});