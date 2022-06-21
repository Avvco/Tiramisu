const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')
    .sass('resources/scss/app.scss', 'public/css');

mix.browserSync({
    open: false,
    proxy: {
        target: "nginx", // replace with your web server container
        proxyReq: [
            function(proxyReq) {
                proxyReq.setHeader('HOST', '127.0.0.1:64500'); // replace with your site host and port of BrowserSync
            }
        ]
    }
})
