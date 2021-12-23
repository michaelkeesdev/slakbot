
import { WEETJES_ANSWER } from '../../answers/weetjes/Weetjes';
import { WEETJES_PREFIX } from '../../answers/weetjes/Weetjesprefix';
import { BASIC_PHRASE } from '../../answers/basic/BasicPhrase';
import { BASIC_SUFFIX } from '../../answers/basic/BasicSuffix';
import { EMOJIS } from '../../answers/basic/EmojiApp';
import { ADJECTIVES } from '../../answers/words/Adjectives';
import { SCHELD } from '../../answers/basic/Scheld';

import { HowYouDoingService } from './HowYouDoingService';
import { HowService } from './HowService';
import { WhatService } from './WhatService';
import { WhyService } from './WhyService';
import { YesNoDontKnowService } from './YesNoDontKnowService';

import { StringBuilder } from '../../util/StringBuilder';

import { sample } from 'lodash';
import { WhereService } from './WhereService';
import { HowMuchService } from './HowMuchService';
import { DecisionService } from './DecisionService';

const PREFIX_PID = 6;
const SUFFIX_PID = 6;
const EMOJI_PID = 15;
const WEETJE_PID = 50;

export const COMMAND_DECISION = "DECISION_ANSWER_COMMAND";
export const COMMAND_HOW = "HOW_ANSWERCOMMAND";
export const COMMAND_HOWMUCH = "HOWMUCH_ANSWERCOMMAND";
export const COMMAND_HOWYOUDOING = "HOWYOUDOING_ANSWERCOMMAND";
export const COMMAND_WHAT = "WHAT_ANSWERCOMMAND";
export const COMMAND_WHERE = "WHERE_ANSWER_COMMAND";
export const COMMAND_WHY = "WHY_ANSWERCOMMAND";
export const COMMAND_YESNODONTKNOW = "YESNODONTKNOW_ANSWERCOMMAND";

class BaseAnweringService {
    answer = (answerCommand, mood, textInput) => {

        console.log("BASIC: answerCommand", answerCommand, "mood", mood, "textInput", textInput);

        let responseBuilder = new StringBuilder();
        this.buildStartOfAnswer(responseBuilder);

        switch (answerCommand) {
            case COMMAND_DECISION: 
                new DecisionService(mood, textInput, responseBuilder).answer();
                break;   
            case COMMAND_HOW: 
                new HowService(mood, textInput, responseBuilder).answer();
                break;   
            case COMMAND_HOWMUCH: 
                new HowMuchService(mood, textInput, responseBuilder).answer();
                break;   
            case COMMAND_HOWYOUDOING: 
                new HowYouDoingService(mood, textInput, responseBuilder).answer();
                break;  
            case COMMAND_WHAT: 
                new WhatService(mood, textInput, responseBuilder).answer();
                break;   
            case COMMAND_WHERE:
                new WhereService(mood, textInput, responseBuilder).answer();
                break;    
            case COMMAND_WHY: 
                new WhyService(mood, textInput, responseBuilder).answer();
                break;
            case COMMAND_YESNODONTKNOW: 
                new YesNoDontKnowService(mood, textInput, responseBuilder).answer();
                break; 
            default: 
                new YesNoDontKnowService(mood, textInput, responseBuilder).answer();
        }

        this.addMoreTextToResponse(responseBuilder);
        return responseBuilder.toString();
    }

    buildStartOfAnswer(responseBuilder) {
        let wantsToTalk = Math.floor(Math.random() * PREFIX_PID);
        switch (wantsToTalk) {
            case 1:
                // Some text
                responseBuilder.append(sample(BASIC_PHRASE));
        }
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
                "%adjective%": sample(ADJECTIVES), 
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

export { BaseAnweringService };