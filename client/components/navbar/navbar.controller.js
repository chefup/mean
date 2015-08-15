'use strict';

angular.module('chefupApp')
  .controller('NavbarCtrl', function($rootScope, $scope, $location, Auth, $window, $http) {
    var $input = $(".location-lookup", $('#navbar-main'));
    $http.get('http://ip-api.com/json').then(function(response) {
      $input.val(response.data.city + ', ' + response.data.regionName + ', ' + response.data.country);
      $rootScope.geoIP = [response.data.lat, response.data.lon];
    });

    $scope.location = null;
    $scope.$watch('location', function(location) {
      $rootScope.mainLocation = location;
    });

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };

    $scope.isChef = function() {
      return Auth.getCurrentUser().role === "chef" || Auth.getCurrentUser.role === "admin";
    };

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });