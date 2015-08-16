
angular.module('chefupApp')
  .controller('PickupRequestCtrl', function ($scope, $stateParams, $location, Auth, Request, User) {
    if ($stateParams.requestId == 'new') {
      $scope.request = $scope.$parent.pickup.requests.$new();
    } else {
      $scope.request = Request.$find($stateParams.requestId).$then(function() {
        $scope.request.comments.$fetch();
        $scope.request.reviews.$fetch().$then(function() {
          if (!$scope.request.reviews.length) {
            $scope.allowReview = true;
            $scope.review = $scope.request.reviews.$new();
          } else {
            $scope.review = $scope.request.reviews[0];
          }
        });
      });
    }

    $scope.$parent.onStripeToken = function(token) {
      $scope.request.stripeCardToken = token.id;
      var comments = $scope.request.comments;
      $scope.request.$save().$then(function() {
        $scope.request.comments = comments;
      });
    };

    $scope.$parent.commitToBuy = $scope.commitToBuy;

    $scope.commitToCook = function() {
      $scope.request.status = 'accepted';
      var comments = $scope.request.comments;
      $scope.request.$save().$then(function() {
        $scope.request.comments = comments;
      });
    };

    $scope.delivered = function() {
      $scope.request.status = 'delivered';
      var comments = $scope.request.comments;
      $scope.request.$save().$then(function() {
        $scope.request.comments = comments;
        $scope.allowReview = true;
        $scope.review = $scope.request.reviews.$new();
      });
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
        var comments = $scope.request.comments;
        $scope.request.$save().$then(function() {
          $scope.request.comments = comments;
        }).$then(cb);
      }
    };

    $scope.submitReview = function() {
      $scope.review.$save();
    };
  });
