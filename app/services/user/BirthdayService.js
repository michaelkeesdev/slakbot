import { UserService } from "./UserService";
import { StringBuilder } from './../../util/StringBuilder';

class BirthdayService {

    userService = new UserService();

    getBirthday(text) {

        let responseBuilder = new StringBuilder();
        let users = this.userService.extractUsersFromText(text);

        if (users.length > 0) {
            users.forEach(user => {   
                if (user.birthday !== "") {
                    responseBuilder.append("De verjaardag van ").append(user.firstName + " " + user.lastName).append(" is op ").append(user.birthDay).append(". ");
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
