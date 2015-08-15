// This schema definition can be included in both the front-end via it's
// angular module definition, and in the back-end via module.exports
(function(isNode, isAngular) {
  var UserSchema = function() {
    // The schema in Mongular is very similar to a
    // normal mongoose schema, though it has some sugar
    // for use in the front-end
    var sharedSchema = {
      name: {
        type: String,
        required: true
      },
      role: {
        type: String,
        // enums can be structured as value: 'Label'
        // to be used in the front-end
        enum: {
          admin: 'Administrator',
          user: 'User',
          trial: 'Trial User'
        },
        default: 'trial'
      },
      projects: [{
        // Mongoose.Schema.ObjectId isn't available
        // since this could be included either on the browser
        // or client-side, so we specify the special type as a string
        // which is converted by Mongular
        type: 'ObjectId',
        ref: 'Project',
        required: true
      }]
    };
    if (isAngular) {
      // For Angular we simply return the Schema
      return sharedSchema;
    } else if (isNode) {
      // For Node we create the actual schema and return it for use in a .model() definition
      var mongoose = require('mongoose'),
        mongular = require('mongular-schema');

      // Call mongular to initialize Schema() and convert
      // the mongular-specific fields (e.g. enum and ObjectId types)
      var schema = mongular.convert(sharedSchema);

      // perhaps add some plugin
      var timestamps = require('mongoose-timestamp');
      schema.plugin(timestamps);

      return schema;
    }
  };
  if (isAngular) {
    // AngularJS module definition
    angular.module('myApp').factory('UserSchema', [UserSchema]);
  } else if (isNode) {
    // NodeJS module definition
    module.exports = UserSchema();
  }
})(typeof module !== 'undefined' && module.exports,
  typeof angular !== 'undefined');