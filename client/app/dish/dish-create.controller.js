'use strict';

angular.module('chefupApp')
  .controller('DishCreateCtrl', ['$scope', '$http', 'Auth', 'Dish', 'cloudinary',
    function($scope, $http, Auth, Dish, Cloudinary) {
      $scope.createDish = {
        submit: function(form) {
          var that = this;
          $scope.$broadcast("schemaFormValidate");
          if (form.$valid) {
            debugger;
            $scope.submitted = true;
            Dish.$build(_.merge({
              user: Auth.getCurrentUser()._id
            }, that.model)).$save().$then(function(dish) {
              that.model = {};
              form.$setPristine();
              $scope.submitted = false;
              $scope.$close();
              $scope.$parent.dishes.splice(0, 0, dish);
            }, function(failure) {
              $scope.submitted = false;
            });
          }
        },
        model: {
          ingredients: [],
          images: []
        },
        schema: {
          type: 'object',
          title: 'Dish',
          properties: {
            name: {
              type: 'string',
              required: true,
              title: 'Name'
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
      $scope.removeIngredient = function(ingredient) {
        var ingredients = $scope.createDish.model.ingredients;
        ingredients.splice(ingredients.indexOf(ingredient), 1);
      };
      $scope.addIngredient = {
        submit: function(form) {
          var that = this;
          $scope.$broadcast("schemaFormValidate");
          if (that.ingredient != "") {
            $scope.createDish.model.ingredients.push(that.ingredient);
            that.ingredient = "";
          }
        },
        ingredient: ""
      };
    }
  ]);