'use strict';

angular.module('chefupApp')
  .controller('UserCtrl', function ($scope, $stateParams, User) {
    $scope.user = User.get({ id: $stateParams.userId });
    $scope.userId = $stateParams.userId;
  });
