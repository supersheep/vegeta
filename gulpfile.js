var gulp = require('gulp');

var svgicons2svgfont = require('gulp-svgicons2svgfont');
var svg2ttf = require('gulp-svg2ttf');
var ttf2eot = require('gulp-ttf2eot');
var ttf2woff = require('gulp-ttf2woff');
var template = require('gulp-template');
var rename = require('gulp-rename');
var stylus = require('gulp-stylus');
var clean = require('gulp-clean');
var Q = require('q');
var translate = require('./translate');

var codepoints;
var FONT_DIR = './css/fonts/';

gulp.task('svg', ['clean'], function() {
  return gulp.src(['css/svg/*.svg'])
    .pipe(svgicons2svgfont({
      fontName: 'vegeta'
    }))
    .on('codepoints', function(cp) {
      codepoints = cp;
    })
    .pipe(gulp.dest(FONT_DIR))
});

gulp.task('stylusTpl', ['svg'], function() {
  return gulp.src('css/vegeta.tpl')
    .pipe(template({
      codepoints: codepoints
    }))
    .pipe(rename({
      extname: ".styl"
    }))
    .pipe(gulp.dest('./css/'));

});

gulp.task('pageTpl', ['svg'], function() {
  return gulp.src('index.tpl')
    .pipe(template({
      codepoints: codepoints,
      translate:translate
    }))
    .pipe(rename({
      extname: ".html"
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('ttf', ['svg'], function() {
  return gulp.src('css/fonts/*.svg')
    .pipe(svg2ttf())
    .pipe(gulp.dest(FONT_DIR))
});

gulp.task('eot', ['ttf'], function() {
  return gulp.src(['css/fonts/*.ttf'])
    .pipe(ttf2eot())
    .pipe(gulp.dest(FONT_DIR))
});

gulp.task('woff', ['ttf'], function() {
  return gulp.src(['css/fonts/*.ttf'])
    .pipe(ttf2woff())
    .on('error', function(err) {
      console.log(err);
    })
    .pipe(gulp.dest(FONT_DIR))
});

gulp.task('clean', function() {
  return gulp.src(['css/fonts', 'css/vegeta.styl', 'css/vegeta.css', 'index.html'], {
      read: false
    })
    .pipe(clean())
});

gulp.task('iconfont', ['eot', 'woff']);

gulp.task('stylus', ["stylusTpl"], function() {
  gulp.src(['css/vegeta.styl'])
    .pipe(stylus())
    .pipe(gulp.dest('css/'))
});


gulp.task("default", ["stylus", "iconfont", "pageTpl"]);