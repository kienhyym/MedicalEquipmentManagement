define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/login/tpl/changepassword.html')

	return Gonrin.View.extend({
		template: template,
		modelSchema: {},

		render: function () {
			var self = this;
			var id=self.id;
			var pass = self.password;
			self.applyBindings();
			self.changepasswordEvent(id);
			
			console.log(pass);
		},
		changepasswordEvent: function (id) {
            var self = this;
			var id = id;
			console.log('aa',id);
            self.$el.find("#btn-changepassword").unbind("click").bind("click", function () {
                if(self.$el.find("#txtpass").val() === undefined || self.$el.find("#txtpass").val() === ""){
                    self.getApp().notify("mật khẩu cũ không được bỏ trống");
                    return false;
				}
				if(self.$el.find("#txtpass2").val() === undefined || self.$el.find("#txtpass2").val() === ""){
                    self.getApp().notify("Mật khẩu mới không được bỏ trống");
                    return false;
				}
				if(self.$el.find("#txtpass3").val() !== self.$el.find("#txtpass2").val() ){
                    self.getApp().notify("Mật khẩu mới viết không giống ở trên");
                    return false;
                }
                $.ajax({
                    type: 'PUT',
					url:self.getApp().serviceURL + "/api/v1/user/"+id,
					headers: {
						'content-type': 'application/json'
					},
					dataType: 'json',
                    data: JSON.stringify({
                        password: self.$el.find("#txtpass2").val()  
                    }), 
                    success: function (response) {
                        if (response) {
							self.getApp().notify("Đổi mật khẩu thành công");
                            self.getApp().getRouter().navigate("login");
                        }
                       
                    }, error: function (xhr) {
                        console.log('xhr',xhr);
                    }
                })
            });
        }
	});
});