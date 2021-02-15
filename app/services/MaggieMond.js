
import { sample } from 'lodash';

import { BASIC_ANSWER } from "../answers/Basic.js";
import { BYE_ANSWER } from "../answers/Bye";
import { GOODMORNING_ANSWER } from "../answers/GoodMorning";
import { HOW_ANSWER } from "../answers/How";
import { THANKS_ANSWER } from "../answers/Thanks";
import { HOWMUCH_ANSWER } from "../answers/Howmuch";
import { WEETJES_ANSWER } from "../answers/Weetjes";
import { WHEN_ANSWER } from "../answers/When";
import { WHERE_ANSWER } from "../answers/Where";

import { UserService } from "./user/UserService";
import { NineGagService } from "./9gag/9gagService";
import { YoutubeService } from "./google/YoutubeService";
import { DecisionService } from "./decision/DecisionService";

const userService = new UserService();
const ninegagService = new NineGagService();
const youtubeService = new YoutubeService();
const decisionService = new DecisionService();

class MaggieMond {
  sayBasicMessage() { return sample(BASIC_ANSWER); }
  sayBye() { return sample(BYE_ANSWER); }
  sayGoodMorning() { return sample(GOODMORNING_ANSWER); }
  sayHow() { return sample(HOW_ANSWER); }
  sayHowMuch() { return sample(HOWMUCH_ANSWER); }
  sayThanks() { return sample(THANKS_ANSWER); }
  sayWeetje() { return sample(WEETJES_ANSWER); }
  sayWhen() { return sample(WHEN_ANSWER); }
  sayWhere() { return sample(WHERE_ANSWER); }

  sayRandomUser() { return userService.getRandomUser(); }
  showMeme() { return ninegagService.get9gagBasic(); }
  showGirl() { return ninegagService.get9gagGirl(); }
  saySluip() { return youtubeService.getSluip(); }
  sayRandomYoutube(text) { return youtubeService.getRandomYoutube(text); }
  sayExactYoutube(text) { return youtubeService.getExactYoutube(text); }

  makeDecision(text) { return decisionService.makeDecision(text) }
}

export { MaggieMond };





