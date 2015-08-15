'use strict';

angular.module('chefupApp')
  .controller('CreateListingCtrl', ['$scope', '$stateParams', 'PickupSchema',
    function($scope, $stateParams, PickupSchema) {
      $scope.createListing = {
        submit: function(form) {
          var that = this;
          Accounts.add(_.merge({
            project: $scope.project._id
          }, that.model), function() {
            that.model = {};
            form.$setPristine();
          }, function(failure) {});
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
            description: {
              type: 'string',
              title: 'Description'
            },
            privacy: {
              title: 'Privacy',
              enum: _.keys(PickupSchema.privacy.enum),
              default: PickupSchema.privacy.default
            }
          }
        },
        form: [{
          key: 'location',
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
        }, {
          type: 'submit',
          style: 'btn btn-primary',
          title: 'Create Pickup',
        }]
      };
    }
  ]);