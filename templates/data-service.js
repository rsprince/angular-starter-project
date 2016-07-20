// <%= name %> Factory Service
'use strict';

angular.module('myApp.<%= name %>', [])

.factory('<%= name %>', ['$http', function($http){
    //Get JSON or Web Service
  function getData(callback){
    $http({
      method  : 'GET',
      url     : 'path-to-web-service.json',
      cache   : true
    }).success(callback);
  }
  //return list of all records, or filter list by id.
  //Add additional functions as needed.
  var searchId='';
  return {
    list: getData,
    //gets all categories by ID
    listById: function (id, callback){
      getData(function(data){
        var category = data.filter(function(item){
          return item.searchId === id;
        });
        callback(category);
      });
    }
  }
}]);
