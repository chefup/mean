(function(isNode, isAngular) {
  var RequestSchema = function() {
    var sharedSchema = {
      status: {
        type: Number,
        enum: {
          'enquiry': 0,
          'payment_committed': 1,
          'accepted': 2,
          'delivered': 5,
          'rejected': 9
        },
        default: 'enquiry'
      },
      pickup: {
        type: 'ObjectId',
        ref: 'Pickup'
      },
      user: {
        type: 'ObjectId',
        ref: 'User',
        required: true,
        childPath: 'requests'
      }
    };
    if (isAngular) {
      return sharedSchema;
    } else if (isNode) {
      var mongular = require('mongular-schema');

      var schema = mongular.merge(sharedSchema, {
      }, {
        toObject: {
          getters: true,
          virtuals: true
        },
        toJSON: {
          getters: true,
          virtuals: true
        }
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
    angular.module('chefupApp').factory('RequestSchema', [RequestSchema]);
  } else if (isNode) {
    // NodeJS module definition
    module.exports = RequestSchema();
  }
})(typeof module !== 'undefined' && module.exports,
  typeof angular !== 'undefined');
