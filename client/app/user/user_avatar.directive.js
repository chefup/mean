'use strict';

/**
 * Removes server error when user updates input
 */
angular.module('chefupApp')
  .directive('userAvatar', function () {
    return {
      restrict: 'E',
      templateUrl: 'app/user/user_avatar.html',
      scope: {
        outerUser: '=user'
      },
      controller: function($scope, User) {
        if (!$scope.outerUser.avatar) {
          console.log($scope.outerUser.id);
          $scope.user = User.$find($scope.outerUser.id);
        } else {
          $scope.user = $scope.outerUser;
        }
      }
    };
  });
