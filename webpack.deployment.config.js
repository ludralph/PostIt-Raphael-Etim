const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production')
};

module.exports = {
  devtool: 'source-map',
  entry: path.resolve(__dirname, 'client/src/index.js'),
  resolve: {
    extensions: ['.js', '.jsx']
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'client/dist'),
    publicPath: '/',
    filename: 'bundle.min.js'
  },
  plugins: [
    new webpack
      .optimize
      .OccurrenceOrderPlugin(),
    new webpack.DefinePlugin(GLOBALS),
    new ExtractTextPlugin('styles.css'),
    new webpack
      .optimize
      .UglifyJsPlugin()

  ],
  module: {
    loaders: [
      {
        test: /(\.css)$/,
        use: ExtractTextPlugin.extract({use: 'css-loader'})
      }, {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader', 'sass-loader']
        })
      }, {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }, {
        test: /\.(woff|woff2)$/,
        loader: 'url?prefix=font/&limit=5000'
      }
    ]
  },
  node: {
    dns: 'empty',
    net: 'empty',
    fs: 'empty'
  }
};
