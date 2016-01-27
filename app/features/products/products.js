// Products Controller
'use strict';

angular.module('myApp.Products', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/Products', {
    templateUrl: 'features/Products/Products.html',
    controller: 'ProductsCtrl'
  });
}])
.controller('ProductsCtrl', ['$scope', '$http', 'DesignCategories', 'PresentationArrangements', 'filterFilter',
  function($scope, $http, DesignCategories, PresentationArrangements, filterFilter) {
  //set toggle
  $scope.searchCriteria = [];
  $scope.menuToggle = function () {
    $('.menu-detail').slideToggle();
  }

  //Build search Criteria
  $scope.searchTerms = function(searchterm) {
    // If term is already in array, remove it, else push to array
    var myIndex = $scope.searchCriteria.indexOf(searchterm);
    if (myIndex > -1){                //JQuery: if ($.inArray(searchterm, $scope.searchCriteria) > 1)
      console.log(searchterm + " is already in the array");
      console.log("Index: " + myIndex);
      $scope.searchCriteria.splice(myIndex, 1)
    }
    else {
      console.log("Add " + searchterm);
      $scope.searchCriteria.push(searchterm);
    }
    console.log($scope.searchCriteria);
  };

  //Get All Categories
  DesignCategories.list(function(categoriesList){
    $scope.categories = categoriesList;
  });
  //Get Top Level Categories (ParentCategoryId = 0)
  DesignCategories.listById(0,function(filteredCategories){
    $scope.categoryGroups = filteredCategories;
  });

  //Get All Presentation Arrangements
  PresentationArrangements.list(function(arrangementsList){
    $scope.arrangements = arrangementsList;
    //can I put filter here?
  });
  //Get All Presentation Arrangements
  PresentationArrangements.list(function(arrangementsList){
    $scope.filteredResults = filterFilter(arrangementsList, 'BLACK');
  });


}]);
