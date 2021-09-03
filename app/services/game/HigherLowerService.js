import { sample } from "lodash";
import { NumberUtil } from "../../util/NumberUtil";
import { UserService } from "./../user/UserService";
import { HIGHER_LOWER_INIT_PHRASE, HIGHER_LOWER_CORRECT_CONTINUE, HIGHER_LOWER_WRONG_LOSE, HIGHER_LOWER_WTF_PHRASE } from "../../answers/game/HigherLower";


class HigherLowerService {
    numberUtil = new NumberUtil();
    userService = new UserService();

    lastPick;
    totalCorrectInRow;

    init(user) {
        console.log("init higher lower");

        this.lastPick = this.numberUtil.generateRandom(1, 100);
        this.totalCorrectInRow = 0;
        let userObject = this.userService.getById(user);

        let higherLower = { 
            "%number%": this.lastPick,
            "%shortName%": sample(userObject.shortNames)
        }

        return sample(HIGHER_LOWER_INIT_PHRASE).replace(/%\w+%/g, function(all) {
            return higherLower[all] || all;
        });
    }

    play(playerInput, user) {
        console.log("play higher lower");

        if (playerInput === "higher lower") {
            return this.init(user);
        }

        let maggiePick;
        do {
            maggiePick = this.numberUtil.generateRandom(1, 100);
        } while (maggiePick === this.lastPick);

        let response;

        if (this.playerWon(playerInput, maggiePick)) {
            this.totalCorrectInRow++;
            this.lastPick = maggiePick;  
            response = this.respond(sample(HIGHER_LOWER_CORRECT_CONTINUE), user)  
        } else if (this.playerLost(playerInput, maggiePick)) {
            response = this.respond(sample(HIGHER_LOWER_WRONG_LOSE), user)
            this.totalCorrectInRow = 0;
            this.lastPick = 0;
        } else {
            response = this.respond(sample(HIGHER_LOWER_WTF_PHRASE), user);
        }

        console.log(response);
        return response;
    }

    respond(response, user) {
        let userObject = this.userService.getById(user);
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

