const gulp = require("gulp"),
  terser = require("gulp-terser"),
  rename = require("gulp-rename"),
  browserSync = require("browser-sync").create(),
  eslint = require("gulp-eslint"),
  sass = require("gulp-sass"),
  babel = require('gulp-babel'),
  autoprefixer = require("gulp-autoprefixer"),
  cssnano = require("gulp-cssnano"),
  prettyError = require("gulp-prettyerror"), 
  reload = browserSync.reload;

gulp.task("scripts", () => {
  return gulp
    .src("./js/main.js")
    .pipe(eslint())
    .pipe(eslint.format()) 
    .pipe(
      babel({
        presets:['@babel/env']
      })
    )
    .pipe(terser())
    .pipe(rename({ extname: ".min.js" })) 
    .pipe(gulp.dest("./build/js"))
    .pipe(browserSync.stream()); 
});

gulp.task("sass", () => {
  return gulp
    .src("./sass/style.scss")
    .pipe(prettyError())
    .pipe(sass())
    // includePaths: ['scss']
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"]
      })
    )
    .pipe(gulp.dest("./build/css"))
    .pipe(cssnano())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("./build/css"))
    .pipe(browserSync.stream());
});

  gulp.task('watch', () => {
    gulp.watch(["./sass/*.scss", ], gulp.series("sass"));
    gulp.watch("./js/*.js", gulp.series("scripts"));
  });  

  gulp.task('browser-sync', () =>{
    browserSync.init({
      open: true, //turn this to false if you dont want it to load new page
      injectChanges:true,
      server: {
        baseDir:"./"
      }
    });
    gulp.watch(["./build/js/*.js", "./build/css/*.css"]).on("change", reload );
  });
gulp.task('default', gulp.parallel('browser-sync', 'watch'));

// , 'watch', 'start-sync' 