'use strict';

angular.module('chefupApp')
  .controller('PickupCtrl', function ($scope, $stateParams, Auth, Pickup, User) {
    $scope.isLoggedIn = Auth.isLoggedIn();
    $scope.pickup = Pickup.$find($stateParams.pickupId).$then(function() {
      if ($scope.isLoggedIn) {
        $scope.pickup.requests.$fetch().$then(function() {
          $scope.showComments = $scope.showComments || !!$scope.pickup.requests.length;
        });
      }
      $scope.user = User.$find($scope.pickup.user);
      $scope.isChef = $scope.pickup.user == Auth.getCurrentUser().id;
    });
    $scope.showComments = false;

    $scope.inquire = function() {
      $scope.request = $scope.pickup.requests.$new();
      console.log($scope.request);
      $scope.showComments = true;
    };

    $scope.submitComment = function() {
      $scope.request.comments.$new({ content: $scope.comment });
      console.log($scope.request);
      $scope.request.$save();
      $scope.request.comments.$save();
    };
  });
