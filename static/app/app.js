define('jquery', [], function() {
    return jQuery;
});

require.config({
	baseUrl: static_url + '/js/lib',
    paths: {
        app: '../../app',
        tpl: '../tpl',
        vendor: '../../vendor',
        schema: '../../schema'
    },
//	paths: {
//		app: '../app',
//		schema: '../schema',
//		tpl: '../tpl',
//		vendor: '../../vendor'
//	},
    shim: {
    	'gonrin': {
            deps: ['underscore', 'jquery', 'backbone'],
            exports: 'Gonrin'
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        }
    }
});


//window.fbAsyncInit = function() {
//    FB.init({
//      xfbml            : true,
//      version          : 'v3.2'
//    });
//  };

require(['jquery', 'gonrin', 'app/router', 'app/nav/NavbarView','text!app/base/tpl/mobilelayout.html','text!app/base/tpl/layoutadmin.html', 'i18n!app/nls/app', 'vendor/store'], function ($, Gonrin, Router, Nav, layoutuser,layoutadmin, lang, storejs) {
	$.ajaxSetup({
   	    headers: {
   	        'content-type':'application/json'
   	    }
   	});
	
	var app = new Gonrin.Application({
//		serviceURL: location.protocol+'//'+location.hostname+(location.port ? ':'+location.port : ''),
		serviceURL: "https://somevabe.com/datkham",
		router: new Router(),
		lang: lang,
		layoutadmin: layoutadmin,
		layoutuser: layoutuser,
		staticURL: static_url,
		initialize: function(){
			this.getRouter().registerAppRoute();
			this.initSDKFacebook();
			this.initFireBaseNotify();
			this.getCurrentUser();
			
			
		},
		initFireBaseNotify:function(){
			var config = {
			    apiKey: "AIzaSyC7jTLBbeqCeUW9PB2l4s2aRI4zGiN5hb4",
			    authDomain: "dat-kham-truc-tuyen.firebaseapp.com",
			    databaseURL: "https://dat-kham-truc-tuyen.firebaseio.com",
			    projectId: "dat-kham-truc-tuyen",
			    storageBucket: "dat-kham-truc-tuyen.appspot.com",
			    messagingSenderId: "637676599535"
			  };
			  firebase.initializeApp(config);

		},
		initSDKFacebook: function(){
			try{
				//AccountKit_OnInteractive = function(){
				AccountKit.init(
				  {
				    appId:"568327210317991", 
				    state:"dangkykham1212121412412312", 
				    version:"v1.3",
				    fbAppEventsEnabled:true,
				   	debug:true,
				   	display:"modal",
				    redirect:"https://somevabe.com/datkham"
				  }
				);
				 
				//};
				
				  

				(function(d, s, id) {
				  var js, fjs = d.getElementsByTagName(s)[0];
				  if (d.getElementById(id)) return;
				  js = d.createElement(s); js.id = id;
				  js.src = 'https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js';
				  fjs.parentNode.insertBefore(js, fjs);
				}(document, 'script', 'facebook-jssdk'));
				
			}catch(ex){
				console.log(ex);
			}
		},
		getCurrentUser : function(){
			var self = this;
			$.ajax({
				url: self.serviceURL + '/api/v1/current_user',
       		    dataType:"json",
       		    success: function (data) {
       		    	self.postLogin(data);
       		    },
       		    error: function(XMLHttpRequest, textStatus, errorThrown) {
       	            self.router.navigate("login");
       		    }
       		});
		},
		loginCallback: function(response) {
			 var self = gonrinApp();
			console.log("loginCallback.response====",response)
		    if (response.status === "PARTIALLY_AUTHENTICATED") {
		      var code = response.code;
		      var csrf = response.state;
		      var params = JSON.stringify({
		    	  code: code,
		    	  state: csrf
     		    });
		      $.ajax({
					url: self.serviceURL + '/api/facebook/get-token',
	       		    dataType:"json",
	       		    type:"POST",
	       		    data:params,
	       		    headers: {
	       		    	'content-type': 'application/json'
	       		    },
	       		    success: function (data) {
	       		    	self.postLogin(data);
	       		    },
	       		    error: function(XMLHttpRequest, textStatus, errorThrown) {
	       		    	self.notify("Có lỗi xảy ra, vui lòng thử lại sau");
	       		    }
	       		});
		    } else if (response.status === "NOT_AUTHENTICATED") {
		    	self.notify("Không xác thực được số điện thoại của bạn, vui lòng kiểm tra lại");
		    	$('body').html(layoutuser);
	    		self.router.navigate('dangkykham/model');
		    } else if (response.status === "BAD_PARAMS") {
		    	app.notify("Không xác thực được số điện thoại của bạn, vui lòng kiểm tra lại");
		    }
		  },
		genId: function(salt){
    		var hashids = new Hashids(salt);
    		var max = 10000, min=1;
    		var ranNum = Math.floor(Math.random() * (max - min + 1) + min);
    		var now = moment().unix();
    		var id = hashids.encode(now, ranNum);
    		return id;
    	},
		postLogin: function(data){
			var self = this;
			self.currentUser = new Gonrin.User(data);
			var tpl = gonrin.template(layoutuser)({});
			$('.content-contain').html(tpl);
			this.$header = $('body').find(".main-sidebar");
			this.$content = $('body').find(".content-area");
			this.$navbar = $('body').find(".main-sidebar .nav-wrapper");
			
			this.nav = new Nav({el: this.$navbar});
			self.nav.render();
			var currentRoute = self.getRouter().currentRoute().fragment;
			if(self.currentUser.hasRole("Admin") === true){
				if(currentRoute.indexOf('login')>=0){
					self.router.navigate('cosokcb/collection');
				}
				
			}else if(self.currentUser.hasRole("CoSoKCB") === true){
				if(currentRoute.indexOf('login')>=0){
					self.router.navigate('dangkykham/model');
				}

			}
			
			$("span#display_name").html(self.get_displayName(data));
			
			self.bind_event();
			try{
				FB.XFBML.parse();
				FB.CustomerChat.show(true);
				FB.CustomerChat.showDialog();
			}catch(ex){
				console.log(ex);
			}
//			// Retrieve Firebase Messaging object.
//			const messaging = firebase.messaging();
//			// Add the public key generated from the console here.
//			messaging.usePublicVapidKey("BJI8925mdWZhEP0OnuBl-b7JSl5GuK4uu8HdBYGo5EmMEPd740pIiSw60Fz--SUM7AvtdeCIXTgvTijaqgzHcMU");
//			messaging.requestPermission().then(function() {
//				  console.log('Notification permission granted.');
//				  // TODO(developer): Retrieve an Instance ID token for use with FCM.
//				  // ...
//				// Get Instance ID token. Initially this makes a network call, once retrieved
//					// subsequent calls to getToken will return from cache.
//					messaging.getToken().then(function(currentToken) {
//					  if (currentToken) {
//						  var params = JSON.stringify({
//					    	  data: currentToken
//			     		    });
//					      $.ajax({
//								url: self.serviceURL + '/api/v1/set_notify_token',
//				       		    dataType:"json",
//				       		    type:"POST",
//				       		    data:params,
//				       		    headers: {
//				       		    	'content-type': 'application/json'
//				       		    },
//				       		    success: function (data) {
//				       		    	console.log("set token firebase success!!!");
//				       		    	messaging.onMessage(function(payload) {
//				      				  console.log('Message received. ', payload);
//				      				  self.getApp().notify("Notify firebase===",payload);
//				      				});
////				      				messaging.setBackgroundMessageHandler(function(payload) {
////				      					  console.log('[firebase-messaging-sw.js] Received background message ', payload);
////				      					  // Customize notification here
////				      					  var notificationTitle = 'Thông báo';
////				      					  var notificationOptions = {
////				      					    body: 'payload',
////				      					    icon: '/firebase-logo.png'
////				      					  };
////
////				      					  return self.registration.showNotification(notificationTitle,
////				      					    notificationOptions);
////				      					});
//				       		    },
//				       		    error: function(XMLHttpRequest, textStatus, errorThrown) {
//				       		    	console.log("set notify firebase failed");
//				       		    }
//				       		});
//						  
//						  
////					    sendTokenToServer(currentToken);
////					    updateUIForPushEnabled(currentToken);
//					  } else {
//					    // Show permission request.
//					    console.log('No Instance ID token available. Request permission to generate one.');
//					    // Show permission UI.
////					    updateUIForPushPermissionRequired();
////					    setTokenSentToServer(false);
//					  }
//					}).catch(function(err) {
//					  console.log('An error occurred while retrieving token. ', err);
////					  showToken('Error retrieving Instance ID token. ', err);
////					  setTokenSentToServer(false);
//					});
//				  
//				}).catch(function(err) {
//				  console.log('Unable to get permission to notify.', err);
//				});
//			
				

		},
		bind_event:function(){
			var self= this;
			$("#logo").bind('click', function(){
				self.router.navigate('dangkykham/collection');
            });
			
			$("#logout").unbind('click').bind('click', function(){
	    	    self.router.navigate("logout");
	    	    
	    	});
			
			//for show/hide notify
			$.extend($.easing, {
				  easeOutSine: function easeOutSine(x, t, b, c, d) {
				    return c * Math.sin(t / d * (Math.PI / 2)) + b;
				  }
				});

			  var slideConfig = {
			    duration: 270,
			    easing: 'easeOutSine'
			  };

			  // Add dropdown animations when toggled.
			  $(':not(.main-sidebar--icons-only) .dropdown').on('show.bs.dropdown', function () {
			    $(this).find('.dropdown-menu').first().stop(true, true).slideDown(slideConfig);
			  });

			  $(':not(.main-sidebar--icons-only) .dropdown').on('hide.bs.dropdown', function () {
			    $(this).find('.dropdown-menu').first().stop(true, true).slideUp(slideConfig);
			  });

			  /**
			   * Sidebar toggles
			   */
			  $('.toggle-sidebar').unbind("click").bind('click',function (e) {
				  $('.main-sidebar').toggleClass('open');
			  });
			  
			  
//			  $('.nav-wrapper a').removeClass('active');
//			  $('.nav-wrapper a.cosokcb_collection').unbind('click').bind('click',function(){
//					$('.nav-wrapper a').removeClass('active');
//					$(this).addClass('active');
//					$('.main-sidebar').toggleClass('open');
//				});
//				$('.nav-wrapper a.cosokcb_model').unbind('click').bind('click',function(){
//					$('.nav-wrapper a').removeClass('active');
//					$(this).addClass('active');
//					$('.main-sidebar').toggleClass('open');
//				});
//				$('.nav-wrapper a.dangkykham').unbind('click').bind('click',function(){
//					$('.nav-wrapper a').removeClass('active');
//					$(this).addClass('active');
//					$('.main-sidebar').toggleClass('open');
//				});
//				$('.nav-wrapper a.appinfo').unbind('click').bind('click',function(){
//					$('.nav-wrapper a').removeClass('active');
//					$(this).addClass('active');
//					$('.main-sidebar').toggleClass('open');
//				});
		},
		process_notify:function(){
		},
		get_displayName: function(data){
			var displayName = "";
			if (!!data.first_name){
				displayName = data.first_name;
			}
			if (!!data.last_name){
				displayName = displayName+" "+ data.last_name;
			}
			if(displayName=== null || displayName===""){
				if(!!data.phone_number){
					displayName = data.phone_number;
				} else if(!!data.email){
					displayName = data.email;
				}
				
			}
			return displayName;
		}
		
	});
    Backbone.history.start();
    
});