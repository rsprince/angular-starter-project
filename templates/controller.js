// <%= name %> Controller
'use strict';

angular.module('myApp.<%= name %>', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/<%= name %>', {
    templateUrl: 'features/<%= name %>/<%= name %>.html',
    controller: '<%= name %>Ctrl'
  });
}])
.controller('<%= name %>Ctrl', [function() {
  //Javascript goes here...

}]);
