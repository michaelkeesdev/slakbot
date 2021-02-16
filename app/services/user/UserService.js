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
  static getMaggie() { return  "U01K3BVEVT3"; }
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
    return user;
  }

  getActiveUser() {
    return this.activeUser;
  }

  setActiveUser(user) {
    this.activeUser = user;
  }

}

export { UserService };
