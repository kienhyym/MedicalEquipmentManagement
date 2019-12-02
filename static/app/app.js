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
				self.trangthai = {
					"new": "Tạo mới",
					"send_review_truongphong": "Chờ cấp phòng duyệt",
					"cancel_reviewed_truongphong": "Phòng từ chối",
					"send_review_pct": "Chờ PCT duyệt",
					"cancel_reviewed_pct": "PCT từ chối",
					"send_approved": "Chờ CT duyệt",
					"cancel_approved": "CT từ chối",
					"approved": "CT đã duyệt quyết định",
					"checked": "Đã kiểm tra",
					"result_checked": "Đã có kết luận",
					"completed": "Hoàn thành"
				};
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
				//			self.router.navigate('lichthanhtra/model');
				$("#changepassword").on("click", function () {
					self.router.navigate("changepassword");
				});

			},
			bind_event: function () {
				var self = this;
				var currentUser = self.currentUser.id;
				$("#logo").bind('click', function () {
					self.router.navigate('lichthanhtra/model');
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
				// 			{ "tenthietbi": { "$eq": $('#search_pc').val() } }
				// 		]
				// 	},
				// 	order_by: [{ "field": "created_at", "direction": "asc" }]
				// }
				// console.log(filters)

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
					$('#search_pc').blur(function(){
						$('#sca').hide()

					})

					},
					error: function (xhr, status, error) {
						self.getApp().notify({ message: "Lỗi không lấy được dữ liệu" }, { type: "danger", delay: 1000 });
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