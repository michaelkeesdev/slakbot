import { HOER_TRIGGER } from "./answers/Hoer";
import { EXCUSES_ANSWER } from "./answers/Excuses";

import { MaggieBrein } from "./services/MaggieBrein";
import { MaggieMond } from "./services/MaggieMond";

const maggieMond = new MaggieMond();
const maggieBrein = new MaggieBrein();

const SIZE_DUPLICATE = 3;
const SIZE_MONOLOGUE = 7;
const PID_DUPLICATE = 3;
const PID_MONOLOGUE = 5;

const MIN_TIMEOUT = 3;
const MAX_TIMEOUT = 20;


class Maggie {
  id = "U01NEE5JYSY";
  timeoutMessageAmount = 0;

  getMentionResponse = async (textInput, context, files) => {
    if (!this.isMaggieInHoekForTimeout()) {
      const text = textInput?.replace(`<@${context?.botUserId}>`, "").trim();
      let imageUrl;
      if (files?.length > 0) {
        imageUrl = files[0]?.thumb_960;
      }
      const tokens = maggieBrein.getTokens(text);
      const exactMatches = await maggieBrein.getExactMatches(tokens);
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

      if (EXCUSES_ANSWER.includes(response) && !this.isMaggieInHoekForTimeout()) {
        this.setMaggieInHoekForTimeout();
      }

      maggieBrein.pushMessage({ text: response, user: this.id });

      return response;
    } else {
      this.reduceTimeout();
    }
  };

  getMessageResponses = async (message, user) => {
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
  };

  setMaggieInHoekForTimeout() {
    let min = Math.ceil(MIN_TIMEOUT);
    let max = Math.floor(MAX_TIMEOUT);
    this.timeoutMessageAmount = Math.floor(Math.random() * (max - min) + min);
    console.log("new timeout:", this.timeoutMessageAmount);
  }

  isMaggieInHoekForTimeout() {
    return this.timeoutMessageAmount > 0;
  }

  reduceTimeout() {
    this.timeoutMessageAmount--;
    console.log("new reduced timeout:", this.timeoutMessageAmount);
  }
}

export { Maggie };
