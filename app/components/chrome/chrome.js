// Chrome Directive
'use strict';

angular.module('myApp.Chrome', [])
    .directive('chrome',[function(){
    return{
        restrict    : 'AE',
        templateUrl : 'components/chrome/chrome.html',
        controller  : ['$scope', function($scope){
          //controller code
        }],
        scope       : {},
        link        : function($scope, element, attrs){
            var $self = $(element);


        }
    };
}]);
