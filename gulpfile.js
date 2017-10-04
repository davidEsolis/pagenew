
//IMPORTACION DE LAS LIBRERIAS
var gulp = require('gulp'),
// manejo sass 
 sass = require('gulp-sass'),
        //sintaxis de sass
 autoprefixer = require('gulp-autoprefixer'),
                //uglificar o usar js
    uglify = require('gulp-uglify'),
      pump = require('pump'),
        cssnano = require('gulp-cssnano'),
                    //vistas en el navegador
           browserSync = require("browser-sync").create();

//USO DE EJECUTAR TAREA USANDO SASS-CSS: abre el navegador  y ejecuta la tarea sass
gulp.task('serve', ['sass'], ()=>{
        browserSync.init({
            server: "./"
        });

        //uglify
        gulp.watch('app/js/*.js', ['comprimir']).on('change', browserSync.reload);
        //observa si acualizamos el documento css o html y lo actualiza en el navegador
        gulp.watch('./app/css/main.sass', ['sass']);
        gulp.watch("./*.html").on('change', browserSync.reload);
});



//uglify CREA UN HILO PARA EJECUTAR CODIGO JAVASCRIIPT 

gulp.task('comprimir', function (cb){
    pump([
        gulp.src('app/js/main.js'),
        uglify(),
       
        gulp.dest('app/js/jss'),
        
    ],
    cb
    );
});

//compila mi archivo sass
gulp.task('sass', ()=>{
    gulp.src('app/css/main.sass')
            //coompilar
        .pipe(sass({
            //2 jemplos::
            //comprime mi codigo css compressed,expanded,compact:una lineaa
          outputStyle: 'compact'
        }))
        //minificar, en una linea
      .pipe(cssnano())
        //guardar en un destino
        .pipe(gulp.dest('./app/scss'))
        // e inyecta ese resultado csss new en el documento has el cambio y con css con sus adiciones refleje en html-live
        .pipe(browserSync.stream());
});

/*
//compila mi archivo sass
gulp.task('sass', ()=>{
    gulp.src('app/css/main.sass')
            //coompilar
        .pipe(sass({
            //2 jemplos
            //comprime mi codigo css compressed,expanded
          outputStyle: 'compact'
        }))
        //minificar, en una linea
      //.pipe(cssnano())
        //guardar en un destino
        .pipe(gulp.dest('./app/scss'))
        // e inyecta ese resultado csss new en el documento has el cambio y con css con sus adiciones refleje en html-live
        .pipe(browserSync.stream());
});
*/
