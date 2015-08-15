'use strict';

angular.module('chefupApp')
  .factory('Dish', function(restmod) {
    return restmod.model('/api/dishes').mix({
      pickup: {
        belongsTo: 'Pickup'
      }
    });
  });