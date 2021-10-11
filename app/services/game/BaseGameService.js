import { TagService } from "./../user/TagService";
import { UserService } from "../user/UserService";
import { BladSteenSchaarService } from "./BladSteenSchaarService";
import { HigherLowerService } from "./HigherLowerService";

const currentRunningGames = new Map();

class BaseGameService {
    tagService = new TagService();
    userService = new UserService();

    initGame(textInput, user) {
        if (!currentRunningGames.has(user)) {
            let initPlayerTag = this.getPlayerTag(user);
            let players = [initPlayerTag];
            // Gameservice needs init() method
            if (textInput === "rps") {
                currentRunningGames.set(initPlayerTag, new BladSteenSchaarService(players));
            } else if (textInput.substr(0, 12) === "higher lower") {
                this.userService.extractUsersFromText(textInput).forEach(user => {
                    players.push(this.getPlayerTag(user.discordId));
                })
                this.shufflePlayers(players);
                currentRunningGames.set(initPlayerTag, new HigherLowerService(players));
            }
        }
    }

    playGame(textInput, user) {
        let playerTag = this.getPlayerTag(user);

        // Gameservice needs play() method
        if (currentRunningGames.has(playerTag) && !currentRunningGames.get(playerTag).gameHasEnded()) {
            let game = currentRunningGames.get(playerTag);
            let init = false;
            if (textInput === "rps") {
                init = true;
            } else if (textInput.substr(0, 12) === "higher lower") {
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

    getPlayerTag(user) {
        console.log("player tag", user);
        return `<@${user}>`;
    }

    shufflePlayers(players) {
        for (let i = players.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [players[i], players[j]] = [players[j], players[i]];
        }
    }
}

export { BaseGameService };