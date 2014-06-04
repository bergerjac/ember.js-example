var gulp = require('gulp');
var gutil = require('gulp-util');
var shell = require('gulp-shell');
var debug = require('gulp-debug');
var extReplace = require('gulp-ext-replace');

gulp.task(
    'default',
    function()
    {
        // place code for your default task here
    }
);

gulp.task('deps',
          function()
          {
              console.log('Copying dependency files...');
              gulp.src('node_modules/markdown/lib/markdown.js')
                  .pipe(gulp.dest('js/vendor/'));
              console.log('Copied dependency files.');
          }
);

gulp.task('dataFiles',
          function()
          {// serve data files in root, without extension
              console.log('Copying ./data/* to root...');
              gulp.src('data/*')
                  .pipe(extReplace(''))
                  .pipe(gulp.dest('./'));
              console.log('Copied ./data/* files to root.');
          }
);

gulp.task(
    'init',
    function()
    {
        gulp.start('deps');
        gulp.start('dataFiles');
        console.log('serve via: "python -m SimpleHTTPServer 8080"');
    }
);

gulp.task(
    'watch',
    function()
    {
        gulp.watch(
            'data/*',
            function(event)
            {
                console.log('File ' + event.path + ' was ' + event.type + '.');
                gulp.start('dataFiles');
            }
        );
    }
);
