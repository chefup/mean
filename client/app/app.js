'use strict';

angular.module('chefupApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.router.tabs',
  'ui.bootstrap',
  'restmod',
  'schemaForm',
  'google.places',
  'ngMap',
  'cloudinary',
  'angularFileUpload'
])
  .config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
  })

.factory('authInterceptor', function($rootScope, $q, $cookieStore, $location) {
  return {
    // Add authorization token to headers
    request: function(config) {
      if (!(config.url.match(new RegExp(window.location.origin)) || config.url[0] === "/")) {
        return config;
      }
      config.headers = config.headers || {};
      if ($cookieStore.get('token')) {
        config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
      }
      return config;
    },

    // Intercept 401s and redirect you to login
    responseError: function(response) {
      if (response.status === 401) {
        $location.path('/login');
        // remove any stale tokens
        $cookieStore.remove('token');
        return $q.reject(response);
      } else {
        return $q.reject(response);
      }
    }
  };
})

.constant('cloudinary', {
  cloud: 'dmlf2hfac',
  key: '212537978292943',
  secret: 'wd5MxqtUcqKTkoivER1CcTgfLjo',
  preset: 'jazwlzur'
})

.run(function($rootScope, $location, Auth, $state) {
  // Redirect to login if route requires auth and you're not logged in
  $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
    var redirect = toState.redirectTo;
    if (redirect) {
      event.preventDefault();
      if (angular.isFunction(redirect))
        redirect.call(window, $state, toParams);
      else
        $state.go(redirect);
    }
    Auth.isLoggedInAsync(function(loggedIn) {
      if (toState.authenticate && !loggedIn) {
        $location.path('/login');
      }
    });
  });
});