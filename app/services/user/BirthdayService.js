import { Users, UserService } from "./UserService";
import { StringBuilder } from './../../util/StringBuilder';

class BirthdayService {

    userService = new UserService();

    getBirthday(text) {

        let responseBuilder = new StringBuilder();
        let users = this.userService.extractUsersFromText(text);

        if (users.length > 0) {
            users.forEach(user => {   
                console.log("hoer");            
                let birthday = "";
                switch (user) {
                    case Users.getCrabbe():
                        break;
                    case Users.getDennis():
                        break;
                    case Users.getJappeh():
                        birthday = "27 augustus";
                        break;
                    case Users.getJerre():
                        break;
                    case Users.getJoa():
                        birthday = "30 oktober";
                        break;
                    case Users.getKees():
                        birthday = "8 mei";
                        break;
                    case Users.getRits():
                        break;
                    default:
                        birthday = "ken ik ni";
                        break;
                }
                responseBuilder.append("De verjaardag van ").append(`<@${user}>`).append(" ");
                if (birthday !== "") {
                    responseBuilder.append("is op ").append(birthday).append(". ");
                } else {
                    responseBuilder.append("ken ik nog ni").append(". ");
                }
            })
        } else {
            responseBuilder.append("jaardag van wie slet?");
        }
        return responseBuilder.toString();
    }
}

export { BirthdayService };
