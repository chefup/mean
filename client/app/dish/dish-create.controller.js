'use strict';

angular.module('chefupApp')
  .controller('DishCreateCtrl', ['$scope', '$http', 'Auth', 'Dish',
    function($scope, $http, Auth) {
      $scope.createDish = {
        submit: function(form) {
          var that = this;
          $scope.$broadcast("schemaFormValidate");
          if (form.$valid) {
            $scope.submitted = true;
            Dish.$build(_.merge({
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
          title: 'Dish',
          properties: {
            name: {
              type: 'string',
              required: true
            },
            description: {
              type: 'string',
              title: 'Description'
            }
          }
        },
        form: [{
          key: 'name',
          type: 'text'
        }, {
          key: 'description',
          type: 'textarea'
        }]
      };

    }
  ]);