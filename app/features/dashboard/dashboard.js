// Dashboard Controller
'use strict';

angular.module('myApp.Dashboard', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/Dashboard', {
    templateUrl: 'features/Dashboard/Dashboard.html',
    controller: 'DashboardCtrl'
  });
}])
.controller('DashboardCtrl', [function() {
  //Javascript goes here...

}]);
