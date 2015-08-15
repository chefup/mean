'use strict';

angular.module('chefupApp')
  .directive('mainListing', function($stateParams, Pickup, $rootScope, $state) {
    return {
      restrict: 'E',
      templateUrl: 'app/main/main-listing.html',
      scope: {},
      link: function($scope, element, attrs) {
        $rootScope.$on('updateSearch', function() {
          $scope.updateSearch();
        });
        $rootScope.$on('updateLocation', function() {
          $scope.updateSearch();
        });
        $scope.markers = [];
        $scope.updateSearch = function() {
          var search = $rootScope.mainSearch;
          var prevpickups = $scope.pickups;
          if (search === '') {
            $scope.pickups = $scope.allPickups;
          }
          $scope.pickups = _.filter(_.filter($scope.allPickups, function(pickup) {
            var query = new RegExp(search);
            if (pickup.dish.name.match(query) || (pickup.dish.description && pickup.dish.description.match(query))) {
              return true;
            } else {
              var match = false;
              _.each(pickup.tags, function(tag) {
                if (tag.match(query)) {
                  match = true;
                }
              });
              if (match) {
                return true;
              }
            }
            return false;
          }), function(pickup) {
            // Check that it's within the map viewport
            return $rootScope.mainMap.getBounds().contains(new google.maps.LatLng(pickup.lat, pickup.lon));
          });
          if (_.isEqual($scope.pickups, prevpickups) && $scope.markers.length != 0) {
            return;
          }
          _.each($scope.markers, function(marker) {
            marker.setMap(null);
          });
          _.each($scope.pickups, function(pickup) {
            var marker = new google.maps.Marker({
              position: new google.maps.LatLng(pickup.lat, pickup.lon),
              map: $rootScope.mainMap,
              title: pickup.dish.name
            });
            $scope.markers.push(marker);
            marker.addListener('click', function() {
              $state.go('pickup', {
                pickupId: pickup._id
              });
            });
          });
        };
        $scope.pickups = Pickup.$search({
          filter: $stateParams.filter || 'all'
        });
        $scope.allPickups = $scope.pickups;
      }
    };
  });