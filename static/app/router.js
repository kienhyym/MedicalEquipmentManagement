define(function (require) {

    "use strict";
    
    var $           = require('jquery'),
        Gonrin    	= require('gonrin');
    var Login		= require('app/login/js/LoginView');
    var ForgotPasswordView	= require('app/login/js/ForgotPasswordView');

    var navdata = require('app/nav/route');
    
    return Gonrin.Router.extend({
        routes: {
        	"index" : "index",
            "login":"login",
            "logout": "logout",
            "forgot":"forgotPassword",
//            "dangkykham":"dangkykham",
            "error":"error_page",
            "*path":  "defaultRoute"
        },
        defaultRoute:function(){
        	//this.navigate("index",true);
//        	this.navigate('dangkykham/collection');
        },
        index:function(){
        	this.navigate('dangkykham/collection');
        },
        logout: function(){
        	var self = this;
        	$.ajax({
				url: self.getApp().serviceURL + '/api/v1/logout',
       		    dataType:"json",
       		    success: function (data) {
       		    },
       		    error: function(XMLHttpRequest, textStatus, errorThrown) {
//       		    	self.getApp().notify(self.getApp().translate("LOGOUT_ERROR"));
       		    },
       		    complete: function(){
       		    	self.navigate("login");
       		    }
       		    
        	});
        },
        error_page: function(){
        	var app = this.getApp();
        	if(app.$content){
        		app.$content.html("Error Page");
        	}
        	return;
        },
        login: function(){
            var loginview = new Login({el: $('.content-contain')});
            loginview.render();
        },
        forgotPassword: function(){
            var forgotPassView = new ForgotPasswordView({el: $('.content-contain')});
            forgotPassView.render();
        },
        registerAppRoute: function(){
            var self = this;
            $.each(navdata, function(idx, entry){
                var entry_path = _.result(entry,'route');
                self.route(entry_path, entry.collectionName, function(){
                    require([ entry['$ref'] ], function ( View) {
                        var view = new View({el: self.getApp().$content, viewData:entry.viewData});
                        view.render();
                    });
                });
            });
        },
    });

});