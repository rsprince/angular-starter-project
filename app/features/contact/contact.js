// Contact Controller
'use strict';

angular.module('myApp.Contact', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/Contact', {
    templateUrl: 'features/contact/contact.html',
    controller: 'ContactCtrl'
  });
}])
.controller('ContactCtrl', ['$scope', function($scope) {
  //Javascript goes here...

}]);
