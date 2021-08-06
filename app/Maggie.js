import { sample } from "lodash";

import { DURING_TIMEOUT_ANSWER, TIMEOUT_STOP_ANSWER, TIMEOUT_STOP_POSITIVE, TIMEOUT_STOP_NEGATIVE, TIMEOUT_STOP_TRIGGER, TIMEOUT_STOP_POSITIVE_ANSWER, TIMEOUT_STOP_NEGATIVE_ANSWER, TIMEOUT_TRIGGER, TIMEOUT_ANSWER} from "./answers/Timeout";

import { MaggieBrein } from "./services/MaggieBrein";
import { MaggieMond } from "./services/MaggieMond";

const maggieMond = new MaggieMond();
const maggieBrein = new MaggieBrein();

const SIZE_DUPLICATE = 3;
const SIZE_MONOLOGUE = 7;
const PID_DUPLICATE = 3;
const PID_MONOLOGUE = 5;

const MIN_TIMEOUT = 50;
const MAX_TIMEOUT = 300;
const RESPONSE_DURING_TIMEOUT_PID = 3;

class Maggie {
  id = "U01NEE5JYSY";
  timeoutUser;
  timeoutMessageAmount = 0;
  askForStopTimeoutInProgress = false;

  getMentionResponse = async (textInput, context, files, user) => {
    if (!this.isMaggieInHoekForTimeout(1)) {
      const text = textInput?.replace(`<@${context?.botUserId}>`, "").trim();
      let imageUrl;
      if (files?.length > 0) {
        imageUrl = files[0]?.thumb_960;
      }
      const tokens = maggieBrein.getTokens(text);
      const exactMatches = maggieBrein.getExactMatches(tokens);
      const fuzzyMatch = await maggieBrein.getFuzzyMatch(tokens);

      let response = "";

      if (fuzzyMatch) {
        response = await fuzzyMatch?.action(text, context, imageUrl);
      } else if (exactMatches) {
        response = await exactMatches[0]?.action(text, context, imageUrl);
      }

      if (!response) {
        switch (true) {
          case maggieBrein.needsToDecide(text):
            response = maggieMond.speakDecision(text);
            break;
          default:
            response = maggieMond.giveBasicAnswer();
        }
      }

      if (TIMEOUT_TRIGGER.includes(textInput) && !this.isMaggieInHoekForTimeout(0)) {
        this.setMaggieInHoekForTimeout(user);
        response = sample(TIMEOUT_ANSWER);
      }

      maggieBrein.pushMessage({ text: response, user: this.id });

      return response;
    } else {
      if (TIMEOUT_STOP_TRIGGER.includes(textInput) && this.isMaggieInHoekForTimeout(0) &&  user !== this.timeoutUser) {
        console.log("askstop1");
        return this.askForStopTimeout();
      } else {
        console.log("handlestop1");
        return this.handleTimeoutStopAnswer(textInput);
      }
    }
  };

  getMessageResponses = async (message, user) => {
    if (!this.isMaggieInHoekForTimeout(1)) {
      maggieBrein.pushMessage({ text: message, user });
      const latestMessages = maggieBrein?.messages;
      console.log("latest", latestMessages);

      const random = Math.floor(Math.random() * 60);
      if (random === 1) {
        const randomMessage = maggieMond.giveBasicAnswer();
        return [randomMessage];
      } else {
        const matches = maggieBrein.getMessageMatches(latestMessages);
        const responses = matches.reduce((result, match) => {
          const message = match.getMessage();
          if (Math.floor(Math.random() * match.pid) === 1 && message) {
            result.push(message);
            maggieBrein.pushMessage({ text: message, user: this.id });
          }
          return result;
        }, []);
        return responses;
      }
    }
  };

  setMaggieInHoekForTimeout(userWhoSetMaggieInHoek) {
    let min = Math.ceil(MIN_TIMEOUT);
    let max = Math.floor(MAX_TIMEOUT);
    this.timeoutUser = userWhoSetMaggieInHoek;
    this.timeoutMessageAmount = Math.floor(Math.random() * (max - min) + min);
  }

  isMaggieInHoekForTimeout(reduceWith) {
    if (this.timeoutMessageAmount > 1) {
      this.timeoutMessageAmount = this.timeoutMessageAmount - reduceWith;
      return true;
    } else {
      return false;
    }
  }

  getTalkAboutTimeoutAnswer() {
    let willAnswerAboutTimeout = Math.floor(Math.random() * RESPONSE_DURING_TIMEOUT_PID);
    if (willAnswerAboutTimeout == 1) {

      let customTimeoutResponse = {
        "%user%": "<@" + this.timeoutUser + ">",
      };
      let duringTimeoutAnswer = sample(DURING_TIMEOUT_ANSWER).replace(/%\w+%/g, function (all) {
        return customTimeoutResponse[all] || all;
      });
      return duringTimeoutAnswer;
    }
  }

  askForStopTimeout() {
    let timeoutStopUser = {
      "%user%": "<@" + this.timeoutUser + ">",
    };

    let timeoutStopQuestion = sample(TIMEOUT_STOP_ANSWER).replace(/%\w+%/g, function (all) {
      return timeoutStopUser[all] || all;
    });

    this.askForStopTimeoutInProgress = true;

    return timeoutStopQuestion;
  }

  handleTimeoutStopAnswer(message) {
    let response = "";
    if (TIMEOUT_STOP_POSITIVE.includes(message)) {
      console.log("positive");
      this.timeoutMessageAmount = 0;
      response = sample(TIMEOUT_STOP_POSITIVE_ANSWER);
    } else {
      console.log("negative");
      response = sample(TIMEOUT_STOP_NEGATIVE_ANSWER);
    }
    this.askForStopTimeoutInProgress = false;
    return response;
  } 
}

export { Maggie };
