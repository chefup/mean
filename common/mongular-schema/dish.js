(function(isNode, isAngular) {
  var DishSchema = function() {
    var sharedSchema = {
      name: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      ingredients: [{
        type: String
      }],
      owner: {
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

      var schema = mongular.merge(sharedSchema, {
        price: {
          set: function(num) {
            return num * 100;
          }
        }
      }, {
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
    angular.module('chefupApp').factory('DishSchema', [DishSchema]);
  } else if (isNode) {
    // NodeJS module definition
    module.exports = DishSchema();
  }
})(typeof module !== 'undefined' && module.exports,
  typeof angular !== 'undefined');