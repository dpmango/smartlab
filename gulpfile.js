// include packages
var gulp         = require('gulp');
var watch        = require('gulp-watch');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var browserSync  = require('browser-sync');
var postcss      = require('gulp-postcss');
var svginline    = require('postcss-inline-svg');
var sorting      = require('postcss-sorting');
var flexbugs     = require('postcss-flexbugs-fixes');
var autoprefixer = require('autoprefixer');
var notify       = require('gulp-notify');
var plumber      = require('gulp-plumber');
var reload       = browserSync.reload;

// settings
var errorHandler = function() {
  var args = Array.prototype.slice.call(arguments);
  notify.onError({
      title: 'Compile Error',
      message: '<%= error.message %>',
      sound: 'Submarine'
  }).apply(this, args);
  this.emit('end');
};

// DEFAULT TASKS
gulp.task('default', ['build', 'webserver', 'watch']);

gulp.task('build', [
    'styles'
]);

gulp.task('watch', function(){
  watch([path.watch.style], function(event, cb) {
    gulp.start('styles');
  });
});

// Browsersync
gulp.task('webserver', function () {
  browserSync({
    server: {
      baseDir: "./"
    },
    tunnel: false,
    host: 'localhost',
    port: 3000,
    logLevel: 'info'
  });
});

// DEVELOPMENT TASKS

// Styles
gulp.task('styles', function () {
  gulp.src('./sass/*.{sass,scss}')
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'expanded', // nested, expanded, compact, compressed
      precision: 5,
      includePaths : ['./sass']
    }))
    .on('error', errorHandler)
    .pipe(postcss(postCssProcessors))
    .pipe(plumber({
      errorHandler: errorHandler
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./css'))
    .pipe(reload({stream: true}));
});

// -postcss plugins will inline svg if any, autoprefix css, sort using common practices and fix flexbugs
var postCssProcessors = [
  svginline(),
  autoprefixer({
    browsers: ['last 10 versions'],
    remove: true, // remove outdated prefixes?
  }),
  sorting(),
  flexbugs()
];
