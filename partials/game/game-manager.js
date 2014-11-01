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
        this.checkRules = function(gridModel) {

        }
});