var gulp = require('gulp');
var browsersync = require('browser-sync').create();
var stylus = require('gulp-stylus');
var ugly = require('gulp-uglify');

gulp.task('default',['dist','cambios','server'],function(){
	
});


gulp.task('jsugly',function(){
		console.log("minificacion de js");
		gulp.src('js/*.js')
			.pipe(ugly())
			.pipe(gulp.dest('dist/js/'));
			console.log("finalizado la minifcacion de js");
	});


gulp.task('dist',function(){
		gulp.src('*.html')
			.pipe(gulp.dest('dist/'));
			console.log("movidos los ficheros a version final")

	})

gulp.task('server',function(){
	browsersync.init({
		server:{		
			baseDir: "./dist/"
		}
	})
})

gulp.task('css',function(){
	gulp.src('styls/*.styl')
		.pipe(stylus())
		.pipe(gulp.dest('dist/css/'));
		console.log("compilados los estilos");
});

gulp.task('cambios',function(){
	gulp.watch('styls/**/*.styl',['css']);	
	gulp.watch('*.html',['dist']);
	gulp.watch('js/*.js',['jsugly']);
	gulp.watch("dist/*.html").on('change', browsersync.reload);
	gulp.watch("dist/**/*.css").on('change', browsersync.reload);
	gulp.watch("dist/js/*.js").on('change',browsersync.reload)
});

