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
			self.renderCalendar();
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
			// 	events: function (starttime, endtime, timezone, callback) {
			// 		var filters = {
			// 			filters: {
			// 				"$or": [
			// 					{ "$and": [{ "ngaysoanthao": { "$gte": starttime._i/1000 } }, { "ngaysoanthao": { "$lte": endtime._i/1000  } }] },
			// 					{ "$and": [{ "ngaypheduyet_phong": { "$gte": starttime._i/1000 } }, { "ngaypheduyet_phong": { "$lte": endtime._i/1000  } }] },
			// 					{ "$and": [{ "ngaypheduyet_pct": { "$gte": starttime._i/1000 } }, { "ngaypheduyet_pct": { "$lte": endtime._i/1000  } }] },
			// 					{ "$and": [{ "ngaypheduyet_quyetdinh": { "$gte": starttime._i/1000  } }, { "ngaypheduyet_quyetdinh": { "$lte": endtime._i/1000  } }] },
			// 					{ "$and": [{ "ngaythanhtra": { "$gte": starttime._i/1000  } }, { "ngaythanhtra": { "$lte": endtime._i/1000  } }] },
			// 					{ "$and": [{ "ngayketthuc": { "$gte": starttime._i/1000  } }, { "ngayketthuc": { "$lte": endtime._i/1000  } }] }
			// 				]
			// 			}
			// 		}
			// 		console.log(moment(starttime._i).format('MMMM Do YYYY, h:mm:ss a'),endtime._i)

			// 		$.ajax({
			// 			url: self.getApp().serviceURL + "/api/v1/kehoachthanhtra",
			// 			method: "GET",
			// 			data: { "q": JSON.stringify(filters, { "order_by": [{ "field": "tenkehoach", "direction": "desc" }], "page": 1, "results_per_page": 100 }) },
			// 			contentType: "application/json",
			// 			success: function (data) {
			// 				console.log(data);
			// 				var events = [];
			// 				for (var i = 0; i < data.objects.length; i++) {
			// 					var item = data.objects[i];
			// 					var start = "";
			// 					if (item.ngayketthuc !== null) {
			// 						start = item.ngayketthuc;
			// 					} else if (item.ngaythanhtra !== null) {
			// 						start = item.ngaythanhtra;
			// 					} else if (item.ngaypheduyet_quyetdinh !== null) {
			// 						start = item.ngaypheduyet_quyetdinh;
			// 					} else if (item.ngaypheduyet_pct !== null) {
			// 						start = item.ngaypheduyet_pct;
			// 					} else if (item.ngaypheduyet_phong !== null) {
			// 						start = item.ngaypheduyet_phong;
			// 					} else if (item.ngaysoanthao !== null) {
			// 						start = item.ngaysoanthao;
			// 					}
			// 					var event_item = { "start": start*1000+100000000, "title": item.tenkehoach + '[' + self.getApp().trangthai[item.trangthai] + ']', "url": "#kehoachthanhtra/model?id=" + item.id };
			// 					events.push(event_item);
			// 				}
			// 				callback(events);
			// 			},
			// 			error: function (xhr, status, error) {
			// 				try {
			// 					if (($.parseJSON(error.xhr.responseText).error_code) === "SESSION_EXPIRED") {
			// 						self.getApp().notify("Hết phiên làm việc, vui lòng đăng nhập lại!");
			// 						self.getApp().getRouter().navigate("login");
			// 					} else {
			// 						self.getApp().notify({ message: $.parseJSON(error.xhr.responseText).error_message }, { type: "danger", delay: 1000 });
			// 					}
			// 				} catch (err) {
			// 					self.getApp().notify({ message: "Lỗi không lấy được dữ liệu" }, { type: "danger", delay: 1000 });
			// 				}
			// 			}
			// 		});
			// 	}
			});
			


		 }
	});

});