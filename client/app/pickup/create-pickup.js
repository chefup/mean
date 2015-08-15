'use strict';

angular.module('chefupApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('pickup-create', {
        url: '/pickup/create',
        templateUrl: 'app/pickup/create-pickup.html',
        controller: 'CreatePickupCtrl'
      })
  });