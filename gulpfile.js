var gulp 			= require('gulp'),
	sass 			= require('gulp-sass'),
	browserSync 	= require('browser-sync'),
	cssnano     	= require('gulp-cssnano'), 
    rename      	= require('gulp-rename'); 

gulp.task('sass', function () {
  return gulp.src('sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('app/css'))
  	.pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function() { 
    browserSync({ 
        server: { 
            baseDir: 'app' // directory app
        },
        notify: false // notify off
    });
});

gulp.task('css-libs', ['sass'], function() {
    return gulp.src('app/css/main.css') 
        .pipe(cssnano()) // Minify
        .pipe(rename({suffix: '.min'})) // Додаємо суфікс min
        .pipe(gulp.dest('app/css')); 
});

gulp.task('watch', ['browser-sync', 'css-libs', 'sass'], function() {
	gulp.watch('sass/**/*.scss',['sass']);
	gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload); 
});

gulp.task('build', ['sass'], function() {

    var buildCss = gulp.src([ 
        'app/css/main.css',
        'app/css/main.min.css'
        ])
    .pipe(gulp.dest('dist/css'))

    var buildFonts = gulp.src('app/fonts/**/*') 
    .pipe(gulp.dest('dist/fonts'))

    var buildJs = gulp.src('app/js/**/*') 
    .pipe(gulp.dest('dist/js'))

    var buildHtml = gulp.src('app/*.html') 
    .pipe(gulp.dest('dist'));

});

gulp.task('default', ['watch']); //Default task now is 'watch'