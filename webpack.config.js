const webpack = require('webpack'); 	// 用于访问内置插件
const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const outJsType = 'umd';
const getPackageJson = function () {
	const _packageJson = fs.readFileSync('./package.json')
	return JSON.parse(_packageJson)
}
const version = getPackageJson().version

const extractSass = new ExtractTextPlugin({
		filename: `d-audio/d-audio.css`,
		// filename: '[name].[hash].d-audio.css',
    disable: process.env.NODE_ENV === "development"
});

const resolve = function (dir) {
	return path.resolve(__dirname, dir);
}


module.exports = {
	entry: {
		// index: './src/index.js'
		index: './src/lib/d-audio.js'
	},
	output: {
		path: path.resolve(__dirname, 'lib'),
		// path: path.resolve(__dirname, 'dist'),
		publicPath: '',
		filename: `d-audio/d-audio.js`,
		libraryTarget: 'var',
		library: 'Daudio',
		libraryExport: 'default'
	},
	module: {
		rules: [
			{
				test: /\.css$/,
        	use: ExtractTextPlugin.extract({
					fallback:"style-loader",
					use:["css-loader"]
				})
			},
			{
				test: /\.less$/,
				use: ExtractTextPlugin.extract({
					fallback:"style-loader",
					use:[
						{
							loader: 'css-loader'
						},
						{
							loader: 'less-loader'
						}
					]
				})
			},
			{
				test: /\.(ttf|eot|svg|woff|woff2)$/,
				use: [
					{
						loader: 'url-loader'
					}
        		]
			},
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ["env"]
					}
				}
			},
			{
				test: /\.(png|jpg|gif)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8192
						}
					}
        		]
			},
		]
	},
	plugins: [
		// new HtmlWebpackPlugin ({
		// 	filename: 'index.html',
		// 	template: 'index.html',
		// 	inject: true
		// }),
		extractSass
	],
	devServer: {
		// 当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html。通过传入以下启用：
		contentBase: "./",
		host: '0.0.0.0',
		// 端口号
		port: 1999,
		//当有编译器错误或警告时，在浏览器中显示全屏覆盖。默认禁用。如果您只想显示编译器错误：
		noInfo: true,
		// 配置端口号
		overlay: true,
	},
	resolve: {
		alias: {
			'src': resolve('src'),
			'commonjs': resolve('src/commonjs'),
			'scss': resolve('src/scss'),
			'stylus': resolve('src/stylus'),
			'script': resolve('src/script'),
			'static': resolve('static'),
		}
	},
	optimization: {
		splitChunks: {
			chunks: "all",
			minSize: 30000,
			minChunks: 3,
			maxAsyncRequests: 5,
			maxInitialRequests: 3,
			name: true,
			cacheGroups: {
				default: {
					minChunks: 2,
					priority: -20,
					reuseExistingChunk: true,
				},
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					priority: -10
				}
			}
		}
	}
}
