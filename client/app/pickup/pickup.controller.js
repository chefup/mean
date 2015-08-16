'use strict';

angular.module('chefupApp')
  .controller('PickupCtrl', function($scope, $stateParams, $location, Auth, Pickup, User) {
    Auth.isLoggedInAsync(function(isLoggedIn) {
      $scope.isLoggedIn = isLoggedIn;
      $scope.pickup = Pickup.$find($stateParams.pickupId).$then(function() {
        $scope.isChef = $scope.pickup.user == Auth.getCurrentUser()._id;
        if ($scope.isLoggedIn) {
          $scope.pickup.requests.$fetch().$then(function() {
            if (!$scope.isChef) {
              var request = $scope.pickup.requests[0];
              if (request) {
                $scope.requestOpen = true;
                $location.path('/pickups/' + $stateParams.pickupId + '/requests/' + request._id);
              }
            } else {
              $location.path('/pickups/' + $stateParams.pickupId + '/requests');
            }
          });
        }
        $scope.user = User.$find($scope.pickup.user._id).$then(function() {
          $scope.checkout = StripeCheckout.configure({
            key: $scope.user.stripe.stripe_publishable_key,
            email: Auth.getCurrentUser().email,
            image: $scope.pickup.dish.images[0],
            allowRememberMe: true,
            token: function(token) {
              $scope.onStripeToken(token);
            }
          });
        });
        $scope.$on('mapInitialized', function(event, map) {
          var LatLng = new google.maps.LatLng($scope.pickup.lat, $scope.pickup.lon);
          var marker = new google.maps.Marker({
            position: LatLng,
            map: map
          });
          map.setCenter(LatLng);
          $scope.map.setZoom(12);
        });
      });
    });

    $scope.requestOpen = false;

    $scope.inquire = function() {
      $scope.requestOpen = true;
      $location.path('/pickups/' + $stateParams.pickupId + '/requests/new');
    };

    $scope.commitToBuy = function() {
      $scope.checkout.open({
        name: $scope.pickup.dish.name,
        description: $scope.pickup.dish.description,
        currency: "aud",
        amount: $scope.pickup.price * 100
      });
    };

    $scope.onStripeToken = function(token) {
      $scope.pickup.requests.$create({
        stripeCardToken: token.id
      }).$then(function(request) {
        $location.path('/pickups/' + $stateParams.pickupId + '/requests/' + request._id);
      });
    };

  });
