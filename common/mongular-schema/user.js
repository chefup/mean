(function(isNode, isAngular) {
  var UserSchema = function() {
    var sharedSchema = new Schema({
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
        type: 'ObjectId',
        ref: "Dish"
      }]
    });
    if (isAngular) {
      return sharedSchema;
    } else if (isNode) {
      var mongular = require('mongular-schema');
      return mongular.convert(sharedSchema);
    }
  };
  if (isAngular) {
    // AngularJS module definition
    angular.module('chefupApp').factory('UserSchema', [UserSchema]);
  } else if (isNode) {
    // NodeJS module definition
    module.exports = UserSchema();
  }
})(typeof module !== 'undefined' && module.exports,
  typeof angular !== 'undefined');