'use strict';

angular.module('chefupApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('pickup', {
        url: '/pickups/:pickupId',
        templateUrl: 'app/pickup/pickup.html',
        controller: 'PickupCtrl'
      })
      .state('pickup.requests', {
        url: '/requests',
        templateUrl: 'app/pickup/request-list.html',
        controller: 'PickupRequestsCtrl'
      })
      .state('pickup.request', {
        url: '/requests/:requestId',
        templateUrl: 'app/pickup/request.html',
        controller: 'PickupRequestCtrl'
      })
  });
