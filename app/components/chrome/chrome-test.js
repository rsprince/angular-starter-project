// Chrome Test
'use strict';

describe('myApp.Chrome module', function() {

  beforeEach(module('myApp.Chrome'));

  describe('Chrome controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var ChromeCtrl = $controller('ChromeCtrl');
      expect(ChromeCtrl).toBeDefined();
    }));

  });
});
