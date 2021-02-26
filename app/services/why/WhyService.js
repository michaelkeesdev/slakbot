import { sample } from 'lodash';
import { WHY_ANSWERS } from "./../../answers/Why";
import { NOUNS } from './../../answers/words/RandomNouns';
import { VERBS } from './../../answers/words/Verbs';
import { UserService } from './../user/UserService';

class WhyService {

    getWhyAnswer() {
        let noun1 = sample(NOUNS);
        let noun2 = sample(NOUNS);
        let user = new UserService().getRandomUserRandomName();
        let verb = sample(VERBS);

        let why = { 
            "%noun1%": noun1, 
            "%noun2%": noun2, 
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


