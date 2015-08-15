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
      $scope.user = User.$find($scope.pickup.user).$then(function() {
        $scope.checkout = StripeCheckout.configure({
          key: $scope.user.stripe.stripe_publishable_key,
          email: Auth.getCurrentUser().email,
          image: $scope.pickup.dish.images[0],
          allowRememberMe: true,
          token: function(token) {
            $scope.request.stripeCardToken = token.id;
            $scope.request.$save();
          }
        });
      });
      $scope.isChef = $scope.pickup.user == Auth.getCurrentUser().id;
    });
    $scope.showComments = false;

    $scope.inquire = function() {
      $scope.request = $scope.pickup.requests.$new();
      $scope.showComments = true;
    };

    $scope.commitToBuy = function() {
      $scope.request = $scope.request || $scope.pickup.requests.$new();
      $scope.checkout.open({
        name: $scope.pickup.dish.name,
        description: $scope.pickup.dish.description,
        currency: "aud",
        amount: $scope.pickup.price
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
