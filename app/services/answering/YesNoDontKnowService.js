import { BASIC_PHRASE } from '../../answers/basic/Prefix';
import { BASIC_AGREE_ANSWER } from '../../answers/basic/BasicAgree';
import { BASIC_DISAGREE_ANSWER } from '../../answers/basic/BasicDisagree';
import { BASIC_DONT_KNOW_ANSWER } from '../../answers/basic/BasicDontKnow';

import { sample } from 'lodash';

class YesNoDontKnowService {
    mood;
    inputText;
    responseBuilder;

    NOTHING_TO_SAY_PID = 50;
  
    constructor(mood, inputText, responseBuilder) {
        this.mood = mood;
        this.inputText = inputText;
        this.responseBuilder = responseBuilder;
    }

    answer = () => {
        let decision = Math.floor(Math.random() * 17);

        // 0-1-2-3-4-5-6 Maggie agrees
        if (decision < 7) {
            this.responseBuilder.append(sample(BASIC_AGREE_ANSWER));
        }
        // 7-8-9-10-11-12-13 Maggie disagrees
        if (decision >= 7 && decision < 14) {
            this.responseBuilder.append(sample(BASIC_DISAGREE_ANSWER));
        }
        // 14-15 Maggie weet ni
        if (decision == 14 || decision == 15) {
            this.responseBuilder.append(sample(BASIC_DONT_KNOW_ANSWER));
        }
        // 15 just prefix
        if (decision == 16) {
            this.responseBuilder.append(" ").append(sample(BASIC_PHRASE));
        }


        if(Math.floor(Math.random() * this.NOTHING_TO_SAY_PID !== 1)) {
            return this.responseBuilder.toString();
        } else {
            return "";
        }
    };
}

export { YesNoDontKnowService }