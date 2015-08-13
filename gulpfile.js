var $, WebpackDevServer, devCompiler, devConfig, gulp, gutil, webpack, webpackConfig;

gulp = require('gulp');

gutil = require('gulp-util');

webpack = require("webpack");

WebpackDevServer = require("webpack-dev-server");

webpackConfig = require("./webpack.config.js");

$ = require('gulp-load-plugins')();

var less = require('gulp-less');
var path = require('path');
var LessPluginCleanCSS = require('less-plugin-clean-css'),
    LessPluginAutoPrefix = require('less-plugin-autoprefix'),
    cleancss = new LessPluginCleanCSS({advanced: true}),
    autoprefix = new LessPluginAutoPrefix({browsers: ["> 0%"]}),
    concatCss = require('gulp-concat-css');


gulp.task("webpack:build", function (callback) {
    var config;
    config = Object.create(webpackConfig);
    config.plugins = config.plugins.concat(new webpack.DefinePlugin({
        "process.env": {
            NODE_ENV: JSON.stringify("production")
        }
    }), new webpack.optimize.DedupePlugin(), new webpack.optimize.UglifyJsPlugin());
    webpack(config, function (err, stats) {
        if (err) {
            throw new gutil.PluginError("webpack:build", err);
        }
        gutil.log("[webpack:build]", stats.toString({
            colors: true
        }));
        callback();
    });
});

devConfig = Object.create(webpackConfig);

devConfig.devtool = "sourcemap";

devConfig.debug = true;

devCompiler = webpack(devConfig);

gulp.task("webpack:build-dev", function (callback) {
    devCompiler.run(function (err, stats) {
        if (err) {
            throw new gutil.PluginError("webpack:build-dev", err);
        }
        gutil.log("[webpack:build-dev]", stats.toString({
            colors: true
        }));
        callback();
    });
});

gulp.task("webpack-dev-server", ['copy-resources'], function (callback) {
    var config;
    config = Object.create(devConfig);
    new WebpackDevServer(webpack(config), {
        publicPath: config.output.publicPath,
        hot: true,
        stats: {
            colors: true
        }
    }).listen(8080, "localhost", function (err) {
            if (err) {
                throw new gutil.PluginError("webpack-dev-server", err);
            }
            gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");
            return callback();
        });
});

gulp.task('default', ['copy-resources', 'webpack:build']);

gulp.task('copy-resources', function () {
    return gulp.src(['resources/**/*']).pipe(gulp.dest('public/resources'));
});


gulp.task('watch', ['webpack-dev-server'], function () {
    return gulp.watch(['src/**/*.less'], ['css']);
});