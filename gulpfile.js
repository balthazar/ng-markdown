var gulp = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var ngmin = require('gulp-ngmin');
var cssmin = require('gulp-minify-css');
var sass = require('gulp-sass');
var rename = require("gulp-rename");

gulp.task('js', function() {
    return gulp.src('js/*.js')
                    .pipe(jshint())
                    .pipe(jshint.reporter('default'))
                    .pipe(concat('ng-markdown.min.js'))
                    .pipe(ngmin())
                    .pipe(uglify({mangle: false}))
                    .pipe(gulp.dest('dist'));
});

gulp.task('css', function() {
    return gulp.src('css/*.scss')
                    .pipe(sass())
                    .pipe(cssmin())
                    .pipe(rename({suffix: '.min'}))
                    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
    gulp.watch('js/*.js', ['js']);
    gulp.watch('css/*.css', ['css']);
});

gulp.task('default', ['js', 'css']);
