'use strict';

angular.module('chefupApp')
  .directive('dishSelect', ['$modal', 'Dish', 'Auth',
    function($modal, Dish, Auth) {
      return {
        restrict: 'E',
        templateUrl: 'app/dish/dish-select.html',
        scope: {
          user: '=',
          selected: '='
        },
        link: function($scope, element, attrs) {
          $scope.selected = {};
          $scope.dishes = Dish.$search({
            userId: Auth.getCurrentUser()._id
          });
          $scope.deleteDish = function(dish, $event) {
            dish.$destroy();
            $event.stopPropagation();
          };
          $scope.createDish = function() {
            $modal.open({
              templateUrl: 'app/dish/dish-create.html',
              controller: 'DishCreateCtrl',
              windowClass: 'modal-default',
              scope: $scope
            });
          };
          $scope.listIngredients = function(dish, $event) {
            dish.listIngredients = !dish.listIngredients;
            $event.stopPropagation();
          };
        }
      };
    }
  ]);