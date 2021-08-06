import { UserService } from "./UserService";
import { StringBuilder } from './../../util/StringBuilder';
import { BASIC_COMMAND } from './../../answers/basic/BasicCommand';
import { SCHELD } from "../../answers/basic/Scheld";
import { sample } from "lodash";

class TagService {

    userService = new UserService();

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

        if (users.length > 0) {
            responseBuilder.append(this.tagUsers(users) + sample(SCHELD));    
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
        return `<@${user.id}>`;
    }
}

export { TagService };
