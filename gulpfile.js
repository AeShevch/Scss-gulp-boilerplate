const gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    sourcemaps = require('gulp-sourcemaps'),
    del = require('del'),
    concat = require('gulp-concat'),
    plumber = require('gulp-plumber');

function scss() {
    return gulp.src(
        [
            'src/scss/*.scss'
        ])
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(cleanCSS({
            level: {
                1: {
                    specialComments: 0
                }
            }
        }))
        .pipe(concat("bundle.css"))
        .pipe(sourcemaps.write('/'))
        .pipe(gulp.dest('dist/css'));
}

function clean() {
    return del(['dist/css/style.css'])
}

gulp.task('scss', scss);

function watch() {
    gulp.watch('src/scss/*.scss', scss);
    // gulp.watch('src/script.js', js);
}

gulp.task('watch', watch);

gulp.task('build', gulp.series(
    clean,
    gulp.parallel(scss)
));

gulp.task('default', gulp.series('build', 'watch'));
