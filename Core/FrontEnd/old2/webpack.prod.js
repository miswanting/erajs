const path = require('path');
const webpack = require('webpack')
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
    mode: "production",
    entry: "./src/index.ts",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js'
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader"
            },
            {
                enforce: "pre",
                test: /\.jsx?$/,
                use: "source-map-loader"
            },
            {
                test: /\.sass$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(ttf|otf|eot|svg|woff(2)?)$/,
                use: 'url-loader'
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {}
                }]
            }
        ]
    },
    plugins: [
        new CopyPlugin([
            'src/index.html'
        ]),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ]
}