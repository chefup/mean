'use strict';

angular.module('chefupApp')
  .controller('MainCtrl', function($scope, $http, $rootScope) {
    $scope.updateMainMap = function()  {
      var location = $rootScope.mainLocation;
      if (location) {
        $scope.map.setCenter(location.geometry.location);
        $scope.map.setZoom(12);
      }
    };
    $rootScope.updateLocation = function() {
      $scope.updateMainMap();
    };
    var resizeFunc = function() {
      var listingsHeight = $(window).height() - 65 - 20;
      var mapHeight = $(window).height() - 65;
      if ($('.main-listings').length > 0 && $('.map-wrap .map').length > 0) {
        $('.main-listings').height(listingsHeight);
        $('.map-wrap .map').height(mapHeight);
        $('.map-wrap .map').width($(window).width() - ($('.main-listings').offset().left + $('.main-listings').outerWidth(true)));
        google.maps.event.trigger($scope.map, 'resize');
      }
    };
    $(window).on('resize', function() {
      resizeFunc();
    });
    $scope.$on('mapInitialized', function(event, map) {
      resizeFunc();
      var changeMap = function() {
        var LatLng = new google.maps.LatLng($rootScope.geoIP[0], $rootScope.geoIP[1]);
        map.setCenter(LatLng);
        $scope.map.setZoom(9);
      };
      if ($rootScope.geoIP) {
        changeMap();
      } else {
        $rootScope.$watch('geoIP', function() {
          changeMap();
        });
      }
    });
    $scope.tabData = [{
      heading: 'All',
      route: 'main',
      params: {
        filter: ''
      }
    }, {
      heading: 'Cook-up',
      route: 'main',
      params: {
        filter: 'cookup'
      }
    }, {
      heading: 'Serve-up',
      route: 'main',
      params: {
        filter: 'serveup'
      }
    }]
  });