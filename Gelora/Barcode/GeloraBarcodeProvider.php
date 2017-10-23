<?php

namespace Gelora\Barcode;

use Illuminate\Support\ServiceProvider;

class GeloraBarcodeProvider extends ServiceProvider {
    
    public function boot() {
        
        require __DIR__ . '/Http/routes.php';

        $this->loadViewsFrom(__DIR__ . '/Resources/Views', 'gelora.barcode');
        
        $this->publishes([
            __DIR__.'/Database/MigrationsMongo/' => database_path('migrations-mongo/gelora/barcode')
        ], 'migrations');
    }
    
    public function register() {
        
        //$this->mergeConfigFrom(__DIR__ . '/Config/base.php', 'gelora.base');
    }
}
