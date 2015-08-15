'use strict';

angular.module('chefupApp')
  .directive('mainListing', function($stateParams, Pickup, $rootScope) {
    return {
      restrict: 'E',
      templateUrl: 'app/main/main-listing.html',
      scope: {},
      link: function($scope, element, attrs) {
        $rootScope.updateSearch = function() {
          $scope.updateSearch();
        };
        $scope.updateSearch = function() {
          var search = $rootScope.mainSearch;
          if (search === '') {
            $scope.pickups = $scope.allPickups;
          }
          $scope.pickups = _.filter($scope.allPickups, function(pickup) {
            var query = new RegExp(search);
            if (pickup.dish.name.match(query) || pickup.dish.description.match(query)) {
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
          });
        };
        $scope.pickups = Pickup.$search({
          filter: $stateParams.filter || 'all'
        });
        $scope.allPickups = $scope.pickups;
      }
    };
  });