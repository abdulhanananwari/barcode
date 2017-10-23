<?php

namespace Gelora\Barcode\App\Barcode\Transformers;

use League\Fractal;
use Gelora\Barcode\App\Barcode\BarcodeModel;

class BarcodeTransformer extends Fractal\TransformerAbstract {

    
    public function transform(BarcodeModel $barcode) {

        $data = [
            'id' => $barcode->_id,
            'engine_number' => $barcode->engine_number,
            'chasis_number' => $barcode->chasis_number,
            'name' => $barcode->name,
            'address' => $barcode->address,
            'type' => $barcode->type,
            'sales_date' => $barcode->sales_date ? $barcode->sales_date->toDateString() : null,
            'created_at' => $barcode->created_at ? $barcode->created_at->toDateTimeString() : null,
            'updated_at' => $barcode->updated_at ? $barcode->updated_at->toDateTimeString() : null,
            
        ];

       
        return $data;
    }

  

}
