/* global angular: false */
var ng = angular.module('btford.socket-io',[])
ng.provider('socketFactory',function(){
  this.$get = function($rootScope){
    return function socketFactory () {
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
      };

      return obj;
    };
  };
});
