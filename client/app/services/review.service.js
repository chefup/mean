'use strict';

angular.module('chefupApp')
  .factory('Review', function(restmod) {
    return restmod.model('/api/reviews').mix({
      request: { hasOne: 'Request' }
    });
  });
