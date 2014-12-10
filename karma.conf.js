// Karma configuration
module.exports = function(config){
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'http://code.angularjs.org/1.2.27/angular.js',
      'http://code.angularjs.org/1.2.27/angular-mocks.js',
      'angular-socket.io-mock.js',
      '*.spec.js'
    ],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    captureTimeout: 60000,
    singleRun: false
  })
}