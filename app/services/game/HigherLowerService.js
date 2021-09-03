import { sample } from "lodash";
import { NumberUtil } from "../../util/NumberUtil";
import { UserService } from "./../user/UserService";
import { HIGHER_LOWER_INIT_PHRASE, HIGHER_LOWER_CORRECT_CONTINUE, HIGHER_LOWER_WRONG_LOSE, HIGHER_LOWER_WTF_PHRASE } from "../../answers/game/HigherLower";


class HigherLowerService {
    numberUtil = new NumberUtil();
    userService = new UserService();

    lastPick;
    totalCorrectInRow;

    init(userObject) {
        this.lastPick = this.numberUtil.generateRandom(1, 100);
        this.totalCorrectInRow = 0;

        let higherLower = { 
            "%number%": this.lastPick,
            "%shortName%": sample(userObject.shortNames)
        }

        return sample(HIGHER_LOWER_INIT_PHRASE).replace(/%\w+%/g, function(all) {
            return higherLower[all] || all;
        });
    }

    play(playerInput, user) {
        let userObject = this.userService.getById(user);

        if (playerInput === "higher lower") {
            return this.init(userObject);
        }

        let maggiePick;
        do {
            maggiePick = this.numberUtil.generateRandom(1, 100);
        } while (maggiePick === this.lastPick);

        let response;

        if (this.playerWon(playerInput, maggiePick, userObject)) {
            console.log("Maggie picked ", maggiePick, "for ", userObject.tagName,".", userObject.tagName, "said ", playerInput,".", userObject.tagName, "wins");
            this.totalCorrectInRow++;
            this.lastPick = maggiePick;
            response = this.respond(sample(HIGHER_LOWER_CORRECT_CONTINUE), userObject)  
        } else if (this.playerLost(playerInput, maggiePick, userObject)) {
            console.log("Maggie picked ", maggiePick, "for ", userObject.tagName,".", userObject.tagName, "said ", playerInput,".", userObject.tagName, "loses");
            this.totalCorrectInRow = 0;
            this.lastPick = maggiePick;
            response = this.respond(sample(HIGHER_LOWER_WRONG_LOSE), userObject)
            this.lastPick = 0;
        } else {
            response = this.respond(sample(HIGHER_LOWER_WTF_PHRASE), userObject);
        }

        return response;
    }

    respond(response, userObject) {
        let higherLower = { 
            "%number%": this.lastPick,
            "%totalCorrectInRow%": this.totalCorrectInRow,
            "%shortName%": sample(userObject.shortNames)
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

