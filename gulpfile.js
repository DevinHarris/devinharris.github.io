let gulp = require('gulp'),
	sass = require('gulp-sass'),
	jsHint = require('gulp-jshint'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	imagemin = require('gulp-imagemin'),
	pump = require('pump'),
	bs = require('browser-sync').create();

/* Changed callbacks to Arrow functions */

gulp.task('sass', () => {
	return gulp
		.src('./public/sass/**/*.scss')
		.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(gulp.dest('./public/css'))
		.pipe(bs.stream());
});

gulp.task('uglify', cb => {
	pump([gulp.src('public/**/*.js'), uglify(), gulp.dest('public/js/min')], cb);
});

gulp.task('imagemin', () => {
	gulp
		.src('public/img/*')
		.pipe(imagemin())
		.pipe(gulp.dest('public/img'));
});

gulp.task('default', () => {
	console.log('Working properly');

	bs.init({
		server: {
			baseDir: './'
		},

		injectChanges: true
	});

	gulp.watch('./public/sass/**/*.scss', ['sass']);
	gulp.watch('./*.html').on('change', bs.reload);
	gulp
		.src('./public/img/writeup-imgs-src/*')
		.pipe(imagemin())
		.pipe(gulp.dest('./public/img/writeup-imgs'));
	//gulp.watch('./public/js/**/*.js', ['uglify']);
});
