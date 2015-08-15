'use strict';

angular.module('chefupApp')
  .factory('User', function(restmod) {
    return restmod.model('/api/users').mix({
      
    });
  });
