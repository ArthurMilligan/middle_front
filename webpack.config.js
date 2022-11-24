/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = {
	mode: "development",
	entry: "./src/index.ts",
	resolve: {
		extensions: [".ts", ".js", ".json"],
		fallback: {
			"fs": false
		},
		alias: {
			"handlebars" : "handlebars/dist/handlebars.js",
		}
	},
	devtool: "inline-source-map",
	output: {
		path: path.resolve(__dirname, "dist"),
		publicPath: "/",
		filename: "bundle.js",
	},
	devServer: {
		static: {
			directory: path.join(__dirname, "dist"),
		},
		open: true,
		compress: true,
		port: 4000,
		historyApiFallback: true,
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: [
					{
						loader: "ts-loader",
						options: {
							transpileOnly: true,
						},
					},
				],
				exclude: /(node_modules)/,
			}, {
				test: /\.(s(a|c)ss)$/,
				use: [MiniCssExtractPlugin.loader, {
					loader: "css-loader",
					options: {
						sourceMap: true,
					},
				}, "sass-loader"],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: "asset/resource",
				generator: {
					filename: "img/[hash][ext][query]",
				},
			}, {
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: "asset/resource",
				generator: {
					filename: "fonts/[hash][ext][query]",
				},
			}, {
				test: /\.hbs$/,
				use: "handlebars-loader",
			},
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "bundle.css",
		}),
		new HtmlWebpackPlugin({
			template: "./src/index.html",
		}),
        
	],
}; 