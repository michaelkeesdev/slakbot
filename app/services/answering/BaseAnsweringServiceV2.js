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

import { BASIC_ANSWER } from "../../answers/tagged/Answers";
import {
  PREFIX,
  PREFIX_FREQUENCY_LIST,
  PREFIX_PID,
} from "../../answers/tagged/Prefix";
import { AGREE, CONFUSED, DISAGREE } from "../../answers/tagged/Tags";
import {
  SUFFIX,
  SUFFIX_FREQUENCY_LIST,
  SUFFIX_PID,
} from "../../answers/tagged/Suffix";
import {
  EMOJIS,
  EMOJIS_MOOD_PID,
  EMOJIS_NORMAL_PID,
  EMOJI_FREQUENCY_LIST,
} from "../../answers/tagged/Emojis";
import { UserService } from "../user/UserService";
import { ADJECTIVES } from "../../answers/tagged/Adjectives";
import { SCHELD } from "../../answers/tagged/Scheld";
import { VERBS } from "../../answers/words/Verbs";
import {
  SENTENCES_ADVANCED,
  SENTENCES_BASIC,
} from "../../answers/tagged/Sentences";
import {
  PUNCTUATION_MARKS,
  PUNCTUATION_MARKS_FREQUENCY_LIST,
  PUNCTUATION_MARKS_PID,
} from "../../answers/tagged/Punctuations";
import { WEETJES_PREFIX } from "../../answers/weetjes/Weetjesprefix";
import { WEETJES_ANSWER } from "../../answers/weetjes/Weetjes";

export const COMMAND_DECISION = "DECISION_ANSWER_COMMAND";
export const COMMAND_HOW = "HOW_ANSWERCOMMAND";
export const COMMAND_HOWMUCH = "HOWMUCH_ANSWERCOMMAND";
export const COMMAND_HOWYOUDOING = "HOWYOUDOING_ANSWERCOMMAND";
export const COMMAND_WHAT = "WHAT_ANSWERCOMMAND";
export const COMMAND_WHERE = "WHERE_ANSWER_COMMAND";
export const COMMAND_WHY = "WHY_ANSWERCOMMAND";
export const COMMAND_YESNODONTKNOW = "YESNODONTKNOW_ANSWERCOMMAND";

export function frequency(percent) {
  return Math.floor(Math.random() * 100) < percent;
}

export function random(up) {
  return Math.floor(Math.random() * up);
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

  basisAnswer(mood, textInput, responseBuilder) {
    this.getEmojis(responseBuilder, EMOJIS_MOOD_PID, mood);
    this.getPrefix(responseBuilder, PREFIX_PID, mood);
    this.getAnswerByDecision(responseBuilder, 90, mood);
    this.getSuffix(responseBuilder, SUFFIX_PID, mood);
    this.getEmojis(responseBuilder, EMOJIS_NORMAL_PID, mood);
    this.getWeetje(responseBuilder, 5, mood);
    this.getBasicSentence(responseBuilder, 30, mood);
    this.getAdvancedSentence(responseBuilder, 10, mood);
    this.replaceParams(responseBuilder, mood);
  }

  replaceParams(responseBuilder, mood) {
    let parts = {
      "%WHO": this.userService.getRandomUserRandomName(),
      "%WHAT": new WhatService(mood, null, new StringBuilder()).answer(),
      "%ADJECTIVE": sample(ADJECTIVES).value,
      "%SCHELD": sample(SCHELD).value,
      "%PLACE": new WhereService(mood, null, new StringBuilder()).answer(),
      "%VERB": sample(VERBS),
    };
    let response = responseBuilder.toString();
    for (let key of Object.keys(parts)) {
      response = response.replace(new RegExp(key, "g"), parts[key]);
    }
    responseBuilder.clear();
    responseBuilder.append(response);
  }

  getAnswerByDecision(responseBuilder, percent, mood) {
    let list = BASIC_ANSWER;
    if (mood) {
      list = setMoodList(mood, list);
    }

    if (frequency(percent)) {
      const pid = random(16);
      let BASIC_ANSWER_TYPE = "";
      if (pid < 6) BASIC_ANSWER_TYPE = AGREE;
      if (pid >= 6 && pid < 12) BASIC_ANSWER_TYPE = DISAGREE;
      if (pid >= 12 && pid < 14) BASIC_ANSWER_TYPE = CONFUSED;
      const answersFilteredByType = list.filter((answer) =>
        answer.tags.includes(BASIC_ANSWER_TYPE)
      );
      const response = sample(answersFilteredByType);
      if (response && response.value) {
        responseBuilder.append(" ").append(response.value);
      }
    }
  }

  getBasicSentence(responseBuilder, percent, mood) {
    if (frequency(percent)) {
      responseBuilder
        .appendFullStopIfNone()
        .append(" ")
        .append(sample(SENTENCES_BASIC).value);
      this.getPunctuationMark(responseBuilder);
    }
  }

  getAdvancedSentence(responseBuilder, percent, mood) {
    if (frequency(percent)) {
      responseBuilder
        .appendFullStopIfNone()
        .append(" ")
        .append(sample(SENTENCES_ADVANCED).value);
      this.getPunctuationMark(responseBuilder);
    }
  }

  getPrefix(responseBuilder, percent, mood) {
    let list = PREFIX_FREQUENCY_LIST;
    if (mood) {
      list = setMoodList(mood, list);
    }
    if (frequency(percent)) {
      responseBuilder.append(" ").append(sample(list).value);
      this.getPrefix(responseBuilder, percent / 3, mood);
    }
  }

  getSuffix(responseBuilder, percent, mood) {
    let list = SUFFIX_FREQUENCY_LIST;
    if (mood) {
      list = setMoodList(mood, list);
    }
    if (frequency(percent)) {
      responseBuilder.append(" ").append(sample(list).value);
      this.getPrefix(responseBuilder, percent / 3, mood);
    }
    this.getPunctuationMark(responseBuilder);
    return;
  }

  getEmojis(responseBuilder, percent, mood) {
    let list = EMOJI_FREQUENCY_LIST;
    if (mood) {
      list = setMoodList(mood, list);
    }
    if (frequency(percent)) {
      responseBuilder.append(" ").append(sample(list).value);
      this.getEmojis(responseBuilder, percent / 3, mood);
    }
    return;
  }

  getWeetje(responseBuilder, percent, mood) {
    if (frequency(percent)) {
      responseBuilder
        .append(" ")
        .append(sample(WEETJES_PREFIX))
        .append(StringUtil.firstCharToLower(sample(WEETJES_ANSWER)));
    }
  }

  getPunctuationMark(responseBuilder, mood) {
    let list = PUNCTUATION_MARKS_PID;
    if (mood) {
      list = setMoodList(mood, list);
    }
    if (frequency(list)) {
      responseBuilder.append(sample(PUNCTUATION_MARKS_FREQUENCY_LIST).value);
    }
  }

  setMoodList(mood, list) {
    return list.flatMap((item) => {
      let itemList = [];
      if (item.tags.includes(mood)) {
        for (let i = 0; i < item.frequency * 10; i++) {
          itemList.push({ value: item.value });
        }
      }
      if (item.tags.length === 0) {
        for (let i = 0; i < item.frequency * 5; i++) {
          itemList.push({ value: item.value });
        }
      } else {
        item;
      }
    });
  }
}

export { BaseAnweringServiceV2 };
