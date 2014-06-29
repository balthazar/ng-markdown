var gulp = require('gulp'),
	jshint = require('gulp-jshint'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	ngmin = require('gulp-ngmin'),
	cssmin = require('gulp-minify-css'),
	rename = require("gulp-rename"),
	gutil = require('gulp-util'),
	sass = require('gulp-ruby-sass'),
	karma = require('gulp-karma');

function handleError(err) {
	console.log(err.toString());
	this.emit('end');
}

gulp.task('js', function () {
	return gulp.src('js/**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(concat('ng-markdown.min.js'))
		.pipe(ngmin())
		.pipe(uglify({mangle: false}))
		.pipe(gulp.dest('dist'));
});

gulp.task('css', function () {
	return gulp.src('css/*.scss')
		.pipe(sass({compass: true}))
		.on('error', handleError)
		.pipe(cssmin())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('dist'));
});

gulp.task('test', function () {
	return gulp.src('./ok')
		.pipe(karma({
			configFile: 'karma.conf.js',
			action    : 'run'
		})).on('error', function (err) {
			throw err;
		});
});

gulp.task('watch', function () {
	gulp.watch('js/*.js', ['js']);
	gulp.watch('css/*.scss', ['css']);
});

gulp.task('default', ['js', 'css', 'watch']);
