import { sample } from "lodash";
import { NumberUtil } from "../../util/NumberUtil";
import { HIGHER_LOWER_INIT_PHRASE, HIGHER_LOWER_CORRECT_CONTINUE, HIGHER_LOWER_WRONG_LOSE, HIGHER_LOWER_WTF_PHRASE } from "../../answers/game/HigherLower";

class HigherLowerService {

    numberUtil = new NumberUtil();
    lastPick;
    totalCorrectInRow;

    init() {
        console.log("init higher lower");

        this.lastPick = this.numberUtil.generateRandom(1, 100);
        this.totalCorrectInRow = 0;

        let higherLower = { 
            "%number%": this.lastPick,
        }

        return sample(HIGHER_LOWER_INIT_PHRASE).replace(/%\w+%/g, function(all) {
            return higherLower[all] || all;
        });
    }

    play(playerInput) {
        console.log("play higher lower");

        if (playerInput === "higher lower") {
            return this.init();
        }

        let maggiePick;
        do {
            maggiePick = this.numberUtil.generateRandom(1, 100);
        } while (maggiePick === this.lastPick);

        let response;

        if (this.playerWon(playerInput, maggiePick)) {
            this.totalCorrectInRow++;
            this.lastPick = maggiePick;  
            response = this.respond(sample(HIGHER_LOWER_CORRECT_CONTINUE))  
        } else if (this.playerLost(playerInput, maggiePick)) {
            response = this.respond(sample(HIGHER_LOWER_WRONG_LOSE))
            this.totalCorrectInRow = 0;
            this.lastPick = 0;
        } else {
            response = this.respond(sample(HIGHER_LOWER_WTF_PHRASE));
        }

        console.log(response);
        return response;
    }

    respond(response) {
        let higherLower = { 
            "%number%": this.lastPick,
            "%totalCorrectInRow%": this.totalCorrectInRow
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

    gameHasEnded() {
        return this.totalCorrectInRow === 0 && this.lastPick === 0;
    }

    end(user) {
        console.log("higherlower with ", user, " ended");
    }
}

export { HigherLowerService };

