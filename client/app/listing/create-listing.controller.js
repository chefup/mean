'use strict';

angular.module('chefupApp')
  .controller('CreateListingCtrl', function($scope, $stateParams, PickupSchema) {
    $scope.createListing = {
      submit: function(form) {
        var that = this;
        // Accounts.add(_.merge({
        //   project: $scope.project._id
        // }, that.model), function() {
        //   that.model = {};
        //   form.$setPristine();
        // }, function(failure) {});
      },
      model: {},
      schema: {
        type: 'object',
        title: 'Listing',
        properties: {
          name: {
            title: 'Name',
            required: true
          },
          privacy: {
            title: 'Privacy',
            enum: _.keys(PickupSchema.type.enum),
            default: PickupSchema.type.default
          },
          target: {
            title: 'Mål',
            type: 'number',
            required: true
          }
        }
      },
      form: [{
        title: 'Navn',
        key: 'name',
        placeholder: 'Kategori',
        htmlClass: 'col-sm-3'
      }, {
        key: 'type',
        type: 'radios',
        titleMap: _.chain(PickupSchema.type.enum).keys().reduce(function(acc, key) {
          acc.push({
            value: key,
            name: PickupSchema.type.enum[key]
          });
          return acc;
        }, []).value(),
        htmlClass: 'col-sm-2'
      }, {
        key: 'target',
        placehoøder: 0,
        htmlClass: 'col-sm-3',
      }, {
        type: 'submit',
        style: 'btn btn-primary',
        title: 'Legg til',
        htmlClass: 'col-sm-3',
      }]
    };
  });