'use strict';
app.factory('Photo', function($http) {
    function getUrl() {
        return 'http://127.0.0.1:8000/query';
    }

    return {
        query: function(callback) {
          return $http.get(getUrl()).success(callback);
        },
    };
});