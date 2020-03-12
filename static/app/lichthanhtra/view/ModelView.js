define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/lichthanhtra/tpl/model.html'),
		// schema = require('json!schema/KeHoachThanhTraSchema.json');
		schema = require('json!schema/ThietBiDuocKiemTraSchema.json');

	// var TinhThanhSelectView = require('app/DanhMuc/Province/view/SelectView');
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
			// 	url: self.getApp().serviceURL + "/api/v1/medicalequipment",
			// 	method: "GET",
			// 	data: JSON.stringify({ "order_by": [{ "field": "tentrangthietbi", "direction": "desc" }], "page": 1, "results_per_page": 100 }),
			// 	contentType: "application/json",
			// 	success: function (data) {
			// 		var cycle = 'cycle';
			// 		self.$el.find("#dsthietbi").empty();

			// 		(data.objects).forEach(function (item, index) {

			// 			self.$el.find("#dsthietbi").append("<tr><td class='p-2'>" + item.name + "</td>" +
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
			// 							{ "medicalequipment_id": { "$eq": data.objects[index2].id } }
			// 						]
			// 					},
			// 					order_by: [{ "field": "created_at", "direction": "asc" }]
			// 				}
			// 				$.ajax({
			// 					url: self.getApp().serviceURL + "/api/v1/equipmentdetails",
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
			// 								self.$el.find('#phieu-date').datetimepicker({
			// 									textFormat: 'DD-MM-YYYY',
			// 									extraFormats: ['DDMMYYYY'],
			// 									parseInputDate: function (val) {
			// 										return moment.unix(val)
			// 									},
			// 									parseOutputDate: function (date) {
			// 										return date.unix()
			// 									}
			// 								});
			// 								$('#phieu-date').data("gonrin").setValue(moment().unix());
			// 								self.$el.find('#phieu-tentrangthietbi').val(data.objects[index3].model_serial_number)
			// 								self.$el.find('#phieu-at').val('')
			// 								self.$el.find('#phieu-home').val('')
			// 								self.$el.find('#phieu-user').val('')
			// 								self.$el.find('#phieu-organization').val('')
			// 								self.$el.find('#phieu-conclusion_of_equipment_issues').val('')
			// 								self.$el.find('#phieu-directions_to_overcome').val('')
			// 								self.$el.find('.dialogView3').show()
			// 								//////////////////Lưu phiếu//////////////////
			// 								self.$el.find('.btn-luu-luuthietbiduockiemtra').unbind('click').bind('click', function () {
			// 									var datax = {
			// 										cycle: cycle,
			// 										tentrangthietbi: self.$el.find('#phieu-tentrangthietbi').val(),
			// 										at: self.$el.find('#phieu-at').val(),
			// 										home: self.$el.find('#phieu-home').val(),
			// 										user: self.$el.find('#phieu-user').val(),
			// 										organization: self.$el.find('#phieu-organization').val(),
			// 										conclusion_of_equipment_issues: self.$el.find('#phieu-conclusion_of_equipment_issues').val(),
			// 										directions_to_overcome: self.$el.find('#phieu-directions_to_overcome').val(),
			// 										date: self.$el.find('#phieu-date').val(),
			// 										equipmentdetails_id: data.objects[index3].id
			// 									}

			// 									$.ajax({
			// 										method: "POST",
			// 										url: self.getApp().serviceURL + "/api/v1/devicestatusverificationform",
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
								{ "expiration_date": { "$gte": starttime._i / 1000 } }, { "expiration_date": { "$lte": endtime._i / 1000 } },
							]
						},
						order_by: [{ "field": "created_at", "direction": "asc" }]
					}

					$.ajax({
						url: self.getApp().serviceURL + "/api/v1/certificateform",
						method: "GET",
						data: { "q": JSON.stringify(filters, { "order_by": [{ "field": "name", "direction": "desc" }], "page": 1, "results_per_page": 100 }) },
						contentType: "application/json",
						success: function (data) {
							var events = [];
							for (var i = 0; i < data.objects.length; i++) {
								var item = data.objects[i];
								var start = "";
								if (item.expiration_date !== null) {
									start = item.expiration_date;
								}
								var event_item = { "start": start * 1000 + 100000000, "title": item.name + '[' + [item.model_serial_number,] + ']' , "url": "#certificateform/model?id=" + item.id };
								events.push(event_item);

							}
							var filters2 = {
								filters: {
									"$and": [
										{ "time_of_purchase": { "$gte": starttime._i / 1000 } }, { "time_of_purchase": { "$lte": endtime._i / 1000 } },
									]
								},
								order_by: [{ "field": "created_at", "direction": "asc" }]
							}
							$.ajax({
								url: self.getApp().serviceURL + "/api/v1/equipmentdetails",
								method: "GET",
								data: { "q": JSON.stringify(filters2, { "order_by": [{ "field": "name", "direction": "desc" }], "page": 1, "results_per_page": 100 }) },
								contentType: "application/json",
								success: function (data2) {
									for (var i = 0; i < data2.objects.length; i++) {
										var item2 = data2.objects[i];
										var start2 = "";
										if (item2.time_of_purchase !== null) {
											start2 = item2.time_of_purchase;
										}
										var event_item2 = { "start": start2 * 1000 + 100000000, "title": item2.name + '[' + [item2.model_serial_number,] + ']' , "url": "#equipmentdetails/model?id=" + item2.id };
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