var geloraBarcode = angular
    .module('Gelora.Barcode', ['ui.router', 'angular-jwt','Solumax.CsvUploader',
    ])
    .factory('AppFactory', function() {

        var appFactory = {};

        appFactory.moduleId = '10033';
        localStorage.setItem('module_id', appFactory.moduleId)

        return appFactory;
    })
