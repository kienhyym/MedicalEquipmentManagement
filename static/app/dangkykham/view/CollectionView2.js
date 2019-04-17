define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    
    var template 				= require('text!app/dangkykham/tpl/collection.html'),
	schema 				= require('json!schema/DangKyKhamSchema.json');
    var TemplateHelper		= require('app/base/view/TemplateHelper');
	var CustomFilterView    = require('app/base/view/CustomFilterView');

    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "dangkykham",
    	tools : [
    	    {
    	    	name: "defaultgr",
    	    	type: "group",
    	    	groupClass: "toolbar-group",
    	    	buttons: [
					{
		    	    	name: "create",
		    	    	type: "button",
		    	    	buttonClass: "btn-success btn-sm",
		    	    	label: "TRANSLATE:create_medical",
		    	    	command: function(){
		    	    		var self = this;
		    	    		self.getApp().getRouter().navigate(this.collectionName+'/model');
		    	    	}
		    	    },
    	    	]
    	    },
    	],
    	uiControl:{
    		fields: [
    			{
	            	 field: "hoten", 
	            	 label: "Họ tên"
	           	 },
	           	{
	            	 field: "dienthoai", 
	            	 label: "Điện thoại",
	            	 template:function(rowData){
	            		 var self = this;
	            		 var currentUser = gonrinApp().currentUser;
	            		 if (currentUser.hasRole("CoSoKCB") && rowData.status<1){
	            			 return "**********";
	            		 }else{
	            			 return rowData.dienthoai;
	            		 }
	            		 
	            		 
	            	 }
	           	 },
    			{ field: "lydokham", label: "Lý do khám"},
    			{ field: "ngayhenkham", label: "Ngày hẹn khám",
    				template:function(rowData){
	            		 if (!!rowData && rowData.ngayhenkham){
	            			 var template_helper = new TemplateHelper();
	    	    	    	 return template_helper.datetimeFormat(rowData.ngayhenkham, "DD/MM/YYYY");
	            		 }
	            		 return "";
	            	 }
    			},
//    			{ field: "thoigiankham", label: "Thời gian khám"},
		     	{
	            	 field: "cosokcb_id", 
	            	 label: "Nơi khám",
	            	 foreign: "cosokcb",
	            	 foreignValueField: "id",
	            	 foreignTextField: "ten_coso",
	           	 },
		     	{
               	 field: "trangthai", 
               	 label: "Trạng thái",
               	 foreignValueField: "value",
               	 foreignTextField: "text",
	             foreignValues: [
	            	 { value: 0, text: "Tạo mới" },
                     { value: 1, text: "Xác nhận của cơ sở KCB" },
                     { value: 2, text: "Đã tới khám" },
                     { value: 3, text: "đã trả kết quả" }
	           	 ],
              	 },
	     ],
	    	onRowClick: function(event){
	    		if(event.rowId){
	        		var path = this.collectionName + '/model?id='+ event.rowId;
	        		this.getApp().getRouter().navigate(path);
	        	}
	    	}
    },
	     
	     render:function(){
	    	 var self = this;
	    	 var currentUser = self.getApp().currentUser;
	    	 if (!!currentUser && currentUser.hasRole("CoSoKCB")){
	    		 this.uiControl.filters = {"cosokcb_id":{"$eq": currentUser.id_cosokcb}};
	    	 }else if (!!currentUser && currentUser.hasRole("User")){
	    		 this.uiControl.filters = {"$or":[{"user_id":{"$eq": currentUser.id}},{"sochamsoc_id":{"$eq": currentUser.sochamsoc_id}}]};
	    	 }else if (!!currentUser && currentUser.hasRole("Admin")){
	    	 }else{
	    		 self.getApp().notify("Phiên làm việc hết hạn, vui lòng đăng nhập lại!");
	    		 self.getApp().getRouter().navigate("login");
	    		 return;
	    	 }
	    	 var filter = new CustomFilterView({
					el: $("#grid_search"),
					sessionKey: self.collectionName +"_filter"
				});
				filter.render();

				if(!filter.isEmptyFilter()) {
	    			var text = !!filter.model.get("text") ? filter.model.get("text").trim() : "";
//	    			var filters = { "$or": [
//						{"hoten": {"$likeI": text }},
//						{"diachi": {"$likeI": text }}
//					] };
					self.uiControl.filters = {"hoten": {"$likeI": text }};
					self.uiControl.orderBy = [{"field": "ten", "direction": "asc"}];
	    		}
	    	 this.applyBindings();
	    	 filter.on('filterChanged', function(evt) {
	    			var $col = self.getCollectionElement();
	    			var text = !!evt.data.text ? evt.data.text.trim() : "";
					if ($col) {
						if (text !== null){
//							var filters = { "$or": [
//								{"hodem": {"$likeI": text }},
//								{"ten": {"$likeI": text }},
//								{"diachi": {"$likeI": text }}
//							] };
							$col.data('gonrin').filter({"hoten": {"$likeI": text }});
							//self.uiControl.filters = filters;
						} else {
//							self.uiControl.filters = null;
						}
					}
					self.applyBindings();
	    		});
	    	 return this;
    	}
    });

});