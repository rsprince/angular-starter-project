// About Test
'use strict';

describe('myApp.About module', function() {

  beforeEach(module('myApp.About'));

  describe('About controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var AboutCtrl = $controller('AboutCtrl');
      expect(AboutCtrl).toBeDefined();
    }));

  });
});
