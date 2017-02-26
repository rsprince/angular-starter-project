// Contacts Controller
'use strict';

angular.module('myApp.Contacts', ['ngRoute', 'ngStorage'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/Contacts', {
    templateUrl: 'features/contacts/contacts.html',
    controller: 'ContactsCtrl'
  });
}])
.controller('ContactsCtrl', ['$scope', '$localStorage', function($scope, $localStorage) {

  //defaults
  $scope.deleteDisabled = true;

  //Data
  $scope.contacts = [
    {type: 'Executive', name: 'Ann Brown', title: 'CEO', phone: '(512) 456-5555', ext: '', fax: '(512) 456-5555', email: 'executive' },
    {type: 'Inmar AP', name: 'Mary Smith', title: 'VP', phone: '(512) 456-5555', ext: '', fax: '(512) 456-5555', email: 'Inmar AR' },
    {type: 'Executive', name: 'Ann Brown', title: 'CEO', phone: '(512) 456-5555', ext: '', fax: '(512) 456-5555', email: 'executive' },
    {type: 'Inmar AP', name: 'Mary Smith', title: 'VP', phone: '(512) 456-5555', ext: '', fax: '(512) 456-5555', email: 'Inmar AR' }
  ];
  //Set contacts to localStorage if it exists, else to itself.
  $scope.contacts = $localStorage.contacts ? $localStorage.contacts : $scope.contacts;
  console.log("localStorage.contacts: ");
  console.log($localStorage.contacts);

  $scope.form = {
    type: '',
    name: '',
    title: '',
    phone: '',
    ext: '',
    fax: '',
    email: ''
  };

  $scope.itemsToDelete = [];

  //Add Contact
  $scope.addContact = function () {
    //console.log($scope.form);
    $scope.contacts.push($scope.form);
    $scope.form = {
      type: '',
      name: '',
      title: '',
      phone: '',
      ext: '',
      fax: '',
      email: ''
    };
    saveLocalData();
  }

  //Select Contacts
  $scope.selectContacts = function (i) {
    $scope.itemsToDelete.push(i);
    $scope.deleteDisabled = false;

    console.log("items to delete: ");
    console.log($scope.itemsToDelete);

    //TODO: Debug "deselect" before Delete
    //research, change ng-click to ng-check

    // angular.forEach($scope.itemsToDelete, function(index){
    //   console.log("print item: " + $scope.itemsToDelete[index]);
    //   if (i == $scope.itemsToDelete[index]) {
    //     console.log("found match clicked: " + i + " and matched: " + index);
    //     $scope.itemsToDelete.splice(index, 1);
    //   }
    // });
    //$scope.itemsToDelete ? $scope.deleteDisabled = false : $scope.deleteDisabled = true;
  }

  //Delete Contacts
  $scope.deleteContacts = function () {
    var whichItems = $scope.itemsToDelete;
    angular.forEach(whichItems, function(index){
      $scope.contacts.splice(index, 1);
    });
    $scope.itemsToDelete = [];
    saveLocalData();
    $scope.deleteDisabled = true;
  }
  //Save to localStorage
  function saveLocalData() {
    $localStorage.contacts = $scope.contacts;
    console.log("saving local data");
  }

}]);
