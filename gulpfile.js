/*
 Gulp file for Cotton Images v.2.1
 created by  : richard sprince
 date        : 7 jan 2016
 modified    : 18 jan 2016
 */

// Load plugins, set to variables
var gulp        = require('gulp-param')(require('gulp'), process.argv); //pass params from command line, use gulp plugin
var compass     = require('gulp-compass'); //ruby compass for gulp
var browserSync = require('browser-sync').create(); //reload browsers when files change.
var runSequence = require('run-sequence'); //run tasks in sequence, ex. in default task.
var rename      = require('gulp-rename'); //rename a template file.
var sugar       = require('sugar'); //additional js functionality.
var template    = require('gulp-template'); //allows data (variable) injection into generated files. See: https://github.com/sindresorhus/gulp-template.
var inject      = require('gulp-inject'); //inject file paths into index page.
var print       = require('gulp-print'); //prints names of files to the console for debugging

// Application variables
var APP_ROOT  = "app/";
var templates = {
    DIRECTIVE   : "templates/directive.js",
    CONTROLLER  : "templates/controller.js",
    HTML        : "templates/view.html",
    STYLES      : "templates/styles.scss",
    TEST        : "templates/test.js"
};
var paths = {
    DIRECTIVE   : APP_ROOT + "components/",
    CONTROLLER  : APP_ROOT + "features/"
};

//*********************** TASKS ********************//
// SASS to CSS Task
gulp.task('sass', function(cb){
    return gulp.src('app/scss/main.scss')  // Find ONLY the main.scss file
        .on('error', function(error) {
            // Would like to catch the error here
            console.log(error);
            this.emit('end');
        })
        .pipe(compass({
            sourcemap: true,                // Creates the css source map
            comments: true,                 // adds the comments in the css
            css: 'app/css',                 // This lets compass know where to write the css files
            sass: 'app/scss',               // This lets compass know where the sass files live
            require: ['sass-globbing']      // you need to require any extra gems. sass-globbing allows your to do  @import "variables/**/*";
        }))
        .pipe(browserSync.stream())
});

// Watch Task
gulp.task('watch', ['browserSync'], function(){
    gulp.watch('app/**/*.scss', ['sass']);
    gulp.watch(['app/**/*.html','app/**/*.js']).on('change', browserSync.reload);

});

//Inject file path references to index page.
gulp.task('index', function(){
  var target = gulp.src('app/index.html');
  var sources = gulp.src(['app/**/*.js',
                          'app/**/*.js',
                          'app/css/*.css',
                          '!app/**/*-test.js',
                          '!app/**/*_test.js',
                          '!app/bower_components/**/*'
  ], {read: false});
  return target.pipe(inject(sources, {relative: true})) //{relative: true}, {ignorePath: 'app'}
    .pipe(gulp.dest('./app'));
});

// BrowserSync Task
gulp.task('browserSync', function(){
    browserSync.init({
        server: "./app",
    });
});

// Default Task, run some tasks in sequence
gulp.task('default', function(){
    runSequence('sass', 'watch', 'index');
});

//************ BUILD TASKS *********************//
gulp.task('generate:component', function(name){
  generate(name, 'DIRECTIVE');            // Directive file
  generate(name, 'HTML', 'DIRECTIVE');    // HTML file
  generate(name, 'STYLES', 'DIRECTIVE');  // SCSS file
  generate(name, 'TEST', 'DIRECTIVE');    // Test file
});

gulp.task('generate:feature', function(name){
  generate(name, 'CONTROLLER');
  generate(name, 'HTML', 'CONTROLLER');
  generate(name, 'STYLES', 'CONTROLLER');
  generate(name, 'TEST', 'CONTROLLER');
});

//************* FUNCTIONS ******************//
function generate(name, templateNameKey, locationKey) {
    /*
     STEP 1: Setup variables
     */
    var templateUrl = templates[templateNameKey];
    //var newName;
    var newName = templateNameKey === 'TEST' ? name + "_test" : name;
    // console.log("Name: " + name);
    // console.log("New Name: " + newName);
    // console.log("templateNameKey: " + templateNameKey);
    // console.log("templateUrl: " + templateUrl);

    // some of the variable need to be dasherized and others need to be camel case.
    var shouldDasherizeVariableNames = (templateNameKey === 'HTML' || templateNameKey === 'STYLES');
    // if true it will create a new folder based on the name passed in.
    var needAdditionalFolder = (templateNameKey === 'HTML' || templateNameKey === 'STYLES' ||
    templateNameKey === 'DIRECTIVE' || templateNameKey === 'CONTROLLER' || templateNameKey === 'TEST' );

    // If creating a destination path for components/features, you need to create the folder
    // IF the user gave a name using camel-case or underscores it will be transformed to dashes
    // NOTE: paths[locationKey || templateNameKey] will use the locationKey to find the path but if it does not
    // exist (undefined) then it will use the templateNameKey
    var destinationPath = paths[locationKey || templateNameKey];
    destinationPath += (needAdditionalFolder) ? name.dasherize() : '';
    /*
     STEP 2: Get the template
   */
  return gulp.src( templateUrl)
        /*
         STEP 3: Rename the template
         */
        .pipe(rename(function (path) {
            // This is the directory you want to save the file in
            path.dirname = destinationPath;

            // This what you want to rename your file to.
            path.basename = newName.dasherize();
        }))
        /*
         STEP 4: Inject the data into the template.
         */
        .pipe(template({
            // Make sure your naming is consistent with the type of module you are creating
            name: shouldDasherizeVariableNames ? name.dasherize() : name.camelize(),

            // This is primarily used when creating directives as the template URL needs to know where the HTML lives
            url: destinationPath + '/' + name.dasherize() +'.html'
        }))
        /*
         STEP 5: Store the newly renamed template to the appropriate destination.
         */
        .pipe(gulp.dest('./'));
}
