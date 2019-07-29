define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/baocao2/phuluc1/tpl/model.html')
		// schema = require('json!schema/BaoCaoSchema.json');

	return Gonrin.View.extend({
		template: template,
		// modelSchema: schema,
		// urlPrefix: "/api/v1/",
		// collectionName: "baocao",
		
		render: function () {           
                this.applyBindings();   
		},

	});

});