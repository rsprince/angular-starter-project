
// <%= name %> Function Service
'use strict';

angular.module('myApp.<%= name %>', [])

.factory('<%= name %>Service', [function(){
  return {
    <%= name %>: function(callback) {
      alert("TEST <%= name %>");
    }
  }
}]);
