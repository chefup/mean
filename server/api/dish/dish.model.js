'use strict';

var mongoose = require('mongoose'),
  appRoot = require('app-root-path');

module.exports = mongoose.model('Dish', require(appRoot + '/common/mongular-schema/dish.js'));