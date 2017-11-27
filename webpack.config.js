// const path = require('path');
// const webpack = require('webpack');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');

// module.exports = {
//   devtool: 'eval-source-map',
//   entry: [
//     'webpack-hot-middleware/client', path.join(__dirname, 'client/index.js')
//   ],
//   output: {
//     filename: 'bundle.js',
//     publicPath: '/'
//   },
//   plugins: [
//     new webpack.NoErrorsPlugin(),
//     new webpack.HotModuleReplacementPlugin(),
//     new ExtractTextPlugin('client/css/style.css', {
//       allChunks: true
//   })
//   ],
//   module: {
//     loaders: [
//       {
//         test: /\.js$/,
//         include: path.join(__dirname, 'client'),
//         exclude: /(node_modules|bower_components)/,
//         use: {
//           loader: 'babel-loader',
//           options: {
//             presets: ['env'],
//             plugins: [require('babel-plugin-transform-object-rest-spread')]
//           }
//         }
//         // loaders: ['react-hot-loader', 'babel-loader'],
//       },
//       {
//         test: /\.scss$/,
//         loader: ExtractTextPlugin.extract('css-loader!sass-loader')  
//       },
//       {
//         test: /\.(png|jpg|svg)$/,
//         use: {
//           loader: 'url-loader'
//         },
//       }
//     ]
//   },
//   resolve: {
//     extensions: ['.js', '.jsx', '.json']
//   }
// };
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: ['webpack-hot-middleware/client', './client/src/index.js'],
  output: {
    path: path.resolve(__dirname, 'client/public'),
    filename: 'bundle.min.js',
    publicPath: '/',
  },
  module: {
    loaders: [
      { test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules\//,
        query: {
          presets: ['react', 'es2015'],
          plugins: [
            'react-html-attrs',
            'transform-decorators-legacy',
            'transform-class-properties'],
        }
      },
      { test: /\.css$/,
        loader: [
          'style-loader',
          'css-loader?importLoaders=1',
          'font-loader?format[]=truetype&format[]=woff&format[]=embedded-opentype'
        ]
      },
      { test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader?name=/fonts/[name].[ext]'
      },
      { test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader'
      },
      {
        test: /\.(png|jpg)$/,
        use: {
          loader: 'url-loader'
        },
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devtool: '#eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin()
  ]
};
