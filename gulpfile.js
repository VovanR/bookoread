// See: http://gulpjs.com/

var gulp = require('gulp');
var addsrc = require('gulp-add-src');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var rev = require('gulp-rev-append');

var argv = require('yargs').argv;
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var rjs = require('gulp-requirejs');
var uglify = require('gulp-uglify');

var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer-core');
var csso = require('gulp-csso');

// Lint all modules:
// $ gulp lint
// Lint one module:
// $ gulp lint --src src/scripts/main.js
gulp.task('lint', function () {
    var src = argv.src;
    return gulp
        .src(
            src ||
            [
                './src/scripts/**/*.js',
                './gulpfile.js',
            ]
        )
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jscs());
});

gulp.task('html', function () {
    gulp.src('./src/index.html')
        .pipe(gulp.dest('./dist/'))
        .pipe(connect.reload());
});

gulp.task('styles', function () {
    return gulp.src('src/styles/style.css')
        .pipe(postcss([
            require('postcss-import'),
            require('postcss-nested'),
            require('postcss-simple-vars'),
            require('postcss-clearfix'),
            autoprefixer({
                browsers: ['last 2 versions', 'ie >= 8'],
                cascade: false,
            }),
        ]))
        .pipe(addsrc([
            './bower_components/perfect-scrollbar/min/perfect-scrollbar.min.css',
        ]))
        .pipe(concat('style.css'))
        .pipe(csso())
        .pipe(gulp.dest('./dist/css/'));
});

gulp.task('scripts', function () {
    rjs({
        baseUrl: 'src/scripts',
        // name: '../../bower_components/almond/almond',
        include: ['main'],
        insertRequire: ['main'],
        // exclude: [
        //     'jquery',
        //     'underscore',
        //     'backbone',
        //     'marionette',
        // ],
        out: 'all.js',
        paths: {
            text: '../../bower_components/requirejs-text/text',
            jqueryPerfectScrollbar: '../../bower_components/perfect-scrollbar/min/perfect-scrollbar.min',
            marked: '../../bower_components/marked/marked.min',

            // Apps paths
            collections: './collections',
            models: './models',
            routers: './routers',
            views: './views',
            templates: '../templates',
        },
        shim: {
        },
        wrap: true,
    })
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('rev', function () {
    gulp.src('./dist/index.html')
        .pipe(rev())
        .pipe(gulp.dest('./dist/'))
        .pipe(connect.reload());
});

gulp.task('connect', function () {
    connect.server({
        root: 'dist',
        port: 8000,
        livereload: true,
    });
});

gulp.task('watch', function () {
    gulp.watch(['./src/index.html'], ['html']);
    gulp.watch(['./src/styles/**/*.styl'], ['styles', 'rev']);
    gulp.watch(['./src/scripts/**/*.js'], ['scripts', 'rev']);
    gulp.watch(['./src/templates/**/*.html'], ['scripts', 'rev']);
});

gulp.task('build', ['styles', 'lint', 'scripts', 'html']);

gulp.task('default', ['connect', 'watch']);
