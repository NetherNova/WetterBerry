'use strict';

var sensorServices = angular.module('sensorServices', ['ngResource']);
var imageServices = angular.module('imageServices', ['ngResource']);

sensorServices.factory('Sensors', ['$resource',
    function($resource) {
        return $resource("/sensors", {}, {
            get : {method: 'GET', cache: false, isArray : true}
        });
    }]);

imageServices.factory('Images', ['$resource',
    function($resource) {
        return $resource("/images", {}, {
            get : {method: 'GET', cache: false, isArray : false}
        });
    }]);

