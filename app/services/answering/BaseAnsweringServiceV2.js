import { StringBuilder } from "../../util/StringBuilder";
import { sample } from "lodash";

import { HowYouDoingService } from "./HowYouDoingService";
import { HowService } from "./HowService";
import { WhatService } from "./WhatService";
import { WhyService } from "./WhyService";
import { WhereService } from "./WhereService";
import { HowMuchService } from "./HowMuchService";
import { DecisionService } from "./DecisionService";
import { StringUtil } from "../../util/StringUtil";

import { BASIC_ANSWER } from "../../answers/tagged/answers";
import { PREFIX, PREFIX_PID } from "../../answers/tagged/prefix";
import { AGREE, CONFUSED, DISAGREE } from "../../answers/tagged/tags";
import { SUFFIX, SUFFIX_PID } from "../../answers/tagged/suffix";
import {
  EMOJIS_MOOD_PID,
  EMOJIS_NORMAL_PID,
} from "../../answers/tagged/emojis";
import { UserService } from "../user/UserService";
import { ADJECTIVES } from "../../answers/tagged/Adjectives";
import { SCHELD } from "../../answers/tagged/Scheld";
import { VERBS } from "../../answers/tagged/Verbs";

export const COMMAND_DECISION = "DECISION_ANSWER_COMMAND";
export const COMMAND_HOW = "HOW_ANSWERCOMMAND";
export const COMMAND_HOWMUCH = "HOWMUCH_ANSWERCOMMAND";
export const COMMAND_HOWYOUDOING = "HOWYOUDOING_ANSWERCOMMAND";
export const COMMAND_WHAT = "WHAT_ANSWERCOMMAND";
export const COMMAND_WHERE = "WHERE_ANSWER_COMMAND";
export const COMMAND_WHY = "WHY_ANSWERCOMMAND";
export const COMMAND_YESNODONTKNOW = "YESNODONTKNOW_ANSWERCOMMAND";

export function calcPID(pid) {
  return Math.floor(Math.random() * pid);
}

class BaseAnweringServiceV2 {
  userService = new UserService();

  answer = (answerCommand, mood, textInput) => {
    let responseBuilder = new StringBuilder();
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
        this.basisAnswer(mood, textInput, responseBuilder);
        break;
      default:
        this.basisAnswer(mood, textInput, responseBuilder);
    }
    return responseBuilder.toString();
  };

  appendSuffix(responseBuilder, chosenSuffix) {
    if (Math.floor(Math.random() * EMOJI_PID) === 1) {
      responseBuilder.appendFullStopIfNone().append(" ").append(sample(SUFFIX));
    }
  }

  basisAnswer(mood, textInput, responseBuilder) {
    const answerPID = calcPID(17);
    const prefixPID = calcPID(PREFIX_PID);
    const suffixPID = calcPID(SUFFIX_PID);
    const emojiPrefixPID = calcPID(EMOJIS_MOOD_PID);
    const emojiSuffixPID = calcPID(EMOJIS_NORMAL_PID);

    this.getEmojis(esponseBuilder, emojiPrefixPID, mood);
    this.getPrefix(responseBuilder, prefixPID, mood);
    this.getAnswerByDecision(responseBuilder, answerPID, mood);
    this.getSuffix(responseBuilder, suffixPID, mood);
    this.getEmojis(responseBuilder, emojiSuffixPID, mood);
    this.getWeetje(responseBuilder, weetjesPID, mood);
    responseBuilder.append(answer);
    this.replaceParams(responseBuilder, mood);

    return responseBuilder.toString();
  }

  replaceParams(responseBuilder, mood) {
    let parts = {
      $WHO: this.userService.getRandomUserRandomName(),
      $WHAT: new WhatService(mood, textInput, responseBuilder).answer(),
      $ADJECTIVE: sample(ADJECTIVES).value,
      $SCHELD: sample(SCHELD).value,
      $WHERE: new WhereService(mood, textInput, responseBuilder).answer(),
      $VERB: sample(VERBS),
    };

    for (let key of Object.keys(parts)) {
      responseBuilder.replace("/" + key + "/g", parts[key]);
    }
  }

  getAnswerByDecision(responseBuilder, pid, mood) {
    let BASIC_ANSWER_TYPE = "";
    if (pid < 6) BASIC_ANSWER_TYPE = AGREE;
    if (pid >= 6 && pid < 12) BASIC_ANSWER_TYPE = DISAGREE;
    if (pid >= 12 && pid < 14) BASIC_ANSWER_TYPE = CONFUSED;
    const answersFilteredByType = BASIC_ANSWER.filter((answer) =>
      answer.tags.includes(BASIC_ANSWER_TYPE)
    );
    responseBuilder.append(" ").append(sample(answersFilteredByType));
    this.getAnswerByDecision(responseBuilder, pid, mood);
    return;
  }

  getPrefix(responseBuilder, pid, mood) {
    if (pid === 1) {
      responseBuilder.append(" ").append(sample(PREFIX));
      this.getPrefix(responseBuilder, pid * 2, mood);
    }
    return;
  }

  getSuffix(responseBuilder, pid, mood) {
    let pid = calcPID(SUFFIX_PID);
    if (pid === 1) {
      responseBuilder.append(" ").append(sample(SUFFIX));
      this.getPrefix(responseBuilder, pid * 2, mood);
    }
    return;
  }

  getWeetje(responseBuilder, pid, mood) {
    if (pid === 1) {
      responseBuilder
        .appendFullStopIfNone()
        .append(" ")
        .append(sample(WEETJES_PREFIX))
        .append(StringUtil.firstCharToLower(sample(WEETJES_ANSWER)));
    }
  }
}

export { BaseAnweringServiceV2 };
