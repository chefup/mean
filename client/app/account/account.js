'use strict';

angular.module('chefupApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        controller: function($location) {
          $location.path('/auth/facebook');
        }
      })
      .state('settings', {
        url: '/settings',
        templateUrl: 'app/account/settings/settings.html',
        controller: 'SettingsCtrl',
        authenticate: true
      });
  });
