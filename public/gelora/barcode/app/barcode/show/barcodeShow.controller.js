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