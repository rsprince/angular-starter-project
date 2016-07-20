// <%= name %> Directive
'use strict';

angular.module('myApp.<%= name %>', [])
    //Directive must begin with lower case
    .directive('<%= directiveName %>',[function(){
    return{
        restrict    : 'AE',
        templateUrl : '<%= url %>',
        controller  : ['$scope', function($scope){}],
        scope       : {},
        link        : function($scope, element, attrs){
            var $self = $(element);
            //Javascript goes here...

        }
    };
}]);
