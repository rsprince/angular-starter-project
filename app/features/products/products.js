// Products Controller
'use strict';

angular.module('myApp.Products', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/Products', {
    templateUrl: 'features/products/products.html',
    controller: 'ProductsCtrl'
  });
}])
.controller('ProductsCtrl', ['$scope', function($scope) {
  //Javascript goes here...

}]);
