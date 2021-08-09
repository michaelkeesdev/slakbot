import { sample } from 'lodash';
import { StringBuilder } from '../../util/StringBuilder';
import { StringUtil } from '../../util/StringUtil';
import { BASIC_AGREE_ANSWER } from '../../answers/basic/BasicAgree';
import { BASIC_DISAGREE_ANSWER } from '../../answers/basic/BasicDisagree';
import { BASIC_DONT_KNOW_ANSWER } from '../../answers/basic/BasicDontKnow';
import { BASIC_PHRASE } from '../../answers/basic/BasicPhrase';
import { WEETJES_ANSWER } from '../../answers/weetjes/Weetjes';
import { WEETJES_PREFIX } from '../../answers/weetjes/Weetjesprefix';
import { BASIC_SUFFIX } from '../../answers/basic/BasicSuffix';
import { HOW_YOU_DOING_PREFIX, HOW_YOU_DOING_SUFFIX, HOW_YOU_DOING_ANSWER } from '../../answers/HowYouDoing';
import { EMOJIS } from '../../answers/basic/EmojiApp';
import { ADJECTIVE } from './../../answers/words/Adjectives';
import { SCHELD } from './../../answers/basic/Scheld';
import { SystemAnswerService } from './SystemAnswerService';


const PREFIX_PID = 6;
const SUFFIX_PID = 6;
const SYSTEM_ANSWER_PID = 30;
const EMOJI_PID = 20;
const WEETJE_PID = 50;
const NOTHING_TO_SAY_PID = 100;

const systemAnswerService = new SystemAnswerService();

class BasicAnweringService {
    buildAnswerPhrase = () => {
        let responseBuilder = new StringBuilder();
        this.buildStartOfAnswer(responseBuilder);
        this.addAnswerToResponse(responseBuilder, true);
        this.randomizeResponse(responseBuilder);
        this.addMoreTextToResponse(responseBuilder);
        if(this.returnEmptyResponse() !== 1) {
            return responseBuilder.toString();
        }
    };

    buildAnswerToHowYouDoingPhrase = () => {
        let responseBuilder = new StringBuilder();
        this.addHowYouDoingPrefixToResponse(responseBuilder);
        this.addHowYouDoingAnswerToResponse(responseBuilder);
        this.addHowYouDoingSuffixToResponse(responseBuilder);
        return responseBuilder.toString();
    };

    returnEmptyResponse() {
        return Math.floor(Math.random() * NOTHING_TO_SAY_PID);
    }

    buildStartOfAnswer(responseBuilder) {
        let wantsToTalk = Math.floor(Math.random() * PREFIX_PID);
        switch (wantsToTalk) {
            case 1:
                // Some text
                responseBuilder.append(sample(BASIC_PHRASE));
        }
    }

    agree(responseBuilder) {
        responseBuilder.append(" ").append(sample(BASIC_AGREE_ANSWER));
    }

    disagree(responseBuilder) {
        responseBuilder.append(" ").append(sample(BASIC_DISAGREE_ANSWER));
    }

    dontKnow(responseBuilder) {
        responseBuilder.clear();
        responseBuilder.append(sample(BASIC_DONT_KNOW_ANSWER));
    }

    addAnswerToResponse(responseBuilder, allowDontKnow) {
        let decision = Math.floor(Math.random() * 17);

        // 0-1-2-3-4-5-6 Maggie agrees
        if (decision < 7) {
            this.agree(responseBuilder);
        }
        // 7-8-9-10-11-12-13 Maggie disagrees
        if (decision >= 7 && decision < 14) {
            this.disagree(responseBuilder);
        }
        // 14-15 Maggie weet ni
        if (decision == 14 || decision == 15) {
            if (allowDontKnow) {
                this.dontKnow(responseBuilder);
            } else if (decision == 14) {
                this.agree(responseBuilder);
            } else if (decision == 15) {
                this.disagree(responseBuilder);
            }
        }
        // 15 just prefix
        if (decision == 16) {
            responseBuilder.append(" ").append(sample(BASIC_PHRASE));
        }
    }

    randomizeResponse(responseBuilder) {
        let randomizeIntoSystemAnswer = Math.floor(Math.random() * SYSTEM_ANSWER_PID);
    
        if (randomizeIntoSystemAnswer == 1) {
            responseBuilder.clear();
            this.addAnswerToResponse(responseBuilder, false);
            systemAnswerService.appendSystemAnswer(responseBuilder);
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
            responseBuilder.appendFullStopIfNone().append(" ").append(sample(WEETJES_PREFIX)).append(StringUtil.firstCharToLower(sample(WEETJES_ANSWER)));
        }

        if (suffix === 1) {
            let suffixParts = { 
                "%adjective%": sample(ADJECTIVE), 
                "%scheld%": sample(SCHELD)
            }

            let suffixText = sample(BASIC_SUFFIX).replace(/%\w+%/g, function(all) {
                return suffixParts[all] || all;
            });

            responseBuilder.appendFullStopIfNone().append(" ").append(suffixText);
        }
        if (emoji === 1) {
            responseBuilder.append(" ").append(sample(EMOJIS));
        }
    }
}

export { BasicAnweringService };