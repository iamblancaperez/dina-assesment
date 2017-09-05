const gulp = require('gulp');
const mocha = require('gulp-mocha');
const sass = require('gulp-sass');
const inject = require('gulp-inject');
const gutil = require('gulp-util');
const uglify = require('gulp-uglify');
const cssMinify = require('gulp-minify-css');
const concat = require('gulp-concat');

gulp.task('tests', function() {
  return gulp.src(['test/test-*.js'], {read: false})
	.pipe(mocha({reporter: 'nyan'}))
});
 
gulp.task('styles', function(){
  var injectAppFiles = gulp.src(['src/assets/sass/_variables.scss', 
    'src/assets/sass/*.scss', 
    '!src/assets/sass/main.scss'], {read: false});
 
  function transformFilepath(filepath) {
    return '@import "' + filepath + '";';
  }
 
  var injectAppOptions = {
    transform: transformFilepath,
    starttag: '// import-scss-files',
    endtag: '// end import-scss-files',
    addRootSlash: false
  };
 
  return gulp.src('src/assets/sass/main.scss')
    .pipe(inject(injectAppFiles, injectAppOptions))
    .pipe(sass().on('error', sass.logError))
    .pipe(cssMinify())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('script', function(){
  gulp.src(['src/lib/*.js', 'src/assets/js/*.js'])
  .pipe(concat('script.min.js'))   
  .pipe(gulp.dest('dist/js/'));
});

gulp.task('html', ['styles', 'script'],function(){
	var injectFiles = gulp.src(['dist/css/main.css']);

	var injectOptions = {
    addRootSlash: false,
    ignorePath: ['src', 'dist']
  };

  return gulp.src('src/index.html')
  	.pipe(inject(injectFiles, injectOptions))
    .pipe(gulp.dest('dist'))
});

