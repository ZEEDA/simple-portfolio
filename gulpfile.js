// Variables
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    // sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    input = 'scss/**/*.scss',
    output = 'css';

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};
var autoprefixerOptions = {
  browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

//default
gulp.task('default',['sass', 'watch', 'greeting']);

//tasks
gulp.task('greeting', function(){
    console.log('I\'m Gulp');

});
gulp.task('sass', function () {
  return gulp
    .src(input)
    // .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    // .pipe(sourcemaps.write('./maps'))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest(output));
});

gulp.task('prod', function(){
    return gulp
        .src(input)
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(gulp.dest(output));
});

gulp.task('watch', function() {
  return gulp
    // Watch the input folder for change,
    // and run `sass` task when something happens
    .watch(input, ['sass'])
    // When there is a change,
    // log a message in the console
    .on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});