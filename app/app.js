'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.Home',
  'myApp.Dashboard',
  'myApp.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/home',{
    templateUrl: 'features/home/home.html'
  })
  .otherwise({redirectTo: '/home'});
}]);
