'use strict';

angular.module('chefupApp')
  .directive('dishSelect', ['$modal',
    function($modal) {
      return {
        restrict: 'E',
        templateUrl: 'app/dish/dish-select.html',
        scope: {
          user: '='
        },
        link: function($scope, element, attrs) {
          $scope.createDish = function() {
            $modal.open({
              templateUrl: 'app/dish/dish-create.html',
              controller: 'DishCreateCtrl',
              windowClass: 'modal-default'
            });
          };
        }
      };
    }
  ]);