'use strict';

angular.module('chefupApp')
  .controller('SettingsCtrl', function($scope, $window, User, Auth) {
    var user = User.$find(Auth.getCurrentUser()._id).$then(function(user) {
      $scope.model.caption = user.caption;
    });
    $scope.setCaption = {
      submit: function(form) {
        var that = this;
        $scope.$broadcast("schemaFormValidate");
        if (form.$valid) {
          user.caption = that.model.caption;
          user.role = "chef";
          user.$save();
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
    $scope.hasStripe = !!Auth.getCurrentUser().stripe;
    $scope.linkStripe = function() {
      $window.location.href = '/auth/stripe';
    };

    $scope.unlinkStripe = function() {
      $window.location.href = '/auth/stripe/unlink';
    };
  });