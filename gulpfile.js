var gulp = require("gulp"),
  uglify = require("gulp-uglify"),
  rename = require("gulp-rename"),
  browserSync = require('browser-sync').create(), 
  eslint = require("gulp-eslint"),
  sass = require("gulp-sass"),
  autoprefixer = require("gulp-autoprefixer"),
  cssnano = require("gulp-cssnano"),
  prettyError = require('gulp-prettyerror');


// gulp.task("js", function() {
//   return gulp
//     .src("./js/*.js") // What files do we want gulp to consume?
//     .pipe(eslint())
//     .pipe(eslint.format())
//     .pipe(uglify()) // Call the uglify function on these files
//     .pipe(rename({ extname: ".min.js" })) // Rename the uglified file
//     .pipe(gulp.dest("./build/js")); // Where do we put the result?
// });

// create a task that ensures the `js` task is complete before
// reloading browsers
// gulp.task('js-watch', function (done) {
//   browserSync.reload();
//   done();
// });

// use default task to launch Browsersync and watch JS files
// gulp.task('start-sync', ['js'], function () {
//   // Serve files from the root of this project
//   browserSync.init({
//       server: {
//           baseDir: "./"
//       }    
//   });
//   // add browserSync.reload to the tasks array to make
//   // all browsers reload after tasks are complete.
//   gulp.watch("js/*.js", gulp.series('js','js-watch'));
// });

gulp.task("sass", function() {
  return gulp
    .src("./sass/style.scss")
    .pipe(prettyError())
    .pipe(sass())
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"]
      })
    )
    .pipe(gulp.dest("./build/css"))
    .pipe(cssnano())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("./build/css"));
});

// gulp.task('default', gulp.parallel('js', 'start-sync','sass'));