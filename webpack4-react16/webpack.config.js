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
	entry: './src/index.js',

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

				options: {
					presets: ['env', 'react']
				}
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
					}
				]
			}
		]
	},

	plugins: [
		new UglifyJSPlugin(),
		new HtmlWebpackPlugin({
			template: './index.html'
		}),
		new MiniCssExtractPlugin({
		    filename: "[name].[contenthash].css",
		    chunkFilename: "[id].[contenthash].css"
		})
	]
};
