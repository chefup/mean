(function(isNode, isAngular) {
  var DishSchema = function() {
    var sharedSchema = {
      name: {
        type: String,
        required: true
      },
      description: {
        type: String
      },
      images: [{
        type: String
      }],
      ingredients: [{
        type: String
      }],
      user: {
        type: 'ObjectId',
        ref: 'User',
        required: true,
        childPath: 'dishes'
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
    angular.module('chefupApp').factory('DishSchema', [DishSchema]);
  } else if (isNode) {
    // NodeJS module definition
    module.exports = DishSchema();
  }
})(typeof module !== 'undefined' && module.exports,
  typeof angular !== 'undefined');