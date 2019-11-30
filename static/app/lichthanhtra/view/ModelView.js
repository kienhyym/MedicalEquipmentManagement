define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/lichthanhtra/tpl/model.html'),
		// schema = require('json!schema/KeHoachThanhTraSchema.json');
		schema = require('json!schema/ThietBiDuocKiemTraSchema.json');

	// var TinhThanhSelectView = require('app/DanhMuc/TinhThanh/view/SelectView');
	// var TemplateHelper = require('app/base/view/TemplateHelper');

	return Gonrin.ModelView.extend({
		template: template,
		urlPrefix: "/api/v1/",
		modelSchema: schema,
		collectionName: "thietbiduockiemtra",
		uiControl: {
		},
		render: function () {
			var self = this;
			self.$el.find('.dialogView').hide()
			self.$el.find('.dialogView2').hide()
			self.$el.find('.dialogView3').hide()


			self.renderCalendar();
			self.$el.find('.fc-day').each(function (index, item) {
				$(item).unbind('click').bind('click', function () {
					console.log($(item).attr('data-date'))
					self.$el.find('.dialogView').show()
				})
			})
			$.ajax({
				url: self.getApp().serviceURL + "/api/v1/thietbi",
				method: "GET",
				data: JSON.stringify({ "order_by": [{ "field": "tentrangthietbi", "direction": "desc" }], "page": 1, "results_per_page": 100 }),
				contentType: "application/json",
				success: function (data) {
					(data.objects).forEach(function (item, index) {
						self.$el.find("#dsthietbi").append("<tr><td class='p-2'>" + item.ten + "</td>" +
							"<td class='p-1'><a class='btn btn-info btn-sm btn-danhsachthietbi p-1'>Danh sách thiết bị</a></td></tr>")

					});
					self.$el.find('#close3').unbind('click').bind('click',function () {
						self.$el.find('.dialogView3').hide()
					})
					self.$el.find('.btn-danhsachthietbi').each(function (index2, item2) {
						$(item2).unbind('click').bind('click', function () {
							self.$el.find('.dialogView2').show()
							console.log(data.objects[index2])
							/////////////////////////////////
							var filters = {
								filters: {
									"$and": [
										{ "thietbi_id": { "$eq": data.objects[index2].id } }
									]
								},
								order_by: [{ "field": "created_at", "direction": "asc" }]
							}
							$.ajax({
								url: self.getApp().serviceURL + "/api/v1/chitietthietbi",
								method: "GET",
								data: { "q": JSON.stringify(filters, { "order_by": [{ "field": "tentrangthietbi", "direction": "desc" }], "page": 1, "results_per_page": 100 }) },
								contentType: "application/json",
								success: function (data) {
									console.log(data);
									(data.objects).forEach(function (item3, index3) {

										self.$el.find("#dsthietbi2").append("<tr><td class='p-2'>" + item3.model_serial_number + "</td>" +
											"<td class='p-1'><a class='btn btn-info btn-sm btn-ghiketqua p-1'>Ghi kết quả kiểm tra </a></td></tr>")
									})
									self.$el.find('.btn-ghiketqua').each(function (index3, item3) {
										$(item3).unbind('click').bind('click', function () {
											self.$el.find('.dialogView3').show()
											console.log(data.objects[index3])
										})
									})
								},
								error: function (xhr, status, error) {
									try {
										if (($.parseJSON(error.xhr.responseText).error_code) === "SESSION_EXPIRED") {
											self.getApp().notify("Hết phiên làm việc, vui lòng đăng nhập lại!");
											self.getApp().getRouter().navigate("login");
										} else {
											self.getApp().notify({ message: $.parseJSON(error.xhr.responseText).error_message }, { type: "danger", delay: 1000 });
										}
									} catch (err) {
										self.getApp().notify({ message: "Lỗi không lấy được dữ liệu" }, { type: "danger", delay: 1000 });
									}
								}
							});
							//////////////////////////////////////
						})
					})

				},
				error: function (xhr, status, error) {
					try {
						if (($.parseJSON(error.xhr.responseText).error_code) === "SESSION_EXPIRED") {
							self.getApp().notify("Hết phiên làm việc, vui lòng đăng nhập lại!");
							self.getApp().getRouter().navigate("login");
						} else {
							self.getApp().notify({ message: $.parseJSON(error.xhr.responseText).error_message }, { type: "danger", delay: 1000 });
						}
					} catch (err) {
						self.getApp().notify({ message: "Lỗi không lấy được dữ liệu" }, { type: "danger", delay: 1000 });
					}
				}
			});

		},
		renderCalendar: function () {
			var self = this;

			var initialLocaleCode = 'vi';
			$('#calendar').fullCalendar({
				header: {
					left: 'prev,next today',
					center: 'title',
					right: 'month,agendaWeek,agendaDay,listMonth'
				},
				locale: initialLocaleCode,
				buttonIcons: false, // show the prev/next text
				weekNumbers: true,
				navLinks: true, // can click day/week names to navigate views
				editable: true,
				eventLimit: true, // allow "more" link when too many events


				events: function (starttime, endtime, timezone, callback) {

					// var filters = {
					// 	filters: {
					// 		"$and": [
					// 			{ "$and": [{ "ngaysoanthao": { "$gte": starttime._i/1000 } }, { "ngaysoanthao": { "$lte": endtime._i/1000  } }] },
					// 			{ "$and": [{ "ngaypheduyet_phong": { "$gte": starttime._i/1000 } }, { "ngaypheduyet_phong": { "$lte": endtime._i/1000  } }] },
					// 			{ "$and": [{ "ngaypheduyet_pct": { "$gte": starttime._i/1000 } }, { "ngaypheduyet_pct": { "$lte": endtime._i/1000  } }] },
					// 			{ "$and": [{ "ngaypheduyet_quyetdinh": { "$gte": starttime._i/1000  } }, { "ngaypheduyet_quyetdinh": { "$lte": endtime._i/1000  } }] },
					// 			{ "$and": [{ "ngaythanhtra": { "$gte": starttime._i/1000  } }, { "ngaythanhtra": { "$lte": endtime._i/1000  } }] },
					// 			{ "$and": [{ "ngayketthuc": { "$gte": starttime._i/1000  } }, { "ngayketthuc": { "$lte": endtime._i/1000  } }] }
					// 		]
					// 	}
					// }
					var filters = {
						filters: {
							"$and": [
								{ "ngay": { "$gte": starttime._i / 1000 } }, { "ngay": { "$lte": endtime._i / 1000 } }
							]
						},
						order_by: [{ "field": "created_at", "direction": "asc" }]
					}
					console.log(moment(starttime._i).format('MMMM Do YYYY, h:mm:ss a'), endtime._i)

					$.ajax({
						url: self.getApp().serviceURL + "/api/v1/bienbanxacnhantinhtrangthietbi",
						method: "GET",
						data: { "q": JSON.stringify(filters, { "order_by": [{ "field": "tentrangthietbi", "direction": "desc" }], "page": 1, "results_per_page": 100 }) },
						contentType: "application/json",
						success: function (data) {
							console.log(data);
							var events = [];
							for (var i = 0; i < data.objects.length; i++) {
								var item = data.objects[i];
								var start = "";
								if (item.ngay !== null) {
									start = item.ngay;
								}
								var event_item = { "start": start * 1000 + 100000000, "title": item.tentrangthietbi + '[' + [item.tai] + ']', "url": "#bienbanxacnhantinhtrangthietbi/model?id=" + item.id };
								events.push(event_item);
							}
							callback(events);
						},
						error: function (xhr, status, error) {
							try {
								if (($.parseJSON(error.xhr.responseText).error_code) === "SESSION_EXPIRED") {
									self.getApp().notify("Hết phiên làm việc, vui lòng đăng nhập lại!");
									self.getApp().getRouter().navigate("login");
								} else {
									self.getApp().notify({ message: $.parseJSON(error.xhr.responseText).error_message }, { type: "danger", delay: 1000 });
								}
							} catch (err) {
								self.getApp().notify({ message: "Lỗi không lấy được dữ liệu" }, { type: "danger", delay: 1000 });
							}
						}
					});
				}
			});



		}
	});

});