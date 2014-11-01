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

        this.gridX = 7;
        this.gridY = 6;

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

        this.reset = function() {
            for(var x = 0; x < this.gridX; x++) {
                for (var y = 0; y < this.gridY; y++) {
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
         * Check if someone won the round
         *
         * @return 1 if Player 1 win, 2 if Player 2 win, 0 otherwise
         */
        this.checkWinner = function() {

            var winner = this.NONE;

            if(checkAlignment(this.PLAYER_1, this.grid, this.gridX, this.gridY)) {
                this.player1Score++;
                winner = this.PLAYER_1;
            }

            if(winner == this.NONE && checkAlignment(this.PLAYER_2, this.grid, this.gridX, this.gridY)) {
                this.player2Score++;
                winner = this.PLAYER_2;
            }

            if(winner != this.NONE) {
                this.rounds++;
            }

            return winner;
        }

        function checkAlignment(player, grid, gridX, gridY) {

            // check horizontal alignment
            for(var y = 0; y < gridY; y++) {
                for(var x = 0; x < gridX; x++) {

                    if(grid[x + 3] != undefined) {
                        if( grid[x + 0][y] == player &&
                            grid[x + 1][y] == player &&
                            grid[x + 2][y] == player &&
                            grid[x + 3][y] == player) {
                            return player;
                        }
                    }
                }
            }

            // check vertical alignment
            for(var x = 0; x < gridX; x++) {
                for(var y = 0; y < gridY; y++) {

                    if(grid[x][y + 3] != undefined) {
                        if( grid[x][y + 0] == player &&
                            grid[x][y + 1] == player &&
                            grid[x][y + 2] == player &&
                            grid[x][y + 3] == player) {
                            return player;
                        }
                    }
                }
            }

            // check top left to bottom right diagonal (should be optimized !!)
            for(var x = 0; x < gridX; x++) {
                for (var y = 0; y < gridY; y++) {

                    if(grid[x + 3] != undefined && grid[x][y + 3] != undefined) {
                        if( grid[x + 0][y + 0] == player &&
                            grid[x + 1][y + 1] == player &&
                            grid[x + 2][y + 2] == player &&
                            grid[x + 3][y + 3] == player) {
                            return player;
                        }
                    }
                }
            }

            // check top right to bottom left diagonal (should be optimized !!)
            for(var x = gridX - 1; x >= 0; x--) {
                for (var y = 0; y < gridY; y++) {

                    if(grid[x - 3] != undefined && grid[x][y + 3] != undefined) {
                        if( grid[x - 0][y + 0] == player &&
                            grid[x - 1][y + 1] == player &&
                            grid[x - 2][y + 2] == player &&
                            grid[x - 3][y + 3] == player) {
                            return player;
                        }
                    }
                }
            }
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