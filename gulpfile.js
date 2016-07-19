/*
 Gulp file for Cotton Images v.2.1
 created by  : richard sprince
 date        : 7 jan 2016
 TO DO:
 - check order that files get injected.
 */

// Load plugins, set to variables
var gulp        = require('gulp-param')(require('gulp'), process.argv); //pass params from command line, use gulp plugin
var compass     = require('gulp-compass'); //ruby compass for gulp
var browserSync = require('browser-sync').create(); //reload browsers when files change.
var runSequence = require('run-sequence'); //run tasks in sequence, ex. in default task.
var rename      = require('gulp-rename'); //rename a template file.
var sugar       = require('sugar'); //additional js functionality.
var template    = require('gulp-template'); //allows data (variable) injection into generated files. See: https://github.com/sindresorhus/gulp-template.
var inject      = require('gulp-inject'); //inject file paths into index page. <!-- inject:js --><!-- endinject -->
var print       = require('gulp-print'); //prints names of files to the console for debugging

var del         = require('del'); //deletes files for directory cleaning
var useref      = require('gulp-useref'); //concantenate files <!-- build:css assets/styles.min.css --><!-- endbuild -->
var uglify      = require('gulp-uglify'); //gulp file minification
var gulpIf      = require('gulp-if'); //conditional gulp statements
var cssnano     = require('gulp-cssnano'); //minifying css
var htmlmin     = require('gulp-htmlmin'); //minify html
var imagemin    = require('gulp-imagemin'); //optimize images
var zip         = require('gulp-vinyl-zip'); //compress files into an archive
var cache       = require('gulp-cache'); //cache images

var rev         = require('gulp-rev'); //generate revision number in name
var revReplace  = require('gulp-rev-replace'); //replace file reference with revision number in name

// Application variables
var APP_ROOT  = "app/";
var templates = {
    DIRECTIVE   : "templates/directive.js",
    CONTROLLER  : "templates/controller.js",
    HTML        : "templates/view.html",
    STYLES      : "templates/styles.scss",
    TEST        : "templates/test.js",
    DATAMODEL   : "templates/data-service.js",
    FUNCTION    : "templates/function-service.js"
};
var paths = {
    DIRECTIVE   : APP_ROOT + "components/",
    CONTROLLER  : APP_ROOT + "features/",
    DATAMODEL   : APP_ROOT + "js/data-model",
    FUNCTION    : APP_ROOT + "js/services"
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
            css: 'app/css',                 // Where to write the css files
            sass: 'app/scss',               // Where the sass files live
            require: ['sass-globbing']      // Allows @import "variables/**/*";
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
                          'app/css/**/*.css',
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
/* --- these all use generate(name, templateNameKey, locationKey) ---*/
//task to generate a directive (.html, .js, .scss) to be used as an app component (app/component)
gulp.task('generate:component', function(name){
  generate(name, 'DIRECTIVE');            // Directive file
  generate(name, 'HTML', 'DIRECTIVE');    // HTML file
  generate(name, 'STYLES', 'DIRECTIVE');  // SCSS file
  generate(name, 'TEST', 'DIRECTIVE');    // Test file
});
//task to generate a page view and controller (.html, .js, .scss) to be used as an app feature (app/feature)
gulp.task('generate:feature', function(name){
  generate(name, 'CONTROLLER');
  generate(name, 'HTML', 'CONTROLLER');
  generate(name, 'STYLES', 'CONTROLLER');
  generate(name, 'TEST', 'CONTROLLER');
});

//task to generate a service to be used as a data model/data source (js/data-model)
gulp.task('generate:data-model', function(name){
  generate(name, 'DATAMODEL', 'DATAMODEL');
});


//task to generate a reusable function as a service (js/services)
gulp.task('generate:function-service', function(name){
  generate(name, 'FUNCTION', 'FUNCTION');
});


//---------------- Build production version -----------------------\\
gulp.task('build:production', function(){
  //clean dist folder, concat & minify css, js, html
  //TO DO: debug images
  runSequence('clean-dist', 'concat-minify', 'copy-bower', 'optimize-html', 'optimize-images', 'copy-fonts', 'copy-data', 'zip-files', 'runProd');
});

//Clean out dist folder
gulp.task('clean-dist', function(){
  //return del(['dist/**'], {dryRun: true}).then(paths => {console.log('FILES AND FOLDERS THAT WOULD BE DELETED: \n', paths.join('\n'));});
  return del(['dist/**', '!dist']).then(paths => {console.log('DELETED FILES AND FOLDERS:\n', paths.join('\n'));});
  //return del.sync('dist');
});
//Concatenate, minify JS, CSS files
gulp.task('concat-minify', function(){
  var whichFiles = ['app/index.html'];
  return gulp.src(whichFiles)
  .pipe(useref())
  .pipe(gulpIf('*.js', uglify()))
  .pipe(gulpIf('*.css', cssnano()))
  .pipe(gulpIf('!*.html', rev())) //If not an .html, insert a hash code as a revision number.
  //.pipe(gulpIf('!*.html', revReplace()))
  .pipe(revReplace())
  .pipe(gulp.dest('dist'))
});
//Copy, optimize HTML files and directories
gulp.task('optimize-html', function(){
  var whichFiles = [  //specify source files
    'app/components/**/*.html',
    'app/features/**/*.html'
  ];
  return gulp.src(whichFiles, { base: './app' } ) //set source, base maintains directory structure
  .pipe(htmlmin({ collapseWhitespace: true, removeComments: true, removeIgnored: true })) //minify files
  .pipe(gulp.dest('dist')); //copy into dist.
});
//Optimize Images
gulp.task('optimize-images', function(){
  return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
  // Caching images that ran through imagemin
  .pipe(cache(imagemin({
      interlaced: true,
      progressive: true
    })))
  .pipe(gulp.dest('dist/images'))
});
//copy fonts
gulp.task('copy-fonts', function(){
  return gulp.src('app/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
});
//copy bower files
gulp.task('copy-bower', function(){
  var whichFiles = [  //specify source files
    'app/bower_components/**/*.*'
  ];
  return gulp.src(whichFiles, { base: './app' })
  .pipe(gulp.dest('dist/'))
});
//copy test data
gulp.task('copy-data', function(){
  return gulp.src('app/js/data/**/*')
  .pipe(gulp.dest('dist/js/data'))
});
//compress files into an archive
gulp.task('zip-files', function () {
	return gulp.src('dist/**/*')
		// .pipe(/* knock yourself out */)
		.pipe(zip.dest('dist/archive/cotton-archive.zip'));
});


//run production version
gulp.task('runProd', function(){
    browserSync.init({
        server: "./dist",
    });
});
//------------------------------------------------------------------//


//************* FUNCTIONS ******************//
function generate(name, templateNameKey, locationKey) {
    /*
     STEP 1: Setup variables
     */
    var templateUrl = templates[templateNameKey];
    //If it's a test, add "_test" to the name.
    var newName = templateNameKey === 'TEST' ? name + "_test" : name;

    // console.log("Name: " + name);
    // console.log("New Name: " + newName);
    // console.log("templateNameKey: " + templateNameKey);
    //console.log("templateUrl: " + templateUrl);

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
    //console.log("destinationPath: " + destinationPath);
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
         NOTE: .dasherize() & .camelize() are SugarJS functions
         */
        .pipe(template({
            // Make sure your naming is consistent with the type of module you are creating
            name: shouldDasherizeVariableNames ? name.dasherize() : name.camelize(),

            // This is primarily used when creating directives as the template URL needs to know where the HTML lives
            url: destinationPath + '/' + name.dasherize() +'.html',
            directiveName: name.camelize(false) //don't capitalize first letter.
        }))
        /*
         STEP 5: Store the newly renamed template to the appropriate destination.
         */
        .pipe(gulp.dest('./'));
        console.log(destinationPath + '/' + name.dasherize() +'.html');
}

function camelcase(input){
    return input.toLowerCase().replace(/-(.)/g, function(match, group1){
        return group1.toUpperCase();
    })
}

function dasherize(input){
    return input.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
