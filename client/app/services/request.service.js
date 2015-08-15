'use strict';

angular.module('chefupApp')
  .factory('Request', function(restmod) {
    return restmod.model('/requests').mix({

    });
  });
