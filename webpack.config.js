const webpack = require('webpack'); 	// 用于访问内置插件
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
    filename: "css/[name]-[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});

const resolve = function (dir) {
	return path.resolve(__dirname, dir);
}

module.exports = {
	entry: {
		index: './src/index.js',
		about: './src/pages/about/about.js'
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath: '',
		filename: '[name]-[hash].js'
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
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback:"style-loader",
					use:[
						{
							loader: 'css-loader'
						},
						{
							loader: 'sass-loader'
						}
						// {
			   //            loader: 'sass-resources-loader',
			   //            options: {
			   //              resources: path.resolve(__dirname, 'src/scss/base.scss')
			   //            }
			   //          }
					]
				})
			},
			{
				test: /\.styl$/,
				use: ExtractTextPlugin.extract({
					fallback:"style-loader",
					use:["css-loader","stylus-loader"]
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
		new HtmlWebpackPlugin ({
			filename: 'index.html',
			template: 'index.html',
			inject: true
		}),
		new HtmlWebpackPlugin ({
			path: path.resolve(__dirname, 'dist'),
			filename: 'about.html',
			template: './src/pages/about/about.html',
			inject: true
		}),
		extractSass
	],
	devServer: {
		// 当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html。通过传入以下启用：
		contentBase: "./",
		// 端口号
		port: 1996,
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
