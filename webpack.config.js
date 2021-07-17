const HtmlWebPack = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
	mode: "development",

	output: {
		clean: true,
	},
	module: {
		rules: [
			{
				test: /\.html$/i,
				loader: "html-loader",
				options: {
					sources: false,
					minimize: false,
				},
			},
			/*{
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },*/
			{
				test: /\.css$/i,
				use: [MiniCssExtractPlugin.loader, "css-loader"],
			},

			{
				test: /\.(png|jpe?g|gif|svg)$/i,
				use: [
					{
						loader: "file-loader",
						options: {
							esModule: false,
							name: "assets/img/[name].[ext]",
						},
					},
				],
			},
		],
	},

	plugins: [
		new HtmlWebPack({
			title: "Webpack App",
			template: "./src/index.html",
			filename: "./index.html",
		}),

		new MiniCssExtractPlugin({
			//filename: 'style.css',
			filename: "[name].css",
			ignoreOrder: false,
		}),

		new CopyPlugin({
			patterns: [{ from: "src/assets/", to: "assets/" }],
		}),
	],
};
