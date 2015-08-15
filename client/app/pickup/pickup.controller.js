'use strict';

angular.module('chefupApp')
  .controller('PickupCtrl', function ($scope, $stateParams, Auth, Pickup, User) {
    $scope.isLoggedIn = Auth.isLoggedIn();
    $scope.pickup = Pickup.$find($stateParams.pickupId).$then(function() {
      if ($scope.isLoggedIn) {
        $scope.pickup.requests.$fetch().$then(function() {
          $scope.showComments = $scope.showComments || !!$scope.pickup.requests.length;
          $scope.request = $scope.pickup.requests[0];
          $scope.request.comments.$fetch();
        });
      }
      $scope.user = User.$find($scope.pickup.user);
      $scope.isChef = $scope.pickup.user == Auth.getCurrentUser().id;
    });
    $scope.showComments = false;

    $scope.inquire = function() {
      $scope.request = $scope.pickup.requests.$new();
      $scope.showComments = true;
    };

    $scope.submitComment = function() {
      var comment = $scope.comment;
      $scope.comment = '';
      var cb = function() {
        $scope.request.comments.$create({ content: comment });
      };
      if ($scope.request.id) {
        cb();
      } else {
        $scope.request.$save().$then(cb);
      }
    };
  });
