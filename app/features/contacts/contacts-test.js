// Contacts Test
'use strict';

describe('myApp.Contacts module', function() {

  beforeEach(module('myApp.Contacts'));

  describe('Contacts controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var ContactsCtrl = $controller('ContactsCtrl');
      expect(ContactsCtrl).toBeDefined();
    }));

  });
});
