'use strict';

/**
 * Removes server error when user updates input
 */
angular.module('chefupApp')
  .directive('userInfo', function () {
    return {
      restrict: 'E',
      templateUrl: 'app/user/user-info.html',
      scope: {
        user: '='
      }
    };
  });
