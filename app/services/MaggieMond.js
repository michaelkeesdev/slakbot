
import { sample } from 'lodash';

import { BASIC_FOLLOWUP_QUESTION } from "./../answers/questions/BasicFollowUpQuestion";

import { BYE_ANSWER } from "./../answers/Bye";
import { GOODMORNING_ANSWER } from "./../answers/Goodmorning";
import { HOW_ANSWER } from "./../answers/How";
import { JOKE_ANSWER } from "./../answers/Joke";
import { THANKS_ANSWER } from "./../answers/Thanks";
import { HOWMUCH_ANSWER } from "./../answers/Howmuch";
import { WEETJES_ANSWER } from "./../answers/Weetjes";
import { WHEN_ANSWER } from "./../answers/When";
import { WHERE_ANSWER } from "./../answers/Where";

import { BasicAnweringService } from "./BasicAnsweringService"
import { UserService } from "./user/UserService";
import { NewsService } from "./news/NewsService";
import { NineGagService } from "./9gag/9gagService";
import { YoutubeService } from "./google/YoutubeService";
import { DecisionService } from "./decision/DecisionService";
import { EuroMillionsService } from './gambling/EuroMillionsService';
import { WeatherService } from './weather/WeatherService';
import { TimeService } from './time/TimeService';
import { HttpClient } from '../../httpClient';

const basicAnweringService = new BasicAnweringService();

const httpClient = new HttpClient();
const userService = new UserService();
const ninegagService = new NineGagService();
const youtubeService = new YoutubeService();
const decisionService = new DecisionService();
const euroMillionsService = new EuroMillionsService();

const weatherService = new WeatherService(httpClient);
const newsService = new NewsService(httpClient);
const timeService = new TimeService();

class MaggieMond {
  askBasicFollowUpQuestion() { return sample(BASIC_FOLLOWUP_QUESTION); }

  giveBasicAnswer() { return basicAnweringService.buildAnswerPhrase(); }
  sayBye() { return sample(BYE_ANSWER); }
  sayGoodMorning() { return sample(GOODMORNING_ANSWER); }
  sayHow() { return sample(HOW_ANSWER); }
  sayHowMuch() { return sample(HOWMUCH_ANSWER); }
  sayJoke() { return sample(JOKE_ANSWER); }
  sayThanks() { return sample(THANKS_ANSWER); }
  sayWeetje() { return sample(WEETJES_ANSWER); }
  sayWhen() { return sample(WHEN_ANSWER); }
  sayWhere() { return sample(WHERE_ANSWER); }

  sayRandomUser() { return userService.getRandomUser(); }
  showMeme() { return ninegagService.get9gagBasic(); }
  showGirl() { return ninegagService.get9gagGirl(); }
  sayTime(text) { return timeService.getRandomTime(text); }
  saySluip() { return youtubeService.getSluip(); }
  sayRandomYoutube(text) { return youtubeService.getRandomYoutube(text); }
  sayExactYoutube(text) { return youtubeService.getExactYoutube(text); }
  readTheNews() { return newsService.getNewsPosts(); }
  sayCurrentWeather(city) { return weatherService.getCurrentWeather(city); }

  speakDecision(text) { return decisionService.makeDecision(text) }

  tellNextEuroMillionsDraw() { return euroMillionsService.getNextDraw(); }
}

export { MaggieMond };





