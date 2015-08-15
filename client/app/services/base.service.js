'use strict';

angular.module('chefupApp').factory('BaseService', ['$resource', '$injector',
  function($resource, $injector) {
    var Resources = {
      Dish: $resource('/api/dishes/:id', null, {
        update: {
          method: 'PATCH'
        },
      }),
      Pickup: $resource('/api/pickups/:id', null, {
        update: {
          method: 'PATCH'
        },
      })
    };

    return function(options) {
      var Schema = $injector.get(options.schema);
      return {
        collection: Resources[options.resource].query(),
        add: function(itemProps, successCb, failureCb) {
          var that = this;
          Resources[options.resource].save(itemProps, function(item) {
            that.collection.push(item);
            if (Schema) {
              _.each(Schema, function(field, parentPath) {
                if (field.childPath) {
                  if (field.ref === 'User')  {
                    // To-do: add to current user's dishes
                    var User = $injector.get('User');
                    User[field.childPath].push(item);
                  } else {
                    var parentService = $injector.get(field.ref + 'Service');
                    var parentId = (_.isPlainObject(item[parentPath])) ? item[parentPath]._id : item[parentPath];
                    var parent = _.find(parentService.collection, function(parent) {
                      return parent._id === parentId;
                    });
                    parent[field.childPath].push(item);
                  }
                }
              });
            }
            if (typeof successCb === 'function') {
              successCb.apply(this, arguments);
            }
          }, function() {
            if (typeof failureCb === 'function') {
              failureCb.apply(this, arguments);
            }
          });
        },
        query: Resources[options.resource].query,
        remove: function(item) {
          this.collection.splice(this.collection.indexOf(item), 1);
        }
      };
    };
  }
]);