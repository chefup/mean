'use strict';

angular.module('chefupApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('listingcreate', {
        url: '/listing/create',
        templateUrl: 'app/listing/create-listing.html',
        controller: 'CreateListingCtrl'
      })
  });