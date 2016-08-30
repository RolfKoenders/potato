var gulp = require('gulp');
var xo = require('gulp-xo');

gulp.task('lint', function () {
	return gulp.src([
		'gulpfile.js',
		'config/*.js',
		'bin/bot.js',
		'lib/*.js'
	]).pipe(xo({quiet: true}));
});
