const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

export default {
  devtool: 'eval-source-map',
  entry: [
    'webpack-hot-middleware/client', path.join(__dirname, 'client/index.js')
  ],
  output: {
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('client/css/style.css', {
      allChunks: true
  })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'client'),
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
            plugins: [require('babel-plugin-transform-object-rest-spread')]
          }
        }
        // loaders: ['react-hot-loader', 'babel-loader'],
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css-loader!sass-loader')  
      },
      {
        test: /\.(png|jpg|svg)$/,
        use: {
          loader: 'url-loader'
        },
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  }
};

