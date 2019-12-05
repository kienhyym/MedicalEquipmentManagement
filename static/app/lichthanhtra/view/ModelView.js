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
			// self.$el.find('.dialogView').hide()
			// self.$el.find('.dialogView2').hide()
			// self.$el.find('.dialogView3').hide()


			self.renderCalendar();

			// self.$el.find('.fc-day').each(function (index, item) {
			// 	$(item).unbind('click').bind('click', function () {
			// 		self.$el.find('.dialogView').show()
			// 			var x = $(item).attr('data-date')
			// 			var y = moment(moment().unix()*1000).format("YYYY-MM-DD")
			// 			if(x !== y){
			// 				self.$el.find('.modal-footer').hide()
			// 			}
			// 			else{
			// 				self.$el.find('.modal-footer').show()

			// 			}
			// 	})
			// 	self.$el.find('.close1').unbind('click').bind('click', function () {
			// 		self.$el.find('.dialogView').hide()
			// 	})
			// })
			// $.ajax({
			// 	url: self.getApp().serviceURL + "/api/v1/thietbi",
			// 	method: "GET",
			// 	data: JSON.stringify({ "order_by": [{ "field": "tentrangthietbi", "direction": "desc" }], "page": 1, "results_per_page": 100 }),
			// 	contentType: "application/json",
			// 	success: function (data) {
			// 		var chuky = 'chuky';
			// 		self.$el.find("#dsthietbi").empty();

			// 		(data.objects).forEach(function (item, index) {

			// 			self.$el.find("#dsthietbi").append("<tr><td class='p-2'>" + item.ten + "</td>" +
			// 				"<td class='p-1'><a class='btn btn-info btn-sm btn-danhsachthietbi p-1'>Danh sách thiết bị</a></td></tr>")

			// 		});
			// 		self.$el.find('.close2').unbind('click').bind('click', function () {
			// 			self.$el.find('.dialogView2').hide()
			// 			self.$el.find('.dialogView').show()

			// 		})

			// 		self.$el.find('.btn-danhsachthietbi').each(function (index2, item2) {
			// 			$(item2).unbind('click').bind('click', function () {
			// 				self.$el.find('.dialogView2').show()
			// 				self.$el.find('.dialogView').hide()
			// 				/////////////////////////////////
			// 				var filters = {
			// 					filters: {
			// 						"$and": [
			// 							{ "thietbi_id": { "$eq": data.objects[index2].id } }
			// 						]
			// 					},
			// 					order_by: [{ "field": "created_at", "direction": "asc" }]
			// 				}
			// 				$.ajax({
			// 					url: self.getApp().serviceURL + "/api/v1/chitietthietbi",
			// 					method: "GET",
			// 					data: { "q": JSON.stringify(filters, { "order_by": [{ "field": "tentrangthietbi", "direction": "desc" }], "page": 1, "results_per_page": 100 }) },
			// 					contentType: "application/json",
			// 					success: function (data) {
			// 						self.$el.find("#dsthietbi2").empty();

			// 						(data.objects).forEach(function (item3, index3) {
			// 							self.$el.find("#dsthietbi2").append("<tr><td class='p-2'>" + item3.model_serial_number + "</td>" +
			// 								"<td class='p-1'><a class='btn btn-info btn-sm btn-ghiketqua p-1'>Ghi kết quả kiểm tra </a></td></tr>")

			// 						})
			// 						self.$el.find('.close3').unbind('click').bind('click', function () {
			// 							self.$el.find('.dialogView3').hide()
			// 							self.$el.find('.dialogView2').show()
			// 						})
			// 						self.$el.find('.btn-ghiketqua').each(function (index3, item3) {
			// 							$(item3).unbind('click').bind('click', function () {
			// 								self.$el.find('#phieu-ngay').datetimepicker({
			// 									textFormat: 'DD-MM-YYYY',
			// 									extraFormats: ['DDMMYYYY'],
			// 									parseInputDate: function (val) {
			// 										return moment.unix(val)
			// 									},
			// 									parseOutputDate: function (date) {
			// 										return date.unix()
			// 									}
			// 								});
			// 								$('#phieu-ngay').data("gonrin").setValue(moment().unix());
			// 								self.$el.find('#phieu-tentrangthietbi').val(data.objects[index3].model_serial_number)
			// 								self.$el.find('#phieu-tai').val('')
			// 								self.$el.find('#phieu-nha').val('')
			// 								self.$el.find('#phieu-nguoisudung').val('')
			// 								self.$el.find('#phieu-donvi').val('')
			// 								self.$el.find('#phieu-ketquakiemtra').val('')
			// 								self.$el.find('#phieu-huongkhacphuc').val('')
			// 								self.$el.find('.dialogView3').show()
			// 								//////////////////Lưu phiếu//////////////////
			// 								self.$el.find('.btn-luu-luuthietbiduockiemtra').unbind('click').bind('click', function () {
			// 									var datax = {
			// 										chuky: chuky,
			// 										tentrangthietbi: self.$el.find('#phieu-tentrangthietbi').val(),
			// 										tai: self.$el.find('#phieu-tai').val(),
			// 										nha: self.$el.find('#phieu-nha').val(),
			// 										nguoisudung: self.$el.find('#phieu-nguoisudung').val(),
			// 										donvi: self.$el.find('#phieu-donvi').val(),
			// 										ketquakiemtra: self.$el.find('#phieu-ketquakiemtra').val(),
			// 										huongkhacphuc: self.$el.find('#phieu-huongkhacphuc').val(),
			// 										ngay: self.$el.find('#phieu-ngay').val(),
			// 										chitietthietbi_id: data.objects[index3].id
			// 									}

			// 									$.ajax({
			// 										method: "POST",
			// 										url: self.getApp().serviceURL + "/api/v1/bienbanxacnhantinhtrangthietbi",
			// 										data: JSON.stringify(datax),
			// 										headers: {
			// 											'content-type': 'application/json'
			// 										},
			// 										dataType: 'json',
			// 										success: function (response) {
			// 											if (response) {
			// 												self.getApp().notify("Nhập thông tin thành công");
			// 												self.getApp().getRouter().navigate(self.collectionName + "/collection");
			// 											}
			// 										}, error: function (xhr, ere) {
			// 											console.log('xhr', ere);

			// 										}
			// 									})
			// 								})
			// 								/////////////////Hết Lưu Phiếu//////////////////


			// 							})
			// 						})
			// 					},
			// 					error: function (xhr, status, error) {
			// 						try {
			// 							if (($.parseJSON(error.xhr.responseText).error_code) === "SESSION_EXPIRED") {
			// 								self.getApp().notify("Hết phiên làm việc, vui lòng đăng nhập lại!");
			// 								self.getApp().getRouter().navigate("login");
			// 							} else {
			// 								self.getApp().notify({ message: $.parseJSON(error.xhr.responseText).error_message }, { type: "danger", delay: 1000 });
			// 							}
			// 						} catch (err) {
			// 							self.getApp().notify({ message: "Lỗi không lấy được dữ liệu" }, { type: "danger", delay: 1000 });
			// 						}
			// 					}
			// 				});
			// 				//////////////////////////////////////
			// 			})
			// 		})

			// 	},
			// 	error: function (xhr, status, error) {
			// 		try {
			// 			if (($.parseJSON(error.xhr.responseText).error_code) === "SESSION_EXPIRED") {
			// 				self.getApp().notify("Hết phiên làm việc, vui lòng đăng nhập lại!");
			// 				self.getApp().getRouter().navigate("login");
			// 			} else {
			// 				self.getApp().notify({ message: $.parseJSON(error.xhr.responseText).error_message }, { type: "danger", delay: 1000 });
			// 			}
			// 		} catch (err) {
			// 			self.getApp().notify({ message: "Lỗi không lấy được dữ liệu" }, { type: "danger", delay: 1000 });
			// 		}
			// 	}
			// });




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
								{ "ngayhethan": { "$gte": starttime._i / 1000 } }, { "ngayhethan": { "$lte": endtime._i / 1000 } },
							]
						},
						order_by: [{ "field": "created_at", "direction": "asc" }]
					}

					$.ajax({
						url: self.getApp().serviceURL + "/api/v1/bangkiemdinh",
						method: "GET",
						data: { "q": JSON.stringify(filters, { "order_by": [{ "field": "tenthietbi", "direction": "desc" }], "page": 1, "results_per_page": 100 }) },
						contentType: "application/json",
						success: function (data) {
							var events = [];
							for (var i = 0; i < data.objects.length; i++) {
								var item = data.objects[i];
								var start = "";
								if (item.ngayhethan !== null) {
									start = item.ngayhethan;
								}
								var event_item = { "start": start * 1000 + 100000000, "title": item.tenthietbi + '[' + [item.model_serial_number,] + ']' , "url": "#bangkiemdinh/model?id=" + item.id };
								events.push(event_item);

							}
							var filters2 = {
								filters: {
									"$and": [
										{ "ngaymua": { "$gte": starttime._i / 1000 } }, { "ngaymua": { "$lte": endtime._i / 1000 } },
									]
								},
								order_by: [{ "field": "created_at", "direction": "asc" }]
							}
							$.ajax({
								url: self.getApp().serviceURL + "/api/v1/chitietthietbi",
								method: "GET",
								data: { "q": JSON.stringify(filters2, { "order_by": [{ "field": "tenthietbi", "direction": "desc" }], "page": 1, "results_per_page": 100 }) },
								contentType: "application/json",
								success: function (data2) {
									for (var i = 0; i < data2.objects.length; i++) {
										var item2 = data2.objects[i];
										var start2 = "";
										if (item2.ngaymua !== null) {
											start2 = item2.ngaymua;
										}
										var event_item2 = { "start": start2 * 1000 + 100000000, "title": item2.tenthietbi + '[' + [item2.model_serial_number,] + ']' , "url": "#chitietthietbi/model?id=" + item2.id };
										events.push(event_item2);
		
									}		
									callback(events);
		
								},
								error: function (xhr, status, error) {
								}
							});

							// callback(events);

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