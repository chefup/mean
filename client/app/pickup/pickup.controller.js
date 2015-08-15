'use strict';

angular.module('chefupApp')
  .controller('PickupCtrl', function ($scope, $stateParams, Pickup, User) {
    $scope.pickup = Pickup.$find($stateParams.pickupId).$then(function() {
      $scope.user = User.$find($scope.pickup.user);
    });
    $scope.showComments = false;

    $scope.inquire = function() {
      $scope.showComments = true;
    };
  });
