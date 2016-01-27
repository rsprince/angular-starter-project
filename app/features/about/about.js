// About Controller
'use strict';

angular.module('myApp.About', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/About', {
    templateUrl: 'features/About/About.html',
    controller: 'AboutCtrl'
  });
}])
.controller('AboutCtrl', ['$scope', function($scope) {
  //Javascript goes here...

}]);
