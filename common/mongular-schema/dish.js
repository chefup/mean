(function(isNode, isAngular) {
  var DishSchema = function() {
    var sharedSchema = {
      name: {
        type: String,
        required: true
      }
    };
    if (isAngular) {
      return sharedSchema;
    } else if (isNode) {
      var mongoose = require('mongoose'),
        mongular = require('mongular-schema');

      var schema = mongular.convert(sharedSchema);

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