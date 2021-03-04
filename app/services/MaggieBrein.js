import Fuse from "fuse.js";

import { BASIC_FOLLOWUP_TRIGGER } from "./../answers/questions/BasicFollowUpQuestion";

import { BYE_TRIGGER } from "./../answers/Bye";
import { GOODMORNING_TRIGGER } from "./../answers/Goodmorning";
import { HOW_TRIGGER } from "./../answers/How";
import { WHY_TRIGGER } from "./../answers/Why";
import { JOKE_TRIGGER } from "./../answers/Joke";
import { THANKS_TRIGGER } from "./../answers/Thanks";
import { HOWMUCH_TRIGGER } from "./../answers/Howmuch";
import { SLUIP_TRIGGER } from "./../answers/youtube/Sluip";
import { WEETJES_TRIGGER } from "./../answers/weetjes/Weetjes";
import { WHEN_TRIGGER } from "./../answers/When";
import { WHERE_TRIGGER } from "./../answers/Where";

import { DecisionService } from "./answering/DecisionService";
import { MaggieMond } from "./MaggieMond";
import { TokenizerService } from "./tokenizer/Tokenizer";
import { HOW_YOU_DOING_TRIGGER } from "./../answers/HowYouDoing";
import { flatMap } from "lodash";
import { COUNTRY_TRIGGER } from "../answers/Countries";
import { SORRY_TRIGGER } from "../answers/Sorry";
import { HOER_TRIGGER } from "../answers/Hoer";

const decisionService = new DecisionService();
const maggieMond = new MaggieMond();
const tokenizer = new TokenizerService();

const MAX_MESSAGES_MEM = 10;

const SIZE_DUPLICATE = 3;
const SIZE_MONOLOGUE = 12;
const PID_DUPLICATE = 3;
const PID_MONOLOGUE = 10;

class MaggieBrein {
  matches = this.getSimpeleMaggieMatches();
  messages = [];

  getFuzzyMatch = async (tokens) => {
    const tokenizedMatches = this.matches?.flatMap((match) =>
      match?.names?.flatMap((name) => ({
        ...match,
        names: this.getTokens(name),
      }))
    );

    let fuse = new Fuse(tokenizedMatches, {
      keys: ["names"],
      includeScore: true,
      isCaseSensitive: false,
      ignoreLocation: false,
    });

    const searchTokensPromises = tokens.map(async (token) => {
      return new Promise((resolve, reject) => {
        const matched = fuse.search({ names: token });
        matched ? resolve(matched) : reject([]);
      });
    });
    const result = await Promise.all(searchTokensPromises);
    const flatten = flatMap(result);
    const reduced = flatten.reduce(function (results, match) {
      const matchedResults = results[match.refIndex]?.values || [];
      matchedResults.push(match);

      results[match.refIndex] = {
        ...results[match.refIndex],
        values: matchedResults,
      };

      results[match.refIndex]["score"] = results[match.refIndex]?.score
        ? results[match.refIndex]?.score + match?.score
        : match?.score;
      results[match.refIndex]["avgScore"] =
        results[match.refIndex].score / matchedResults?.length;
      results[match.refIndex]["distanceScore"] =
        tokens?.length - matchedResults?.length;
      results[match.refIndex]["finalScore"] =
        results[match.refIndex].avgScore +
        results[match.refIndex].distanceScore *
          results[match.refIndex].avgScore;
      return results;
    }, {});
    const reducedKeys = Object.keys(reduced);
    const sorted = reducedKeys.sort(
      (k1, k2) => reduced[k1]?.finalScore - reduced[k2]?.finalScore
    );
    const sortedList = sorted.map((sort) => reduced[sort]);
    const filtered = sortedList.filter((sort) => sort?.finalScore < 0.001);
    return filtered?.length ? filtered[0].values[0].item : null;
  };

  getExactMatches = (tokens) => {
    return this.matches.filter((match) =>
      tokens.some((token) => {
        //const nameTokens = match?.names?.flatMap((name) => this.getTokens(name));
        return match.names.includes(token);
      })
    );
  };

  getTokens = (text) => {
    return tokenizer.tokenize(text);
  };

  getSimpeleMaggieMatches() {
    return [
      { names: BYE_TRIGGER, action: () => maggieMond.sayBye() },
      { names: [COUNTRY_TRIGGER], action: () => maggieMond.sayCountry() },
      { names: GOODMORNING_TRIGGER, action: () => maggieMond.sayGoodMorning() },
      { names: WHY_TRIGGER, action: () => maggieMond.sayWhy() },
      { names: HOW_TRIGGER, action: () => maggieMond.sayHow() },
      {
        names: HOW_YOU_DOING_TRIGGER,
        action: () => maggieMond.sayHowYouDoing(),
      },
      { names: JOKE_TRIGGER, action: () => maggieMond.sayJoke() },
      { names: HOWMUCH_TRIGGER, action: () => maggieMond.sayHowMuch() },
      { names: SLUIP_TRIGGER, action: async () => maggieMond.saySluip() },
      { names: THANKS_TRIGGER, action: () => maggieMond.sayThanks() },
      { names: WEETJES_TRIGGER, action: () => maggieMond.sayWeetje() },
      { names: WHEN_TRIGGER, action: () => maggieMond.sayWhen() },
      { names: WHERE_TRIGGER, action: () => maggieMond.sayWhere() },
      {
        names: ["wie"],
        action: () => maggieMond.sayRandomUser(),
      },
      {
        names: ["wat"],
        action: () => maggieMond.sayWhat(),
      },
      {
        names: ["tag"],
        action: (text) => maggieMond.tagUser(text),
      },
      {
        names: SORRY_TRIGGER,
        action: (text) => maggieMond.saySorry(),
      },
      {
        names: ["verjaardag", "jarig", "jaardag", "verjaardagen"],
        action: (text) => maggieMond.sayBirthDay(text),
      },
      {
        names: ["hoelaat", "uur"],
        action: (text) => maggieMond.sayTime(text),
      },
      {
        names: ["youtube random", "zoek youtube", "muziek"],
        action: async (text) => await maggieMond.sayRandomYoutube(text),
      },
      {
        names: ["youtube exact", "geef video over"],
        action: async (text) => await maggieMond.sayExactYoutube(text),
      },
      {
        names: ["grietje", "wufke", "slet"],
        action: async () => await maggieMond.showGirl(),
      },
      {
        names: ["cosplay"],
        action: async () => await maggieMond.showCosplay(),
      },
      { names: ["nsfw"], action: async () => await maggieMond.showNsfw() },
      {
        names: ["9gag", "ninegag", "meme", "foto"],
        action: async () => await maggieMond.showMeme(),
      },
      {
        names: ["nieuws", "vandaag gebeurd", "news", "hln", "gazet"],
        action: async () => await maggieMond.readTheNews(),
      },
      {
        names: ["euromillions", "euro millions", "euromillions"],
        action: () => maggieMond.tellNextEuroMillionsDraw(),
      },
      {
        names: ["weer"],
        action: async (text) => {
          const city = text?.replace("weer", "");
          return await maggieMond.sayCurrentWeather(city);
        },
      },
      {
        names: ["pollution"],
        action: async (text) => {
          const city = text?.replace("pollution", "");
          return await maggieMond.sayCurrentWeatherPollution(city);
        },
      },
      {
        names: ["weer voorspelling", "voorspelling"],
        action: async (text) => {
          const city = text?.replace("voorspelling", "").replace("weer", "");
          return await maggieMond.sayForecastWeather(city);
        },
      },
      {
        names: ["zou", "doen", "doenbaar"],
        action: async (text, context, imageUrl) => {
          return await maggieMond.recognize(imageUrl);
        },
      },
      {
        names: ["maand"],
        action: async () => await maggieMond.sayMonth(),
      },
      {
        names: ["gerecht", "spijs", "maal"],
        action: async (text) => {
          const suggest = text?.replace("gerecht", "").replace("maal", "").replace("spijs", "");
          return await maggieMond.sayFood(suggest) 
        },
      },
      {
        names: BASIC_FOLLOWUP_TRIGGER,
        action: () => maggieMond.askBasicFollowUpQuestion(),
      },
    ];
  }

  getMessageMatches = (messages) => {
    const matches = [
      {
        isMatchFn: () => messages?.length >= SIZE_DUPLICATE,
        getMessage: () => {
          if (this.isDuplicateAnswer(messages, SIZE_DUPLICATE)) {
            return messages[messages?.length - 1]?.text;
          }
        },
        pid: PID_DUPLICATE,
      },
      {
        isMatchFn: () => messages?.length >= SIZE_MONOLOGUE,
        getMessage: () => {
          if (this.isMonologueAnswer(messages, SIZE_MONOLOGUE)) {
            return maggieMond.sayMonologue();
          }
        },
        pid: PID_MONOLOGUE,
      },
      {
        isMatchFn: () =>
          HOER_TRIGGER.includes(messages[messages.length - 1]?.text),
        getMessage: () => {
          return maggieMond.sayHoer();
        },
        pid: 5,
      },
    ];
    return matches.filter((match) => match?.isMatchFn());
  };

  // TODO: MOVE logic TO MaggieBrein
  isDuplicateAnswer = (messages, size) => {
    const startIndex = messages?.length - size;
    const endIndex = messages?.length;
    const messagesBag = messages?.slice(startIndex, endIndex);

    console.log("messagesBag", messagesBag);
    return messagesBag?.every(
      (m) => m.text === messagesBag[0].text && m.user !== this.id
    );
  };

  isMonologueAnswer = (messages, size) => {
    const startIndex = messages.length - size;
    const endIndex = messages.length;
    const messagesBag = messages.slice(startIndex, endIndex);
    return messagesBag?.every((m) => m.user === messagesBag[0].user);
  };

  pushMessage(message) {
    if (this.messages?.length > MAX_MESSAGES_MEM) {
      this.messages.shift();
    }
    this.messages.push(message);
    console.log("MESSAGES: ", this.messages);
  }

  needsToDecide(text) {
    return decisionService.needsToDecide(text);
  }
}

export { MaggieBrein };
