const gulp = require('gulp'),
    sass = require('gulp-sass'),
    postCss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    maps = require('gulp-sourcemaps'),
    cleanCss = require('gulp-clean-css'),
    connect = require('gulp-connect');

gulp.task('sass', ()=> {
    return gulp.src('./scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./css/'));
});

gulp.task('postcss', ['sass'], ()=>{
    const plugins = [
        autoprefixer({browsers: ['last 100 versions']})
    ];
    return gulp.src('./css/style.css')
    .pipe(maps.init())
    .pipe(postCss(plugins))
    .pipe(cleanCss())
    .pipe(maps.write())
    .pipe(gulp.dest('./css'))
    .pipe(connect.reload());
});


gulp.task('connect', function() {
    connect.server({
      root: '.',
      livereload: true
    });
  });

  gulp.task('js', ()=> {
    return gulp.src('script.js')
    .pipe(connect.reload());
  });

  gulp.task('html', ()=> {
    return gulp.src('index.html')
    .pipe(connect.reload());
  });
 
   
  gulp.task('watch', function () {
    gulp.watch(['./scss/**/*.scss'], ['postcss']);
    gulp.watch(['script.js'], ['js']);
    gulp.watch(['index.html'], ['html']);
  });
   
  gulp.task('default', ['connect', 'watch']);
   