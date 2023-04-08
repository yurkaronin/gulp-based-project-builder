const gulp = require('gulp');
const fileInclude = require('gulp-file-include');
const scss = require('gulp-dart-sass');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const rename = require('gulp-rename');


// Обработка HTML
gulp.task('html', function () {
  return gulp.src(['*.html'])
    .pipe(fileInclude({
      basePath: 'SECTIONS/'
    }))
    .pipe(fileInclude({
      basePath: 'ITEMS/'
    }))
    .pipe(gulp.dest('dist'));
});

// Обработка SCSS
gulp.task('scss', function () {
  return gulp.src('src/scss/**/*.scss')
    .pipe(scss().on('error', scss.logError))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/css'));
});

// Обработка JavaScript
gulp.task('js', function () {
  return gulp.src('src/js/**/*.js')
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/js'));
});

// Отслеживание изменений
gulp.task('watch', function () {
  gulp.watch('*.html', gulp.series('html'));
  gulp.watch('SECTIONS/**/*.html', gulp.series('html'));
  gulp.watch('ITEMS/**/*.html', gulp.series('html'));
  gulp.watch('src/scss/**/*.scss', gulp.series('scss'));
  gulp.watch('src/js/**/*.js', gulp.series('js'));
});

// Задача по умолчанию
gulp.task('default', gulp.series('html', 'scss', 'js', 'watch'));
