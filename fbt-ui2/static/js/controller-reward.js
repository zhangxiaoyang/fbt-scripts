'use strict';

app.controller('RewardController', function($scope) {
    $scope.uploadClickHandler = function() {
        $('#upload-modal').modal({backdrop: false, keyboard: false});
    };

    $scope.appendClickHandler = function() {
        $('#append-modal').modal({backdrop: false, keyboard: false});
    };

    $scope.viewClickHandler = function() {
        $('#view-modal').modal({backdrop: false, keyboard: false});
    };
});

//TODO
app.controller('HomeController', function($scope) {
});

app.controller('ResourceController', function($scope) {
});

app.controller('CircleController', function($scope) {
});

