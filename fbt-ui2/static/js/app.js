/* vim: set sw=2 ts=2 : */
'use strict';

var app = angular.module('fbtApp', []);
app.config(function ($routeProvider) {
  $routeProvider
    .when('/home',
        {
            controller: 'HomeController',
            templateUrl: 'static/partials/home.html'
        })
    .when('/resource',
        {
            controller: 'ResourceController',
            templateUrl: 'static/partials/resource.html'
        })
    .when('/circle',
        {
            controller: 'CircleController',
            templateUrl: 'static/partials/circle.html'
        })
    .when('/reward',
        {
            controller: 'RewardController',
            templateUrl: 'static/partials/reward.html'
        })
    .otherwise({ redirectTo: '/home' });
});
