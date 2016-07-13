'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.Chrome',
  'myApp.Home',
  'myApp.Products',
  'myApp.About',
  'myApp.Contact',
  'myApp.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/Home',{
    templateUrl: 'features/home/home.html'
  })
  .otherwise({redirectTo: '/Home'});
}]);
