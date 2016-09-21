var gulp = require('gulp');
var ts = require('gulp-typescript');
gulp.task('default', function () {
    return gulp.src('./src/interpreter.ts')
        .pipe(ts({
            out: 'interpreter.js'
        }))
    .pipe(gulp.dest('build'));
});

gulp.task('watch', ['default'], function() {
    gulp.watch('src/*.ts', ['default']);
});
