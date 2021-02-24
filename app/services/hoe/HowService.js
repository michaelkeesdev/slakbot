import { sample } from 'lodash';
import { HOW_ANSWER } from "./../../answers/How";
import { NOUNS } from './../../answers/words/RandomNouns';
import { VERBS } from './../../answers/words/Verbs';
import { UserService } from './../user/UserService';


class HowService {

    getHowAnswer() {
        let noun = sample(NOUNS);
        let user = new UserService().getRandomUser();
        let verb = sample(VERBS);

        let how = { 
            "%noun%": noun, 
            "%user%": `<@${user}>`,
            "%verb%": verb,
        }

        let answer = sample(HOW_ANSWER).replace(/%\w+%/g, function(all) {
            return how[all] || all;
        });

        return answer;
    }
}

export { HowService };


