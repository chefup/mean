
angular.module('chefupApp')
  .controller('PickupRequestCtrl', function ($scope, $stateParams, $location, Auth, Request, User) {
    if ($stateParams.requestId == 'new') {
      $scope.request = $scope.$parent.pickup.requests.$new();
    } else {
      $scope.request = Request.$find($stateParams.requestId).$then(function() {
        $scope.request.comments.$fetch();
      });
    }

    $scope.$parent.onStripeToken = function(token) {
      $scope.request.stripeCardToken = token.id;
      $scope.request.$save();
    };

    $scope.$parent.commitToBuy = $scope.commitToBuy;

    $scope.commitToCook = function() {
      $scope.request.status = 'accepted';
      $scope.request.$save();
    };

    $scope.cancel = function() {
      $scope.request.$destroy().$then(function() {
        $location.path('/pickups/' + $stateParams.pickupId);
      });
    };

    $scope.submitComment = function() {
      var comment = $scope.comment;
      $scope.comment = '';
      var cb = function() {
        $scope.request.comments.$create({ content: comment }).$then(function() {
          $location.path('/pickups/' + $stateParams.pickupId + '/requests/' + $scope.request._id);
        });
      };
      if ($scope.request.id) {
        cb();
      } else {
        $scope.request.$save().$then(cb);
      }
    };
  });
