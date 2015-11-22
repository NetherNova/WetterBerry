'use strict';

var helloWorldApp = angular.module('helloWorldApp', [
    'ngRoute',
    'helloWorldControllers',
    'sensorServices',
    'imageServices'
]);

helloWorldApp.config(['$routeProvider', '$locationProvider', 
    function($routeProvider, $locationProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'partials/main.html',
                controller: 'MainCtrl'
        }).when('/about', {
            templateUrl: 'partials/about.html',
                controller: 'ShowCtrl'
        });
    
    $locationProvider.html5Mode(false).hashPrefix('!');    
    }]);


