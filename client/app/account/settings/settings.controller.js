'use strict';

angular.module('chefupApp')
  .controller('SettingsCtrl', function ($scope, $window, User, Auth) {
    $scope.errors = {};
    $scope.user = Auth.getCurrentUser();
    $scope.hasStripe = !!Auth.getCurrentUser().stripe;
    $scope.linkStripe = function() {
      $window.location.href = '/auth/stripe';
    };

    $scope.unlinkStripe = function() {
      $window.location.href = '/auth/stripe/unlink';
    };
  });
