'use strict';

angular.module('chefupApp')
  .controller('UserListingCtrl', function ($scope, $stateParams, Pickup) {
    $scope.pickups = Pickup.$search({ userId: $stateParams.userId });
  });
