'use strict';

angular.module('chefupApp')
  .controller('CreatePickupCtrl', ['$rootScope', '$scope', '$stateParams', 'PickupSchema', 'Pickup', 'Auth', '$state',
    function($rootScope, $scope, $stateParams, PickupSchema, Pickup, Auth, $state) {
      $scope.days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      $scope.times = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12",
        "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"
      ];
      var defaultAvailabilities = {};
      _.each($scope.days, function(day) {
        defaultAvailabilities[day] = {
          able: true,
          start: "09",
          end: "18"
        };
      });
      $scope.$on('mapInitialized', function(event, map) {
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
      $scope.updateMap = function()  {
        var location = $scope.createPickup.location;
        $scope.map.setCenter(location.geometry.location);
        $scope.map.setZoom(12);
        // $scope.map.fitBounds(new google.maps.LatLngBounds(location.geometry.location));
      };
      $scope.createPickup = {
        submit: function(form) {
          var that = this;
          $scope.$broadcast("schemaFormValidate");
          if (form.$valid && that.model.dish && that.location) {
            that.model.lat = that.location.geometry.location.G;
            that.model.lon = that.location.geometry.location.K;
            $scope.submitted = true;
            Pickup.$build(_.merge({
              user: Auth.getCurrentUser()._id
            }, that.model)).$save().$then(function(pickup) {
              that.model = {};
              form.$setPristine();
              $scope.submitted = false;
              $state.go('pickup', {
                pickupId: pickup._id
              })
            }, function(failure) {
              $scope.submitted = false;
            });
          }
        },
        location: null,
        model: {
          availabilities: _.clone(defaultAvailabilities)
        },
        schema: {
          type: 'object',
          title: 'Pickup',
          properties: {
            price: {
              type: 'string',
              title: 'Price',
              required: true
            },
            description: {
              type: 'string',
              title: 'Description'
            },
            privacy: {
              title: 'Privacy',
              enum: _.keys(PickupSchema.privacy.enum),
              default: PickupSchema.privacy.default,
              required: true
            }
          }
        },
        form: [{
          key: 'price',
          type: 'text'
        }, {
          key: 'description',
          type: 'textarea'
        }, {
          key: 'privacy',
          type: 'radios',
          titleMap: _.chain(PickupSchema.privacy.enum).keys().reduce(function(acc, key) {
            acc.push({
              value: key,
              name: PickupSchema.privacy.enum[key]
            });
            return acc;
          }, []).value(),
        }]
      };
    }
  ]);