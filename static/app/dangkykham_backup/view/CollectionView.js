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
	            	 field: "hodem", 
	            	 label: "Họ tên",
	            	 template:function(rowData){
	            		 if (!!rowData && rowData.hosobenhnhan.hodem){
	            			 return rowData.hosobenhnhan.hodem + " " + rowData.hosobenhnhan.ten;
	            		 }
	            		 return rowData.hosobenhnhan.ten;
	            	 }
	           	 },
	           	{
	            	 field: "ngaysinh", 
	            	 label: "Ngày sinh",
	            	 template:function(rowData){
	            		 if (!!rowData && rowData.hosobenhnhan.ngaysinh){
	            			 var template_helper = new TemplateHelper();
	    	    	    	 return template_helper.datetimeFormat(rowData.hosobenhnhan.ngaysinh, "DD/MM/YYYY");
	            		 }
	            		 return "";
	            	 }
	           	 },
	           //	{ field: "dienthoai", label: "Điện thoại"},
	           	{
	            	 field: "diachi", 
	            	 label: "Địa chỉ",
	            	 template:function(rowData){
	            		 if (!!rowData && rowData.hosobenhnhan.diachi){
	            			 return rowData.hosobenhnhan.diachi;
	            		 }
	            		 return "";
	            	 }
	           	 },
	           	 { field: "gioitinh", label: "Giới tính", 
	           		 template:function(rowData){
		        		 if (rowData.hosobenhnhan){
		        			 if(rowData.hosobenhnhan.gioitinh === 1 || rowData.hosobenhnhan.gioitinh === "1"){
		        				 return 'Nam';
		        			 }else if(rowData.hosobenhnhan.gioitinh === 0 || rowData.hosobenhnhan.gioitinh === "0"){
		        				 return 'Nữ';
		        			 }
		        		 }
		        		return "";
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
	            	 }},
//    			{ field: "thoigiankham", label: "Thời gian khám"},
//    			{ field: "nguoidangkykham", label: "Họ và tên"},
//    			{ field: "dienthoai", label: "Điện thoại"},
		     	{
	            	 field: "cosokcb_id", 
	            	 label: "Nơi khám",
	            	 foreign: "cosokcb",
	            	 foreignValueField: "id",
	            	 foreignTextField: "ten_coso",
	           	 },
//		     	{ field: "lydokham", label: "Lý do khám"},
		     	{
               	 field: "trangthai", 
               	 label: "Trạng thái",
               	 foreignValueField: "value",
               	 foreignTextField: "text",
	             foreignValues: [
	            	 { value: 0, text: "Tạo mới" },
                     { value: 1, text: "Xác nhận khám" },
                     { value: 2, text: "Đã khám xong" },
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
	    	 }
	    	 var filter = new CustomFilterView({
					el: self.$el.find("#grid_search"),
					sessionKey: self.collectionName +"_filter"
				});
				filter.render();

				if(!filter.isEmptyFilter()) {
	    			var text = !!filter.model.get("text") ? filter.model.get("text").trim() : "";
	    			var filters = { "$or": [
						{"hodem": {"$likeI": text }},
						{"ten": {"$likeI": text }},
						{"diachi": {"$likeI": text }}
					] };
					self.uiControl.filters = filters;
					self.uiControl.orderBy = [{"field": "ten", "direction": "asc"}];
	    		}
	    	 this.applyBindings();
	    	 filter.on('filterChanged', function(evt) {
	    			var $col = self.getCollectionElement();
	    			var text = !!evt.data.text ? evt.data.text.trim() : "";
					if ($col) {
						if (text !== null){
							var filters = { "$or": [
								{"hodem": {"$likeI": text }},
								{"ten": {"$likeI": text }},
								{"diachi": {"$likeI": text }}
							] };
							$col.data('gonrin').filter(filters);
							//self.uiControl.filters = filters;
						} else {
							self.uiControl.filters = null;
						}
					}
					self.applyBindings();
	    		});
	    	 return this;
    	}
    });

});