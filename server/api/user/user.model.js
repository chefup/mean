'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var authTypes = ['facebook'],
  appRoot = require('app-root-path');

var UserSchema = appRoot.require('/common/mongular-schema/user.js');

/**
 * Virtuals
 */

// Public profile information
UserSchema
  .virtual('profile')
  .get(function() {
    return {
      'name': this.name,
      'role': this.role
    };
  });

// Non-sensitive info we'll be putting in the token
UserSchema
  .virtual('token')
  .get(function() {
    return {
      '_id': this._id,
      'role': this.role
    };
  });

/**
 * Validations
 */

// Validate email is not taken
UserSchema
  .path('email')
  .validate(function(value, respond) {
    var self = this;
    this.constructor.findOne({
      email: value
    }, function(err, user) {
      if (err) throw err;
      if (user) {
        if (self.id === user.id) return respond(true);
        return respond(false);
      }
      respond(true);
    });
  }, 'The specified email address is already in use.');

module.exports = mongoose.model('User', UserSchema);