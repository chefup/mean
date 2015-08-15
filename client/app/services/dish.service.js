'use strict';

angular.module('chefupApp')
  .factory('DishService', ['BaseService',
    function(BaseService) {
      return angular.extend(BaseService({
        resource: 'Dish',
        schema: 'DishSchema'
      }), {
        additionalFunction: function() {
          return true;
        },
      });
    }
  ]);