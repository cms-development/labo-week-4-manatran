var gulp = require('gulp'),
  livereload = require('gulp-livereload'),
  eslint = require('gulp-eslint'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', () => {
  gulp.src('./src/sass/styles.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(autoprefixer('last 2 version'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./css'));
});

function isFixed(file) {
  // Has ESLint fixed the file contents?
  return file.eslint != null && file.eslint.fixed;
}

gulp.task('eslint', () => {
  gulp.src(['./src/js/main.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    // if fixed, write the file to dest
    .pipe(gulpIf(isFixed, gulp.dest('./js/')));;
});

gulp.task('watch', () => {
  livereload.listen();

  gulp.watch('./src/sass/styles.scss', ['sass']);
  gulp.watch('./src/js/main.js', ['eslint']);
  gulp.watch(['./css/style.css', './js/main.js'], (files) => {
    livereload.changed(files)
  });
});
