/*!
 * gulp
 * $ npm install gulp-sass browser-sync gulp-if gulp-cssnano del gulp-autoprefixer gulp-jshint gulp-cache gulp-imagemin gulp-notify gulp-uglify gulp-useref run-sequence --save-dev
 */
// LOAD PLUGINS
var gulp = require('gulp'),
    sass = require("gulp-sass"),
    browserSync = require('browser-sync').create(),
    gulpIf = require('gulp-if'),
    cssnano = require('gulp-cssnano'),
    del = require('del'),
    autoprefixer = require('gulp-autoprefixer'),
    jshint = require('gulp-jshint'),
    cache = require('gulp-cache'),
    imagemin = require('gulp-imagemin'),
    notify = require("gulp-notify"),
    uglify = require('gulp-uglify'),
    useref = require('gulp-useref'),
    runSequence = require('run-sequence');

// BROWSERSYNC	
gulp.task('browserSync', function() {
  browserSync.init({
	server: { proxy: 'localhost/NationalInterstate/portalhub/Natl-Portal' },
  })
});

// Styles
gulp.task('styles', function() {
  return gulp.src('assets/dev/sass/*.scss')
	.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
  	.pipe(autoprefixer({
            browsers: ['last 2 versions', '> 5%', 'Firefox ESR'],
            cascade: false
        }))
	.pipe(gulp.dest('assets/dist/css'))
	.pipe(useref())
	.pipe(gulpIf('*.css', cssnano()))
	.pipe(browserSync.reload({ stream: true }))
	.pipe(gulp.dest('./'))
	.pipe(notify({ message: 'Styles task complete' }));
});

// Plugin Scripts
gulp.task('plugins', function() {
  return gulp.src('assets/dev/js/plugins.js')
  	.pipe(jshint())
	.pipe(jshint.reporter('default'))
	.pipe(useref('plugins.js'))
	.pipe(gulp.dest('assets/dist/js'))
	.pipe(gulpIf('*.js', uglify()))
	.pipe(browserSync.reload({ stream: true }))
	.pipe(gulp.dest('js'))
	.pipe(notify({ message: 'Plugin Script task complete' }));
});

// Site Scripts
gulp.task('scripts', function() {
  return gulp.src(['assets/dev/js/**/*.js', '!assets/js/dev/plugins.js'])
  	//.pipe(concat('main.min.js'))
	.pipe(gulp.dest('assets/dist/js'))
	.pipe(gulpIf('*.js', uglify()))
	.pipe(browserSync.reload({ stream: true }))
	.pipe(gulp.dest('js'))
  	.pipe(notify({ message: 'Scripts task complete' }));
});

// Fonts
gulp.task('fonts', function() {
  return gulp.src('assets/dev/fonts/**/*')
  .pipe(gulp.dest('fonts'))
  .pipe(notify({ message: 'Fonts task complete' }));
});

// Images
gulp.task('images', function(){
  return gulp.src('assets/dev/images/**/*.+(png|jpg|gif|svg)')
  .pipe(cache(imagemin({
        interlaced: true,
        pngquant: true,
        progressive: true
    })))
  .pipe(gulp.dest('images'))
  .pipe(notify({ message: 'Images task complete' }));
});


// Watch / Sync

gulp.task('watch', ['browserSync', 'styles'], function (){
	// Watch .scss files
	gulp.watch('assets/dev/sass/**/*.scss', ['styles']);
	// Watch .js files
	gulp.watch('assets/dev/js/**/*.js', ['plugins', 'scripts']);
	// Watch .html files
	gulp.watch('**/*.html', browserSync.reload);
	// Watch .php files
	gulp.watch('**/*.php', browserSync.reload); 
	// Watch image files
	gulp.watch('assets/dev/images/**/*', ['images']);
});

// Default task

// Cleaning 
gulp.task('clean', function() {
  return del.sync('dist').then(function(cb) {
    return cache.clearAll(cb);
  });
});

gulp.task('clean:dist', function() {
  return del.sync(['dist/**/*', '!dist/images', '!dist/images/**/*']);
});

// Build Sequences
gulp.task('default', function(callback) {
  runSequence(
    'clean:dist',
    ['styles', 'fonts', 'images', 'plugins', 'scripts', 'watch'],
    callback
  )
});