import { sample } from 'lodash';
import { USERS, USERS_EXTRA } from '../../answers/user/User';

class UserService {
  activeUser = "";

  getRandomUser() {
    let nameRoll = Math.floor(Math.random() * 10);

    if (nameRoll < 8) {
      return sample(USERS);
    } else if (nameRoll == 8 || nameRoll == 9) {
      return sample(USERS_EXTRA);
    }
  }

  getRandomUserRandomName() {
    let user = this.getRandomUser();
    let nameRoll = Math.floor(Math.random() * 10);

    if (nameRoll < 5) {
      if (user.tagName) {
        return user.tagName; 
      } else {
        return user.firstName;
      }
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
  }

  extractUsersFromText(text) {
    if (text.includes("iedereen")) {
      return USERS;
    }
    return USERS.filter(user => this.textIncludesUser(text.toLowerCase(), user));
  }

  getById(userId) {
    return USERS.filter(user => user.id.toString() === userId.toString())[0];
  }

  textIncludesUser(text, user) {
    return text.includes(user.id) || text.includes(user.tagName) || user.shortNames.some(shortName => text.includes(shortName.toLowerCase()));
  }
}

export { UserService };
