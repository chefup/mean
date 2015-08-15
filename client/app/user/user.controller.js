'use strict';

angular.module('chefupApp')
  .controller('UserCtrl', function ($scope, $stateParams, User) {
    $scope.user = User.$find($stateParams.userId);
    $scope.userId = $stateParams.userId;
    $scope.tabData = [
      {
        heading: 'All',
        route: 'user.listing',
        params: {
          filter: 'all'
        }
      },
      {
        heading: 'Cook-up',
        route: 'user.listing',
        params: {
          filter: 'cookup'
        }
      },
      {
        heading: 'Serve-up',
        route: 'user.listing',
        params: {
          filter: 'serveup'
        }
      }
    ]
  });
