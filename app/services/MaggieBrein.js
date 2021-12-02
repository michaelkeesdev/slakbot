import Fuse from "fuse.js";

import { BASIC_FOLLOWUP_TRIGGER } from "./../answers/questions/BasicFollowUpQuestion";

import { BYE_TRIGGER } from "./../answers/Bye";
import { GOODMORNING_TRIGGER } from "./../answers/Goodmorning";
import { TIMEOUT_STOP_TRIGGER } from "../answers/Timeout";
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
import { FOOD_TRIGGER } from "../answers/food/Food";
import { IMAGE_TRIGGER } from "../answers/image/Images";
import { BaseGameService } from "./game/BaseGameService";

const decisionService = new DecisionService();
const tokenizer = new TokenizerService();

const MAX_MESSAGES_MEM = 10;

const SIZE_DUPLICATE = 3;
const SIZE_MONOLOGUE = 8;
const PID_DUPLICATE = 3;
const PID_MONOLOGUE = 10;

class MaggieBrein {
  gameService;
  maggieMond;
  matches = this.getSimpeleMaggieMatches();
  messages = [];

  constructor(platform) {
    this.gameService = new BaseGameService(platform);
    this.maggieMond = new MaggieMond(platform);
  }

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

  playGame(textInput, user) {
    this.gameService.initGame(textInput, user);
    return this.gameService.playGame(textInput, user);
  }

  getSimpeleMaggieMatches() {
    return [
      { names: BYE_TRIGGER, action: () => this.maggieMond.sayBye() },
      { names: [COUNTRY_TRIGGER], action: () => this.maggieMond.sayCountry() },
      {
        names: GOODMORNING_TRIGGER,
        action: () => this.maggieMond.sayGoodMorning(),
      },
      { names: WHY_TRIGGER, action: () => this.maggieMond.sayWhy() },
      { names: HOW_TRIGGER, action: () => this.maggieMond.sayHow() },
      {
        names: HOW_YOU_DOING_TRIGGER,
        action: () => this.maggieMond.sayHowYouDoing(),
      },
      { names: JOKE_TRIGGER, action: () => this.maggieMond.sayJoke() },
      { names: HOWMUCH_TRIGGER, action: () => this.maggieMond.sayHowMuch() },
      { names: SLUIP_TRIGGER, action: async () => this.maggieMond.saySluip() },
      { names: THANKS_TRIGGER, action: () => this.maggieMond.sayThanks() },
      { names: WHEN_TRIGGER, action: () => this.maggieMond.sayWhen() },
      {
        names: WHERE_TRIGGER,
        action: (text) => this.maggieMond.sayWhere(text),
      },
      {
        names: WEETJES_TRIGGER,
        action: async () => await this.maggieMond.sayWeetje(),
      },
      {
        names: ["wie"],
        action: () => this.maggieMond.sayRandomUser(),
      },
      {
        names: ["wat"],
        action: (text) => this.maggieMond.sayWhat(text),
      },
      {
        names: ["tag"],
        action: (text) => this.maggieMond.tagUser(text),
      },
      {
        names: ["scheld", "scheldt"],
        action: (text) => this.maggieMond.scheldUser(text),
      },
      {
        names: SORRY_TRIGGER,
        action: (text) => this.maggieMond.saySorry(),
      },
      {
        names: ["verjaardag", "jarig", "jaardag", "verjaardagen"],
        action: (text) => this.maggieMond.sayBirthDay(text),
      },
      {
        names: ["hoelaat", "uur"],
        action: (text) => this.maggieMond.sayTime(text),
      },
      {
        names: ["youtube random", "zoek youtube", "muziek"],
        action: async (text) => await this.maggieMond.sayRandomYoutube(text),
      },
      {
        names: ["youtube exact", "geef video over"],
        action: async (text) => await this.maggieMond.sayExactYoutube(text),
      },
      {
        names: ["grietje", "wufke", "slet"],
        action: async () => await this.maggieMond.showGirl(),
      },
      {
        names: ["hoertjes", "hoertje", "pron", "madu", "mbali"],
        action: async (text) => await this.maggieMond.sayExactTube(text),
      },
      {
        names: ["cosplay"],
        action: async () => await this.maggieMond.showCosplay(),
      },
      { names: ["nsfw"], action: async () => await this.maggieMond.showNsfw() },
      {
        names: ["9gag", "ninegag", "meme"],
        action: async () => await this.maggieMond.showMeme(),
      },

      {
        names: ["nieuws", "news", "hln", "gazet"],
        action: async () => await this.maggieMond.readTheNews(),
      },
      {
        names: ["euromillions", "euro millions", "euromillions"],
        action: () => this.maggieMond.tellNextEuroMillionsDraw(),
      },
      {
        names: ["weer"],
        action: async (text) => {
          const city = text?.replace("weer", "");
          return await this.maggieMond.sayCurrentWeather(city);
        },
      },
      {
        names: ["pollution"],
        action: async (text) => {
          const city = text?.replace("pollution", "");
          return await this.maggieMond.sayCurrentWeatherPollution(city);
        },
      },
      {
        names: ["weer voorspelling", "voorspelling"],
        action: async (text) => {
          const city = text?.replace("voorspelling", "").replace("weer", "");
          return await this.maggieMond.sayForecastWeather(city);
        },
      },
      {
        names: ["zou", "doen", "doenbaar"],
        action: async (text, context, imageUrl) => {
          return await this.maggieMond.recognize(imageUrl);
        },
      },
      {
        names: ["maand"],
        action: async () => await this.maggieMond.sayMonth(),
      },
      {
        names: ["welk spel"],
        action: async () => await this.maggieMond.sayGame(),
      },
      {
        names: FOOD_TRIGGER,
        action: async (text) => {
          return await this.maggieMond.sayFood(text);
        },
      },
      {
        names: BASIC_FOLLOWUP_TRIGGER,
        action: () => this.maggieMond.askBasicFollowUpQuestion(),
      },
      {
        names: ["wie mol"],
        action: async () => this.maggieMond.sayMolName(),
      },
      {
        names: ["kleur"],
        action: () => this.maggieMond.sayColour(),
      },
      {
        names: ["wiki", "wikipedia"],
        action: async (text) => await this.maggieMond.sayWiki(text),
      },
      {
        names: ["wat is", "wie is", "vertel meer over"],
        action: async (text) => await this.maggieMond.sayWikiSummary(text),
      },
      {
        names: IMAGE_TRIGGER,
        action: async (text) => await this.maggieMond.sayImage(text),
      },
      {
        names: [TIMEOUT_STOP_TRIGGER],
        action: () => this.maggieMond.askForStopTimeout(),
      },
      {
        names: ["mop", "mopje", "grapje"],
        action: async (text) => await this.maggieMond.sayMopje(text),
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
            return this.maggieMond.sayMonologue();
          }
        },
        pid: PID_MONOLOGUE,
      },
      {
        isMatchFn: () =>
          HOER_TRIGGER.includes(messages[messages.length - 1]?.text),
        getMessage: () => {
          return this.maggieMond.sayHoer();
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
  }

  needsToDecide(text) {
    return decisionService.needsToDecide(text);
  }
}

export { MaggieBrein };
