//plugins que estamos usando
//esta referenciados en el package.json
var gulp = require('gulp');
var browsersync = require('browser-sync').create();
var stylus = require('gulp-stylus');
var ugly = require('gulp-uglify');
var wiredep = require('wiredep').stream;

//tarea por defecto necesaria 
//esta luego a su vez llama a la tarea dist, cambios y server 
gulp.task('default',['inyect','dist','cambios','server'],function(){
	
});

//tarea que se dedica exclusivamente a minificar los js que esta en la ruta
//definia en gulp.src y luego se le envia desde el pipe a ugly que es una representacion
// re gulp-uglify para su minificacion, con gulp.dest le especificamos donde
//publicar los ficheros.

gulp.task('jsugly',function(){
		console.log("minificacion de js");
		gulp.src('js/*.js')
			.pipe(ugly())
			.pipe(gulp.dest('dist/js/'));
			console.log("finalizado la minifcacion de js");
	});

//esta mueve los html a el folder dist/

gulp.task('dist',function(){
		gulp.src('*.html')
			.pipe(gulp.dest('dist/'));
			console.log("movidos los ficheros a version final")

	})

//utilizamos el pluggin  browser-sync 
//http://www.browsersync.io/docs/gulp/
//le especificamos que el folder donde iniciara el webserver sera ./dist/
gulp.task('server',function(){
	browsersync.init({
		server:{		
			baseDir: "./dist/"
		}
	})
})

//css se se encarga de tomar los archivos de stylus y convertirlos a css
//https://learnboost.github.io/stylus/ para mas informacion sobre stylus
//https://www.npmjs.com/package/gulp-stylus 
gulp.task('css',function(){
	gulp.src('styls/*.styl')
		.pipe(stylus())
		.pipe(gulp.dest('dist/css/'));
		console.log("compilados los estilos");
});

//con wiredep inyectaremos nuestras depedencias definidas en bower
//nota: como actualmente hay un bug con la version 3.3.5 de bootstrap
//he especificado en el bower.json que utilizare una version inferior
//https://github.com/twbs/bootstrap/issues/16663
//wiredep leera las dependecias instaladas en bower y la inyecta
gulp.task('inyect',function(){
	gulp.src('index.html')
    .pipe(wiredep())
    .pipe(gulp.dest('./dist/'));
	});

//tarea de watch aqui monitoriamos los cambios que se realizen en las carpetas.
//y mandamos a llamar la tarea asociada a ella 
// a su vez tambien recargamos el browser a partir de los cambios que sucedan.
gulp.task('cambios',function(){
	gulp.watch('styls/**/*.styl',['css']);	
	gulp.watch('*.html',['dist']);
	gulp.watch('js/*.js',['jsugly']);
	//cuando se realize un cambio en los ficheros de dist recargaremos el browser.
	gulp.watch("dist/*.html").on('change', browsersync.reload);
	gulp.watch("dist/**/*.css").on('change', browsersync.reload);
	gulp.watch("dist/js/*.js").on('change',browsersync.reload)
});

