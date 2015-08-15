'use strict';

angular.module('chefupApp')
  .factory('AService', ['BaseService',
    function(BaseService) {
      return angular.extend(BaseService({
        resource: 'A',
        schema: 'ASchema'
      }), {
        additionalFunction: function() {
          return true;
        },
      });
    }
  ]);