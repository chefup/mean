(function(isNode, isAngular) {
  var CommentSchema = function() {
    var sharedSchema = {
      content: {
        type: String
      },
      pickup: {
        type: 'ObjectId',
        ref: 'Pickup'
      },
      author: {
        type: 'ObjectId',
        ref: 'User',
        required: true,
        childPath: 'comments'
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

      var timestamps = require('mongoose-timestamp');
      schema.plugin(timestamps);
      return schema;
    }
  };
  if (isAngular) {
    // AngularJS module definition
    angular.module('chefupApp').factory('CommentSchema', [CommentSchema]);
  } else if (isNode) {
    // NodeJS module definition
    module.exports = CommentSchema();
  }
})(typeof module !== 'undefined' && module.exports,
  typeof angular !== 'undefined');