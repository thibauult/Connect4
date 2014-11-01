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
        this.nbRounds = 1;
});