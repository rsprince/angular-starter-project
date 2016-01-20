angular
    .module('directives')
    .directive('<%= name %>',[function(){
    'use strict';
    return{
        restrict    : 'AE',
        templateUrl : '<%= url %>',
        controller  : function($scope){},
        scope       : {},
        link        : function($scope, element, attrs){
            var $self = $(element);
        }
    };
}]);
