'use strict';

angular.module('chefupApp')
  .factory('Pickup', function(restmod) {
    return restmod.model('/api/pickups');
  });
