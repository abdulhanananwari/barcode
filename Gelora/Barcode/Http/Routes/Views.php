<?php
Route::group(['prefix' => 'views', 'namespace' => 'Views'], function() {
	
	Route::group(['prefix' => 'barcode'], function() {
    	Route::group(['prefix' => '{id}'], function() {
       		Route::get('generate-label', ['uses' => 'BarcodeController@generateLabel']);
		});

   });
});
