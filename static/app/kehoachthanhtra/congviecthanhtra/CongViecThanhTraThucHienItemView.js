define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template = require('text!app/kehoachthanhtra/congviecthanhtra/tpl/thuchienitem.html'),
		CongViecView = require('app/kehoachthanhtra/congviecthanhtra/CongViecThanhTraItemView');
    
    
    
    return CongViecView.extend({
	    	template : template,
	    	
	 
    });

});