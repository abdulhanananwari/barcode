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

