var   pkg = require('./package.json'),
       fs = require('fs'),
     gulp = require('gulp'),
       _g = require('gulp-load-plugins')(),
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
    .pipe(_g.concat('ng-markdown.js'))
    .pipe(gulp.dest('dist'))
    .pipe(_g.ngAnnotate())
      .on('error', _g.util.log)
    .pipe(_g.uglify({ mangle: false }))
    .pipe(_g.rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist'));
});

gulp.task('css', function () {
  var _highlight = gulp.src('js/highlight/*.css');
  var _sass = gulp.src('css/*.scss')
    .pipe(_g.rubySass({ compass: true }));

  return es.merge(_sass, _highlight)
    .pipe(_g.concat('ng-markdown.css'))
    .pipe(gulp.dest('dist'))
    .pipe(_g.minifyCss())
    .pipe(_g.rename({ suffix: '.min' }))
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
    console.log('Karma exited with ', code);
    if (process.env.TRAVIS !== true) { return ; }
    gulp.src('test/coverage/**/lcov.info')
      .pipe(_g.coveralls())
      .on('end', function() {
        process.exit(code);
      });
  });
});

gulp.task('jshint', function () {
  return gulp.src('js/*.js')
    .pipe(_g.jshint())
    .pipe(_g.jshint.reporter('default'));
});

gulp.task('e2e:server', function (callback) {
  server.listen(8001, callback);
});

gulp.task('e2e:run', ['e2e:server'], function (callback) {
  gulp.src('test/e2e/*.js')
    .pipe(_g.protractor.protractor(
      {
        configFile: 'test/protractor.conf.js',
        args: ['--baseUrl', 'http://' + server.address().address + ':' + server.address().port]
      }
    )).on('error', function (e) {
      console.log(e);
      server.close();
      callback();
    }).on('end', function () {
      server.close();
      callback();
    });;
});

gulp.task('e2e:update', function () {
  _g.protractor.webdriver_update();
});

gulp.task('watch', function () {
  gulp.watch('js/**/*.js', ['js']);
  gulp.watch('css/*.scss', ['css']);
});

gulp.task('default', ['js', 'css', 'watch']);
