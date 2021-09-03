import { sample } from "lodash";
import { NumberUtil } from "../../util/NumberUtil";
import { HIGHER_LOWER_INIT_PHRASE, HIGHER_LOWER_CORRECT_CONTINUE, HIGHER_LOWER_WRONG_LOSE, HIGHER_LOWER_WTF_PHRASE } from "../../answers/game/HigherLower";


class HigherLowerService {
    numberUtil = new NumberUtil();

    lastPick;
    totalCorrectInRow;

    currentPlayerTag;
    nextPlayerTag;

    nextPlayerIndex = 0;
    players;

    constructor(players) {
        this.players = players;
        this.nextPlayerTag = players[0];
    }

    init() {
        this.lastPick = this.numberUtil.generateRandom(1, 100);
        this.totalCorrectInRow = 0;

        let higherLower = { 
            "%number%": this.lastPick,
            "%nextPlayerTag%": this.getNextPlayerTag()
        }

        return sample(HIGHER_LOWER_INIT_PHRASE).replace(/%\w+%/g, function(all) {
            return higherLower[all] || all;
        });
    }

    play(playerInput, init) {
        if (init) {
            return this.init();
        }

        // Prepare current turn
        this.setCurrentPlayerTag(this.nextPlayerTag);
        console.log("set current player to ", this.nextPlayerTag);
        if (this.players.length -1 > this.nextPlayerIndex) {
            this.nextPlayerIndex++;
        } else {
            this.nextPlayerIndex = 0;
        }
        console.log("set next player to ", this.players[this.nextPlayerIndex]);
        this.setNextPlayerTag(this.players[this.nextPlayerIndex]);
        
        // Game
        let maggiePick;
        do {
            maggiePick = this.numberUtil.generateRandom(1, 100);
        } while (maggiePick === this.lastPick);

        let response;
        console.log("Maggie picked ", maggiePick, "for ", this.getCurrentPlayerTag(),".", this.getCurrentPlayerTag(), "said ", playerInput,".");

        if (this.playerWon(playerInput, maggiePick)) {
            console.log(this.getCurrentPlayerTag(), "wins");
            this.totalCorrectInRow++;
            this.lastPick = maggiePick;
            response = this.respond(sample(HIGHER_LOWER_CORRECT_CONTINUE))  
        } else if (this.playerLost(playerInput, maggiePick)) {
            console.log(this.getCurrentPlayerTag(), "loses");
            this.totalCorrectInRow = 0;
            this.lastPick = maggiePick;
            response = this.respond(sample(HIGHER_LOWER_WRONG_LOSE))
            this.lastPick = 0;
        } else {
            response = this.respond(sample(HIGHER_LOWER_WTF_PHRASE));
        }

        return response;
    }

    respond(response) {
        let higherLower = { 
            "%number%": this.lastPick,
            "%totalCorrectInRow%": this.totalCorrectInRow,
            "%currentPlayerTag%": this.getCurrentPlayerTag(),
            "%nextPlayerTag%": this.getNextPlayerTag()
        }
        return response.replace(/%\w+%/g, function(all) {
            return higherLower[all] || all;
        });
    }

    playerWon(playerInput, maggiePick) {
        return (playerInput.includes("hoger") || playerInput.includes("higher")) && maggiePick > this.lastPick
         || (playerInput.includes("lager") || playerInput.includes("lower")) && maggiePick < this.lastPick;
    }

    playerLost(playerInput, maggiePick) {
        return (playerInput.includes("hoger") || playerInput.includes("higher")) && maggiePick < this.lastPick 
        || (playerInput.includes("lager") || playerInput.includes("lower")) && maggiePick > this.lastPick;
    }

    getPlayer1Tag() {
        return this.player1Tag;
    }

    setNextPlayerTag(nextPlayerTag) {
        this.nextPlayerTag = nextPlayerTag;
    }

    setCurrentPlayerTag(currentPlayerTag) {
        this.currentPlayerTag = currentPlayerTag;
    }

    getNextPlayerTag() {
        return this.nextPlayerTag;
    }

    getCurrentPlayerTag() {
        return this.currentPlayerTag;
    }

    gameHasEnded() {
        return this.totalCorrectInRow === 0 && this.lastPick === 0;
    }
}

export { HigherLowerService };

