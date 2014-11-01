/**
 * Created by tibus on 31/10/14.
 */

var Game = {};

Game.PLAYER_1 = 1;
Game.PLAYER_2 = 2;

Game.DEBUG = false;

connect4Controllers.controller('GameCtrl', ['$scope', '$routeParams',
    function ($scope, $routeParams) {

        $scope.player1 = $routeParams.player1;
        $scope.player2 = $routeParams.player2;
        $scope.nbRounds = $routeParams.nbRounds;

        var nbLine = $routeParams.gridX;
        var nbColumn = $routeParams.gridY;

        var gridRatio = 100;

        var gridWidth = nbColumn* gridRatio;
        var gridHeight = nbLine * gridRatio;

        var gap = 10;
        var diam = gridWidth / nbColumn;
        var radius = diam / 2 - gap;

        //Init grid model -> first index = line, second index = column
        var gridModel = new Array(nbLine);
        for (var i = 0; i < nbLine; i++) {
            gridModel[i] = new Array(nbColumn);
        }
        for(var y = 0; y<nbLine; y++) {
            for (var x = 0; x < nbColumn; x++) {
                gridModel[y][x] = 0;
            }
        }

        //Test
        if(Game.DEBUG) {
            gridModel[0][0] = 1;
            gridModel[1][0] = 2;
            gridModel[1][1] = 2;
        }

        var canvas = document.getElementById('canvas');
        var context = canvas.getContext('2d');

        canvas.width = gridWidth;
        canvas.height = gridHeight;
        context.globalAlpha = 1.0;

        setInterval(animate, 100);

        var currentTokenPositionInGrid;
        var currentPlayer = Game.PLAYER_1;
        var isModelDirty = false;

        canvas.addEventListener('mousedown', function(evt) {

            if(!isModelDirty) {
                var rect = canvas.getBoundingClientRect();
                var x = evt.clientX - rect.left;
                var y = evt.clientY - rect.top;

                var indexArr = getIndexFromMousePosition(x, y); //x[0], y[1];
                indexArr[1] = 0;

                if(gridModel[indexArr[1]][indexArr[0]] == 0) {
                    currentTokenPositionInGrid = indexArr;
                    currentPlayer = switchPlayer(currentPlayer);
                    gridModel[indexArr[1]][indexArr[0]] = currentPlayer;
                }
            }

        }, false);

        function animate() {
            context.clearRect(0, 0, canvas.width, canvas.height);

            drawGrid()
            drawTokens();

            checkAnimation();
        }

        function getNextLineValue(x, y) {
            return gridModel[y+1][x];
        }


        function checkAnimation() {
            if(currentTokenPositionInGrid != undefined) {
                check(currentTokenPositionInGrid[0], currentTokenPositionInGrid[1]);
                if(currentTokenPositionInGrid[1] + 1 <= nbLine)
                    currentTokenPositionInGrid[1] = currentTokenPositionInGrid[1] + 1;
            }
        }

        function check(x, y) {
            console.log("x="+x + ", y="+y);
            if(y+1 >= nbLine) {
                isModelDirty = false;
                return;
            }

            var nextLineValue = getNextLineValue(x, y);
            if(nextLineValue == 0) {
                isModelDirty = true;
                gridModel[y][x] = 0;
                gridModel[y+1][x] = currentPlayer;
            }
        }


        function drawToken(x, y, radius, indexX, indexY) {
            context.beginPath();

            var currentValue = gridModel[indexY][indexX];

            if(currentValue == 0){
                context.fillStyle = "#ffffff";
            } else if(currentValue == 1) {
                context.fillStyle = "#ff0000";
            } else if(currentValue == 2) {
                context.fillStyle = "#ffff00";
            }
            context.arc(x, y, radius, 0, 2*Math.PI, false);
            context.fill();
        }

        function drawTokens() {

            for(var y = 0; y<nbLine; y++) {
                for(var x=0; x<nbColumn;x++) {
                    drawToken(gap+radius+x*diam, gap+radius+y*diam, radius, x, y);
                }
            }
        }

        function drawGrid() {

            context.beginPath();
            context.fillStyle = "#0000ff";
            context.fillRect(0, 0, gridWidth, gridHeight);
        }

        function getIndexFromMousePosition(x, y) {
            var index = [];

            index[0] = Math.floor(x / gridRatio);
            index[1] = Math.floor(y / gridRatio);

            return index;
        }
    }]
);

function switchPlayer(currentPlayer) {
    return currentPlayer == Game.PLAYER_1 ? Game.PLAYER_2 : Game.PLAYER_1;
}