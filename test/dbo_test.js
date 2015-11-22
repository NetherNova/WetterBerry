var assert = require("assert"); // core module
var dbo = require('../lib/dbo.js');  // our module

describe('dbo', function(){
    
    it('should have a init Method', function(){
    	assert.equal(typeof dbo.init, 'function');
    })
}) 