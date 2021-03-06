
var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'src');
var PAGES_PATH = path.resolve(ROOT_PATH, 'src/main/pages');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

module.exports = {
  entry: {
    app: path.resolve(APP_PATH, 'main/index.js'),
    vendors: ['jquery']
  },
  output: {
    path: BUILD_PATH,
    filename: '[name].[hash].js'
  },
  resolve: {
    alias: {
    }
  },
  module: {
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
        loaders: ['style', 'css', 'sass'],
        include: APP_PATH
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url?limit=40000'
      }
    ]
  },
  plugins: [
    //enable uglify
    new webpack.optimize.UglifyJsPlugin({minimize: true}),
    //split vendors script
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
    //generate two pages
    new HtmlwebpackPlugin({
      title: 'Hello World app',
      template: path.resolve(PAGES_PATH, 'index.html'),
      filename: 'index.html',
      chunks: ['app', 'vendors'],
      inject: 'body'
    })
    //provide $, jQuery and window.jQuery to every script
    /*new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    })*/
  ]
};
