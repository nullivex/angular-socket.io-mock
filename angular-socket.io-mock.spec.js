/* global expect: false, it: false, describe: false */
'use strict';

describe('Angular Socket.io Mock', function () {
    var socketFactory;
    var $rootScope;
    beforeEach(module('btford.socket-io'))
    beforeEach(inject(function (_socketFactory_, _$rootScope_) {
        socketFactory = _socketFactory_
        $rootScope = _$rootScope_;
    }));
    it('should be able to listen on an event', function () {
        expect(new socketFactory().on('test-event', function () {
        })).not.toBe(false)
    });
    it('should be able to listen once event', function () {
        expect(new socketFactory().once('test-event', function () {
        })).not.toBe(false)
    });
    it('should be able to emit an event', function () {
        expect(new socketFactory().emit('test-event', {})).not.toBe(false)
    });
    it('should be able to receive an event', function () {
        expect(new socketFactory().receive('test-event', {})).not.toBe(false)
    });
    it('should be able to acknowledge an emited event only once', function (done) {
        var socket = new socketFactory();
        var timesCalled = 0;

        socket.emit('test-event', {}, function (resp) {
            expect(resp).not.toBe(false);
            expect(++timesCalled).toEqual(1);
        });

        socket.receive('test-event', {});
        socket.receive('test-event', {});

        setTimeout(function () { // Wait to see if the event was acknowledged twice
            done();
        }, 100);
    });
    it('should be able to forward an event with default prefix', function () {
        var socket = new socketFactory();
        spyOn($rootScope, "$broadcast");
        socket.forward('test-event');
        socket.receive('test-event', {'test-data': 'test-value'});
        expect($rootScope.$broadcast).toHaveBeenCalledWith('socket:test-event', {'test-data': 'test-value'});
    });
    it('should be able to forward an event with custom prefix', function () {
        var socket = new socketFactory({prefix: 'test-prefix:'});
        spyOn($rootScope, "$broadcast");
        socket.forward('test-event');
        socket.receive('test-event', {'test-data': 'test-value'});
        expect($rootScope.$broadcast).toHaveBeenCalledWith('test-prefix:test-event', {'test-data': 'test-value'});
    });
    it('should be able to forward events', function () {
        var socket = new socketFactory({prefix: 'test-prefix:'});
        spyOn($rootScope, "$broadcast").and.callThrough;
        socket.forward(['test-event1', 'test-event2']);
        socket.receive('test-event1', {'test-data1': 'test-value1'});
        socket.receive('test-event2', {'test-data2': 'test-value2'});
        expect($rootScope.$broadcast).toHaveBeenCalledWith('test-prefix:test-event1', {'test-data1': 'test-value1'});
        expect($rootScope.$broadcast).toHaveBeenCalledWith('test-prefix:test-event2', {'test-data2': 'test-value2'});
    });
})
