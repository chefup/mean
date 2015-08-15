
angular.module('chefupApp')
  .controller('PickupRequestCtrl', function ($scope, $stateParams, $location, Auth, Request, User) {
    if ($stateParams.requestId == 'new') {
      $scope.request = $scope.$parent.pickup.requests.$new();
    } else {
      $scope.request = Request.$find($stateParams.requestId).$then(function() {
        $scope.request.comments.$fetch();
      });
    }

    $scope.commitToBuy = function() {
      $scope.checkout.open({
        name: $scope.$parent.pickup.dish.name,
        description: $scope.$parent.pickup.dish.description,
        currency: "aud",
        amount: $scope.$parent.pickup.price
      });
    };

    $scope.cancel = function() {
      $scope.request.$destroy().$then(function() {
        $scope.$apply(function() {
          $location.path('/pickups/' + $stateParams.pickupId);
        });
      });
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
