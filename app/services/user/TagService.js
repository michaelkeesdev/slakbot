import { UserService } from "./UserService";
import { StringBuilder } from './../../util/StringBuilder';
import { BASIC_COMMAND } from './../../answers/basic/BasicCommand';
import { SCHELD_PHRASE, SCHELD_SUFFIX, SCHELD } from "../../answers/basic/Scheld";
import { ADJECTIVES } from "../../answers/words/Adjectives";

import { sample } from "lodash";

class TagService {

    platform = "";
    userService = new UserService();

    constructor(platform) {
        this.platform = platform;
    }

    tagUserAndAddTextCommand(text) {
        let responseBuilder = new StringBuilder();

        let users = this.userService.extractUsersFromText(text);

        if (users.length > 0) {

            responseBuilder.append(this.tagUsers(users));

            let alreadyMatched = false;
            BASIC_COMMAND.forEach(command => {
                if (text.split(` ${command} `).length > 1 && !alreadyMatched) {
                    alreadyMatched = true;
                    return responseBuilder.append(text.split(` ${command} `)[1]).toString();
                }
            });
    
        } else {
            responseBuilder.append("wie?");
        }

        return responseBuilder.toString();

    }

    tagUserAndScheld(text) {
        let responseBuilder = new StringBuilder();

        let users = this.userService.extractUsersFromText(text);

        let scheldParts = { 
            "%adjective%": sample(ADJECTIVES), 
            "%scheld%": sample(SCHELD),
            "%suffix%": sample(SCHELD_SUFFIX)
        }

        let scheld = sample(SCHELD_PHRASE).replace(/%\w+%/g, function(all) {
            return scheldParts[all] || all;
        });

        if (users.length > 0) {
            responseBuilder.append(this.tagUsers(users) + scheld);    
        } else {
            responseBuilder.append("wie?");
        }

        return responseBuilder.toString();

    }

    tagUsers(users) {
        let responseBuilder = new StringBuilder();

        users.forEach(user => {
            responseBuilder.append(this.tagUser(user)).append(" ");
        });

        return responseBuilder.toString();
    }

    tagUser(user) {    
        if (this.platform === "slack") {
            return `<@${user.id}>`;
        } else {
            return `<@${user.discordId}>`;
        }
    }

    tagEveryone() {
        if (this.platform == "discord") {
            return "Hup @everyone";
        } else {
            return "Hup <!channel>";
        }
    }
}

export { TagService };
