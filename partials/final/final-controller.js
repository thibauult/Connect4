/**
 * Created by tibus on 31/10/14.
 */
c4Controllers.controller('FinalCtrl', ['$scope', '$routeParams', '$location', 'GameManager', 'UiService',
    function ($scope, $routeParams, $location, GameManager, UiService) {

        // prevent direct access
        if(GameManager.getProgression() < 100) {
            $location.path(
                UiService.buildRouteWithParams('start')
            );
        }

        $scope.equality = !(GameManager.player[1].score - GameManager.player[2].score);

        $scope.winner = '';
        if(!$scope.equality) {
            if(GameManager.player[1].score > GameManager.player[2].score) {
                $scope.winner = GameManager.player[1].name;
            } else {
                $scope.winner = GameManager.player[2].name;
            }
        }

        $scope.player1 = {};
        $scope.player2 = {};

        $scope.player1.name = GameManager.player[1].name;
        $scope.player2.name = GameManager.player[2].name;

        $scope.player1.reflexionTime = new Date(computeAverageReflexionTime(GameManager.player[1].reflexion));
        $scope.player2.reflexionTime = new Date(computeAverageReflexionTime(GameManager.player[2].reflexion));

        $scope.restart = function() {
            $location.path(UiService.buildRouteWithParams('game', [
                GameManager.player[1].name,
                GameManager.player[2].name,
                GameManager.totalRounds,
                GameManager.gridX,
                GameManager.gridY
            ]));
        }
    }]
);

function computeAverageReflexionTime(reflexionArray) {
    var avgTime = 0;

    for(var i = 0; i < reflexionArray.length; i++) {
        avgTime += reflexionArray[i];
    }

    return avgTime / reflexionArray.length;
}