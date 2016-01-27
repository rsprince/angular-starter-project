// Products Test
'use strict';

describe('myApp.Products module', function() {

  beforeEach(module('myApp.Products'));

  describe('Products controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var ProductsCtrl = $controller('ProductsCtrl');
      expect(ProductsCtrl).toBeDefined();
    }));

  });
});
