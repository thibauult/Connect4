/**
 * Created by tibus on 31/10/14.
 */
connect4Controllers.controller('StartCtrl', ['$scope', '$location',
    function ($scope, $location) {

        $scope.player1 = {
            hasError: false,
            value: '',
            validate: function() {
                return this.value != '';
            }
        };

        $scope.player2 = {
            hasError: false,
            value: '',
            validate: function() {
                return this.value != '';
            }
        };

        $scope.nbRounds = {
            hasError: false,
            value: 1,
            validate: function() {
                return this.value > 1;
            }
        };

        $scope.gridX = {
            hasError: false,
            value: 7,
            validate: function() {
                return this.value > 1;
            }
        };
        $scope.gridY = {
            hasError: false,
            value: 6,
            validate: function() {
                return this.value > 1;
            }
        };

        $scope.start = function() {

            //if(!checkErrors([$scope.player1, $scope.player2, $scope.nbRounds])) {
            //    return;
            //}

            $location.path(buildNextRoute('game', [
                $scope.player1.value,
                $scope.player2.value,
                $scope.nbRounds.value,
                $scope.gridX.value,
                $scope.gridY.value
            ]));
        }
    }]
);

function checkErrors(fields) {

    for(var i in fields) {

        fields[i].hasError = false;

        if(fields[i].validate != undefined && !fields[i].validate()) {
            fields[i].hasError = true;
            return false;
        }
    }

    return true;
}

function buildNextRoute(path, params) {
    var route = path + '/';
    for(var i in params) {
        route += params[i] + '/';
    }
    return route;
}