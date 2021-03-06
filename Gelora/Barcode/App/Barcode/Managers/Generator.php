<?php

namespace Gelora\Barcode\App\Barcode\Managers;

use Gelora\Barcode\App\Barcode\BarcodeModel;
use Solumax\PhpHelper\App\ManagerBase as Manager;

class Generator extends Manager {
    
    protected $barcode;
    
    public function __construct(BarcodeModel $barcode) {
        $this->barcode = $barcode;
    }
    
    public function __call($name, $arguments) {
        return $this->managerCaller($name, $arguments, $this->barcode,
                __NAMESPACE__, 'Generators', 'generate');
    }
}
