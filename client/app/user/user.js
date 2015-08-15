'use strict';

angular.module('chefupApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('user', {
        url: '/users/:userId',
        templateUrl: 'app/user/user.html',
        controller: 'UserCtrl'
      })
      .state('user.listing', {
        url: '/list/:filter',
        templateUrl: 'app/user/user-listing.html',
        controller: 'UserListingCtrl'
      })
  });
