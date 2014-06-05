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

function copyDeps(dest)
{
    dest = dest || 'js/vendor/';
    console.log(dest);
    console.log('Copying dependency files...');
    gulp.src([
                 'bower_components/ember/ember.js',
                 'bower_components/ember-data/ember-data.js',
                 'bower_components/handlebars/handlebars.js',
                 'bower_components/jquery/jquery.js',
                 'bower_components/markdown/lib/markdown.js'
             ])
        .pipe(gulp.dest(dest));
    console.log('Copied dependency files.');
}

gulp.task('deps',
          function()
          {
              copyDeps();
          }
);

function copyDataFiles(dest)
{// serve data files in root, without extension
    dest = dest || './';
    console.log(dest);
    console.log('Copying ./data/* to root...');
    gulp.src('data/*')
        .pipe(extReplace(''))
        .pipe(gulp.dest(dest));
    console.log('Copied ./data/* files to root.');
}

gulp.task(
    'dataFiles',
    function()
    {
        copyDataFiles();
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

gulp.task(
    'test',
    function()
    {
        //gulp.start('init');
        console.log('Copying assets, data, app files...');
        gulp.src([
                     // assets
                     'assets/**/*.*',
                     'css/**/*',
                     'images/**/*.*',
                     'js/app.js',
                     // index
                     'index.html'
                 ], {base: "."})
            .pipe(gulp.dest('_dist'));
        copyDeps('_dist/js/vendor');
        copyDataFiles('_dist/');
        console.log('Copied assets, data, app files.');
    }
);
