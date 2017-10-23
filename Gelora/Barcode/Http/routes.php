<?php
Route::group(['prefix' => 'barcode', 'namespace' => 'Gelora\Barcode\Http\Controllers'], function() {

    include('Routes/Api.php');
    include('Routes/Views.php');
});

Route::get('gelora/barcode/index.html', function() {
   return view('gelora.barcode::barcode'); 
});
