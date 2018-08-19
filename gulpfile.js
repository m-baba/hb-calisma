var gulp = require('gulp'),
    minifyCss = require("gulp-minify-css"),
    less = require('gulp-less'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename');

/********************
// LESS-CSS BUNDLE
********************/
gulp.task('less', function () {
    //Main Bundle
    gulp.src([
                './less/variable.less',
                './less/mixin.less',
                './less/icon.less',
                './less/general.less',
                './less/style.less'
            ])
			.pipe(concat('hb-min.css'))
			.pipe(less())
			.pipe(gulp.dest('./dist/'))
			.pipe(minifyCss())
			.pipe(gulp.dest('./dist/'));
});

/********************
// JS BUNDLE
********************/
gulp.task('scripts', function () {
    return gulp.src([
        './js/store.js',
        './js/template.js',
        './js/helpers.js',
        './js/renderer.js',
        './js/bussines.js'
    ])
    .pipe(uglify())
    .pipe(concat('hb-min.js'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('build', ['less', 'scripts']);