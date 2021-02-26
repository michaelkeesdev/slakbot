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

    if (nameRoll < 5) {
      return user.tagName;
    }

    if (nameRoll == 5 || nameRoll == 6) {
      return user.shortNames[Math.floor(Math.random() * user.shortNames.length)];
    }

    if (nameRoll == 7) {
      return user.lastName;
    }

    if (nameRoll == 8 || nameRoll == 9) {
      return user.firstName.concat(" ").concat(user.lastName);
    }

    return sample(USERS);
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

export { UserService };
