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