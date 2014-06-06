var gulp = require('gulp');
var stylus = require('stylus');

var svgicons2svgfont = require('gulp-svgicons2svgfont');
var svg2ttf = require('gulp-svg2ttf');
var ttf2eot = require('gulp-ttf2eot');
var ttf2woff = require('gulp-ttf2woff');
var template = require('gulp-template');
var rename = require('gulp-rename');
var stylus = require('gulp-stylus');
var Q = require('q');

gulp.task('iconfont', function() {
  var tplDeferred = Q.defer();
  var stylusDeferred = Q.defer();

  gulp.src(['css/svg/*.svg'])
    .pipe(svgicons2svgfont({
      fontName: 'vegeta'
    }))
    .on('codepoints', function(codepoints) {
      var locals = {
        codepoints: codepoints
      };

      gulp.src('css/vegeta.tpl')
        .pipe(template(locals))
        .pipe(rename({
          extname: ".styl"
        }))
        .pipe(gulp.dest('./css/'))
        .on('end', function() {
          stylusDeferred.resolve();
        });

      gulp.src('index.tpl')
        .pipe(template(locals))
        .pipe(rename({
          extname: ".html"
        }))
        .pipe(gulp.dest('./'))
        .on('end', function() {
          tplDeferred.resolve();
        });


      // Here generate CSS/SCSS  for your codepoints ...
    })
    .pipe(svg2ttf())
    .pipe(ttf2eot())
    .pipe(gulp.dest('css/fonts/'));
  return Q.all([tplDeferred.promise, stylusDeferred.promise]);
});

gulp.task('stylus', ["iconfont"], function() {
  gulp.src(['css/vegeta.styl'])
    .pipe(stylus())
    .pipe(gulp.dest('css/'))
});


gulp.task("default", ["stylus"]);