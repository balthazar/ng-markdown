var gulp = require('gulp'),
	jshint = require('gulp-jshint'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	ngmin = require('gulp-ngmin'),
	cssmin = require('gulp-minify-css'),
	rename = require("gulp-rename"),
	gutil = require('gulp-util'),
	sass = require('gulp-ruby-sass'),
	karma = require('gulp-karma'),
	gulpactor = require("gulp-protractor"),
	args = require('yargs').argv;

//Server config
var express = require('express'),
	http = require('http'),
	server = http.createServer(express().use(express.static(__dirname + '/test/e2e/app/')));

function handleError(err) {
	console.log(err.toString());
	this.emit('end');
}

gulp.task('js', function () {
	return gulp.src('js/**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(concat('ng-markdown.js'))
		.pipe(gulp.dest('dist'))
		.pipe(ngmin())
		.pipe(uglify({mangle: false}))
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('dist'));
});

gulp.task('css', function () {
	return gulp.src('css/*.scss')
		.pipe(sass({compass: true}))
		.pipe(gulp.dest('dist'))
		.on('error', handleError)
		.pipe(cssmin())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('dist'));
});

gulp.task('test', function () {
	return gulp.src('./ok')
		.pipe(karma({
			configFile: 'test/karma.conf.js',
			action    : 'run'
		})).on('error', function (err) {
			throw err;
		});
});

gulp.task('e2e:run', function () {
	gulp.src('test/e2e/*.js')
		.pipe(gulpactor.protractor({
			configFile: 'test/protractor.config.js',
			args: ['--baseUrl', 'http://' + server.address().address + ':' + server.address().port]
		}));
});

gulp.task('e2e:update', function () {
	gulpactor.webdriver_update();
});

gulp.task('watch', function () {
	gulp.watch('js/**/*.js', ['js']);
	gulp.watch('css/*.scss', ['css']);
});

gulp.task('default', ['js', 'css', 'watch']);
