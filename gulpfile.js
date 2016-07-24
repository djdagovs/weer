"use strict";

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    livereload = require('gulp-livereload'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');

var stylesheets = [
    './bower_components/animate.css/animate.min.css',
    'web/assets/css/**/*.css'
];

var fonts = [
    './bower_components/bootstrap-sass/assets/fonts/**/*',
    './bower_components/font-awesome/fonts/*'
];

var scripts = {
    app: [
        'web/assets/js/**/*.js',
    ],
    vendor: [
        './bower_components/jquery/dist/jquery.min.js',
        './bower_components/bootstrap-sass/assets/javascripts/bootstrap.min.js',
        './bower_components/jasny-bootstrap/js/offcanvas.js'
    ],
};

gulp.task('twig', function() {
    return gulp.src('app/Resources/views/**/*.html.twig')
        .pipe(livereload());
});

gulp.task('sass', function() {
    return gulp.src('web/assets/sass/**/*.{sass,scss}')
        .pipe(sass({outputStyle: 'compressed'}).on('error', function(error) {
            gutil.log(error);
            this.emit('end');
        }))
        .pipe(autoprefixer())
        .pipe(gulp.dest('web/assets/css'))
        .pipe(livereload());
});

gulp.task('css', ['sass'], function() {
    return gulp.src(stylesheets)
        .pipe(concat('app.min.css'))
        .pipe(gulp.dest('web/build/css'));
});

gulp.task('fonts', function() {
    return gulp.src(fonts)
        .pipe(gulp.dest('web/build/fonts/'));
});

gulp.task('scripts_app', function() {
    return gulp.src(scripts.app)
        .pipe(uglify().on('error', function(error) {
            gutil.log(error);
            this.emit('end');
        }))
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest('web/build/js'))
        .pipe(livereload());
});

gulp.task('scripts_vendor', function() {
    return gulp.src(scripts.vendor)
        .pipe(uglify().on('error', function(error) {
            gutil.log(error);
            this.emit('end');
        }))
        .pipe(concat('vendor.min.js'))
        .pipe(gulp.dest('web/build/js'))
        .pipe(livereload());
});

gulp.task('watch', function() {
    livereload.listen({
        host: 'localhost'
    });

    // Watch Twig files
    gulp.watch('app/Resources/views/**/*.html.twig', ['twig']);

    // Watch SASS and SCSS files
    gulp.watch('web/assets/sass/**/*.{sass,scss}', ['css']);

    // Watch JS files
    gulp.watch('web/assets/js/*.js', ['scripts_app']);
});

gulp.task('build', ['css', 'fonts', 'scripts_app', 'scripts_vendor']);

gulp.task('default', ['watch']);
