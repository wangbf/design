var gulp = require('gulp');
var md5 = require('gulp-md5-plus');
var eslint = require('gulp-eslint');
var pkg = require('./package.json');

var option = {base: 'src'};
var dist = __dirname + '/dist';

/**
 * 生产js的md5文件，并自动替换页面中引用的名称
 */
gulp.task('md5:js', function (done) {
    gulp.src('assets/*.js')
        .pipe(md5(10, './WEB-INF/ftl/shop/index.ftl'))
        .pipe(gulp.dest('assets'))
        .on('end', done);
});

var eslint = require('gulp-eslint');

gulp.task('eslint', function () {
  return gulp.src([
                   './js/store/*.js'])  //获取src目录内全部js文件
    .pipe(eslint({
      "rules": {
        "camelcase": [2, { "properties": "always" }],
        "comma-dangle": [2, "never"],
        "semi": [2, "always"],
        "quotes": [2, "single"],
        "strict": [2, "global"]
      },
      "parser": "babel-eslint"
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
});

gulp.task('default', ['md5:js'], function () {
	
});