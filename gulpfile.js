var gulp = require('gulp');
var sass = require('gulp-sass'); // Requires the gulp sass plugin
var browserSync = require('browser-sync'); // Requires the gulp browser sync plugin
var useref = require('gulp-useref'); // Requires the useref plugin
var uglify = require('gulp-uglify'); // Requires the uglify plugin
var gulpIf = require('gulp-if'); // Requires the if plugin. Adds if logic to gulp
var cssnano = require('gulp-cssnano'); // Requires the css nano plugin

gulp.task('browserSync', function() { // Reg task set up syntax
	browserSync.init({ // Initalise browserSync plugin
		server: { // Where is the project base directory?
			baseDir: 'app'
		},
	})
});

// gulp.task('taskName', function(){});
gulp.task('sass', function() {
	return gulp.src('app/scss/**/*.scss') // Source files. All in app/scss and children directories
		.pipe(sass()) // Converts SCSS to CSS
		.pipe(gulp.dest('css')) // Which folder to place output file
		.pipe(browserSync.reload({ // Tell browserSync to reload webpage after sass is converted to css
			stream: true // Don't put a semicolon here it breaks everything
		}))
});

gulp.task('useref', function() {
	return gulp.src('app/*.html') // Select this file(s)
		.pipe(useref()) // Run useref using target file
		.pipe(gulpIf('app/*.js', uglify())) // Only minify if type is js
		.pipe(gulpIf('app/*.css', cssnano()))// Only minify if type is css
		.pipe(gulp.dest('app/dist')) // Place output in dist folder
});

// gulp.task('taskName', ['runTheseFirst'], function(){});
gulp.task('watch', ['browserSync', 'sass'], function() {
	gulp.watch('app/scss/**/*.scss', ['sass']); // gulp.watch('filesToWatch', ['tasksToRun']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
	// Can add other watchers here
});