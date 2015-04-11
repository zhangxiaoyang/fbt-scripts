'use strict';

var app = angular.module('uiApp', []);
app.config(function ($routeProvider) {
    $routeProvider
        .when('/home',
            {
                templateUrl: '/static/partials/home.html'
            })
        .when('/photos',
            {
                controller: 'PhotoController',
                templateUrl: '/static/partials/photos.html'
            })
        .otherwise({ redirectTo: '/home' });
});
