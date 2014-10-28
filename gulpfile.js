var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    pkg = require('./package.json'),
    fs = require('fs'),
    changelog = require('conventional-changelog'),
    karma = require('karma').server,
    args = require('yargs').argv,
    path = require('path'),
    es = require('event-stream');

var express = require('express'),
    http = require('http'),
    server = http.createServer(express().use(express.static(__dirname + '/test/e2e/app/')));

gulp.task('js', ['jshint'], function () {
  return gulp.src('js/**/*.js')
    .pipe($.plumber())
    .pipe($.concat('ng-markdown.js'))
    .pipe(gulp.dest('dist'))
    .pipe($.ngAnnotate())
    .pipe($.uglify({ mangle: false }))
    .pipe($.rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist'));
});

gulp.task('css', function () {
  var _highlight = gulp.src('js/highlight/*.css');
  var _sass = gulp.src('css/*.scss')
    .pipe($.plumber())
    .pipe($.rubySass({ compass: true, 'sourcemap=none': true }));

  return es.merge(_sass, _highlight)
    .pipe($.concat('ng-markdown.css'))
    .pipe(gulp.dest('dist'))
    .pipe($.minifyCss())
    .pipe($.rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist'));
});

gulp.task('changelog', function () {
  changelog({
    version: pkg.version,
    repository: 'https://github.com/Apercu/ng-markdown',
    from: '2.0.0'
  }, function(err, log) {
    if (err) throw new Error(err);
    fs.writeFileSync('CHANGELOG.md', log);
  });
});

gulp.task('test', function () {
  karma.start({
    configFile: path.join(__dirname, 'test/karma.conf.js'),
      browsers: ['PhantomJS'],
      reporters: ['progress', 'coverage'],
    singleRun: true
  }, function (code) {
    console.info('[Karma] exited with ', code);
    if (!process.env.TRAVIS) { return code; }
    console.info('[Coverage] Launching...');
    gulp.src('test/coverage/**/lcov.info')
      .pipe($.coveralls())
      .on('end', function() {
        process.exit(code);
      });
  });
});

gulp.task('jshint', function () {
  gulp.src('js/*.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter('default'));
});

gulp.task('e2e:server', function (callback) {
  server.listen(8001, callback);
});

gulp.task('e2e:run', ['e2e:server'], function (callback) {
  gulp.src('test/e2e/*.js')
    .pipe($.protractor.protractor(
      {
        configFile: 'test/protractor.conf.js',
        args: ['--baseUrl', 'http://' + server.address().address + ':' + server.address().port]
      }
    )).on('error', function (e) {
      server.close();
      callback(e);
    }).on('end', function () {
      server.close();
      callback();
    });
});

gulp.task('e2e:update', function () {
  $.protractor.webdriver_update();
});

gulp.task('watch', function () {
  gulp.watch('js/**/*.js', ['js']);
  gulp.watch('css/*.scss', ['css']);
});

gulp.task('default', ['js', 'css', 'watch']);
