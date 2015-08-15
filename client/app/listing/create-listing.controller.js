'use strict';

angular.module('chefupApp')
  .controller('CreateListingCtrl', ['$scope', '$stateParams', 'Pickup', 'Auth',
    function($scope, $stateParams, Pickup, Auth) {
      $scope.createListing = {
        submit: function(form) {
          var that = this;
          $scope.$broadcast("schemaFormValidate");
          if (form.$valid && that.model.dish && that.location) {
            that.model.lat = that.location.geometry.location.G;
            that.model.lon = that.location.geometry.location.K;
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
        location: null,
        model: {},
        schema: {
          type: 'object',
          title: 'Listing',
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
              enum: ['public', 'private'],
              default: 'public',
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
          titleMap: [{
            value: 'public',
            name: 'Public'
          }, {
            value: 'private',
            name: 'Private'
          }],
        }]
      };
    }
  ]);