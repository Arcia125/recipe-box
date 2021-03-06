var webpack = require('webpack');
var path = require('path');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var host = 'localhost';
var port = 8001;

module.exports = {
	entry: {
		javascript: './src/main.js',
		html: './src/index.html'
	},
	output: {
		filename: 'main.js',
		path: __dirname + '/dist',
	},
	module: {
		loaders: [
		{
            test: /\.scss$/,
            exclude: /node_modules/,
            loaders: ["style", "css?sourceMap", "sass?sourceMap"]
            //loader: ExtractTextPlugin.extract('css!sass')
        },
		{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel',
			query: {
				presets: ['react', 'es2015']
			}
		},
		{
			test: /\.html$/,
			exclude: /node_modules/,
			loader: 'file?name=[name].[ext]'
		},
		{
			test: /\.png$/,
			exclude: /node_modules/,
			loader: 'url-loader'
		}
		]
	},
	devServer: {
		inline: true,
		host: host,
		port: port
	},
	devtool: 'source-map',
	plugins: [
		new OpenBrowserPlugin({ url: 'http://' + host + ':' + port}),
	]
}