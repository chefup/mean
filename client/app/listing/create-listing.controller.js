'use strict';

angular.module('chefupApp')
  .controller('CreateListingCtrl', ['$scope', '$stateParams', 'PickupSchema', 'Pickup', 'Auth',
    function($scope, $stateParams, PickupSchema, Pickup, Auth) {
      $scope.createListing = {
        submit: function(form) {
          var that = this;
          $scope.$broadcast("schemaFormValidate");
          if (form.$valid) {
            $scope.submitted = true;
            Pickup.$build(_.merge({
              user: Auth.getCurrentUser()._id
            }, that.model)).$save().$then(function() {
              that.model = {};
              form.$setPristine();
              $scope.submitted = false;
            }, function(failure) {
              $scope.submitted = false;
            });
          }
        },
        model: {},
        schema: {
          type: 'object',
          title: 'Listing',
          properties: {
            location: {
              type: 'string',
              title: 'Location',
              required: true
            },
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
          key: 'location',
          type: 'text'
        }, {
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