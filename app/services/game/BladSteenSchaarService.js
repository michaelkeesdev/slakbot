import { sample } from "lodash";
import { BLAD_STEEN_SCHAAR, BLAD_STEEN_SCHAAR_EQUAL_PHRASE, BLAD_STEEN_SCHAAR_INIT_PHRASE, BLAD_STEEN_SCHAAR_MAGGIE_WIN_PHRASE, BLAD_STEEN_SCHAAR_MAGGIE_LOSS_PHRASE, BLAD_STEEN_SCHAAR_WTF_PHRASE } from "../../answers/game/BladSteenSchaar";

class BladSteenSchaarService {
    init() {
        return sample(BLAD_STEEN_SCHAAR_INIT_PHRASE);
    }

    play(playerInput) {
        let maggiePick = sample(BLAD_STEEN_SCHAAR);
        let response;

        if (this.isEqual(playerInput, maggiePick)) {
            response = sample(BLAD_STEEN_SCHAAR_EQUAL_PHRASE);
        } else if (this.isWinForMaggie(playerInput, maggiePick)) {
            response = sample(BLAD_STEEN_SCHAAR_MAGGIE_WIN_PHRASE);
        } else if (this.isLossForMaggie(playerInput, maggiePick)) {
            response = sample(BLAD_STEEN_SCHAAR_MAGGIE_LOSS_PHRASE)
        } else {
            response = sample(BLAD_STEEN_SCHAAR_WTF_PHRASE);
        }
        
        let bladsteenschaar = { 
            "%bladsteenschaar%": maggiePick
        }

        return response.replace(/%\w+%/g, function(all) {
            return bladsteenschaar[all] || all;
        });
    }

    isEqual(playerInput, maggiePick) {
        return playerInput.includes("blad") && maggiePick === "blad"
        || playerInput.includes("steen") && maggiePick === "steen"
        || playerInput.includes("schaar") && maggiePick === "schaar";
    }

    isWinForMaggie(playerInput, maggiePick) {
        return playerInput.includes("blad") && maggiePick === "schaar"
        || playerInput.includes("steen") && maggiePick === "blad"
        || playerInput.includes("schaar") && maggiePick === "steen";
    }

    isLossForMaggie(playerInput, maggiePick) {
        return playerInput.includes("blad") && maggiePick === "steen"
        || playerInput.includes("steen") && maggiePick === "schaar"
        || playerInput.includes("schaar") && maggiePick === "blad";
    }
}

export { BladSteenSchaarService };

