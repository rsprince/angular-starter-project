'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngAnimate',
  'ngRoute',
  'myApp.Chrome',
  'myApp.Home',
  'myApp.About',
  'myApp.Contacts'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/Home',{
    templateUrl: 'features/home/home.html'
  })
  .otherwise({redirectTo: '/Home'});
}]);
