define(function (require) {

    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin            	= require('gonrin'),
        storejs				= require('vendor/store'),
		tpl                 = require('text!app/login/tpl/register.html');
		

    var template = gonrin.template(tpl)({});


    return Gonrin.View.extend({
		template: template,
		modelSchema: [],
		urlPrefix: "/api/v1/",
		collectionName: "",
		//tools:null,

		render: function () {
			var self = this;
			self.applyBindings();
			self.registerEvent();
		},

		registerEvent: function () {
            console.log('asdfg')
            var self = this;
            self.$el.find("#btn-register").unbind("click").bind("click", function () {
				console.log('self',self);
                $.ajax({
                    method: "POST",
                    url:self.getApp().serviceURL + "/api/v1/register",
                    // url: "http://0.0.0.0:9080/api/v1/register",
                    data: JSON.stringify({
                        email: self.$el.find("#txtemail").val(),
                        phone: self.$el.find("#txtphone").val(),
                        password: self.$el.find("#txtpass").val(),
                        fullname: self.$el.find("#txtname").val(),

                    }), success: function (response) {
                        console.log('a',response);
                        if (response) {
							// toastr.success("Đăng ký thành công");
							self.getApp().notify("Đăng ký thành công");
                            self.getApp().getRouter().navigate("login");
                        }
                    }, error: function (xhr) {
                        console.log('xhr',xhr);
						// toastr.error(xhr.responseJSON.message);
						// self.getApp().notify(xhr.responseJSON.message);
                    }
                })
            });
        }
	});

});