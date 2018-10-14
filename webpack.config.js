const path = require('path');
const webpack = require('webpack')
const mainConfig = {
    mode: "development",
    target: 'electron-main',
    entry: "./src/main.ts",
    output: {
        path: path.resolve(__dirname, 'src/dist'),
        filename: 'main.js'
    },
    devtool: "source-map",
    resolve: {
        extensions: [".ts", ".js", ".json"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "awesome-typescript-loader",
                // include: path.resolve(__dirname, 'src')
            },
            {
                enforce: "pre",
                test: /\.jsx?$/,
                loader: "source-map-loader"
            }
        ]
    },
};

const rendererConfig = {
    mode: "development",
    target: 'electron-renderer',
    entry: "./src/renderer.tsx",
    output: {
        path: path.resolve(__dirname, 'src/dist'),
        filename: 'renderer.js'
    },
    devtool: "source-map",
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "awesome-typescript-loader"
            },
            {
                enforce: "pre",
                test: /\.jsx?$/,
                use: "source-map-loader"
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(ttf|otf|eot|svg|woff(2)?)$/,
                use: 'file-loader'
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {}
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ]
};

module.exports = [mainConfig, rendererConfig];