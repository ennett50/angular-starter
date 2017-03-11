'use strict';

var webpack = require('webpack'),
	path = require('path'),
	rimraf = require('rimraf'),
	extractTextPlugin = require('extract-text-webpack-plugin'),
	extractStylus = new extractTextPlugin('/css/production.css'),
	extractCSS = new extractTextPlugin('/css/vendor.min.css'),
	OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'),
	CopyWebpackPlugin = require('copy-webpack-plugin'),
	buildDirectory = "/build",
	NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
	context: __dirname + '/app',
	entry: {
		'vendor.min': './js/vendor',
		'production.min': './js/index'
	},
	output: {
		path: __dirname + buildDirectory,
		filename: NODE_ENV == 'production' ? "/js/[name].[chunkhash].js" : "/js/[name].js",
		chunkFilename: NODE_ENV == 'production' ? '/js/[id].[chunkhash].js' : '/js/[id].js'
	},
	watch: true,
	watchOptions: {
		aggregateTimeout: 100
	},
	devtool: NODE_ENV == 'development' ? 'inline-source-map' : null,
	plugins: [
		// if error --> no compile files
		new webpack.NoErrorsPlugin(),
		//clear current directory name
		{
			apply: function (compiler) {
				rimraf.sync('.' + buildDirectory);
			}
		},
		//get values in other files
		new webpack.DefinePlugin({
			NODE_ENV: JSON.stringify(NODE_ENV)
		}),
		// get common.js in 2 and more files
		new webpack.optimize.CommonsChunkPlugin({
			name: 'common',
			minChunks: Infinity
		}),
		// optimizes chunks and modules by
		// how much they are used in your app
		new webpack.optimize.OccurenceOrderPlugin(),
		//join several css files
		extractStylus,
		extractCSS,
		//css minify
		new OptimizeCssAssetsPlugin({
			assetNameRegExp: /\.css$/g,
			cssProcessor: require('cssnano'),
			cssProcessorOptions: { discardComments: {removeAll: true } },
			canPrint: true
		}),
		//copy global images for app
		new CopyWebpackPlugin([
			{
				from: './images',
				to: '..'+ buildDirectory +'/images'
			}
		]),
		new CopyWebpackPlugin([
			{
				from: './*.html',
				to: '..' + buildDirectory
			}
		]),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
				drop_console: true,
				unsafe: true
			}
		})
	],
	resolve: {
		modulesDirectories: ['node_modules', 'bower_components'],
		extensions: ['', '.js', '.styl']
	},
	resolveLoader: {
		modulesDirectories: ['node_modules', 'bower_components'],
		moduleTemplates: ['*-loader', '*'],
		extensions: ['', '.js']
	},
	module: {
		//preLoaders: [
		//   {
		//    test: /\.styl$/,
		//    loader: 'stylint'
		//   }
		//],
		loaders: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				loaders: ['babel']//'eslint-loader']
			},
			{
				test: /bootstrap\/dist\/js\//,
				loader: 'imports?jQuery=jquery'
			},
			{
				test: /\.jade$/,
				loader: 'jade-loader'
			},
			{
				test: /\.styl$/,
				loader: extractStylus.extract('style', 'css!autoprefixer?browsers=last 20 versions!stylus?resolve url')
			},
			{
				test: /\.css$/,
				loader: extractCSS.extract('style-loader','css-loader!autoprefixer?browsers=last 20 versions')
			},
			{
				test: /\.(png|jpg|jpeg|gif)$/,
				loader: "file?name=/images[1]&regExp=directives(.*)"
			},
			{
				test: /\.woff|woff2(\?v=\d+\.\d+\.\d+)?$/,
				loader: "url?name=/fonts/[name].[ext]&limit=10000&minetype=application/font-woff"
			},
			{
				test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
				loader: "url?name=/fonts/[name].[ext]&limit=10000&minetype=application/octet-stream"
			},
			{
				test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
				loader: "file?name=/fonts/[name].[ext]"
			},
			{
				test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
				loader: "url?name=/fonts/[name].[ext]&limit=10000&minetype=image/svg+xml"
			}
		]
	}
};