const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
module.exports = {
    entry: "./src/core.ts",
    mode: "development",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'core.js'
    },
    watch: true,
    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

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
    ],
    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
        // "socket.io-client": "socket"
    }
};