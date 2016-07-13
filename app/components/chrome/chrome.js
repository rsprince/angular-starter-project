// Chrome Directive
'use strict';

angular.module('myApp.Chrome', [])
    .directive('chrome',[function(){
    return{
        restrict    : 'AE',
        templateUrl : 'components/Chrome/Chrome.html',
        controller  : function($scope){},
        scope       : {},
        link        : function($scope, element, attrs){
            var $self = $(element);
            //Javascript goes here...
            var myVar = "Hello";

            var myObj = {};
            myObj = {
              name: "Jim",
              tel:  "555-555-5555"
            }

        }
    };
}]);
