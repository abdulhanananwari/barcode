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
