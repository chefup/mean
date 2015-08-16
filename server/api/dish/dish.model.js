'use strict';

var mongoose = require('mongoose'),
  appRoot = require('app-root-path');
var dishSchema = appRoot.require('/common/mongular-schema/dish.js');

dishSchema
  .virtual('rating')
  .get(function() {
    return 5;
  })

module.exports = mongoose.model('Dish', dishSchema);
