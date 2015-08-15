'use strict';

angular.module('chefupApp')
  .directive('mainListing', function($stateParams, Pickup) {
    return {
      restrict: 'E',
      templateUrl: 'app/main/main-listing.html',
      scope: {},
      link: function($scope, element, attrs) {
        $scope.pickups = Pickup.$search({
          filter: $stateParams.filter || 'all'
        });
      }
    };
  });