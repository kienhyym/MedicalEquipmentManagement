define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!app/lichthanhtra/tpl/model.html'),
    	schema 				= require('json!schema/KeHoachThanhTraSchema.json');
	var TinhThanhSelectView = require('app/DanhMuc/TinhThanh/view/SelectView');
    var TemplateHelper		= require('app/base/view/TemplateHelper');

    return Gonrin.ModelView.extend({
    	template : template,
    	urlPrefix: "/api/v1/",
    	modelSchema	: schema,
    	collectionName: "kehoachthanhtra",
    	uiControl:{
    	},
    	render:function(){
    		var self = this;
    		self.renderCalendar();
//    		self.bindEventSelect();
////			self.updateUIPermission();
//    		
//    		
//    		var id = this.getApp().getRouter().getParam("id");
//    		if(id){
//    			this.model.set('id',id);
//        		this.model.fetch({
//        			success: function(data){
//        				self.applyBindings();
//    	    			self.$el.find("#multiselect_donvidoanhnghiep").selectpicker('val',self.model.get("madoanhnghiep"));
//    	    			self.updateUITimeline(self.model.toJSON());
//    	    			self.updateUIPermission();
//        			},
//        			error: function (xhr, status, error) {
//						try {
//							if (($.parseJSON(error.xhr.responseText).error_code) === "SESSION_EXPIRED"){
//								self.getApp().notify("Hết phiên làm việc, vui lòng đăng nhập lại!");
//								self.getApp().getRouter().navigate("login");
//							} else {
//								self.getApp().notify({ message: $.parseJSON(error.xhr.responseText).error_message }, { type: "danger", delay: 1000 });
//							}
//						}
//						catch (err) {
//						  self.getApp().notify({ message: "Không tìm thấy dữ liệu"}, { type: "danger", delay: 1000 });
//						}
//					},
//        		});
//    		}else{
//    			self.applyBindings();
//    		}
    		
    	},
    	renderCalendar : function(){
    		var self = this;
    		var currentUser = self.getApp().currentUser;
    		var trangthai = self.model.get("trangthai");
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
    		      events: function(starttime, endtime, timezone, callback) {
    		    	  var filters = {
    							filters: {
    								"$or": [
    									{"$and":[{ "ngaysoanthao": { "$gte": starttime } },{ "ngaysoanthao": { "$lte": endtime } }]},
    									{"$and":[{ "ngaypheduyet_phong": { "$gte": starttime } },{ "ngaypheduyet_phong": { "$lte": endtime } }]},
    									{"$and":[{ "ngaypheduyet_pct": { "$gte": starttime } },{ "ngaypheduyet_pct": { "$lte": endtime } }]},
    									{"$and":[{ "ngaypheduyet_quyetdinh": { "$gte": starttime } },{ "ngaypheduyet_quyetdinh": { "$lte": endtime } }]},
    									{"$and":[{ "ngaythanhtra": { "$gte": starttime } },{ "ngaythanhtra": { "$lte": endtime } }]},
    									{"$and":[{ "ngayketthuc": { "$gte": starttime } },{ "ngayketthuc": { "$lte": endtime } }]}
    								]
    							}
    						}
    		    			
    		    		
    		    		$.ajax({
    		    			url: self.getApp().serviceURL + "/api/v1/kehoachthanhtra",
    		    			method: "GET",
    		        		data: {"q": JSON.stringify(filters,{"order_by":[{"field": "name", "direction": "desc"}], "page":1,"results_per_page":100})},
    		    			contentType: "application/json",
    		    			success: function (data) {
    		    				console.log(data);
    		    				var events = [];
//        		    	        $(doc).find('event').each(function() {
//        		    	          events.push({
//        		    	            title: $(this).attr('title'),
//        		    	            start: $(this).attr('start') // will be parsed
//        		    	          });
//        		    	        });
        		    	        callback(events);
    		    			},
    		    			error: function (xhr, status, error) {
    		    				try {
    		    					if (($.parseJSON(error.xhr.responseText).error_code) === "SESSION_EXPIRED"){
    		    						self.getApp().notify("Hết phiên làm việc, vui lòng đăng nhập lại!");
    		    						self.getApp().getRouter().navigate("login");
    		    					} else {
    		    					    self.getApp().notify({ message: $.parseJSON(error.xhr.responseText).error_message }, { type: "danger", delay: 1000 });
    		    					}
    		    				}catch (err) {
    		    				    self.getApp().notify({ message: "Lỗi không lấy được dữ liệu"}, { type: "danger", delay: 1000 });
    		    				}
    		    			}
    		    		});
    		      }
    		    });
//    		$('#calendar').fullCalendar({
//    			  themeSystem: 'bootstrap4',
//	  		      header: {
//	  		        left: 'prev,next today',
//	  		        center: 'title',
//	  		        right: 'month,agendaWeek,agendaDay,listMonth'
//	  		      },
//	  		      weekNumbers: true,
//	  		      eventLimit: true, // allow "more" link when too many events
//	  		      events: 'https://fullcalendar.io/demo-events.json',
//    		      locale: initialLocaleCode,
//    		      buttonIcons: false, // show the prev/next text
//    		      navLinks: true, // can click day/week names to navigate views
//    		      editable: true
//    		});


    	},
    	getListPlan: function(starttime, endtime){
    		var self = this;
    		var currentUser = self.getApp().currentUser;
    		var trangthai = self.model.get("trangthai");
    		var filters = {
					filters: {
						"$or": [
							{"$and":[{ "ngaysoanthao": { "$gte": starttime } },{ "ngaysoanthao": { "$lte": endtime } }]},
							{"$and":[{ "ngaypheduyet_phong": { "$gte": starttime } },{ "ngaypheduyet_phong": { "$lte": endtime } }]},
							{"$and":[{ "ngaypheduyet_pct": { "$gte": starttime } },{ "ngaypheduyet_pct": { "$lte": endtime } }]},
							{"$and":[{ "ngaypheduyet_quyetdinh": { "$gte": starttime } },{ "ngaypheduyet_quyetdinh": { "$lte": endtime } }]},
							{"$and":[{ "ngaythanhtra": { "$gte": starttime } },{ "ngaythanhtra": { "$lte": endtime } }]},
							{"$and":[{ "ngayketthuc": { "$gte": starttime } },{ "ngayketthuc": { "$lte": endtime } }]}
						]
					}
				}
    			
    		
    		$.ajax({
    			url: self.getApp().serviceURL + "/api/v1/kehoachthanhtra",
    			method: "GET",
        		data: {"q": JSON.stringify(filters,{"order_by":[{"field": "name", "direction": "desc"}], "page":1,"results_per_page":100})},
    			contentType: "application/json",
    			success: function (data) {
    				console.log(data);
    				
    			},
    			error: function (xhr, status, error) {
    				try {
    					if (($.parseJSON(error.xhr.responseText).error_code) === "SESSION_EXPIRED"){
    						self.getApp().notify("Hết phiên làm việc, vui lòng đăng nhập lại!");
    						self.getApp().getRouter().navigate("login");
    					} else {
    					    self.getApp().notify({ message: $.parseJSON(error.xhr.responseText).error_message }, { type: "danger", delay: 1000 });
    					}
    				}catch (err) {
    				    self.getApp().notify({ message: "Lỗi không lấy được dữ liệu"}, { type: "danger", delay: 1000 });
    				}
    			}
    		});
    	},
    	bindEventSelect: function(){
    		var self = this;
    		
    	},
    	updateUITimeline:function(data){
    		var self = this;
    		var el_status_new = self.$el.find("#timeline .kehoach_new");
			el_status_new.addClass("complete");
			el_status_new.find('.author').html(data.username_nguoisoanthao || "&nbsp;");
			var template_helper = new TemplateHelper();
			var ngaysoanthao = template_helper.datetimeFormat(data.ngaysoanthao, "DD/MM/YYYY");
			el_status_new.find('.date').html(ngaysoanthao || "&nbsp;");
			var arr_timeline_capphong = ["send_review_pct","cancel_reviewed_pct","send_approved","approved","cancel_approved","checked"]
			if(data.trangthai != "new" && data.trangthai != "send_review_truongphong" && 
					data.trangthai != "cancel_reviewed_truongphong"){
				console.log("timeline truong phong");
				var el_status_capphong = self.$el.find("#timeline .kehoach_send_review_capphong");
				el_status_capphong.addClass("complete");
				el_status_capphong.find('.author').html(data.username_phongduyet || "&nbsp;");
				var template_helper = new TemplateHelper();
				var ngaypheduyet_phong = template_helper.datetimeFormat(data.ngaypheduyet_phong, "DD/MM/YYYY");
				el_status_capphong.find('.date').html(ngaypheduyet_phong || "&nbsp;");
			}
			var arr_timeline_cucpho = ["completed","result_checked","checked","cancel_approved","approved","send_approved"]
			if(arr_timeline_cucpho.indexOf(data.trangthai)>=0){
				var el_status_cucpho = self.$el.find("#timeline .kehoach_send_review_pct");
				el_status_cucpho.addClass("complete");
				el_status_cucpho.find('.author').html(data.username_pctduyet || "&nbsp;");
				var template_helper = new TemplateHelper();
				var ngaypheduyet_cucpho = template_helper.datetimeFormat(data.ngaypheduyet_pct, "DD/MM/YYYY");
				el_status_cucpho.find('.date').html(ngaypheduyet_cucpho || "&nbsp;");
				self.$el.find(".ngayketthuc").removeClass("d-none");
			}
			var arr_timeline_cuctruong = ["completed","result_checked","checked","approved"]
			if(arr_timeline_cuctruong.indexOf(data.trangthai)>=0){
				var el_status_cuctruong = self.$el.find("#timeline .kechoach_approved");
				el_status_cuctruong.addClass("complete");
				el_status_cuctruong.find('.author').html(data.username_quyetdinh  || "&nbsp;");
				var template_helper = new TemplateHelper();
				var ngaypheduyet_quyetdinh = template_helper.datetimeFormat(data.ngaypheduyet_quyetdinh, "DD/MM/YYYY");
				el_status_cuctruong.find('.date').html(ngaypheduyet_quyetdinh || "&nbsp;");
				self.$el.find(".ngayketthuc").removeClass("d-none");
			}
			var arr_timeline_checked = ["completed","result_checked","checked"]
			if(arr_timeline_checked.indexOf(data.trangthai)>=0){
				var el_status_checked = self.$el.find("#timeline .kechoach_checked");
				el_status_checked.addClass("complete");
				el_status_checked.find('.author').html('&nbsp;');
				var template_helper = new TemplateHelper();
				var ngaythanhtra = template_helper.datetimeFormat(data.ngaythanhtra, "DD/MM/YYYY");
				el_status_checked.find('.date').html(ngaythanhtra  || "&nbsp;");
				self.$el.find(".ngayketthuc").removeClass("d-none");
			}
			var arr_timeline_completed = ["completed","result_checked"]
			if(arr_timeline_completed.indexOf(data.trangthai)>=0){
				var el_status_completed = self.$el.find("#timeline .kechoach_completed");
				el_status_completed.addClass("complete");
				el_status_completed.find('.author').html('&nbsp;');
				var template_helper = new TemplateHelper();
				var ngayketthuc = template_helper.datetimeFormat(data.ngayketthuc, "DD/MM/YYYY");
				el_status_completed.find('.date').html(ngayketthuc  || "&nbsp;");
				self.$el.find(".ngayketthuc").removeClass("d-none");
			}	
    	},
    	validatePhone: function(inputPhone) {
			if (inputPhone == null || inputPhone == undefined) {
				return false;
			}
			var phoneno = /^0([1-9]{1})([0-9]{8})$/;
            const result = inputPhone.match(phoneno);
            if (result!==null && result.indexOf(inputPhone)>=0) {
                return true;
            } else {
                return false;
            }
        }
    });

});