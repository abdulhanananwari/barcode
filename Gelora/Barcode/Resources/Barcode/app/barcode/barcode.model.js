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