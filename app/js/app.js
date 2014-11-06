'use strict';

/* App Module */

var phonecatApp = angular.module('phonecatApp', [
  'ngRoute',
  'phonecatAnimations',

  'phonecatControllers',
  'phonecatFilters',
  'phonecatServices'
]);

phonecatApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/phones', {
        templateUrl: 'partials/phone-list.html',
        controller: 'PhoneListCtrl'
      }).
      when('/phones/:phoneId', {
        templateUrl: 'partials/phone-detail.html',
        controller: 'PhoneDetailCtrl'
      }).
      when('/twowaybindView', {
        templateUrl: 'partials/twowaybindView.html',
        controller: 'twowaybindViewCtrl'
      }).
      when('/directiveView', {
        templateUrl: 'partials/directiveView.html',
        controller: 'directiveViewCtrl'
      }).
      when('/asynView', {
        templateUrl: 'partials/asynView.html',
        controller: 'asynViewCtrl'
      }).
      when('/transmitView', {
        templateUrl: 'partials/transmitView.html',
        controller: 'transmitViewCtrl'
      })
      .when('/scopeMethodView', {
        templateUrl: 'partials/scopeMethodView.html',
        controller: 'scopeMethodViewCtrl'
      }).
      when('/resourceView', {
        templateUrl: 'partials/resourceView.html',
        controller: 'resourceViewCtrl'
      }).
      otherwise({
        redirectTo: '/phones'
      });
  }]);
