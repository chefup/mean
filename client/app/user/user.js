'use strict';

angular.module('chefupApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('viewUser', {
        url: '/users/:userId',
        templateUrl: 'app/user/user.html',
        controller: 'UserCtrl'
      });
  });
