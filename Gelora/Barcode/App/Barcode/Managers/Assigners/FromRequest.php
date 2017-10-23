<?php

namespace Gelora\Barcode\App\Barcode\Managers\Assigners;

use Gelora\Barcode\App\Barcode\BarcodeModel;

class FromRequest {

    protected $barcode;

    public function __construct(BarcodeModel $barcode) {
        $this->barcode = $barcode;
    }

    public function assign(\Illuminate\Http\Request $request) {

        $keys = [
            'engine_number','chasis_number','name','address','type','sales_date'        ];

        $this->barcode->fill($request->only($keys));
        // if ($request->has('sales_date')) {
        //     $this->barcode->sales_date = $request->get('sales_date');
        // }
        return $this->barcode;
    }

}
