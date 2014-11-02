/**
 * Created by tibus on 31/10/14.
 */

var Game = {};

Game.PLAYER_1 = 1;
Game.PLAYER_2 = 2;

Game.DEBUG = false;

c4Controllers.controller('GameCtrl', ['$scope', '$routeParams', '$interval', '$window', '$location', 'GameManager', 'UiService',
function ($scope, $routeParams, $interval, $window, $location, GameManager, UiService) {

    //
    // INIT SECTION
    //

    // init GameManager from the route params
    GameManager.init($routeParams.gridX, $routeParams.gridY, $routeParams.nbRounds);

    var isAnimating = false;
    var currentToken;

    var ratio = GameManager.computeRatio($window.innerWidth);

    var w = GameManager.gridX * ratio * 100;
    var h = GameManager.gridY * ratio * 100;

    // initialize canvas
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    canvas.width = w;
    canvas.height = h;
    context.globalAlpha = 1.0;

    // initialize click callback
    canvas.addEventListener(GameManager.CLICK_EVENT_TYPE, onClick, false);

    // initialize rendering loop (100 fps)
    $interval(animate, 100);

    var gapInPercent = 15;
    var diam = canvas.width / GameManager.gridX;
    var gap = diam/2 * (gapInPercent / 100);
    var radius = diam / 2 - gap;

    var drawContext = {
        context : context,
        canvas : canvas,
        grid : GameManager.grid,
        gridX : GameManager.gridX,
        gridY : GameManager.gridY,
        width: w,
        height: h
    };

    //
    // INIT SCOPE
    //
    $scope.player1 = { score: 0, pseudo: $routeParams.player1 };
    $scope.player2 = { score: 0, pseudo: $routeParams.player2 };
    $scope.message = 'Le joueur 1 a gagné !';
    $scope.progessBarWidth = 'width: ' + w + 'px';
    $scope.progess = GameManager.getProgression();
    $scope.progessStyle = 'width: ' + $scope.progess + '%;';

    //
    // ON CLICK CALLBACK
    //
    function onClick(evt) {

        if(!isAnimating) {
            startAnimation(evt.clientX);
        }
    }

    function startAnimation(clickX) {

        var rect = canvas.getBoundingClientRect();
        var x = Math.floor((clickX - rect.left) / (ratio * 100));
        var y = 0; // in all cases, animation starts by the top of the grid

        if(GameManager.grid[x][y] == GameManager.NONE) {
            currentToken = { x : x, y : y };
            isAnimating = true;
        }
    }

    //
    // RENDERING LOOP
    //
    function animate() {

        context.clearRect(0, 0, canvas.width, canvas.height);

        // first, draw the grid
        context.beginPath();
        context.fillStyle = "#0000ff";
        context.fillRect(0, 0, drawContext.width, drawContext.height);

        // draw tokens
        drawTokens(drawContext, gap, radius, diam);

        if(isAnimating) {
            renderAnimation();
        }
    }

    function renderAnimation() {

        if((currentToken.y - 1) >= 0) {
            GameManager.grid[currentToken.x][currentToken.y - 1] = GameManager.NONE;
        }

        GameManager.grid[currentToken.x][currentToken.y] = GameManager.currentPlayer;

        if((currentToken.y + 1) < GameManager.gridY && GameManager.grid[currentToken.x][currentToken.y + 1] == GameManager.NONE) {
            currentToken.y++;
        } else {
            isAnimating = false;
            progessGame();
        }
    }

    function drawTokens(drawContext, gap, radius, diam) {

        for(var x = 0; x < drawContext.gridX; x++) {
            for(var y = 0; y < drawContext.gridY; y++) {

                var type = drawContext.grid[x][y];
                var xPos = gap + radius + (x * diam);
                var yPos = gap + radius + (y * diam);

                drawToken(drawContext, GameManager.getColor(type), xPos, yPos);
            }
        }
    }

    function drawToken(drawContext, color, x, y) {

        drawContext.context.beginPath();
        drawContext.context.fillStyle = color;
        drawContext.context.arc(x, y, radius, 0, (2 * Math.PI), false);
        drawContext.context.fill();
    }

    //
    // PROGRESS GAME
    //
    function progessGame() {

        // First, check if there is a winner
        var winner = GameManager.checkWinner();
        if(winner != GameManager.NONE) {

            GameManager.reset();
            $scope.progess = GameManager.getProgression();
            $scope.progessStyle = 'width: ' + $scope.progess + '%;';
            $scope.player1.score = GameManager.player1Score;
            $scope.player2.score = GameManager.player2Score;

            if(GameManager.getProgression() >= 100) {

                $location.path(
                    UiService.buildRouteWithParams('final')
                );
            }
        }

        GameManager.switchCurrentPlayer();
    }
}]);