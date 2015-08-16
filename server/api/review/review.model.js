'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReviewSchema = new Schema({
  content: {
    type: String
  },
  dishRating: {
    type: Number
  },
  userRating: {
    type: Number
  },
  dish: {
    type: Schema.ObjectId,
    ref: "Dish"
  },
  user: {
    type: Schema.ObjectId,
    ref: "User"
  },
  reviewer: {
    type: Schema.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model('Review', ReviewSchema);
