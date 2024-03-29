import { sample } from 'lodash';
import { WHY_ANSWERS } from "../../answers/Why";
import { NOUNS } from '../../answers/words/RandomNouns';
import { VERBS } from '../../answers/words/Verbs';
import { ADJECTIVES } from '../../answers/words/Adjectives';
import { SCHELD } from '../../answers/basic/Scheld';
import { UserService } from '../user/UserService';

class WhyService {
    mood;
    inputText;
    responseBuilder;
  
    constructor(mood, inputText, responseBuilder) {
        this.mood = mood;
        this.inputText = inputText;
        this.responseBuilder = responseBuilder;
    }

    answer = () => {
        let noun1 = sample(NOUNS);
        let noun2 = sample(NOUNS);
        let user = new UserService().getRandomUserRandomName();
        let verb = sample(VERBS);
        let adjective = sample(ADJECTIVES);
        let scheld = sample(SCHELD);

        let why = { 
            "%noun1%": noun1, 
            "%noun2%": noun2, 
            "%user%": user,
            "%verb%": verb,
            "%adjective%": adjective,
            "%scheld%": scheld,
        }

        let answer = sample(WHY_ANSWERS).replace(/%\w+%/g, function(all) {
            return why[all] || all;
        });
        
        this.responseBuilder.append(answer);
        return this.responseBuilder.toString();
    }
}

export { WhyService };


