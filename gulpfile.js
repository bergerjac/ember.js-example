var gulp = require('gulp');
var gutil = require('gulp-util');
var shell = require('gulp-shell');
var debug = require('gulp-debug');
var extReplace = require('gulp-ext-replace');

var jsDeps = 'js/vendor/',
    distRoot = '_dist/';

var paths =
{
    root: './',
    jsDeps: jsDeps,
    data: {
        allFiles: 'data/*'
    },
    deps: [
        'bower_components/ember/ember.js',
        'bower_components/ember-data/ember-data.js',
        'bower_components/handlebars/handlebars.js',
        'bower_components/jquery/jquery.js',
        'bower_components/markdown/lib/markdown.js'
    ],
    dist: {
        root: distRoot,
        jsDeps: distRoot + jsDeps,
        src: [
            // assets
            'assets/**/*.*',
            'css/**/*',
            'images/**/*.*',
            'js/app.js',
            // index
            'index.html'
        ]
    }
};

gulp.task(
    'default',
    function()
    {
        // place code for your default task here
    }
);

gulp.task(
    'deps',
    function()
    {
        console.log('Copying dependency files...');
        gulp.src(paths.deps)
            .pipe(gulp.dest(paths.jsDeps))
            .pipe(gulp.dest(paths.dist.jsDeps))
        ;
        console.log('Copied dependency files.');
    }
);

gulp.task(
    'dataFiles',
    function()
    {
        // serve data files in root, without extension
        console.log('Copying data files...');
        gulp.src(paths.data.allFiles)
            .pipe(extReplace(''))
            .pipe(gulp.dest(paths.root))
            .pipe(gulp.dest(paths.dist.root))
        ;
        console.log('Copied data files.');
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
            paths.data.allFiles,
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
        gulp.src(paths.dist.src, { base: "." })
            .pipe(gulp.dest(paths.dist.root))
        ;
        gulp.start('init');
        console.log('Copied assets, data, app files.');
    }
);
