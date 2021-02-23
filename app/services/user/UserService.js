import { StringBuilder } from './../../util/StringBuilder';
import { BASIC_COMMAND } from './../../answers/basic/BasicCommand';

class Users {
  static getCrabbe() { return "UHB8YS8MU"; }
  static getDennis() { return "U9213H10B"; }
  static getJappeh() { return "U911D6401"; }
  static getJerre() { return "U015DQ39T2N"; }
  static getKees() { return "U90TSU6JU"; }
  static getJoa() { return "U91HHN2JE"; }
  static getKees() { return "U90TSU6JU"; }
  static getRits() { return "U92KLC4CX"; }
  static getFlip() { return "U01NEE5JYSY"; }
  static getMaggie() { return "U01K3BVEVT3"; }
}

class UserService {
  activeUser = "";

  getAllUsers() {
    return [
      Users.getCrabbe(),
      Users.getDennis(),
      Users.getJappeh(),
      Users.getJerre(),
      Users.getJoa(),
      Users.getKees(),
      Users.getRits()
    ];
  }

  getRandomUser() {
    let users = this.getAllUsers();
    let user = users[Math.floor(Math.random() * users.length)];
    this.activeUser = user;
    return `<@${user}>`;
  }

  tagUser(text) {
    let responseBuilder = new StringBuilder();
    let users = this.extractUsersFromText(text)
    if (users.length > 0) {
      responseBuilder.append(users.map(user => `<@${user}>`).join(" "));


      BASIC_COMMAND.forEach(command => {
        if (text.split(` ${command} `).length > 1) {
            responseBuilder.append(" ").append(text.split(` ${command} `)[1]);
            return responseBuilder.toString()
        }  else {
          return responseBuilder.toString();
        }
      });

    } else {
      responseBuilder.append("wie?");
    }

    return responseBuilder.toString();
  }

  extractUsersFromText(text) {
    if (text.includes("iedereen")) {
      return this.getAllUsers();
    }
    return this.getAllUsers().filter(user => this.textIncludesUser(text, user));
  }

  textIncludesUser(text, user) {
    return text.includes(user);
  }

  getActiveUser() {
    return this.activeUser;
  }

  setActiveUser(user) {
    this.activeUser = user;
  }

}

export { Users, UserService };
