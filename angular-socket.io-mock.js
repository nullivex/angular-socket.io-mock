/* global angular: false */
var ng = angular.module('btford.socket-io',[])
ng.provider('socketFactory',function(){
  var defaultPrefix = 'socket:';
  this.$get = function($rootScope){
    return function socketFactory (options) {
      options = options || {};
      var prefix = options.prefix === undefined ? defaultPrefix : options.prefix;
      var defaultScope = options.scope || $rootScope;
      var obj = {};
      obj.events = {};
      obj.emits = {};

      // intercept 'on' calls and capture the callbacks
      obj.on = function(eventName, callback){
        if(!this.events[eventName]) this.events[eventName] = [];
        this.events[eventName].push(callback);
      };

      // intercept 'once' calls and treat them as 'on'
      obj.once = obj.on;

      // intercept 'emit' calls from the client and record them to assert against in the test
      obj.emit = function(eventName){
        var args = Array.prototype.slice.call(arguments,1);

        if(!this.emits[eventName])
          this.emits[eventName] = [];
        this.emits[eventName].push(args);
      };

      // when socket.on('someEvent', fn (data) { ... }),
      // call scope.$broadcast('someEvent', data)
      obj.forward = function (events, scope) {
        var self = this;
        if (events instanceof Array === false) {
          events = [events];
        }
        if (!scope) {
          scope = $rootScope;
        }
        events.forEach(function (eventName) {
          var prefixedEvent = prefix + eventName;
          obj.on(eventName, function (data) {
            scope.$broadcast(prefixedEvent, data);
          });
        });
      };

      //simulate an inbound message to the socket from the server (only called from the test)
      obj.receive = function(eventName){
        var args = Array.prototype.slice.call(arguments,1);

        if (this.events[eventName]) {
          angular.forEach(this.events[eventName], function(callback){
            $rootScope.$apply(function() {
              callback.apply(this, args)
            });
          });
        };

        if (this.emits[eventName]) {
          angular.forEach(this.emits[eventName], function(emit){
            var lastIndex = emit.length -1;
            if('function' === typeof emit[lastIndex] && !emit[lastIndex].acknowledged){
              $rootScope.$apply(function() {
                emit[lastIndex].acknowledged = true;
                emit[lastIndex].apply(this, args);
              });
            };
          });
        };
      };

      return obj;
    };
  };
});
