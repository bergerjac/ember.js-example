var gulp = require('gulp');

gulp.task(
    'default',
    function()
    {
        // place code for your default task here
    }
);

gulp.task(
    'init',
    function(){
        // npm install

        // symlink markdown.js
        // ln ./node_modules/markdown/lib/markdown.js ./js/vendor/markdown.js

        // symlink data files; ex: serve localhost:8080/products
        // ln ./data/products.json products --force
        // ln ./data/contacts.json contacts --force
        // ln ./data/reviews.json reviews --force

        // python -m SimpleHTTPServer 8080
    }
);
