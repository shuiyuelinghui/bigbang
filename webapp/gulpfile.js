//var fs = require('fs');
//var gulp = require('gulp');
//var clean = require('gulp-clean');
//var shell = require('gulp-shell');
//var runSequence = require('run-sequence');
//var setup = require('./setup/setup');
//
///**
// * 清理tmp
// */
//gulp.task('clean', function(){
//    return gulp.src('tmp', {read: false,force: true}).pipe(clean());
//});
//
//
///**
// * 拷贝App
// */
//gulp.task('copy-app',function() {
//    return gulp.src(['dist/**/*.*']).pipe(gulp.dest('tmp/dist'));
//});
//
//
///**
// * 拷贝nw运行包
// */
//gulp.task('copy-node-webkit',function() {
//  return gulp.src(['node_webkit/*.*']).pipe(gulp.dest('tmp'));
//});
//
///**
// * 拷贝data
// */
//gulp.task('copy-data',function() {
//    return gulp.src(['data/*.*']).pipe(gulp.dest('tmp/data'));
//});
//
//
///**
// * 拷贝node模块
// */
//gulp.task('copy-node-modules',function() {
//  return gulp.src([
//    'node_modules/**/*.*',
//    '!node_modules/gulp*/**/*.*',
//    '!node_modules/run-sequence/**/*.*'
//  ]).pipe(gulp.dest('tmp/node_modules'));
//});
//
///**
// * 拷贝配置文件
// */
//gulp.task('create-package-json',function() {
//    return gulp.src(['package.json']).pipe(gulp.dest('tmp'));
//});
//
//
///**
// * InnoSetup打包
// */
//gulp.task('exe-package', shell.task([
//  setup.InnoSetupPath + ' "' + setup.InnoSetupConfig + '"'
//]));
//
///**
// * 入口
// */
//gulp.task('default', function(){
//  runSequence(
//      'clean',
//        [
//         'copy-app',
//         'copy-node-modules',
//         'copy-node-webkit',
//         'copy-data'
//       ],
//       'create-package-json',
//      'exe-package',
//      'clean'
//  );
//});


var gulp = require('gulp');
var gutil = require('gulp-util');
var del = require('del');
var rename = require('gulp-rename');
var browserify=require('gulp-browserify');
var less = require('gulp-less');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var replace = require('gulp-replace');//npm install --save-dev gulp-replace
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');


gulp.task('less', function () {
    return gulp.src(['style/base.less','style/adminds/themes-override-xk3.less','style/index.less'])//,'style/theme.less'])
        .pipe(less())
        .pipe(replace(/\/\*\s*\w+\:\s*calc\(.{3,24}\)\!?.{0,12};\s*\*\//gi,function($){return $.replace(/\/\*|\*\//g,'')}))
        //.pipe(replace(/\/\*CSSimport.*\*\//i,function($){return $.replace(/\/\*|\*\//g,'').replace(/CSS/,'@')}))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('minifycss', function() {
    return gulp.src(['dist/css/base.css','dist/css/index.css'])
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/css/'));
});


gulp.task('less-base', function() {
    return gulp.src(['style/base.less'])
        .pipe(less())
        .pipe(replace(/\/\*\s*\w+\:\s*calc\(.{3,24}\)\!?.{0,12};\s*\*\//gi,function($){return $.replace(/\/\*|\*\//g,'')}))
        .pipe(gulp.dest('dist/css'));
});
gulp.task('less-index', function() {
    return gulp.src(['style/index.less'])
        .pipe(less())
        .pipe(replace(/\/\*\s*\w+\:\s*calc\(.{3,24}\)\!?.{0,12};\s*\*\//gi,function($){return $.replace(/\/\*|\*\//g,'')}))
        .pipe(gulp.dest('dist/css'));
});
gulp.task('bify', function() {
    // Single entry point to browserify
    return gulp.src('script/base.js')
        .pipe(browserify({
            //insertGlobals : true,
            //debug : !gulp.env.production
        }))
        .pipe(gulp.dest('dist/js'))
});

gulp.task('uglify', function() {
    return gulp.src(['dist/js/base.js'])//,'script/index.js'])
        // .pipe(rename({suffix: ''}))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('base',['bify'],function(){
    gulp.run('uglify');
});

gulp.task('lessm',['less'],function(){
    gulp.run('minifycss');
});
// concat & rar js
gulp.task('spa', function() {
    gulp.src('script/business/spa/*.js')
        .pipe(concat('spa.js'))
        //.pipe(sourcemaps.init({loadMaps: true}))
        //.pipe(uglify().on('error', gutil.log)) // notice the error event here
        //.pipe(sourcemaps.write('./'))
        //.pipe(rename('spa.min.js'))
        .pipe(gulp.dest('dist/js'))

    // .pipe(uglify())
    // .pipe(sourcemaps.init({loadMaps: true}))
    // .pipe(uglify().on('error', gutil.log)) // notice the error event here
    // .pipe(sourcemaps.write('./'))
    // .pipe(gulp.dest('dist/js'));
});


