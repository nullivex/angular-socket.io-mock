/* global expect: false, it: false, describe: false */
'use strict';

describe('Angular Socket.io Mock',function(){
  var socketFactory;
  beforeEach(module('btford.socket-io'))
  beforeEach(inject(function(_socketFactory_){ socketFactory = _socketFactory_ }));
  it('should be able to listen on an event', function(){
    expect(new socketFactory().on('test-event',function(){})).not.toBe(false)
  });
  it('should be able to listen once event', function(){
    expect(new socketFactory().once('test-event',function(){})).not.toBe(false)
  });
  it('should be able to emit an event', function(){
    expect(new socketFactory().emit('test-event',{})).not.toBe(false)
  });
  it('should be able to receive an event', function(){
    expect(new socketFactory().receive('test-event',{})).not.toBe(false)
  });
  it('should be able to acknowledge an emited event only once',function(done){
    var socket = new socketFactory();
    var timesCalled = 0;

    socket.emit('test-event',{}, function(resp){
      expect(resp).not.toBe(false);
      expect(++timesCalled).toEqual(1);
    });

    socket.receive('test-event', {});
    socket.receive('test-event', {});

    setTimeout(function() { // Wait to see if the event was acknowledged twice
      done();
    }, 100);
  });
})
