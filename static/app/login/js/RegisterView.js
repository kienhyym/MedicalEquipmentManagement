// define(function (require) {

//     "use strict";
//     var $                   = require('jquery'),
//         _                   = require('underscore'),
//         Gonrin            	= require('gonrin'),
//         storejs				= require('vendor/store'),
//         tpl                 = require('text!app/login/tpl/register.html');
//     var template = gonrin.template(tpl)({});


//     return Gonrin.View.extend({
//         render: function () {
//         	var self = this;
//             this.$el.html(template);
//             this.$el.find("#register-form").unbind("submit").bind("submit", function(){
//             	self.processRegister();
//             	return false;
//             });
//             return this;
//         },
//        	processRegister: function(){
//        		var self = this;
//        		var hoten = this.$('[name=hoten]').val();
//        		var phone = this.$('[name=phone]').val();
//        		var email = this.$('[name=email]').val();
//        		var macongdan = this.$('[name=macongdan]').val();
//        		var password = this.$('[name=password]').val();
//        		var confirm_password = this.$('[name=confirm_password]').val();
//        		var qrcode = self.getApp().getParameterUrl("qr", window.location.href);
//        		if(phone === undefined || phone === ""){
//        			self.getApp().notify("Số điện thoại không được bỏ trống");
//        			return false;
//        		}
// //       		if(macongdan === undefined || macongdan === ""){
// //       			self.getApp().notify("Mã công dân không được bỏ trống");
// //       			return false;
// //       		}
// //       		if(email === undefined || email === ""){
// //       			self.getApp().notify("Email không được bỏ trống");
// //       			return false;
// //       		}
//        		if(password === undefined || password === "" || password !== confirm_password){
//        			self.getApp().notify("Mật khẩu không khớp");
//        			return false;
//        		}
//        		var data;
//        		if(qrcode !== undefined && qrcode!== null && qrcode !==""){
// 	       		data = JSON.stringify({
// 	   		        hoten: hoten,
// 	   		        phone:phone,
// 	   		        email: email,
// 	   		        macongdan:macongdan,
// 	   		        password: password,
// 	   		        password_confirm: confirm_password,
// 	   		        qr: qrcode
// 	   		    });
//        		}else{
//        			data = JSON.stringify({
//        	   		        hoten: hoten,
//        	   		        phone:phone,
//        	   		        email: email,
//        	   		        macongdan:macongdan,
//        	   		        password: password,
//        	   		        password_confirm: confirm_password
//        		});
//        		var self = this;
//        		$.ajax({
//        		    url: (self.getApp().serviceURL || "") + '/api/register',
//        		    type: 'post',
//        		    data: data,
//        		    headers: {
//     		    	'content-type': 'application/json'
//     		    },
//     		    beforeSend: function(){
//        		    	$("#loading").removeClass("hidden");
//        		    },
//        		    complete: function(){
//     		    	$("#loading").addClass("hidden");
//     		    },
//        		    dataType: 'json',
//        		    success: function (data) {
// //       		    var param_qr = "";
// //	       		 if(qrcode !== undefined && qrcode!== null && qrcode !==""){
// //	       			 param_qr = "?qr="+qrcode;
// //	       		 }
// //	       		 var url_redirect = "index"+param_qr;
// //       		    	self.getApp().getRouter().navigate(url_redirect);
//        		    	self.getApp().postLogin(data);
       		    	
//        		    },
//        		    error: function(request, textStatus, errorThrown) {
//        		    	try {
//        		    		self.getApp().notify("Đăng ký lỗi "+$.parseJSON(request.responseText).error_msg);
//        		    		}				  	  				    	
//        		    	catch(err) {
//        		    		self.getApp().notify("Đăng ký lỗi "+request.responseText);
//        		    		}
//        		    }
//        		});
//        	}
//      }

//     });

// });