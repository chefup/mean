'use strict';

angular.module('chefupApp')
  .controller('ListingItemCtrl', function($scope, $http, Dish, User) {
    User.$find($scope.item.user._id).$then(function(user) {
      $scope.userAvatar = user.avatar;
    });
  });