<?php

namespace Gelora\Barcode\Http\Controllers\Views;

use Solumax\PhpHelper\Http\Controllers\ApiBaseV2Controller as Controller;
use Illuminate\Http\Request;

class BarcodeController extends Controller {

    public function __construct() {
        parent::__construct();
        $this->barcode = new \Gelora\Barcode\App\Barcode\BarcodeModel;
    }

    public function generateLabel($id, Request $request) {

        $barcode = $this->barcode->find($id);

        return response($barcode->generate()->generateLabel(true), 200, [
            'Content-Type' => 'application/pdf',
        ]);
    }

}
