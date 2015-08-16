'use strict';

angular.module('chefupApp')
  .factory('Request', function(restmod) {
    return restmod.model('/api/requests').mix({
      comments: { hasMany: 'Comment' },
      reviews: { hasMany: 'Review' }
    });
  });
