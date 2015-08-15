'use strict';

angular.module('chefupApp')
  .controller('PickupCtrl', function ($scope, $stateParams, Auth, Pickup, User) {
    $scope.isLoggedIn = Auth.isLoggedIn();
    $scope.pickup = Pickup.$find($stateParams.pickupId).$then(function() {
      $scope.user = User.$find($scope.pickup.user);
      $scope.isChef = $scope.pickup.user == Auth.getCurrentUser().id;
    });
    $scope.showComments = false;

    $scope.inquire = function() {
      $scope.showComments = true;
    };
  });
