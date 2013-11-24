/* global expect: false, it: false, describe: false */
"use strict";
describe("Angular Socket.io Mock", function(){
  // load the app
  beforeEach(module("btford.socket-io"))
  it("should be able to listen on an event",inject(function(socket){
    expect(socket.on("test-event",function(){})).not.toBe(false)
  }))
  it("should be able to emit an event",inject(function(socket){
    expect(socket.emit("test-event",{})).not.toBe(false)
  }))
  it("should be able to receive an event",inject(function(socket){
    expect(socket.receive("test-event",{})).not.toBe(false)
  }))
})
