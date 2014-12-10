/* global expect: false, it: false, describe: false */
'use strict';

describe('Angular Socket.io Mock',function(){
  beforeEach(module('btford.socket-io'))
  it('should be able to listen on an event',inject(function(socketFactory){
    expect(socketFactory.on('test-event',function(){})).not.toBe(false)
  }))
  it('should be able to emit an event',inject(function(socketFactory){
    expect(socketFactory.emit('test-event',{})).not.toBe(false)
  }))
  it('should be able to receive an event',inject(function(socketFactory){
    expect(socketFactory.receive('test-event',{})).not.toBe(false)
  }))
})
