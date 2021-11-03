import { TagService } from "./../user/TagService";
import { UserService } from "../user/UserService";
import { BladSteenSchaarService } from "./BladSteenSchaarService";
import { HigherLowerService } from "./HigherLowerService";
import { PestService } from "./PestService";

const currentRunningGames = new Map();

class BaseGameService {
    tagService;
    userService;

    constructor(platform) {
        this.tagService = new TagService(platform);
        this.userService = new UserService();
    }

    initGame(textInput, user) {
        if (!currentRunningGames.has(user)) {
            let initUserObject = this.userService.getUserById(user);
            let initPlayerTag = this.tagService.tagUser(initUserObject);
            let players = [initPlayerTag];
            // Gameservice needs init() method
            if (textInput === "rps") {
                currentRunningGames.set(initPlayerTag, new BladSteenSchaarService(players));
            } else if (textInput.substr(0, 12) === "higher lower") {
                this.userService.extractUsersFromText(textInput).forEach(user => {
                    players.push(this.tagService.tagUser(user));
                })
                this.shufflePlayers(players);
                currentRunningGames.set(initPlayerTag, new HigherLowerService(players));
            } else if(textInput === "pest") {
                this.userService.extractUsersFromText(textInput).forEach(user => {
                    players.push(this.tagService.tagUser(user));
                });
                this.shufflePlayers(players);
                currentRunningGames.set(initPlayerTag, new PestService(players));
            }
        }
    }

    playGame(textInput, user) {
        let playerObject = this.userService.getUserById(user);
        let playerTag = this.tagService.tagUser(playerObject);
        // Gameservice needs play() method
        if (currentRunningGames.has(playerTag) && !currentRunningGames.get(playerTag).gameHasEnded()) {
            let game = currentRunningGames.get(playerTag);
            let init = false;
            if (textInput === "rps") {
                init = true;
            } else if (textInput.substr(0, 12) === "higher lower") {
                init = true;
            } else if(textInput === "pest") {
                init = true;
            }

            let response = game.play(textInput, init);

            // Gameservice needs gameHasEnded() method
            currentRunningGames.delete(playerTag);
            if (!game.gameHasEnded()) {
                console.log("setting next player in game on", game.getNextPlayerTag());
                currentRunningGames.set(game.getNextPlayerTag(), game);
            }
            return response;
        }
    }

    shufflePlayers(players) {
        for (let i = players.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [players[i], players[j]] = [players[j], players[i]];
        }
    }
}

export { BaseGameService };