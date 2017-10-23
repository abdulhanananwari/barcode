<?php

namespace Gelora\Barcode\Http\Controllers\Api;

use Solumax\PhpHelper\Http\Controllers\ApiBaseV1Controller as Controller;
use Illuminate\Http\Request;
use MongoDB\BSON\ObjectID;

class BarcodeController extends Controller {

    protected $barcode;

    public function __construct() {
        parent::__construct();
        $this->barcode = new \Gelora\Barcode\App\Barcode\BarcodeModel();

        $this->transformer = new \Gelora\Barcode\App\Barcode\Transformers\BarcodeTransformer();
        $this->dataName = 'barcodes';
    }

   public function index(Request $request) {
        
        $query = $this->barcode->newQuery();
      
        
        $barcodes = $query->orderBy('created_at','desc')->get();
        
        return $this->formatCollection($barcodes);
    }
    public function get($id) {

        $barcode = $this->barcode->find($id);

        return $this->formatItem($barcode);
    }

    public function store(Request $request) {

        $barcode = $this->barcode->assign()->fromRequest($request);

        // $validation = $barcode->validate()->onCreate();
        // if ($validation !== true) {
        //     return $this->formatErrors($validation);
        // }

        $barcode->save();

        return $this->formatItem($barcode);
    }

    public function update($id, Request $request) {

        $barcode = $this->barcode->queryBuilder()->first($id);
        
        $barcode->assign()->onCreateAndUpdate($request);

        $validation = $barcode->validate()->onUpdate();
        if ($validation !== true) {
            return $this->formatErrors($validation);
        }

        $barcode->action()->onUpdate();

        return $this->formatItem($barcode);
    }


}
