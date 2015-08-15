'use strict';

/**
 * Removes server error when user updates input
 */
angular.module('chefupApp')
  .directive('listingItem', function () {
    return {
      restrict: 'E',
      templateUrl: 'app/listing/listing-item.html',
      scope: {
        item: '='
      },
      controller: 'ListingItemCtrl'
    };
  });
