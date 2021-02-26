import { StringBuilder } from './../../util/StringBuilder';
import { BASIC_COMMAND } from './../../answers/basic/BasicCommand';
import { sample } from 'lodash';
import { USERS } from '../../answers/user/User';

class TagService {

    tagUserAndAddTextCommand(text) {
        let responseBuilder = new StringBuilder();

        let users = extractUsersFromText(text);

        if (user.length > 0) {
            responseBuilder.append(this.tagUsers(users));

            let alreadyMatched = false;
            BASIC_COMMAND.forEach(command => {
                if (text.split(` ${command} `).length > 1 && !alreadyMatched) {
                    alreadyMatched = true;
                    return responseBuilder.append(" ").append(text.split(` ${command} `)[1]).toString();
                }
            });
    
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

    extractUsersFromText(text) {
        if (text.includes("iedereen")) {
            return USERS;
        }
        return USERS.filter(user => this.textIncludesUserTag(text, user));
    }

    textIncludesUserTag(text, user) {
        return text.includes(user.id);
    }
}

export { TagService };
