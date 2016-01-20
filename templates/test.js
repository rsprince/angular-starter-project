// <%= name %> Test
'use strict';

describe('myApp.<%= name %> module', function() {

  beforeEach(module('myApp.<%= name %>'));

  describe('<%= name %> controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var <%= name %>Ctrl = $controller('<%= name %>Ctrl');
      expect(<%= name %>Ctrl).toBeDefined();
    }));

  });
});
