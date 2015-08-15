'use strict';

angular.module('chefupApp')
  .controller('NavbarCtrl', function($rootScope, $scope, $location, Auth, $window, $http) {
    var $input = $(".location-lookup", $('#navbar-main'));
    $http.get('https://freegeoip.net/json/').then(function(response) {
      var val = "";
      if (response.data.city) {
        val += response.data.city + ", ";
      }
      if (response.data.region_name) {
        val += response.data.region_name + ", ";
      }
      if (response.data.country_name) {
        val += response.data.country_name;
      }
      $input.val(response.data.city + ', ' + response.data.regionName + ', ' + response.data.country);
      $rootScope.geoIP = [response.data.latitude, response.data.longitude];
    });

    $scope.location = null;
    $scope.updateLocation = function() {
      $rootScope.mainLocation = $scope.location;
      $rootScope.$broadcast('updateLocation');
    };
    $scope.search = "";
    $scope.changeSearch = function() {
      $rootScope.mainSearch = $scope.search;
      if ($rootScope.updateSearch) {
        $rootScope.updateSearch();
      }
    };

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