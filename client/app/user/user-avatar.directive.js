'use strict';

/**
 * Removes server error when user updates input
 */
angular.module('chefupApp')
  .directive('userAvatar', function () {
    return {
      restrict: 'E',
      templateUrl: 'app/user/user-avatar.html',
      scope: {
        user: '='
      }
    };
  });
