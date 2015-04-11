'use strict';

app.controller('PhotoController', function($scope, Photo) {
    Photo.query(function(data) {
        $scope.rows = [];
        var i = 0;
        for(; i<data.length/3-1|0; i++) {
            var row = [];
            row.push(data[i*3]);
            row.push(data[i*3+1]);
            row.push(data[i*3+2]);
            $scope.rows.push(row);
        }
        var row = [];
        for(var j=i*3; j<data.length; j++) {
            row.push(data[j]);
        }
        $scope.rows.push(row);
    });
});

app.controller('NavbarController', function($scope, $location) {
    $scope.getActive = function(path) {
        return $location.url().split('?')[0] == path;
    }
});
