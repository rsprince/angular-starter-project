'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.Home',
  'myApp.Products',
  'myApp.Quotes',
  'myApp.About',
  'myApp.Dashboard',
  'myApp.Contact',
  'myApp.DesignCategories',
  'myApp.PresentationArrangements',
  'myApp.Design',
  'myApp.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/Home',{
    templateUrl: 'features/home/home.html'
  })
  .otherwise({redirectTo: '/Home'});
}]);
