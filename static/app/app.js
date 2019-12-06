define('jquery', [], function () {
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


require(['jquery', 'gonrin', 'app/router', 'app/nav/NavbarView', 'text!app/base/tpl/mobilelayout.html', 'i18n!app/nls/app', 'vendor/lodash-4.17.10'],
	function ($, Gonrin, Router, Nav, layout, lang, lodash) {
		$.ajaxSetup({
			headers: {
				'content-type': 'application/json'
			}
		});

		window.lodash = lodash;

		var app = new Gonrin.Application({
			serviceURL: location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : ''),
			router: new Router(),
			lang: lang,
			layout: layout,
			staticURL: static_url,
			initialize: function () {
				this.getRouter().registerAppRoute();
				this.getCurrentUser();


			},
			getCurrentUser: function () {
				var self = this;
				$.ajax({
					url: self.serviceURL + "/api/v1/current_user",
					dataType: "json",
					success: function (data) {
						self.postLogin(data);


					},
					error: function (XMLHttpRequest, textStatus, errorThrown) {
						self.router.navigate("login");
					}
				});
			},
			postLogin: function (data) {
				var self = this;
				self.currentUser = new Gonrin.User(data);
				var tpl = gonrin.template(layout)({});
				$('.content-contain').html(tpl);
				this.$header = $('body').find(".main-sidebar");
				this.$content = $('body').find(".content-area");
				this.$navbar = $('body').find(".main-sidebar .nav-wrapper");

				this.nav = new Nav({ el: this.$navbar });
				self.nav.render();

				$("span#display_name").html(self.get_displayName(data));

				self.bind_event();
				$("#changepassword").on("click", function () {
					self.router.navigate("changepassword");
				});

			},
			bind_event: function () {
				var self = this;
				var currentUser = self.currentUser.id;
				$(".navbar-brand").bind('click', function () {
					self.router.navigate("index");

					location.reload()
				});

				$("#logout").unbind('click').bind('click', function () {
					self.router.navigate("logout");
				});
				$("#info_myself").unbind('click').bind('click', function () {
					self.router.navigate("user/model?id=" + currentUser);

				});
				$('#sca').hide()
				$('#search_pc').unbind('click').bind('click', function (params) {
					$('#sca').show()
				})
				// var filters = {
				// 	filters: {
				// 		"$and": [
				// 			{ "daxem": { "$eq": null } }
				// 		]
				// 	},
				// 	order_by: [{ "field": "created_at", "direction": "asc" }]
				// }
				$('.showthongbao').hide();
				$('.clickthongbao').unbind('click').bind('click', function () {
					$('.showthongbao').toggle();
				})
				$.ajax({
					url: self.serviceURL + "/api/v1/phieuyeucausuachua?results_per_page=100000&max_results_per_page=1000000",
					method: "GET",
					// data: JSON.stringify(),
					contentType: "application/json",
					success: function (data2) {
						$.ajax({
							url: self.serviceURL + "/api/v1/bangkiemtrathietbi?results_per_page=100000&max_results_per_page=1000000",
							method: "GET",
							// data: JSON.stringify(),
							contentType: "application/json",
							success: function (data3) {
								var mangthongbao = data2.objects;

								data3.objects.forEach(function (item3, index3) {
									if(item3.tinhtrang == "Có vấn đề")
									mangthongbao.push(item3)
								})
								var mangthongbao = data2.objects;
								mangthongbao.sort(function (a, b) {
									var thoigiantaoA = a.created_at
									var thoigiantaoB = b.created_at
									if (thoigiantaoA < thoigiantaoB) {
										return 1;
									}
									if (thoigiantaoA > thoigiantaoB) {
										return -1;
									}
									return 0;
								});

								var tong = 0;
								mangthongbao.forEach(function (item, index) {
									if (item.daxem == null && item.tinhtrang != "Không vấn đề" ) {
										tong++;
									}
								})
								$('#soluong').append(tong);
								console.log(mangthongbao)

								mangthongbao.forEach(function (itemmangthongbao, indexmangthongbao) {

									if(itemmangthongbao.tinhtrang == undefined){
										console.log('itemmangthongbao',itemmangthongbao)
										$('#bangthongbao').append('<tr class="danhsachthongbaomoi"><td>Phiếu yêu cầu sửa chữa</td><td>' + itemmangthongbao.tenthietbi + '[' + itemmangthongbao.model_serial_number + ']</td></tr>')
									}
									if(itemmangthongbao.tinhtrang == "Có vấn đề"){
										$('#bangthongbao').append('<tr class="danhsachthongbaomoi"><td>Phiếu kiểm tra hàng ngày</td><td>' + itemmangthongbao.tenthietbi + '[' + itemmangthongbao.model_serial_number + ']</td></tr>')
									}
									if (itemmangthongbao.daxem == null) {
										$($('.danhsachthongbaomoi')[indexmangthongbao]).css("background-color", "yellow")
									}
								})
								$('.danhsachthongbaomoi').each(function (indexdanhsachthongbaomoi, itemdanhsachthongbaomoi) {
									$(itemdanhsachthongbaomoi).bind("click", function () {
										console.log(mangthongbao[indexdanhsachthongbaomoi])
										if(mangthongbao[indexdanhsachthongbaomoi].tinhtrang == undefined){

										self.router.navigate("phieuyeucausuachua/model?id=" + mangthongbao[indexdanhsachthongbaomoi].id);
										$.ajax({
											url: self.serviceURL + "/api/v1/phieuyeucausuachua/" + mangthongbao[indexdanhsachthongbaomoi].id,
											method: "PUT",
											data: JSON.stringify({
												"daxem": "daxem"
											}),
											contentType: "application/json",
											success: function (data) {
												console.log('thanhcong')
		
											},
											error: function (xhr, status, error) {
											}
										});
										location.reload();
										}
										else if(mangthongbao[indexdanhsachthongbaomoi].tinhtrang == "Có vấn đề"){
											self.router.navigate("bangkiemtrathietbi/model?id=" + mangthongbao[indexdanhsachthongbaomoi].id);
											$.ajax({
												url: self.serviceURL + "/api/v1/bangkiemtrathietbi/" + mangthongbao[indexdanhsachthongbaomoi].id,
												method: "PUT",
												data: JSON.stringify({
													"daxem": "daxem"
												}),
												contentType: "application/json",
												success: function (data) {
													console.log('thanhcong')
			
												},
												error: function (xhr, status, error) {
												}
											});
											location.reload();

										}
										//////////////////////////////////////////////////////////////////////////////
									
										$('.showthongbao').hide();
		
									})
								})


							},
							error: function (xhr, status, error) {

							}
						});










					},
					error: function (xhr, status, error) {
					}
				});



				$.ajax({
					url: self.serviceURL + "/api/v1/chitietthietbi?results_per_page=100000&max_results_per_page=1000000",
					method: "GET",
					// data: "q=" + JSON.stringify(filters),
					contentType: "application/json",
					success: function (data) {

						$('#search_pc').keyup(function () {
							var arr = [];

							data.objects.forEach(function (item, index) {
								if ((item.tenthietbi).indexOf($("#search_pc").val()) !== -1) {
									arr.push(item)
								}
							});


							$("#sca").grid({
								showSortingIndicator: true,
								language: {
									no_records_found: "không tìm thấy kết quả"
								},
								noResultsClass: "alert alert-default no-records-found",
								refresh: true,
								orderByMode: "client",
								tools: [
								],
								fields: [
									{ field: "tenthietbi", label: "Tên thiết bị", width: 250, height: "20px" },
									{ field: "model_serial_number", label: "serial", width: 250, height: "20px" },
								],
								dataSource: arr,
								primaryField: "id",
								selectionMode: false,
								pagination: {
									page: 1,
									pageSize: 20
								},
								onRowClick: function (event) {
									if (event.rowId) {
										self.router.navigate("chitietthietbi/model?id=" + event.rowId);
										$('#sca').hide()

									}
								},
							});
							$('#tbl_sca').removeClass('table-striped')

						});
						$('#search_pc').focusout(function () {
							setTimeout(function () {
								$('#sca').hide()
							}, 300);
						})

					},
					error: function (xhr, status, error) {
						$('#sca').hide()
						// self.getApp().notify({ message: "Lỗi không lấy được dữ liệu" }, { type: "danger", delay: 1000 });
					},

				})



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
				$('.toggle-sidebar').unbind("click").bind('click', function (e) {
					$('.main-sidebar').toggleClass('open');
				});


			},
			get_displayName: function (data) {
				var displayName = "";
				if (!!data.name) {
					displayName = data.name;
				}
				if (displayName === null || displayName === "") {
					if (!!data.phone_number) {
						displayName = data.phone_number;
					} else if (!!data.email) {
						displayName = data.email;
					}

				}
				return displayName;
			}

		});
		Backbone.history.start();

	});