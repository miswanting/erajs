const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
module.exports = {
    entry: "./src/core.ts",
    mode: "production",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'core.js'
    },
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "ts-loader" },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.(ttf|otf|eot|svg|woff(2)?)$/, use: 'url-loader' },
        ]
    },
    plugins: [
        new CopyPlugin([
            'src/index.html'
        ])
    ]
};