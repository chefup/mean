'use strict';

var mongoose = require('mongoose'),
  appRoot = require('app-root-path');
// var dishSchema = appRoot.require('/common/mongular-schema/dish.js');
var dishSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});
module.exports = mongoose.model('Dish', dishSchema);