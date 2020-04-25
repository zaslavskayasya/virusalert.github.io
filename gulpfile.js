var gulp = require('gulp'),
	stylus = require('gulp-stylus'),
	autoprefixer = require('gulp-autoprefixer'),
	concat = require('gulp-concat'),
	axis = require('axis'),
	connect = require('gulp-connect'),
	cssnano = require('gulp-cssnano'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	
	gulpif = require('gulp-if'), //npm i gulp-if
	pug = require('gulp-pug'),/*npm i gulp-pug*/
	babel = require('gulp-babel'); // Бабель



gulp.task('connect',async function() {
	connect.server({
		port: 8887,
		livereload: true
	});
});


function work_styl(reload,src,newName,newPath){

	var reload = reload || false;

	var src = src || 'styl/style.styl';
	var newName = newName || 'style.min.css';
	var newPath = newPath || 'css/';

	return gulp.src(src)
		.pipe(stylus({use: [axis()]}))
		.pipe(cssnano({zindex: false,reduceIdents: false}))
		.pipe(autoprefixer(
			['> 0.5%', 'last 2 versions',"ie >= 9", 'Firefox >= 3'],
			{cascade: true,add: true }
		))
		.pipe(rename(newName))
		.pipe(gulp.dest(newPath))
		.pipe(gulpif(reload, connect.reload()))
}


function work_js(src,reload,newName,newPath){
	var src = src || 'src/*.js';
	var reload = reload || false;
	var newName = newName || 'main.min.js';
	var newPath = newPath || 'js/';


	return gulp.src(src)
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(uglify())
		.pipe(concat(newName))
		.pipe(gulp.dest(newPath))
		.pipe(gulpif(reload, connect.reload()))

}

function work_pug(src,folder,reload,sufix){

	var src = src || 'pug/clear_to_frontenders/*.pug';
	var folder = folder || './';
	var reload = reload || false;
	var sufix = sufix || '';



	return gulp.src(src)
		.pipe(pug({pretty: true}))
		.pipe(rename(function (path) {
		    path.basename += sufix;
		 }))
		.pipe(gulp.dest(folder))
		.pipe(gulpif(reload, connect.reload()))

}




gulp.task('styl', function(){
	return work_styl(false);

});

gulp.task('styl_reload', function(){
	
	return work_styl(true);
});


gulp.task('js',function() {
	return work_js('src/*.js',false);
});


gulp.task('js_reload',function() {
	return work_js('src/*.js',true);
});



gulp.task('html_reload', function () {
	return gulp.src('*.html')
	.pipe(connect.reload());
})



gulp.task('views', function() {

	return work_pug('pug/*.pug',"./",true);

});


gulp.task('watch', function(cb) {
	gulp.watch('styl/*.styl', gulp.series('styl'));
	gulp.watch('src/*.js', gulp.series('js'));
	
	cb();
});


gulp.task('watch_reload', function(cb) {
	gulp.watch('styl/*.styl', gulp.series('styl_reload'));
	gulp.watch('src/*.js', gulp.series('js_reload'));
	gulp.watch('*.html', gulp.series('html_reload'));
	
	cb();
});

gulp.task('pugwatch', function(cb) {
	gulp.watch('styl/*.styl', gulp.series('styl_reload'));
	gulp.watch('src/*.js', gulp.series('js_reload'));
	gulp.watch('pug/**/*.pug', gulp.series('views'));

	cb();
});




gulp.task('default', gulp.series('connect', 'html_reload','styl' , 'js', 'watch_reload'));

gulp.task('gpug',gulp.series('connect', 'styl' , 'js','views', 'pugwatch'));