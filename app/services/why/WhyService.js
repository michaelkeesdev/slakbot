import { sample } from 'lodash';
import { WHY_ANSWERS } from "./../../answers/Why";
import { NOUNS } from './../../answers/words/RandomNouns';
import { VERBS } from './../../answers/words/Verbs';
import { UserService } from './../user/UserService';

class WhyService {

    getWhyAnswer() {
        let noun = sample(NOUNS);
        let user = new UserService().getRandomUser();
        let verb = sample(VERBS);

        let why = { 
            "%noun%": noun, 
            "%user%": user,
            "%verb%": verb,
        }

        let answer = sample(WHY_ANSWERS).replace(/%\w+%/g, function(all) {
            return why[all] || all;
        });

        return answer;
    }
}

export { WhyService };


