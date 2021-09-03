import { BladSteenSchaarService } from "./BladSteenSchaarService";
import { HigherLowerService } from "./HigherLowerService";

const currentRunningGames = new Map();

class BaseGameService {
    initGame = async (textInput, user) => {
        if (!currentRunningGames.has(user)) {
            // Gameservice needs init() method
            if (textInput === "rps") {
                console.log("Create rps for ", user, "text input was", textInput);
                currentRunningGames.set(user, new BladSteenSchaarService());
            } else if (textInput === "higher lower") {
                console.log("Create higher lower for ", user, "text input was", textInput);
                currentRunningGames.set(user, new HigherLowerService());
            }
        }
    }

    playGame = async (textInput, user) => {
        // Gameservice needs play() method
        console.log("PLAY GAMES request text=", textInput, " user=", user);
        if (currentRunningGames.has(user) && !currentRunningGames.get(user).gameHasEnded()) {
            let response = currentRunningGames.get(user).play(textInput);

            // Gameservice needs gameHasEnded() and end() methods
            if (currentRunningGames.get(user).gameHasEnded()) {
                currentRunningGames.get(user).end(user);
                currentRunningGames.delete(user);
            }
            return response;
        }
    }
}

export { BaseGameService };