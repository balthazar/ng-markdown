var gulp = require('gulp'),
	jshint = require('gulp-jshint'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	ngmin = require('gulp-ngmin'),
	cssmin = require('gulp-minify-css'),
	rename = require("gulp-rename"),
	gutil = require('gulp-util'),
	sass = require('gulp-ruby-sass'),
	karma = require('karma').server,
	gulpactor = require("gulp-protractor"),
	args = require('yargs').argv,
	path = rquire('path'),
	coveralls = require('gulp-coveralls');

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
	karma.start({
		configFile: path.join(__dirname, 'test/karma.conf.js'),
	    browsers: ['PhantomJS'],
	    reporters: ['progress']
	}, function (code) {
		gulp.src('test/coverage/**/lcov.info')
			.pipe(coveralls())
			.on('end', function () {
				process.exit(code);
			});
	});
});

gulp.task('e2e:server', function (callback) {
	server.listen(8001, callback);
});

gulp.task('e2e:run', ['e2e:server'], function (callback) {
	gulp.src('test/e2e/*.js')
		.pipe(gulpactor.protractor({
			configFile: 'test/protractor.config.js',
			args: ['--baseUrl', 'http://' + server.address().address + ':' + server.address().port]
		})).on('error', function (e) {
			//console.log(e);
			//throw(e);
			server.close();
			callback();
		}).on('end', function () {
			server.close();
			callback();
		});
});

gulp.task('e2e:update', function () {
	gulpactor.webdriver_update();
});

gulp.task('watch', function () {
	gulp.watch('js/**/*.js', ['js']);
	gulp.watch('css/*.scss', ['css']);
});

gulp.task('default', ['js', 'css', 'watch']);
