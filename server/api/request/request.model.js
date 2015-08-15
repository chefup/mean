'use strict';

var mongoose = require('mongoose'),
    appRoot = require('app-root-path'),
    RequestSchema = appRoot.require('/common/mongular-schema/request.js');

RequestSchema
  .path('pickup')
  .validate(function(value, respond) {
    console.log(value);
    var self = this;
    this.constructor.findOne({
      pickup: this.pickup,
      user: this.user
    }, function(err, request) {
      if (err) throw err;
      if (request) {
        return respond(false);
      }
      respond(true);
    });
  }, 'A request has already been made for that item.');

module.exports = mongoose.model('Request', RequestSchema);
