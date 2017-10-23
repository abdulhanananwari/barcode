var geloraBarcode = angular
    .module('Gelora.Barcode', ['ui.router', 'angular-jwt','Solumax.CsvUploader',
    ])
    .factory('AppFactory', function() {

        var appFactory = {};

        appFactory.moduleId = '10033';
        localStorage.setItem('module_id', appFactory.moduleId)

        return appFactory;
    })

geloraBarcode
    .factory('LinkFactory', function() {

        var hostname = window.location.hostname
        var env = hostname.substring(0, 3) == '192' ? 'dev' : 'prod';

        var domains = {
          
            barcode: window.location.protocol + '//' + window.location.host + '/',
        }

        var apps = {
            barcode: domains.barcode + 'barcode/',
        }

        var urls = {
           
            barcode: apps.barcode + 'api/barcode/',
            views: apps.barcode + 'views/barcode/',
            
            }

        return urls
    })

geloraBarcode
        .config(function ($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise('/index');

            $stateProvider
                    .state('index', {
                        url: '/index',
                        templateUrl: 'app/barcode/upload/barcodeUpload.html',
                        controller: 'BarcodeUploadController as ctrl',
                        requireLogin: false,
                        pageTitle: 'Dealer | Barcode'
                    })
                    .state('barcodeShow', {
                        url: '/show/:id',
                        templateUrl: 'app/barcode/show/barcodeShow.html',
                        controller: 'BarcodeShowController as ctrl',
                        requireLogin: false,
                        pageTitle: 'Dealer | Barcode'
                    })
                });


geloraBarcode
	.factory('BarcodeModel', function(
		$http,
		LinkFactory) {

		var barcodeModel = {}

		barcodeModel.index = function(params) {

			return $http.get(LinkFactory.barcode, {params: params})
		}

		barcodeModel.store = function(barcode) {

			return $http.post(LinkFactory.barcode, barcode)
		}
		barcodeModel.get = function(id) {
			return $http.get(LinkFactory.barcode + id  )
		}

		return barcodeModel
	})
geloraBarcode
    .controller('BarcodeUploadController', function(
        CsvUploader, BarcodeModel,LinkFactory
    ) {

        var vm = this

        vm.loadFile = function() {
            CsvUploader.parse(document.getElementById('csv-file').files[0], { delimiter: ',' })
                .then(function(data) {
                    loadIndex(data.data)
                })
        }
        vm.generate = function(barcode){
        	var id  = barcode.barcode.id;
            window.open(LinkFactory.views + id + '/generate-label/')
		}
		vm.uploadAll = function() {

        	CsvUploader.upload(vm.barcodes, {upload: upload})
        }
        function loadIndex(data) {

            BarcodeModel.index()

                .then(function(res) {
                    var existingBarcodes = res.data.data

                    _.each(data, function(newBarcode) {
                        newBarcode.barcode = _.find(existingBarcodes, function(existingBarcode) {
                            return existingBarcode.engine_number == newBarcode.engine_number
                            console.log(newBarcode)

                        })
                        newBarcode.sales_date = moment(newBarcode.sales_date, "MM/DD/YYYY").format("DD-MM-YYYY");
                        newBarcode.status = 'OK'

                      
                    })
                    console.log(data)
                    vm.barcodes = data

                })
        }
         var upload = function(barcode) {

        	if (typeof barcode.existingBarcode == 'undefined') {
        		
				return BarcodeModel.store(barcode)
				.then(function(res) {
					barcode.status = 'Berhasil Disimpan'
				})

			} else {

				// return PriceModel.update(price.model_id, price)
				// .then(function(res) {

				// 	price.status = 'Berhasil Diupdate'
				// })
				
        	}
        }


    })
geloraBarcode
	.controller('BarcodeShowController', function(
		$state,LinkFactory,
		BarcodeModel
		) {

		var vm = this

		$('#date').datepicker({ dateFormat: "yy-mm-dd" });

		vm.store = function(barcode){
			BarcodeModel.store(barcode)
			.then(function(res){
				$state.go('barcodeShow', {id: res.data.data.id})
			})
		}

		vm.generate = function(barcode){
            window.open(LinkFactory.views + barcode.id + '/generate-label/')
		}
		if ($state.params.id) {

			BarcodeModel.get($state.params.id)
			.then(function(res){
				vm.barcode = res.data.data
			})
		}
		


	})
//# sourceMappingURL=all.js.map
