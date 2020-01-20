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


require(['jquery',
	'gonrin',
	'app/router',
	'app/nav/NavbarView',
	'text!app/base/tpl/mobilelayout.html',
	'i18n!app/nls/app',
	'vendor/lodash-4.17.10'],
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
				$('#sca2').hide()

				$('#search_pc').unbind('click').bind('click', function (params) {
					$('#sca').show()
				})
				$('#grid_search2').unbind('click').bind('click', function (params) {
					$('#sca2').show()
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
				// console.log(moment(moment().unix()*1000).format("DDMMYYYY"))


				$.ajax({
					url: self.serviceURL + "/api/v1/bangkiemtrathietbi?results_per_page=100000&max_results_per_page=1000000",
					method: "GET",
					// data: JSON.stringify(),
					contentType: "application/json",
					success: function (data) {
						var thang1 = ("01" + moment(moment().unix() * 1000).format("YYYY"))
						var thang2 = ("02" + moment(moment().unix() * 1000).format("YYYY"))
						var thang4 = ("04" + moment(moment().unix() * 1000).format("YYYY"))
						var thang33 = ("03" + moment(moment().unix() * 1000).format("YYYY"))

						var thang5 = ("05" + moment(moment().unix() * 1000).format("YYYY"))
						var thang6 = ("06" + moment(moment().unix() * 1000).format("YYYY"))
						var thang7 = ("07" + moment(moment().unix() * 1000).format("YYYY"))
						var thang8 = ("08" + moment(moment().unix() * 1000).format("YYYY"))
						var thang9 = ("09" + moment(moment().unix() * 1000).format("YYYY"))
						var thang10 = ("10" + moment(moment().unix() * 1000).format("YYYY"))
						var thang11 = ("11" + moment(moment().unix() * 1000).format("YYYY"))
						var thang12 = ("12" + moment(moment().unix() * 1000).format("YYYY"))

						var T1 = 0;
						var T2 = 0;
						var T3 = 0;
						var T4 = 0;
						var T5 = 0;
						var T6 = 0;
						var T7 = 0;
						var T8 = 0;
						var T9 = 0;
						var T10 = 0;
						var T11 = 0;
						var T12 = 0;
						var dataBieuDo = [];
						data.objects.forEach(function (item, index) {
							if (moment(item.ngay * 1000).format("MMYYYY") == thang1) {
								T1++;
							}
							if (moment(item.ngay * 1000).format("MMYYYY") == thang2) {
								T2++;
							}
							if (moment(item.ngay * 1000).format("MMYYYY") == thang33) {
								T3++;
							}
							if (moment(item.ngay * 1000).format("MMYYYY") == thang4) {
								T4++;
							}
							if (moment(item.ngay * 1000).format("MMYYYY") == thang5) {
								T5++;
							}
							if (moment(item.ngay * 1000).format("MMYYYY") == thang6) {
								T6++;
							}
							if (moment(item.ngay * 1000).format("MMYYYY") == thang7) {
								T7++;
							}
							if (moment(item.ngay * 1000).format("MMYYYY") == thang8) {
								T8++;
							}
							if (moment(item.ngay * 1000).format("MMYYYY") == thang9) {
								T9++;
							}
							if (moment(item.ngay * 1000).format("MMYYYY") == thang10) {
								T10++;
							}
							if (moment(item.ngay * 1000).format("MMYYYY") == thang11) {
								T11++;
							}
							if (moment(item.ngay * 1000).format("MMYYYY") == thang12) {
								T12++;
							}
						})


						dataBieuDo.push(T1)
						dataBieuDo.push(T2)
						dataBieuDo.push(T3)
						dataBieuDo.push(T4)
						dataBieuDo.push(T5)
						dataBieuDo.push(T6)
						dataBieuDo.push(T7)
						dataBieuDo.push(T8)
						dataBieuDo.push(T9)
						dataBieuDo.push(T10)
						dataBieuDo.push(T11)
						dataBieuDo.push(T12)

						var ctx = document.getElementById('myChart');

						var myChart = new Chart(ctx, {
							type: 'line',
							data: {
								labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
								datasets: [{
									label: 'Số lượng thiết bị được kiểm tra trong các tháng',
									data: dataBieuDo,
									backgroundColor: [
										'rgba(255, 99, 132, 0.2)',
										'rgba(255, 99, 132, 0.2)',
										'rgba(255, 99, 132, 0.2)',
										'rgba(255, 99, 132, 0.2)',
										'rgba(255, 99, 132, 0.2)',
										'rgba(255, 99, 132, 0.2)',

										'rgba(255, 99, 132, 0.2)',
										'rgba(255, 99, 132, 0.2)',
										'rgba(255, 99, 132, 0.2)',
										'rgba(255, 99, 132, 0.2)',
										'rgba(255, 99, 132, 0.2)',
										'rgba(255, 99, 132, 0.2)',
									],
									borderColor: [
										'rgba(255, 99, 132, 1)',
										'rgba(255, 99, 132, 1)',
										'rgba(255, 99, 132, 1)',
										'rgba(255, 99, 132, 1)',
										'rgba(255, 99, 132, 1)',
										'rgba(255, 99, 132, 1)',
										'rgba(255, 99, 132, 1)',
										'rgba(255, 99, 132, 1)',
										'rgba(255, 99, 132, 1)',
										'rgba(255, 99, 132, 1)',
										'rgba(255, 99, 132, 1)',
										'rgba(255, 99, 132, 1)',

										// 'rgba(54, 162, 235, 1)',
										// 'rgba(255, 206, 86, 1)',
										// 'rgba(75, 192, 192, 1)',
										// 'rgba(153, 102, 255, 1)',
										// 'rgba(255, 159, 64, 1)',

										// 'rgba(0 255 0)	',
										// 'rgba(255 255 0)	',
										// 'rgba(255 48 48)	',
										// 'rgba(255 20 147)	',
										// 'rgba(0 128 128)	',
										// 'rgba(139 69 19)	',
									],
									borderWidth: 1
								}]
							},
							options: {
								scales: {
									yAxes: [{
										ticks: {
											beginAtZero: true
										}
									}]
								}
							}
						});
					}
				})

				$.ajax({
					url: self.serviceURL + "/api/v1/phieuyeucausuachua?results_per_page=100000&max_results_per_page=1000000",
					method: "GET",
					// data: JSON.stringify(),
					contentType: "application/json",
					success: function (data) {
						var thang1 = ("01" + moment(moment().unix() * 1000).format("YYYY"))
						var thang2 = ("02" + moment(moment().unix() * 1000).format("YYYY"))
						var thang4 = ("04" + moment(moment().unix() * 1000).format("YYYY"))
						var thang33 = ("03" + moment(moment().unix() * 1000).format("YYYY"))

						var thang5 = ("05" + moment(moment().unix() * 1000).format("YYYY"))
						var thang6 = ("06" + moment(moment().unix() * 1000).format("YYYY"))
						var thang7 = ("07" + moment(moment().unix() * 1000).format("YYYY"))
						var thang8 = ("08" + moment(moment().unix() * 1000).format("YYYY"))
						var thang9 = ("09" + moment(moment().unix() * 1000).format("YYYY"))
						var thang10 = ("10" + moment(moment().unix() * 1000).format("YYYY"))
						var thang11 = ("11" + moment(moment().unix() * 1000).format("YYYY"))
						var thang12 = ("12" + moment(moment().unix() * 1000).format("YYYY"))
						var T1 = 0;
						var T2 = 0;
						var T3 = 0;
						var T4 = 0;
						var T5 = 0;
						var T6 = 0;
						var T7 = 0;
						var T8 = 0;
						var T9 = 0;
						var T10 = 0;
						var T11 = 0;
						var T12 = 0;
						var dataBieuDo = [];
						data.objects.forEach(function (item, index) {
							if (moment(item.ngay_suco * 1000).format("MMYYYY") == thang1) {
								T1++;
							}
							if (moment(item.ngay_suco * 1000).format("MMYYYY") == thang2) {
								T2++;
							}
							if (moment(item.ngay_suco * 1000).format("MMYYYY") == thang33) {
								T3++;
							}
							if (moment(item.ngay_suco * 1000).format("MMYYYY") == thang4) {
								T4++;
							}
							if (moment(item.ngay_suco * 1000).format("MMYYYY") == thang5) {
								T5++;
							}
							if (moment(item.ngay_suco * 1000).format("MMYYYY") == thang6) {
								T6++;
							}
							if (moment(item.ngay_suco * 1000).format("MMYYYY") == thang7) {
								T7++;
							}
							if (moment(item.ngay_suco * 1000).format("MMYYYY") == thang8) {
								T8++;
							}
							if (moment(item.ngay_suco * 1000).format("MMYYYY") == thang9) {
								T9++;
							}
							if (moment(item.ngay_suco * 1000).format("MMYYYY") == thang10) {
								T10++;
							}
							if (moment(item.ngay_suco * 1000).format("MMYYYY") == thang11) {
								T11++;
							}
							if (moment(item.ngay_suco * 1000).format("MMYYYY") == thang12) {
								T12++;
							}
						})


						dataBieuDo.push(T1)
						dataBieuDo.push(T2)
						dataBieuDo.push(T3)
						dataBieuDo.push(T4)
						dataBieuDo.push(T5)
						dataBieuDo.push(T6)
						dataBieuDo.push(T7)
						dataBieuDo.push(T8)
						dataBieuDo.push(T9)
						dataBieuDo.push(T10)
						dataBieuDo.push(T11)
						dataBieuDo.push(T12)

						console.log(dataBieuDo)
						var ctx2 = document.getElementById('myChart2');
						var myChart2 = new Chart(ctx2, {
							type: 'line',
							data: {
								labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
								datasets: [{
									label: 'Số lượng thiết bị sửa chữa trong các tháng',
									data: dataBieuDo,
									backgroundColor: [
										'rgba(0, 99, 132, 0.2)',
										'rgba(0, 99, 132, 0.2)',
										'rgba(0, 99, 132, 0.2)',
										'rgba(0, 99, 132, 0.2)',
										'rgba(0, 99, 132, 0.2)',
										'rgba(0, 99, 132, 0.2)',

										'rgba(0, 99, 132, 0.2)',
										'rgba(0, 99, 132, 0.2)',
										'rgba(0, 99, 132, 0.2)',
										'rgba(0, 99, 132, 0.2)',
										'rgba(0, 99, 132, 0.2)',
										'rgba(0, 99, 132, 0.2)',
									],
									borderColor: [
										'rgba(0, 99, 132, 0.2)',
										'rgba(0, 99, 132, 0.2)',
										'rgba(0, 99, 132, 0.2)',
										'rgba(0, 99, 132, 0.2)',
										'rgba(0, 99, 132, 0.2)',
										'rgba(0, 99, 132, 0.2)',

										'rgba(0, 99, 132, 0.2)',
										'rgba(0, 99, 132, 0.2)',
										'rgba(0, 99, 132, 0.2)',
										'rgba(0, 99, 132, 0.2)',
										'rgba(0, 99, 132, 0.2)',
										'rgba(0, 99, 132, 0.2)',

										// 'rgba(54, 162, 235, 1)',
										// 'rgba(255, 206, 86, 1)',
										// 'rgba(75, 192, 192, 1)',
										// 'rgba(153, 102, 255, 1)',
										// 'rgba(255, 159, 64, 1)',

										// 'rgba(0 255 0)	',
										// 'rgba(255 255 0)	',
										// 'rgba(255 48 48)	',
										// 'rgba(255 20 147)	',
										// 'rgba(0 128 128)	',
										// 'rgba(139 69 19)	',
									],
									borderWidth: 1
								}]
							},
							options: {
								scales: {
									yAxes: [{
										ticks: {
											beginAtZero: true
										}
									}]
								}
							}
						});
					}
				})


				$.ajax({
					url: self.serviceURL + "/api/v1/bangkiemtrathietbi?results_per_page=100000&max_results_per_page=1000000",
					method: "GET",
					// data: JSON.stringify(),
					contentType: "application/json",
					success: function (data) {
						var dem = 0;
						(data.objects).forEach(function (item, index) {
							if (moment(item.ngay * 1000).format("DDMMYYYY") == moment(moment().unix() * 1000).format("DDMMYYYY")) {
								dem++;
							}
						})
						$("#slkiemtratrongngay").html(dem);
					}
				})

				$.ajax({
					url: self.serviceURL + "/api/v1/chitietthietbi?results_per_page=100000&max_results_per_page=1000000",
					method: "GET",
					// data: JSON.stringify(),
					contentType: "application/json",
					success: function (data) {
						var dem = 0;
						var demsuachua = 0;
						var demChoKiemDuyet = 0;

						data.objects.forEach(function (item, index) {
							if (item.trangthai == "yeucaukiemtrathietbi")
								dem++;
							if (item.trangthai == "dangsuachua")
								demsuachua++;
							if (item.trangthai == "dangchokiemduyet")
								demChoKiemDuyet++;
						})
						$("#tbcovande").html(dem);
						$("#tbsuachua").html(demsuachua)
						$("#tbchokiemduyet").html(demChoKiemDuyet);

					}
				})

				$.ajax({
					url: self.serviceURL + "/api/v1/bangkiemdinh?results_per_page=100000&max_results_per_page=1000000",
					method: "GET",
					data: { "q": JSON.stringify({ "order_by": [{ "field": "created_at", "direction": "desc" }] }) },
					contentType: "application/json",
					success: function (data) {
						data.objects.forEach(function (item, index) {
							if (item.tinhtrang == 'dangduocsudung') {
								var ngayhomnay = moment(moment().unix() * 1000).format("DD/MM/YYYY");
								var hethansau7ngay = moment(item.ngayhethan * 1000).subtract(7, 'days').format("DD/MM/YYYY");
								var hethansau5ngay = moment(item.ngayhethan * 1000).subtract(5, 'days').format("DD/MM/YYYY");

								// console.log(ngayhomnay, hethansauxngay)
								if (ngayhomnay === hethansau7ngay || ngayhomnay === hethansau5ngay) {
									$.ajax({
										url: self.serviceURL + "/api/v1/thongbao?results_per_page=100000&max_results_per_page=1000000",
										method: "GET",
										data: { "q": JSON.stringify({ "order_by": [{ "field": "created_at", "direction": "desc" }] }) },
										contentType: "application/json",
										success: function (data) {
											var dem = 0;
											(data.objects).forEach(function (item2, index2) {
												if (item2.idloaithongbao == item.id && moment(item2.ngaytao * 1000).format("DD/MM/YYYY") == ngayhomnay) {
													dem++;
												}
											})
											if (dem == 0) {
												$.ajax({
													method: "POST",
													url: self.serviceURL + "/api/v1/thongbao",
													data: JSON.stringify({
														tenthietbi: item.tenthietbi,
														model_serial_number: item.model_serial_number,
														idloaithongbao: item.id,
														loaithongbao: "Kiểm định thiết bị",
														maloaithongbao: "bangkiemdinh",
														daxem: "chuaxem",
														ngaytao: moment().unix()
													}),
													headers: {
														'content-type': 'application/json'
													},
													dataType: 'json',
													success: function (response) {
														location.reload();

													}, error: function (xhr, ere) {
														console.log('xhr', ere);

													}
												})
											}

										}
									}
									)

								}
							}

						})
					},
					error: function (xhr, status, error) {

					}
				});

				$.ajax({
					url: self.serviceURL + "/api/v1/thongbao?results_per_page=100000&max_results_per_page=1000000",
					method: "GET",
					data: { "q": JSON.stringify({ "order_by": [{ "field": "created_at", "direction": "desc" }] }) },
					contentType: "application/json",
					success: function (data) {
						var tong = 0;
						data.objects.forEach(function (item, index) {
							if (item.daxem == "chuaxem") {
								tong++;
							}
						})
						if (tong != 0) {
							$('.fa-bell').css("color", "red")
							$('#bgcolor').css("backgroundColor", "red")

						}
						$('#soluong').append(tong);



						data.objects.forEach(function (itemmangthongbao, indexmangthongbao) {
							$('#bangthongbao').append('<tr class="danhsachthongbaomoi"><td>' + itemmangthongbao.loaithongbao + '</td><td>' + itemmangthongbao.tenthietbi + '[' + itemmangthongbao.model_serial_number + ']</td></tr>')

							if (itemmangthongbao.daxem == "chuaxem") {
								$($('.danhsachthongbaomoi')[indexmangthongbao]).css("background-color", "yellow")
							}
						})

						$('.danhsachthongbaomoi').each(function (indexdanhsachthongbaomoi, itemdanhsachthongbaomoi) {
							$(itemdanhsachthongbaomoi).unbind('click').bind("click", function () {
								var link = data.objects[indexdanhsachthongbaomoi].maloaithongbao + "/model?id=" + data.objects[indexdanhsachthongbaomoi].idloaithongbao
								self.router.navigate(link);
								var link2 = self.serviceURL + "/api/v1/thongbao/" + data.objects[indexdanhsachthongbaomoi].id
								$.ajax({
									url: link2,
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
								$('.showthongbao').hide();

							})
						})


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
				$.ajax({
					url: self.serviceURL + "/api/v1/chitietthietbi?results_per_page=100000&max_results_per_page=1000000",
					method: "GET",
					// data: "q=" + JSON.stringify(filters),
					contentType: "application/json",
					success: function (data) {

						$('#grid_search2').keyup(function () {
							var arr = [];

							data.objects.forEach(function (item, index) {
								if ((item.tenthietbi).indexOf($("#grid_search2").val()) !== -1) {
									arr.push(item)
								}
							});


							$("#sca2").grid({
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
										$('.main-sidebar').removeClass('open');
										self.router.navigate("chitietthietbi/model?id=" + event.rowId);
										$('#sca2').hide()

									}
								},
							});
							$('#tbl_sca2').removeClass('table-striped')

						});
						$('#grid_search2').focusout(function () {
							setTimeout(function () {
								$('#sca2').hide()
							}, 300);
						})

					},
					error: function (xhr, status, error) {
						$('#sca2').hide()
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