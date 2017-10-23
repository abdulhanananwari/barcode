<?php

namespace Gelora\Barcode\App\Barcode;

use Solumax\PhpHelper\App\BaseModelMongo as Model;

class BarcodeModel extends Model {
    
    protected $connection = 'mongodb';
    protected $collection = 'barcodes';
    
    protected $guarded = ['created_at', 'updated_at'];
    
    public $dates = ['sales_date'];
    
    // Managers
    
    public function action() {
        return new Managers\Actioner($this);
    }
    
    public function assign() {
        return new Managers\Assigner($this);
    }
    public function generate() {
        return new Managers\Generator($this);
    }    
   
}
