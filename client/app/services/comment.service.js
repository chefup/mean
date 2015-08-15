'use strict';

angular.module('chefupApp')
  .factory('Comment', function(restmod) {
    return restmod.model('/comments').mix({
      
    });
  });
