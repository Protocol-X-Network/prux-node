'use strict';

var should = require('chai').should();

describe('Index Exports', function() {
  it('will export protocolxcore-lib', function() {
    var protocolxcore = require('../');
    should.exist(protocolxcore.lib);
    should.exist(protocolxcore.lib.Transaction);
    should.exist(protocolxcore.lib.Block);
  });
});
