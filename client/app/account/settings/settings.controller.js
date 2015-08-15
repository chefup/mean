'use strict';

angular.module('chefupApp')
  .controller('SettingsCtrl', function($scope, $window, User, Auth) {
    $scope.setCaption = {
      submit: function(form) {
        var that = this;
        $scope.$broadcast("schemaFormValidate");
        if (form.$valid) {
          $scope.user.caption = that.model.caption;
          $scope.user.role = "chef";
          $scope.user.$save();
        }
      },
      model: {
        caption: ""
      },
      schema: {
        type: 'object',
        title: 'User Caption',
        properties: {
          caption: {
            type: 'string',
            required: true,
            title: ' '
          }
        }
      },
      form: [{
        key: 'caption',
        type: 'text'
      }, {
        title: 'Set Caption',
        type: 'submit'
      }]
    };

    $scope.errors = {};
    $scope.user = Auth.getCurrentUser();
    $scope.setCaption.model.caption = $scope.user.caption;
    $scope.hasStripe = !!Auth.getCurrentUser().stripe;

    $scope.linkStripe = function() {
      $window.location.href = '/auth/stripe';
    };

    $scope.unlinkStripe = function() {
      $window.location.href = '/auth/stripe/unlink';
    };
  });
