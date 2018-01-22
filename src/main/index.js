import './assets/main.scss';
/*
 * jquery plugin
 * $,jQuery,window.jQuery webpack.config.js
 * webpack.ProvidePlugin
 * imports-loader,require,
 * jQuery plugin.js
 * config.js中module.loaders
*/

//webpack.config.js

import $ from 'jquery';
import ListModel from './ListModel';
import ListView from './ListView';
import ListController from './ListController';
import Event from './Event';


// example from http://jsfiddle.net/alex_netkachov/ZgBrK/
// by Alex Netkachov

$(document).ready(function() {

  var model = new ListModel(['Java']),
      view = new ListView(model, {
          'list': $('#list'),
          'addButton': $('#plusBtn'),
          'delButton': $('#minusBtn')
      }),
      controller = new ListController(model, view);

  view.show();

});
