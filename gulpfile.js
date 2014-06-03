var gulp = require('gulp');
var gutil = require('gulp-util');
var shell = require('gulp-shell')

gulp.task(
    'default',
    function()
    {
        // place code for your default task here
    }
);

gulp.task(
    'init',
    function()
    {
        return gulp
            .src('')
            .pipe(shell(
                [
                    'echo symlink-ing vendor libs...',
                    // symlink markdown.js
                    'ln ./node_modules/markdown/lib/markdown.js ./js/vendor/markdown.js --force',

                    'echo symlink-ing data files...',
                    // symlink data files; ex: serve localhost:8080/products
                    'ln ./data/products.json products --force',
                    'ln ./data/contacts.json contacts --force',
                    'ln ./data/reviews.json reviews --force',

                    'echo serve the files via: "python -m SimpleHTTPServer 8080"'
                ])
            );
    }
);

gulp.task(
    'watch',
    function()
    {
        /*
         'echo serving files...',
         // serve
         'python -m SimpleHTTPServer 8080',
         'echo init done.'
         */
    }
);
