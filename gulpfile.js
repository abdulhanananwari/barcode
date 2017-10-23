process.env.DISABLE_NOTIFIER = true;
const elixir = require('laravel-elixir');
/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application as well as publishing vendor resources.
 |
 */

elixir((mix) => {
    
    mix.scriptsIn('Gelora/Barcode/Resources/Barcode', 'public/gelora/barcode/app/all.js');
    mix.copy('Gelora/Barcode/Resources/Barcode', 'public/gelora/barcode/');
    
    mix.scriptsIn('resources/angular', 'public/solumax/dependencies/all.js');

});


