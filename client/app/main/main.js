'use strict';

angular.module('chefupApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/:filter',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });
  });