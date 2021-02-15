class UserService {
  getRandomUser = () => {
    let users = getAllUsers();
    return users[Math.floor(Math.random() * users.length)];
  }

  getAllUsers = () => {
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
}

class Users {
  getCrabbe = () => { return "<@UHB8YS8MU>"; }
  getDennis = () => { return "<@U9213H10B>"; }
  getJappeh = () => { return "<@U911D6401>"; }
  getJerre = () => { return "<@U015DQ39T2N>"; }
  getKees = () => { return "<@U90TSU6JU>"; }
  getJoa = () => { return "<@U91HHN2JE>"; }
  getKees = () => { return "<@U90TSU6JU>"; }
  getRits = () => { return "<@U92KLC4CX>"; }
}

export { UserService };
