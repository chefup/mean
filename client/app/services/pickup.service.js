'use strict';

angular.module('chefupApp')
  .factory('PickupService', ['BaseService',
    function(BaseService) {
      return angular.extend(BaseService({
        resource: 'Pickup',
        schema: 'PickupSchema'
      }), {
        additionalFunction: function() {
          return true;
        },
      });
    }
  ]);