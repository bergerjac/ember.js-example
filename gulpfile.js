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
                    // symlink markdown.js
                    'ln ./node_modules/markdown/lib/markdown.js ./js/vendor/markdown.js --force',

                    // symlink data files; ex: serve localhost:8080/products
                    'ln ./data/products.json products --force',
                    'ln ./data/contacts.json contacts --force',
                    'ln ./data/reviews.json reviews --force',

                    // serve
                    'python -m SimpleHTTPServer 8080'
                ])
            );
        //        gulp.src('node_modules/markdown/lib/markdown.js')
        //            .pipe(symlink('./js/vendor/markdown.js'))
        //            .on('error', gutil.log);
    }
);
