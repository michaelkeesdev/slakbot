import { HOW_YOU_DOING_PREFIX, HOW_YOU_DOING_SUFFIX, HOW_YOU_DOING_ANSWER } from '../../answers/HowYouDoing';

import { sample } from 'lodash';
import { StringUtil } from '../../util/StringUtil';

class HowYouDoingService {
    mood;
    inputText;
    responseBuilder;
  
    constructor(mood, inputText, responseBuilder) {
        this.mood = mood;
        this.inputText = inputText;
        this.responseBuilder = responseBuilder;
    }

    answer = () => {
        this.addHowYouDoingPrefixToResponse();
        this.addHowYouDoingAnswerToResponse();
        this.addHowYouDoingSuffixToResponse();
        return this.responseBuilder.toString();
    }

    addHowYouDoingPrefixToResponse() {
        this.responseBuilder.append(sample(HOW_YOU_DOING_PREFIX));
    }

    addHowYouDoingAnswerToResponse() {
        this.responseBuilder.append(" ").append(StringUtil.firstCharToLower(sample(HOW_YOU_DOING_ANSWER)));
    }

    addHowYouDoingSuffixToResponse() {
        this.responseBuilder.append(", ").append(sample(HOW_YOU_DOING_SUFFIX));
    }
}

export { HowYouDoingService };