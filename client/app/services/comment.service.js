'use strict';

angular.module('chefupApp')
  .factory('CommentService', ['BaseService',
    function(BaseService) {
      return angular.extend(BaseService({
        resource: 'Comment',
        schema: 'CommentSchema'
      }), {
        additionalFunction: function() {
          return true;
        },
      });
    }
  ]);