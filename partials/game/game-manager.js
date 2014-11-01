/**
 * Created by tibus on 01/11/14.
 */
angular.module('c4GameManager', [])
.service('GameManager', function() {

        //
        // CONST
        //
        this.NONE = 0;
        this.PLAYER_1 = 1;
        this.PLAYER_2 = 2;

        this.CLICK_EVENT_TYPE = 'mousedown';

        //
        // ATTRIBUTES
        //
        this.grid;

        this.gridX;
        this.gridY;

        this.player1Score = 0;
        this.player2Score = 0;
        this.currentPlayer = this.PLAYER_1;

        this.totalRounds = 1;
        this.rounds = 0;

        //
        // METHODS
        //
        /**
         * Init the GameManager
         *
         * @param gridX Columns
         * @param gridY Lines
         */
        this.init = function(gridX, gridY, totalRounds) {

            this.gridX = gridX;
            this.gridY = gridY;
            this.totalRounds = totalRounds;

            this.grid = new Array(gridX);
            for (var x = 0; x < gridX; x++) {
                this.grid[x] = new Array(gridY);
                for (var y = 0; y < gridY; y++) {
                    this.grid[x][y] = this.NONE;
                }
            }
        }

        /**
         * Switch the current player
         */
        this.switchCurrentPlayer = function() {
            this.currentPlayer = this.currentPlayer == this.PLAYER_1 ?
                    this.PLAYER_2 :
                    this.PLAYER_1;
        }

        /**
         * Check if someone has won the round
         *
         * @param gridModel Multi-dimensional array representing the game board
         * @return 1 if Player 1 win, 2 if Player 2 win, 0 otherwise
         */
        this.checkWinner = function(gridModel) {

            var winner = this.NONE;

            if(checkAlignment(this.PLAYER_1, gridModel, this.gridX, this.gridY)) {
                this.player1Score++;
                winner = this.PLAYER_1;
            }

            if(checkAlignment(this.PLAYER_2, gridModel, this.gridX, this.gridY)) {
                this.player2Score++;
                winner = this.PLAYER_2;
            }

            if(winner != this.NONE) {
                this.rounds++;
            }

            return winner;
        }

        function checkAlignment(player, grid, gridX, gridY) {

        }

        /**
         *
         * @param type
         * @return {string}
         */
        this.getColor = function(type) {

            var color = "#FFFFFF";

            if(type == this.PLAYER_1) {
                color = "#FF0000";
            } else if(type == this.PLAYER_2) {
                color = "#FFFF00";
            }

            return color;
        }
});