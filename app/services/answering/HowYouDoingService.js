import {
  HOW_YOU_DOING_PREFIX,
  HOW_YOU_DOING_SUFFIX,
  HOW_YOU_DOING_ANSWER,
} from "../../answers/HowYouDoing";
import { HOW_YOU_DOING_ANSWER } from "../../answers/V2/HowDoing";

import { sample } from "lodash";
import { StringUtil } from "../../util/StringUtil";

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
  };

  addHowYouDoingPrefixToResponse() {
    this.responseBuilder.append(sample(HOW_YOU_DOING_PREFIX));
  }

  addHowYouDoingAnswerToResponse() {
    let list = HOW_YOU_DOING_ANSWER;
    if (this.mood) {
      list = setMoodList(this.mood, list);
    }
    this.responseBuilder
      .append(" ")
      .append(StringUtil.firstCharToLower(sample(HOW_YOU_DOING_ANSWER)));
  }

  addHowYouDoingSuffixToResponse() {
    this.responseBuilder.append(", ").append(sample(HOW_YOU_DOING_SUFFIX));
  }

  setMoodList(mood, list) {
    return list.flatMap((item) => {
      let itemList = [];
      if (item.tags.includes(mood)) {
        for (let i = 0; i < item.frequency * 20; i++) {
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

export { HowYouDoingService };
