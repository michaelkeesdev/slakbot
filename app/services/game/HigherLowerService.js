import { sample } from "lodash";
import { NumberUtil } from "../../util/NumberUtil";
import { HIGHER_LOWER_INIT_PHRASE, HIGHER_LOWER_CORRECT_CONTINUE, HIGHER_LOWER_WRONG_LOSE, HIGHER_LOWER_WTF_PHRASE } from "../../answers/game/HigherLower";

class HigherLowerService {

    numberUtil = new NumberUtil();
    lastPick;
    totalCorrectInRow;
    gameLost;

    init() {
        this.lastPick = null;
        this.totalCorrectInRow = 0;
        this.gameLost = false;

        let firstPick = this.numberUtil.generateRandom(1, 100);
        this.lastPick = firstPick;

        let higherLower = { 
            "%number%": firstPick,
        }

        return sample(HIGHER_LOWER_INIT_PHRASE).replace(/%\w+%/g, function(all) {
            return higherLower[all] || all;
        });
    }

    play(playerInput) {
        if (this.lastPick === 0) {
            return this.init();
        }

        let maggiePick;
        do {
            maggiePick = this.numberUtil.generateRandom(1, 100);
        } while (maggiePick === this.lastPick);

        console.log("player said", playerInput);
        console.log("maggie picks", maggiePick);
        console.log("last number was", this.lastPick);

        let response;

        if (this.isWinForPlayer(playerInput, maggiePick)) {
            response = sample(HIGHER_LOWER_CORRECT_CONTINUE);
            this.totalCorrectInRow++;
            this.lastPick = maggiePick;    
            this.gameLost = false;
        } else if (this.isLossForPlayer(playerInput, maggiePick)) {
            response = sample(HIGHER_LOWER_WRONG_LOSE)
            this.gameLost = true;
        } else {
            response = sample(HIGHER_LOWER_WTF_PHRASE);
            this.gameLost = true;
        }

        let higherLower = { 
            "%number%": maggiePick,
            "%totalCorrectInRow%": this.totalCorrectInRow
        }
        
        if (this.gameLost) {
            this.totalCorrectInRow = 0;
            this.lastPick = 0;
        }

        console.log(response.replace(/%\w+%/g, function(all) {
            return higherLower[all] || all;
        }));

        return response.replace(/%\w+%/g, function(all) {
            return higherLower[all] || all;
        });
    }


    isWinForPlayer(playerInput, maggiePick) {
        return (playerInput.includes("hoger") || playerInput.includes("higher")) && maggiePick > this.lastPick
         || (playerInput.includes("lager") || playerInput.includes("lower")) && maggiePick < this.lastPick;
    }

    isLossForPlayer(playerInput, maggiePick) {
        return (playerInput.includes("hoger") || playerInput.includes("higher")) && maggiePick < this.lastPick 
        || (playerInput.includes("lager") || playerInput.includes("lower")) && maggiePick > this.lastPick;
    }
}

export { HigherLowerService };

