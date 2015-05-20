/* global expect: false, it: false, describe: false */
'use strict';

describe('Angular Socket.io Mock',function(){
  beforeEach(module('btford.socket-io'))
  it('should be able to listen on an event',inject(function(socketFactory){
    expect(new socketFactory().on('test-event',function(){})).not.toBe(false)
  }))
  it('should be able to listen once event',inject(function(socketFactory){
    expect(socketFactory.once('test-event',function(){})).not.toBe(false)
  }))
  it('should be able to emit an event',inject(function(socketFactory){
    expect(new socketFactory().emit('test-event',{})).not.toBe(false)
  }))
  it('should be able to receive an event',inject(function(socketFactory){
    expect(new socketFactory().receive('test-event',{})).not.toBe(false)
  }))
})
