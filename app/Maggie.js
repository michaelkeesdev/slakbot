import { sample } from "lodash";

import {
  DURING_TIMEOUT_ANSWER,
  TIMEOUT_STOP_ANSWER,
  TIMEOUT_STOP_POSITIVE,
  TIMEOUT_STOP_NEGATIVE,
  TIMEOUT_STOP_TRIGGER,
  TIMEOUT_STOP_POSITIVE_ANSWER,
  TIMEOUT_STOP_NEGATIVE_ANSWER,
  TIMEOUT_TRIGGER,
  TIMEOUT_ANSWER,
} from "./answers/Timeout";

import { MaggieBrein } from "./services/MaggieBrein";
import { MaggieMond } from "./services/MaggieMond";

const MIN_TIMEOUT = 50;
const MAX_TIMEOUT = 300;
const RESPONSE_DURING_TIMEOUT_PID = 3;

class Maggie {
  app;
  token;
  cronOptions;
  id = "U01NEE5JYSY";
  timeoutUser;
  timeoutMessageAmount = 0;

  maggieMond;
  maggieBrein;

  constructor(platform) {
    this.maggieMond = new MaggieMond(platform);
    this.maggieBrein = new MaggieBrein(platform);
  }

  getMentionResponse = async (textInput, context, files, user) => {
    if (!this.isMaggieInHoekForTimeout(1)) {
      const text = textInput?.replace(`<@${context?.botUserId}>`, "").trim();
      this.maggieBrein.setMood(text);
      let imageUrl;
      if (files?.length > 0) {
        imageUrl = files[0]?.thumb_960;
      }
      const tokens = this.maggieBrein.getTokens(text);
      const exactMatches = this.maggieBrein.getExactMatches(tokens);
      const fuzzyMatch = await this.maggieBrein.getFuzzyMatch(tokens);

      let response = "";

      if (fuzzyMatch) {
        response = await fuzzyMatch?.action(text, context, imageUrl);
      } else if (exactMatches) {
        response = await exactMatches[0]?.action(text, context, imageUrl);
      }

      let gamePlay = this.maggieBrein.playGame(text, user);
      if (gamePlay) {
        response = gamePlay;
      }

      if (!response) {
        if (text.split(" of ").length > 1) {
          response = this.maggieMond.makeDecision(text);
        } else {
          response = this.maggieMond.giveBasicAnswer(
            text,
            this.maggieBrein.getMood()
          );
        }
      }

      if (
        TIMEOUT_TRIGGER.includes(textInput) &&
        !this.isMaggieInHoekForTimeout(0)
      ) {
        this.setMaggieInHoekForTimeout(user);
        response = sample(TIMEOUT_ANSWER);
      }

      this.maggieBrein.pushMessage({ text: response, user: this.id });

      return response;
    } else {
      if (this.isMaggieInHoekForTimeout(0)) {
        return this.handleTimeoutStopAnswer(textInput, user);
      }
    }
  };

  getMessageResponses = async (message, user) => {
    if (!this.isMaggieInHoekForTimeout(1)) {
      this.maggieBrein.pushMessage({ text: message, user });
      const latestMessages = this.maggieBrein?.messages;
      console.log("latest", latestMessages);

      const random = Math.floor(Math.random() * 60);
      if (random === 1) {
        const randomMessage = this.maggieMond.giveBasicAnswer(message);
        return [randomMessage];
      } else {
        const matches = this.maggieBrein.getMessageMatches(latestMessages);
        const responses = matches.reduce((result, match) => {
          const message = match.getMessage();
          if (Math.floor(Math.random() * match.pid) === 1 && message) {
            result.push(message);
            this.maggieBrein.pushMessage({ text: message, user: this.id });
          }
          return result;
        }, []);
        return responses;
      }
    }
  };

  setMaggieInHoekForTimeout = (userWhoSetMaggieInHoek) => {
    let min = Math.ceil(MIN_TIMEOUT);
    let max = Math.floor(MAX_TIMEOUT);
    this.timeoutUser = userWhoSetMaggieInHoek;
    this.timeoutMessageAmount = Math.floor(Math.random() * (max - min) + min);
  };

  isMaggieInHoekForTimeout = (reduceWith) => {
    if (this.timeoutMessageAmount > 1) {
      this.timeoutMessageAmount = this.timeoutMessageAmount - reduceWith;
      return true;
    } else {
      return false;
    }
  };

  getTalkAboutTimeoutAnswer = () => {
    let willAnswerAboutTimeout = Math.floor(
      Math.random() * RESPONSE_DURING_TIMEOUT_PID
    );
    if (willAnswerAboutTimeout == 1) {
      let customTimeoutResponse = {
        "%user%": "<@" + this.timeoutUser + ">",
      };
      let duringTimeoutAnswer = sample(DURING_TIMEOUT_ANSWER).replace(
        /%\w+%/g,
        function (all) {
          return customTimeoutResponse[all] || all;
        }
      );
      return duringTimeoutAnswer;
    }
  };

  askForStopTimeout = () => {
    let timeoutStopUser = {
      "%user%": "<@" + this.timeoutUser + ">",
    };

    let timeoutStopQuestion = sample(TIMEOUT_STOP_ANSWER).replace(
      /%\w+%/g,
      function (all) {
        return timeoutStopUser[all] || all;
      }
    );

    return timeoutStopQuestion;
  };

  handleTimeoutStopAnswer = (message, user) => {
    let response = "";
    if (user === this.timeoutUser) {
      if (
        TIMEOUT_STOP_TRIGGER.includes(message) ||
        TIMEOUT_STOP_POSITIVE.includes(message)
      ) {
        this.timeoutMessageAmount = 0;
        response = sample(TIMEOUT_STOP_POSITIVE_ANSWER);
      } else if (TIMEOUT_STOP_NEGATIVE.includes(message)) {
        response = sample(TIMEOUT_STOP_NEGATIVE_ANSWER);
      }
      return response;
    } else {
      return this.askForStopTimeout();
    }
  };
}

export { Maggie };
