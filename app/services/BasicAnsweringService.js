import { sample } from 'lodash';
import { StringBuilder } from './../util/StringBuilder';
import { StringUtil } from '../util/StringUtil';
import { BASIC_AGREE_ANSWER } from './../answers/basic/BasicAgree';
import { BASIC_DISAGREE_ANSWER } from './../answers/basic/BasicDisagree';
import { BASIC_DONT_KNOW_ANSWER } from './../answers/basic/BasicDontKnow';
import { BASIC_PHRASE } from './../answers/basic/BasicPhrase';
import { WEETJES_ANSWER } from './../answers/weetjes/Weetjes';
import { WEETJES_PREFIX } from './../answers/weetjes/Weetjesprefix';
import { BASIC_SUFFIX } from '../answers/basic/BasicSuffix';
import { HOW_YOU_DOING_PREFIX, HOW_YOU_DOING_SUFFIX, HOW_YOU_DOING_ANSWER } from '../answers/HowYouDoing';
import { EMOJIS } from '../answers/basic/EmojiApp';

const PREFIX_PID = 5;
const SUFFIX_PID = 5;
const EMOJI_PID = 5;
const WEETJE_PID = 50;


class BasicAnweringService {
    buildAnswerPhrase = () => {
        let responseBuilder = new StringBuilder();
        this.buildStartOfAnswer(responseBuilder);
        this.addAnswerToResponse(responseBuilder);
        this.addMoreTextToResponse(responseBuilder);       
        return responseBuilder.toString();
    };

    buildAnswerToHowYouDoingPhrase = () => {
        let responseBuilder = new StringBuilder();
        this.addHowYouDoingPrefixToResponse(responseBuilder);
        this.addHowYouDoingAnswerToResponse(responseBuilder);
        this.addHowYouDoingSuffixToResponse(responseBuilder);       
        return responseBuilder.toString();
    };

    buildStartOfAnswer(responseBuilder) {
        let wantsToTalk = Math.floor(Math.random() * PREFIX_PID);
        switch(wantsToTalk) {
            case 1:
                // Some text
                responseBuilder.append(sample(BASIC_PHRASE));
        }
    }

    addAnswerToResponse(responseBuilder) {
        let decision = Math.floor(Math.random() * 3);
        switch(decision) {
            case 0:
                // 0 Maggie agrees
                responseBuilder.append(" ").append(sample(BASIC_AGREE_ANSWER));
                break;
            case 1:
                // 1 Maggie disagrees
                responseBuilder.append(" ").append(sample(BASIC_DISAGREE_ANSWER));
                break;
            case 2:    
                // 2 Maggie weet ni
                responseBuilder.clear();
                responseBuilder.append(sample(BASIC_DONT_KNOW_ANSWER));
                break;
            default:
                responseBuilder.clear();
                responseBuilder.append(sample(BASIC_PHRASE));
                break;
        }
    }

    addHowYouDoingPrefixToResponse(responseBuilder) {
        responseBuilder.append(sample(HOW_YOU_DOING_PREFIX));
    }

    addHowYouDoingAnswerToResponse(responseBuilder) {
        responseBuilder.append(" ").append(StringUtil.firstCharToLower(sample(HOW_YOU_DOING_ANSWER)));
    }

    addHowYouDoingSuffixToResponse(responseBuilder) {
        responseBuilder.append(", ").append(sample(HOW_YOU_DOING_SUFFIX));
    }

    addMoreTextToResponse(responseBuilder) {
        let weetje = Math.floor(Math.random() * WEETJE_PID);
        let suffix = Math.floor(Math.random() * SUFFIX_PID);
        let emoji = Math.floor(Math.random() * EMOJI_PID);

        if (weetje === 1) {
            responseBuilder.append(" ").append(sample(WEETJES_PREFIX)).append(StringUtil.firstCharToLower(sample(WEETJES_ANSWER)));
        } 
        
        if (suffix === 1) {
            responseBuilder.append(" ").append(sample(BASIC_SUFFIX));
        }
        if(emoji === 1) {
            responseBuilder.append(" ").append(sample(EMOJIS));
        }
    }
}

export { BasicAnweringService };