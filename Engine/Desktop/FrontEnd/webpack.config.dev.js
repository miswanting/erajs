const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const WorkerPlugin = require('worker-plugin')
const Main = {
  entry: './src/index.js',
  mode: 'development',
  target: 'electron-main',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js'
  },
  plugins: [
    // new CleanWebpackPlugin(),
    new WorkerPlugin()
  ]
}
const Renderer = {
  entry: './src/era.js',
  mode: 'development',
  target: 'electron-renderer',
  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: 'pug-plain-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.styl(us)?$/,
        use: [
          'vue-style-loader',
          'style-loader',
          'css-loader',
          'stylus-loader'
        ]
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource'
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'era.js'
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: 'Era.js'
    })
  ]
}
module.exports = [Main, Renderer]
