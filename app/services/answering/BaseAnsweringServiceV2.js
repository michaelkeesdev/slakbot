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

import {
  BASIC_ANSWER,
  BASIC_ANSWER_FREQUENCY_LIST,
} from "../../answers/V2/Answers";
import { PREFIX_FREQUENCY_LIST, PREFIX_PID } from "../../answers/V2/Prefix";
import { AGREE, BUSY, CONFUSED, DISAGREE } from "../../answers/V2/Tags";
import { SUFFIX_FREQUENCY_LIST, SUFFIX_PID } from "../../answers/V2/Suffix";
import {
  EMOJIS_MOOD_PID,
  EMOJIS_NORMAL_PID,
  EMOJI_FREQUENCY_LIST,
} from "../../answers/V2/Emojis";
import { UserService } from "../user/UserService";
import { ADJECTIVES } from "../../answers/V2/Adjectives";
import { SCHELD } from "../../answers/V2/Scheld";
import { VERBS } from "../../answers/words/Verbs";
import {
  SENTENCES_ADVANCED,
  SENTENCES_BASIC,
} from "../../answers/V2/Sentences";
import {
  PUNCTUATION_MARKS,
  PUNCTUATION_MARKS_FREQUENCY_LIST,
  PUNCTUATION_MARKS_PID,
} from "../../answers/V2/Punctuations";
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
  punctuationList = PUNCTUATION_MARKS.map((punc) => punc.value);

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
    const answer = responseBuilder.toString();
    return answer ? answer : "";
  };

  basisAnswer(mood, textInput, responseBuilder) {
    this.getEmojis(responseBuilder, EMOJIS_MOOD_PID, mood);
    this.getPrefix(responseBuilder, PREFIX_PID, mood);
    this.getAnswerByDecision(responseBuilder, 90, mood);
    this.getSuffix(responseBuilder, SUFFIX_PID, mood);
    this.getEmojis(responseBuilder, EMOJIS_NORMAL_PID, mood);
    this.getWeetje(responseBuilder, 3, mood);
    this.getBasicSentence(responseBuilder, 20, mood);
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
    let list = BASIC_ANSWER_FREQUENCY_LIST;
    if (mood) {
      list = this.setMoodList(mood, list);
    }

    if (frequency(percent)) {
      const pid = random(18);
      let BASIC_ANSWER_TYPE = "";
      if (pid < 6) BASIC_ANSWER_TYPE = AGREE;
      if (pid >= 6 && pid < 12) BASIC_ANSWER_TYPE = DISAGREE;
      if (pid >= 12 && pid < 14) BASIC_ANSWER_TYPE = CONFUSED;
      if (pid >= 14 && pid < 16) BASIC_ANSWER_TYPE = BUSY;
      const answersFilteredByType = list.filter((answer) =>
        answer.tags.includes(BASIC_ANSWER_TYPE)
      );
      const response = sample(answersFilteredByType);
      if (response && response.value) {
        responseBuilder.appendWithCasing(
          response.value,
          true,
          this.punctuationList
        );
      }
    }
  }

  getBasicSentence(responseBuilder, percent, mood) {
    if (frequency(percent)) {
      responseBuilder
        .appendFullStopIfNone(this.punctuationList)
        .appendWithCasing(
          sample(SENTENCES_BASIC).value,
          true,
          this.punctuationList
        );
      this.getPunctuationMark(responseBuilder);
    }
  }

  getAdvancedSentence(responseBuilder, percent, mood) {
    if (frequency(percent)) {
      responseBuilder
        .appendFullStopIfNone(this.punctuationList)
        .appendWithCasing(
          sample(SENTENCES_ADVANCED).value,
          true,
          this.punctuationList
        );
      this.getPunctuationMark(responseBuilder);
    }
  }

  getPrefix(responseBuilder, percent, mood) {
    let list = PREFIX_FREQUENCY_LIST;
    if (mood) {
      list = this.setMoodList(mood, list);
    }
    if (frequency(percent)) {
      responseBuilder.appendWithCasing(
        sample(list).value,
        true,
        this.punctuationList
      );
      this.getPrefix(responseBuilder, percent / 3, mood);
    }
  }

  getSuffix(responseBuilder, percent, mood) {
    let list = SUFFIX_FREQUENCY_LIST;
    if (mood) {
      list = this.setMoodList(mood, list);
    }
    if (frequency(percent)) {
      responseBuilder.appendWithCasing(
        sample(list).value,
        true,
        this.punctuationList
      );
      this.getPrefix(responseBuilder, percent / 3, mood);
      this.getPunctuationMark(responseBuilder);
    }
    return;
  }

  getEmojis(responseBuilder, percent, mood) {
    let list = EMOJI_FREQUENCY_LIST;
    if (mood) {
      list = this.setMoodList(mood, list);
    }
    if (frequency(percent)) {
      responseBuilder.appendWithCasing(
        sample(list).value,
        true,
        this.punctuationList
      );
      this.getEmojis(responseBuilder, percent / 3, mood);
    }
    return;
  }

  getWeetje(responseBuilder, percent, mood) {
    if (frequency(percent)) {
      responseBuilder
        .appendFullStopIfNone(this.punctuationList)
        .appendWithCasing(sample(WEETJES_PREFIX))
        .append(StringUtil.firstCharToLower(sample(WEETJES_ANSWER)));
    }
  }

  getPunctuationMark(responseBuilder, mood) {
    let list = PUNCTUATION_MARKS_PID;
    if (mood) {
      list = this.setMoodList(mood, list);
    }
    if (frequency(list)) {
      responseBuilder.appendWithCasing(
        sample(PUNCTUATION_MARKS_FREQUENCY_LIST).value,
        true,
        this.punctuationList
      );
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
        itemList.push(item);
      }
      return itemList;
    });
  }
}

export { BaseAnweringServiceV2 };
