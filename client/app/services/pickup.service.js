'use strict';

angular.module('chefupApp')
  .factory('Pickup', function(restmod) {
    return restmod.model('/api/pickups').mix({
      dish: { hasOne: 'Dish' },
      requests: { hasMany: 'Request' }
    });
  });
