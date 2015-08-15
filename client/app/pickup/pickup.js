'use strict';

angular.module('chefupApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('pickup', {
        url: '/pickups/:pickupId',
        templateUrl: 'app/pickup/pickup.html',
        controller: 'PickupCtrl'
      })
  });
