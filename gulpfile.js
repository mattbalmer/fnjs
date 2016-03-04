const gulp = require('gulp');
var recipe = (name, config) => require('./gulp/recipes/' + name)(config);

gulp.task('js', recipe('babelify', {
    input: `./manual/index.js`,
    output: `./dist`,
    name: `fn.js`,
    presets: ['es2015', 'stage-1']
}));

gulp.task('js:min', recipe('babelify', {
    input: `./manual/index.js`,
    output: `./dist`,
    name: `fn.min.js`,
    presets: ['es2015', 'stage-1'],
    minify: true
}));

gulp.task('tests', recipe('babelify', {
    input: `./tests/index.js`,
    output: `./tests-es5`,
    name: `all-tests.test.js`,
    presets: ['es2015', 'stage-1']
}));

gulp.task('watch', () => {
    gulp.watch('./source/**/*.js', ['js']);
    gulp.watch('./manual/**/*.js', ['js:min']);
    gulp.watch([
        './source/**/*.js',
        './tests/**/*.js'
    ], ['tests']);
});

gulp.task('compile', ['js', 'js:min', 'tests']);
gulp.task('default', ['compile', 'watch']);