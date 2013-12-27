'use strict';

angular.module('myApp.controllers')
    .controller('DemoCtrl', ['$scope', function ($scope) {
        $scope.title = "DemoCtrl";
        $scope.d3Data = [
            {name: "Greg", score: 98},
            {name: "Ari", score: 96},
            {name: "Loser", score: 48}
        ];
        $scope.d3OnClick = function (item) {
            alert(item.name);
        };

        $scope.addNewItem = function (item) {
            $scope.d3Data.push(item);
        };

        $scope.removeItem = function (index) {
            $scope.d3Data.splice(index, 1);
        };

    }]);
