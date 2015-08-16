'use strict';

angular.module('chefupApp')
  .controller('NavbarCtrl', function($rootScope, $scope, $location, Auth, $window, $http, $state) {
    var $input = $(".location-lookup", $('#navbar-main'));
    var setDefaults = function() {
      $input.val("Melbourne, Victoria, Australia");
      $rootScope.geoIP = ["-37.814", "144.9633"];
    };
    _.delay(setDefaults, 1000);
    // $http.get({
    //   timeout: 1000,
    //   url: 'https://freegeoip.net/json/'
    // }).then(function(response) {
    //   if (response.data.city) {
    //     $input.val(response.data.city + ", " + response.data.region_name + ", " + response.data.country_name);
    //     $rootScope.geoIP = [response.data.latitude, response.data.longitude];
    //   } else {
    //     setDefaults();
    //   }
    // }).then(setDefaults);

    $scope.location = null;
    $(window).on("keyup", function(e) {
      if (e.keyCode === 13 && $state.current.name !== "main") {
        if ($(e.target).attr('ng-change') === "changeSearch()") {
          $state.go('main');
          _.delay(function() {
            $scope.changeSearch();
          }, 1000);
        } else if ($(e.target).attr('ng-change') === "updateLocation()") {
          $state.go('main');
          _.delay(function() {
            $scope.updateLocation();
          }, 1000);
        }
      }
    });
    $scope.updateLocation = function() {
      if ($state.current.name !== "main") {
        return;
      } else {
        $rootScope.mainLocation = $scope.location;
        $rootScope.$broadcast('updateLocation');
      }
    };
    $scope.search = "";
    $scope.changeSearch = function() {
      if ($state.current.name !== "main") {
        return;
      } else {
        $rootScope.mainSearch = $scope.search;
        $rootScope.$broadcast('updateSearch');
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
      $location.path('/');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });