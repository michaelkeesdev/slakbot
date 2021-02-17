import Fuse from "fuse.js";

import { BASIC_FOLLOWUP_TRIGGER } from "./../answers/questions/BasicFollowUpQuestion";

import { BYE_TRIGGER } from "./../answers/Bye";
import { GOODMORNING_TRIGGER } from "./../answers/Goodmorning";
import { HOW_TRIGGER } from "./../answers/How";
import { JOKE_TRIGGER } from "./../answers/Joke";
import { THANKS_TRIGGER } from "./../answers/Thanks";
import { HOWMUCH_TRIGGER } from "./../answers/Howmuch";
import { SLUIP_TRIGGER } from "./../answers/youtube/Sluip";
import { WEETJES_TRIGGER } from "./../answers/Weetjes";
import { WHEN_TRIGGER } from "./../answers/When";
import { WHERE_TRIGGER } from "./../answers/Where";

import { DecisionService } from "./decision/DecisionService";
import { MaggieMond } from "./MaggieMond";

const decisionService = new DecisionService();
const maggieMond = new MaggieMond();

class MaggieBrein {
    matches = this.getSimpeleMaggieMatches();

    getFuzzyMatches = (text) => {
        let fuse = new Fuse(this.matches, { keys: ["names"] });
        return fuse.search(text);
    }
    
    getExactMatches = (text) => {
        return this.matches
          .flatMap((match) => {
            return match?.names?.map((name) => {
                return text?.match(new RegExp(`^${name}`)) && match;
            });
          })
          .filter((match) => match);
    };

    getSimpeleMaggieMatches() {
        return [
            { names: BASIC_FOLLOWUP_TRIGGER, action: () => maggieMond.askBasicFollowUpQuestion(), },
            { names: BYE_TRIGGER, action: () => maggieMond.sayBye(), },
            { names: GOODMORNING_TRIGGER, action: () => maggieMond.sayGoodMorning(), },
            { names: HOW_TRIGGER, action: () => maggieMond.sayHow(), },
            { names: JOKE_TRIGGER, action: () => maggieMond.sayJoke(), },
            { names: HOWMUCH_TRIGGER, action: () => maggieMond.sayHowMuch(), },
            { names: SLUIP_TRIGGER, action: async () => maggieMond.saySluip(), },
            { names: THANKS_TRIGGER, action: () => maggieMond.sayThanks(), },
            { names: WEETJES_TRIGGER, action: () => maggieMond.sayWeetje(), },
            { names: WHEN_TRIGGER, action: () => maggieMond.sayWhen(), },
            { names: WHERE_TRIGGER, action: () => maggieMond.sayWhere(), },
            { names: ["tag", "wie"], action: () => `<@${maggieMond.sayRandomUser()}>` },
            {
                names: ["zoek", "zoek youtube", "muziek", "random"],
                action: async (text) => await maggieMond.sayRandomYoutube(text),
            },
            {
                names: ["youtube", "exact", "zoek exact", "geef video over"],
                action: async (text) => await maggieMond.sayExactYoutube(text),
            },
            { names: ["grietje", "wufke", "slet"], action: async () => await maggieMond.showGirl(), },
            { names: ["9gag", "ninegag", "meme", "foto"], action: async () => await maggieMond.showMeme(), },
            {
                names: [
                    "nieuws",
                    "vandaag gebeurd",
                    "news",
                    "vandaag",
                    "nieuw",
                    "hln",
                    "gazet",
                ],
                action: async () => await maggieMond.readTheNews(),
            },
            { names: ["cijfers euromillions", "euro millions", "euromillions", "geef euromillions", "wat zijn de euromillions"], action: () => maggieMond.tellNextEuroMillionsDraw(), },
            { names: ["weer"], action: async (text) => { 
                const city = text?.replace('weer', '');
                return await maggieMond.sayCurrentWeather(city);
            }},

        ];
    }

    needsToDecide(text) { return decisionService.needsToDecide(text) }
}

export { MaggieBrein };