
var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'src');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');
var PAGES_PATH = path.resolve(ROOT_PATH, 'src/main/pages');

module.exports = {
  entry: {
    app: path.resolve(APP_PATH, 'main/index.js'),
    vendors: ['jquery']
  },
  output: {
    path: BUILD_PATH,
    filename: '[name].js'
  },
  resolve: {
    alias: {
    }
  },
  //enable dev source map
  devtool: 'eval-source-map',
  //enable dev server
  devServer: {
    historyApiFallback: true,
    hot: true,
    //inline: true,
    progress: true,
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        include: APP_PATH,
        loader: "jshint-loader"
      }
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        include: APP_PATH,
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css?sourceMap', 'sass?sourceMap'],
        include: APP_PATH
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url?limit=40000'
      }
    ]
  },

  //custom jshint options
  // any jshint option http://www.jshint.com/docs/options/
  jshint: {
    "esnext": true
  },

  plugins: [
    new HtmlwebpackPlugin({
      title: 'Hello World app',
      template: path.resolve(PAGES_PATH, 'index.html'),
      filename: 'index.html',
      chunks: ['app', 'vendors'],
      inject: 'body'
    })
    // new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
    //provide $, jQuery and window.jQuery to every script
    /*new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    })*/
  ]
};
