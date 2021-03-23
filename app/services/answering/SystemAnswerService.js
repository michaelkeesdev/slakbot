import { sample } from "lodash";
import {
  SYSTEM_ANSWER_PREFIX,
  SYSTEM_ANSWER,
  SYSTEM_ANSWER_SUFFIX,
} from "./../../answers/basic/ExplanationAnswer";
import { NOUNS } from "../../answers/words/RandomNouns";
import { UserService } from "./../user/UserService";

const SUFFIX_PID = 8;

const userService = new UserService();

class SystemAnswerService {
  appendSystemAnswer(responseBuilder) {
    let addOpinionSuffix = Math.floor(Math.random() * SUFFIX_PID);

    responseBuilder
      .appendFullStopIfNone()
      .append(" ")
      .append(sample(SYSTEM_ANSWER_PREFIX));
    responseBuilder.append(" ").append(this.getSystemAnswer());

    if (addOpinionSuffix == 1) {
      responseBuilder.append(" ").append(sample(SYSTEM_ANSWER_SUFFIX));
    }

    return responseBuilder;
  }

  getSystemAnswer() {
    let noun = sample(NOUNS);
    let user = userService.getRandomUserRandomName();

    let opinionContents = {
      "%noun%": noun,
      "%user%": user,
    };

    let opinion = sample(SYSTEM_ANSWER).replace(/%\w+%/g, function (all) {
      return opinionContents[all] || all;
    });

    return opinion;
  }
}

export { SystemAnswerService };
