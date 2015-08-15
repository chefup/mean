'use strict';

var mongoose = require('mongoose'),
  appRoot = require('app-root-path');
var dishSchema = appRoot.require('/common/mongular-schema/dish.js');
module.exports = mongoose.model('Dish', dishSchema);