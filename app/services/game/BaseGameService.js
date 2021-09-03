import { BladSteenSchaarService } from "./BladSteenSchaarService";
import { HigherLowerService } from "./HigherLowerService";

const currentRunningGames = new Map();

class BaseGameService {
    initGame = async (textInput, user) => {
        if (!currentRunningGames.has(user)) {
            // Gameservice needs init() method
            if (textInput === "rps") {
                currentRunningGames.set(user, new BladSteenSchaarService());
            } else if (textInput === "higher lower") {
                currentRunningGames.set(user, new HigherLowerService());
            }
        }
    }

    playGame = async (textInput, user) => {
        // Gameservice needs play() method
        if (currentRunningGames.has(user) && !currentRunningGames.get(user).gameHasEnded()) {
            let response = currentRunningGames.get(user).play(textInput, user);

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