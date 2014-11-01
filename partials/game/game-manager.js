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

            // horizontal alignment
            for(var y = 0; y < this.gridY; y--) {
                for(var x = 0; x < this.gridX; x++) {

                    if( grid[x][y] == player &&
                        grid[x + 1][y] == player &&
                        grid[x + 2][y] == player &&
                        grid[x + 3][y] == player) {

                        return true;
                    }
                }
            }
        }
});