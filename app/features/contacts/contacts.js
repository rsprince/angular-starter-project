// Contacts Controller
'use strict';

angular.module('myApp.Contacts', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/Contacts', {
    templateUrl: 'features/contacts/contacts.html',
    controller: 'ContactsCtrl'
  });
}])
.controller('ContactsCtrl', ['$scope', function($scope) {
  //Data
  $scope.contacts = [
    {type: 'Executive', name: 'Ann Brown', title: 'CEO', phone: '(512) 456-5555', ext: '', fax: '(512) 456-5555', email: 'executive' },
    {type: 'Inmar AP', name: 'Mary Smith', title: 'VP', phone: '(512) 456-5555', ext: '', fax: '(512) 456-5555', email: 'Inmar AR' },
    {type: 'Executive', name: 'Ann Brown', title: 'CEO', phone: '(512) 456-5555', ext: '', fax: '(512) 456-5555', email: 'executive' },
    {type: 'Inmar AP', name: 'Mary Smith', title: 'VP', phone: '(512) 456-5555', ext: '', fax: '(512) 456-5555', email: 'Inmar AR' }
  ];
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
    console.log($scope.form);
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
  }

  //Select Contacts
  $scope.selectContacts = function (i) {
    //console.log($scope.contacts[i]);
    $scope.itemsToDelete.push(i);
    console.log($scope.itemsToDelete);
  }

  //Delete Contacts
  $scope.deleteContacts = function () {
    var whichItems = $scope.itemsToDelete;
    angular.forEach(whichItems, function(index){
      $scope.contacts.splice(index, 1);
    });
    $scope.itemsToDelete = [];
  }

}]);
