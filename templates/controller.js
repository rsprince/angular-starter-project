// <%= name %> Controller
'use strict';

angular.module('myApp.<%= name %>', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/<%= name %>', {
    templateUrl: '<%= url %>',
    controller: '<%= name %>Ctrl'
  });
}])
.controller('<%= name %>Ctrl', ['$scope', function($scope) {
  //Javascript goes here...

}]);
