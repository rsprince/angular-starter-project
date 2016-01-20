'use strict';

describe('myApp.Home module', function() {

  beforeEach(module('myApp.view1'));

  describe('Home controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var HomeCtrl = $controller('HomeCtrl');
      expect(HomeCtrl).toBeDefined();
    }));

  });
});
