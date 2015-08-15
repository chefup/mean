(function(isNode, isAngular) {
  var PickupSchema = function() {
    var sharedSchema = {
      dish: {
        type: 'ObjectId',
        ref: 'Dish'
      },
      privacy: {
        type: String,
        enum: {
          'private': 'Private',
          'public': 'Public'
        },
        default: 'public'
      },
      user: {
        type: 'ObjectId',
        ref: 'User',
        required: true,
        childPath: 'pickups'
      }
    };
    if (isAngular) {
      return sharedSchema;
    } else if (isNode) {
      var mongular = require('mongular-schema');

      var schema = mongular.merge(sharedSchema, {}, {
        toObject: {
          getters: true,
          virtuals: true
        },
        toJSON: {
          getters: true,
          virtuals: true
        },
      });

      var relationship = require("mongoose-relationship");
      schema.plugin(relationship, {
        relationshipPathName: 'user'
      });

      var timestamps = require('mongoose-timestamp');
      schema.plugin(timestamps);
      return schema;
    }
  };
  if (isAngular) {
    // AngularJS module definition
    angular.module('chefupApp').factory('PickupSchema', [PickupSchema]);
  } else if (isNode) {
    // NodeJS module definition
    module.exports = PickupSchema();
  }
})(typeof module !== 'undefined' && module.exports,
  typeof angular !== 'undefined');