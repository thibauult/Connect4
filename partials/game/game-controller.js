/**
 * Created by tibus on 31/10/14.
 */

var Game = {};

Game.PLAYER_1 = 1;
Game.PLAYER_2 = 2;

Game.DEBUG = false;

c4Controllers.controller('GameCtrl', ['$scope', '$routeParams', '$interval', 'GameManager',
function ($scope, $routeParams, $interval, GameManager) {

    // init $scope
    $scope.player1 = {
        name : $routeParams.player1,
        score : 0
    };
    $scope.player2 = {
        name : $routeParams.player2,
        score : 0
    };

    // init GameManager
    GameManager.nbRounds = $routeParams.totalRounds;
    GameManager.currentPlayer = GameManager.PLAYER_1;


    var gridX = $routeParams.gridX;
    var gridY = $routeParams.gridY;

    var gridModel = createGridModel(gridX, gridY);

    var ratio = 100;
    var gap = 10;

    var width  = gridY * ratio;
    var height = gridX * ratio;

    var diam = width / gridY;
    var radius = diam / 2 - gap;

    var currentTokenPositionInGrid;
    var isModelDirty = false;

    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    canvas.width = width;
    canvas.height = height;
    context.globalAlpha = 1.0;
    canvas.addEventListener(GameManager.CLICK_EVENT_TYPE, onClick, false);
    $interval(animate, 100); // initialize rendering loop

    //
    // ON CLICK CALLBACK
    //
    function onClick(evt) {

        if(!isModelDirty) {

            var mousePos = getMouseClickPosition(canvas, evt);

            console.log(mousePos);

            processAnimation(mousePos.x, mousePos.y);
        }
    }

    function getMouseClickPosition(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x : evt.clientX - rect.left,
            y : evt.clientY - rect.top
        };
    }

    function processAnimation(clickX, clickY) {

        var rect = canvas.getBoundingClientRect();
        var x = clickX - rect.left;
        var y = clickY - rect.top;

        var indexArr = getIndexFromMousePosition(x, y, ratio); //x[0], y[1];
        indexArr[1] = GameManager.NONE;

        if(gridModel[indexArr[1]][indexArr[0]] == GameManager.NONE) {
            currentTokenPositionInGrid = indexArr;
            GameManager.switchCurrentPlayer();
            gridModel[indexArr[1]][indexArr[0]] = GameManager.currentPlayer;
        }
    }

    //
    // RENDERING LOOP
    //
    function animate() {

        context.clearRect(0, 0, canvas.width, canvas.height);

        drawGrid(context, width, height);
        drawTokens(context, gridModel, gridX, gridY, gap, radius, diam);

        renderAnimation();
    }

    function renderAnimation() {
        if(currentTokenPositionInGrid != undefined) {

            check(currentTokenPositionInGrid[0], currentTokenPositionInGrid[1]);

            if(currentTokenPositionInGrid[1] + 1 <= gridX) {
                currentTokenPositionInGrid[1]++;
            }
        }
    }

    function check(x, y) {

        if((y + 1) >= gridX) {
            isModelDirty = false;
            return;
        }

        var nextLineValue = gridModel[y+1][x];
        if(nextLineValue == 0) {
            isModelDirty = true;
            gridModel[y][x] = 0;
            gridModel[y+1][x] = GameManager.currentPlayer;
        }
    }

}]);

function createGridModel(nbLine, nbColumn) {

    var gridModel = new Array(nbLine);

    for (var i = 0; i < nbLine; i++) {
        gridModel[i] = new Array(nbColumn);
    }

    for(var y = 0; y<nbLine; y++) {
        for (var x = 0; x < nbColumn; x++) {
            gridModel[y][x] = 0;
        }
    }

    return gridModel;
}

function drawGrid(context, gridWidth, gridHeight) {

    context.beginPath();
    context.fillStyle = "#0000ff";
    context.fillRect(0, 0, gridWidth, gridHeight);
}

function drawTokens(context, gridModel, gridX, gridY, gap, radius, diam) {

    for(var y = 0; y<gridX; y++) {
        for(var x=0; x<gridY;x++) {
            drawToken(context, gridModel, gap + radius + (x * diam), gap + radius + (y * diam), radius, x, y);
        }
    }
}

function drawToken(context, gridModel, x, y, radius, indexX, indexY) {
    context.beginPath();

    var currentValue = gridModel[indexY][indexX];

    if(currentValue == 0){
        context.fillStyle = "#ffffff";
    } else if(currentValue == 1) {
        context.fillStyle = "#ff0000";
    } else if(currentValue == 2) {
        context.fillStyle = "#ffff00";
    }
    context.arc(x, y, radius, 0, (2 * Math.PI), false);
    context.fill();
}

function getIndexFromMousePosition(x, y, ratio) {
    var index = [];

    index[0] = Math.floor(x / ratio);
    index[1] = Math.floor(y / ratio);

    return index;
}