angular.module("chefupApp").directive("locationLookup", ['$http',
  function($http) {
    return {
      restrict: 'E',
      templateUrl: 'components/lookup/locationlookup.html',
      scope: {
        location: '='
      },
      link: function($scope, element, attrs) {
        var $input = $("#locationLookup");
        $http.get('http://ip-api.com/json').then(function(response) {
          $input.val(response.data.city + ', ' + response.data.regionName + ', ' + response.data.country)
        });
        var autocomplete = new google.maps.places.Autocomplete($input.get(0), {});
        google.maps.event.addListener(autocomplete, 'place_changed', function() {
          var place = autocomplete.getPlace();
          $scope.location = place.geometry.location.lat() + ',' + place.geometry.location.lng();
          $scope.$apply();
        });
      }
    };
  }
]);