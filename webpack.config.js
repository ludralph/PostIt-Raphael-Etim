/* eslint linebreak-style: ['error', 'windows']*/
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
  filename: '[name].[contenthash].css',
  disable: process.env.NODE_ENV === 'development'
});
module.exports = {

  // devtool: debug ? "inline-sourcemap" : false,
  entry: 'index.js',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0']
        }
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [{
            loader: 'css-loader'
          }, {
            loader: 'sass-loader'
          }],
          // use style-loader in development
          fallback: 'style-loader'

        })
      }

    ]
  },
  output: {
    path: `${__dirname}dist`,
    filename: 'bundle.min.js'
  },
  node: {
    fs: 'empty'
  },
  plugins: [
    extractSass
  ]
};
