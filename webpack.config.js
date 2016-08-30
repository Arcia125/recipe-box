var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
	entry: {
		main: './src/main.jsx'
	},
	output: {
		filename: './dist/[name].js'
	},
	devServer: {
		inline: true,
		port: 8080
	},
	devtool: 'source-map',
	module: {
		loaders: [
		{
            test: /\.scss$/,
            loaders: ["style", "css?sourceMap", "sass?sourceMap"]
            //loader: ExtractTextPlugin.extract('css!sass')
        },
		{
			test: /\.jsx$/,
			exclude: /(node_modules|bower_components)/,
			loader: 'react-hot'
		},
		{
			test: /\.jsx$/,
			exclude: /(node_modules|bower_components)/,
			loader: 'babel',
			query: {
				presets: ['es2015', 'react']
			}
		}
		]
	},
	plugins: [
		new ExtractTextPlugin('dist/main.css', {
			allChunks: true
		})
	]
}