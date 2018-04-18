const webpack = require('webpack');
const path = require('path');

/*
 * We've enabled UglifyJSPlugin for you! This minifies your app
 * in order to load faster and run less javascript.
 *
 * https://github.com/webpack-contrib/uglifyjs-webpack-plugin
 *
 */

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	entry: {
		app: './src/index.js',
		ramda: ['ramda'],
	},

	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist')
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
			},
			{
				test: /\.css$/,

				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						// 启用 CSSModules, className={style.xxx}
						// options: {
						// 	minimize: true,
						// 	modules: true,
						// 	importLoaders: 1,
						// 	localIdentName: '[local]_[hash:base64:6]',
						// }
					},
					'postcss-loader'
				]
			},
			{
				test: /\.less$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					{
						loader: 'less-loader',
						options: {
							sourceMap: true,
							javascriptEnabled: true,
							modifyVars: {
								'primary-color': '#531dab',
							},
						}
					}
				]
			},
		]
	},

	plugins: [
		new UglifyJSPlugin(),
		new HtmlWebpackPlugin({
			template: './index.html',
			chunks: ['app', 'commons', 'ramda']
		}),
		new MiniCssExtractPlugin({
		    filename: "[name].[contenthash].css",
		    chunkFilename: "[id].[contenthash].css"
		})
	],
	optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					name: 'commons',
					priority: 10,
					chunks: 'initial'
				},
				styles: {
					name: 'styles',
					test: /\.(css|less)$/,
					chunks: 'all',
					minChunks: 2,
					enforce: true
				}
			}
		}
	}
};
