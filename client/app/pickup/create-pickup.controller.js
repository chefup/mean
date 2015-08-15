'use strict';

angular.module('chefupApp')
  .controller('CreatePickupCtrl', ['$scope', '$stateParams', 'PickupSchema', 'Pickup', 'Auth', '$state',
    function($scope, $stateParams, PickupSchema, Pickup, Auth, $state) {
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
        model: {},
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