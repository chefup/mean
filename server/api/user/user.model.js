'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var authTypes = ['facebook'];

var UserSchema = new Schema({
  name: String,
  email: {
    type: String,
    lowercase: true
  },
  role: {
    type: String,
    default: 'user'
  },
  provider: String,
  facebook: {},
  dishes: [{
    type: Schema.ObjectId,
    ref: "Dish"
  }],
  pickups: [{
    type: Schema.ObjectId,
    ref: "Pickup"
  }],
  comments: [{
    type: Schema.ObjectId,
    ref: "Comment"
  }],
  caption: {
    type: String
  }
});

/**
 * Virtuals
 */

UserSchema
 .virtual('avatar')
 .get(function() {
   var avatar = null;
   switch(this.provider) {
     case 'facebook':
     return 'https://graph.facebook.com/v2.4/' + this.facebook.id + '/picture?width=170';
   }
 });

// Public profile information
UserSchema
  .virtual('profile')
  .get(function() {
    return {
      'name': this.name,
      'role': this.role,
      'avatar': this.avatar
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
