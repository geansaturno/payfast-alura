// jshint esversion:6

let g           = require("gulp");
let browserSync = require("browser-sync");
let nodemon     = require('gulp-nodemon');

g.task('nodemon', cb => {

    let isUp = false;

    return nodemon({
        script: 'index.js'
    })
    .on('restart', browserSync.reload)
    .on('start', () => {
        if(!isUp){
            cb();
            isUp = true;
        }
    });
});

g.task('server', ['nodemon'], () => {
    browserSync.init(null, {
        proxy: 'localhost:3000',
        port: '7000'
    });
});
