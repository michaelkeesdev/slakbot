import { sample } from 'lodash';
import { HOW_ANSWER } from "../../answers/How";
import { NOUNS } from '../../answers/words/RandomNouns';
import { VERBS } from '../../answers/words/Verbs';
import { UserService } from '../user/UserService';

class HowService {
    mood;
    inputText;
    responseBuilder;
  
    constructor(mood, inputText, responseBuilder) {
        this.mood = mood;
        this.inputText = inputText;
        this.responseBuilder = responseBuilder;
    }

    answer = () => {
        let noun = sample(NOUNS);
        let user = new UserService().getRandomUserRandomName();
        let verb = sample(VERBS);

        let how = { 
            "%noun%": noun, 
            "%user%": user,
            "%verb%": verb,
        }

        let answer = sample(HOW_ANSWER).replace(/%\w+%/g, function(all) {
            return how[all] || all;
        });

        this.responseBuilder.append(answer);
        return this.responseBuilder.toString();
    }
}

export { HowService };


