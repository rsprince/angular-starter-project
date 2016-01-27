// <%= name %> Directive
'use strict';

angular.module('myApp.<%= name %>', [])
    .directive('<%= name %>',[function(){
    return{
        restrict    : 'AE',
        templateUrl : 'components/<%= name %>/<%= name %>.html',
        controller  : function($scope){},
        scope       : {},
        link        : function($scope, element, attrs){
            var $self = $(element);
            //Javascript goes here...

        }
    };
}]);
