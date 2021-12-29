
import { WEETJES_ANSWER } from '../../answers/weetjes/Weetjes';
import { WEETJES_PREFIX } from '../../answers/weetjes/Weetjesprefix';
import { PREFIX, PREFIX_GOOD_MOOD, PREFIX_BAD_MOOD } from '../../answers/basic/Prefix';
import { SUFFIX, SUFFIX_GOOD_MOOD, SUFFIX_BAD_MOOD } from '../../answers/basic/Suffix';
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
import { StringUtil } from '../../util/StringUtil';

const EMOJI_PID = 15;
const WEETJE_PID = 50;

const REGULAR_PREFIX_PID = 6;
const REGULAR_SUFFIX_PID = 6;

const MOOD_SWING_PID = 5;
const MOOD_SCALE_WORST_MOOD = 2;
const MOOD_SCALE_BAD_MOOD_START = 4;
const MOOD_SCALE_GOOD_MOOD_START = 8;
const MOOD_SCALE_BEST_MOOD = 10;

export const COMMAND_DECISION = "DECISION_ANSWER_COMMAND";
export const COMMAND_HOW = "HOW_ANSWERCOMMAND";
export const COMMAND_HOWMUCH = "HOWMUCH_ANSWERCOMMAND";
export const COMMAND_HOWYOUDOING = "HOWYOUDOING_ANSWERCOMMAND";
export const COMMAND_WHAT = "WHAT_ANSWERCOMMAND";
export const COMMAND_WHERE = "WHERE_ANSWER_COMMAND";
export const COMMAND_WHY = "WHY_ANSWERCOMMAND";
export const COMMAND_YESNODONTKNOW = "YESNODONTKNOW_ANSWERCOMMAND";

class BaseAnweringService {
    currentMood = 0;

    answer = (answerCommand, mood, textInput) => {
        this.setMood(textInput);
        console.log("BASIC: answerCommand", answerCommand, "mood", this.currentMood, "textInput", textInput);

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

    setMood(textInput) {
        if (this.currentMood == 0) {
            this.currentMood = 6;
        }

        if (Math.floor(Math.random() * MOOD_SWING_PID) == 1) {
            if (this.currentMood <= MOOD_SCALE_BEST_MOOD) {
                console.log("Mood up");
                this.currentMood++;
            }
        }

        if (Math.floor(Math.random() * MOOD_SWING_PID) == 2) {
            if (this.currentMood >= MOOD_SCALE_WORST_MOOD) {
                console.log("Mood down");
                this.currentMood--;
            }
        }

        if (textInput.includes("hoer") || textInput.includes("slet")) {
            this.currentMood--;
        }

        if (textInput.includes("xoxo") || textInput.includes("xx")) {
            this.currentMood++;
        }
    }

    buildStartOfAnswer(responseBuilder) {
        // 2, 3, 4 = unhappy
        if (this.currentMood <= MOOD_SCALE_BAD_MOOD_START) {
            // Unhappy      0 PLUS CURRENT 4, PID = 4
            // Very unhappy 0 PLUS CURRENT 2, PID = 2
            if (Math.floor(Math.random() * (0 + this.currentMood)) == 1) {
                responseBuilder.append(sample(PREFIX_BAD_MOOD))
            }
            // 8, 9, 10 = happy    
        } else if (this.currentMood >= MOOD_SCALE_GOOD_MOOD_START) {
            // Happy        12 MINUS CURRENT 8, PID = 4
            // Very happy   12 MINUS CURRENT 10, PID = 2
            if (Math.floor(Math.random() * (12 - this.currentMood)) == 1) {
                responseBuilder.append(sample(PREFIX_GOOD_MOOD))
            }
            // Regular mood    
        } else {
            if (Math.floor(Math.random() * REGULAR_PREFIX_PID) == 1) {
                responseBuilder.append(sample(PREFIX))
            }
        }
    }


    addMoreTextToResponse(responseBuilder) {
        let weetje = Math.floor(Math.random() * WEETJE_PID);
        let emoji = Math.floor(Math.random() * EMOJI_PID);

        if (weetje === 1) {
            responseBuilder.appendFullStopIfNone().append(" ").append(sample(WEETJES_PREFIX)).append(StringUtil.firstCharToLower(sample(WEETJES_ANSWER)));
        }

        // 2, 3, 4 = unhappy
        if (this.currentMood <= MOOD_SCALE_BAD_MOOD_START) {
            // Unhappy      0 PLUS CURRENT 4, PID = 4
            // Very unhappy 0 PLUS CURRENT 2, PID = 2
            if (Math.floor(Math.random() * (0 + this.currentMood)) == 1) {
                this.appendSuffix(responseBuilder, sample(SUFFIX_BAD_MOOD));
            }
        // 8, 9, 10 = happy    
        } else if (this.currentMood >= MOOD_SCALE_GOOD_MOOD_START) {
            // Happy        12 MINUS CURRENT 8, PID = 4
            // Very happy   12 MINUS CURRENT 10, PID = 2
            if (Math.floor(Math.random() * (12 - this.currentMood)) == 1) {
                this.appendSuffix(responseBuilder, sample(SUFFIX_GOOD_MOOD));
            }
        // Regular mood    
        } else {
            if (Math.floor(Math.random() * REGULAR_SUFFIX_PID) == 1) {
                this.appendSuffix(responseBuilder, sample(SUFFIX));
            }
        }

        if (emoji === 1) {
            responseBuilder.append(" ").append(sample(EMOJIS));
        }
    }

    appendSuffix(responseBuilder, chosenSuffix) {
        let suffixParts = {
            "%adjective%": sample(ADJECTIVES),
            "%scheld%": sample(SCHELD)
        }

        let suffix = chosenSuffix.replace(/%\w+%/g, function (all) {
            return suffixParts[all] || all;
        });

        responseBuilder.appendFullStopIfNone().append(" ").append(suffix);
    }
}

export { BaseAnweringService };