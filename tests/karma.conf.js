module.exports = function(config) {
  'use strict'

  config.set({
    basePath: '../',
    frameworks: ['jasmine'],
    files: [
      'bower_components/angular/angular.min.js',
      'bower_components/moment/moment.js',
      'angular-daterangepicker.js',
      'tests/spec/*.js'
    ],
    exclude: [
      'bower_components/**/*'
    ],
    bowers: [
      'PhantomJS',
      'Chrome'
    ],
    plugins: [
      'karma-phantomjs-launcher',
      'karma-chrome-launcher',
      'karma-jasmine'
    ],
    singleRun: true,
    colors: true
  });
};