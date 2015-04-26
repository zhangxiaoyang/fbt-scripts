'use strict';

app.controller('MyrewardController', function($scope) {
    $scope.viewResourceClickHandler = function() {
        $('#view-resource-modal').modal({backdrop: false, keyboard: false});
    };

    $scope.viewRewardClickHandler = function() {
        $('#view-reward-modal').modal({backdrop: false, keyboard: false});
    };
});
