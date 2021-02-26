import { StringBuilder } from './../../util/StringBuilder';
import { BASIC_COMMAND } from './../../answers/basic/BasicCommand';
import { sample } from 'lodash';
import { USERS } from '../../answers/user/User';

class UserService {
  activeUser = "";

  getRandomUser() {
    return sample(USERS);
  }

  getRandomUserRandomName() {
    let user = this.getRandomUser();
    let nameRoll = Math.floor(Math.random() * 10);

    if (nameRoll < 6) {
      return user.tagName;
    }

    if (nameRoll > 5 && nameRoll < 8 ) {
      return user.shortNames[Math.floor(Math.random() * user.shortNames.length)];
    }

    if (nameRoll == 8) {
      return user.lastName;
    }

    if (nameRoll == 9) {
      return user.firstName.concat(" ").concat(user.lastName);
    }

    return sample(USERS);
  }

  extractUsersFromText(text) {
    if (text.includes("iedereen")) {
      return USERS;
    }
    return USERS.filter(user => this.textIncludesUser(text, user));
  }

  textIncludesUser(text, user) {
    return text.includes(user.id);
  }

  tagUser(text) {
    let responseBuilder = new StringBuilder();
    let users = this.extractUsersFromText(text)
    if (users.length > 0) {
      responseBuilder.append(users.map(user => `<@${user.id}>`).join(" "));

      let alreadyMatched = false; 
      BASIC_COMMAND.forEach(command => {
        if (text.split(` ${command} `).length > 1 && !alreadyMatched) {
            alreadyMatched = true;
            return responseBuilder.append(" ").append(text.split(` ${command} `)[1]).toString();
        }  else {
          return responseBuilder.toString();
        }
      });

    } else {
      responseBuilder.append("wie?");
    }

    return responseBuilder.toString();
  }
}

export { UserService };
