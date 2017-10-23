<?php
Route::group(['prefix' => 'api', 'namespace' => 'Api'], function() {
	
	Route::group(['prefix' => 'barcode'], function() {

	    Route::get('/', ['uses' => 'BarcodeController@index']);
	    Route::get('{id}', ['uses' => 'BarcodeController@get']);
	    Route::post('/', ['uses' => 'BarcodeController@store']);

	});
});
