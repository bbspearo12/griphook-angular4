'use strict';

angular.module('griphook')
    .factory('BootSwatchService', function ($http) {
        return {
            get: function() {
                return $http.get('http://bootswatch.com/api/3.json').then(function (response) {
                    return response.data.themes;
                });
            }
        };
    });
