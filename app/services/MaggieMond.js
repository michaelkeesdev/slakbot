
import { sample } from 'lodash';

import { BASIC_FOLLOWUP_QUESTION } from "./../answers/questions/BasicFollowUpQuestion";

import { BYE_ANSWER } from "./../answers/Bye";
import { COUNTRY_LIST } from "./../answers/Countries"
import { GOODMORNING_ANSWER } from "./../answers/Goodmorning";
import { HOW_ANSWER } from "./../answers/How";
import { JOKE_ANSWER } from "./../answers/Joke";
import { THANKS_ANSWER } from "./../answers/Thanks";
import { WEETJES_ANSWER } from "../answers/weetjes/Weetjes";
import { WHEN_ANSWER } from "./../answers/When";
import { WHERE_ANSWER } from "./../answers/Where";
import { SORRY_ANSWER } from "./../answers/Sorry";

import { BasicAnweringService } from "./BasicAnsweringService"
import { UserService } from "./user/UserService";
import { BirthdayService } from "./user/BirthdayService"
import { NewsService } from "./news/NewsService";
import { NineGagService } from "./9gag/9gagService";
import { YoutubeService } from "./google/YoutubeService";
import { DecisionService } from "./decision/DecisionService";
import { EuroMillionsService } from './gambling/EuroMillionsService';
import { WeatherService } from './weather/WeatherService';
import { TimeService } from './time/TimeService';
import { HttpClient } from '../../httpClient';
import { DeviantArtService } from "./deviantart/deviantArtService";
import { HowMuchService } from './HowMuchService';
import { MONTH_ANSWERS } from '../answers/Month';
import { HowService } from './hoe/HowService';
import { WhyService } from './why/WhyService';
import { NOUNS } from '../answers/words/RandomNouns';
import { ImageRecognitionService } from './recognition/ImageRecognition';

const basicAnweringService = new BasicAnweringService();

const howService = new HowService();
const whyService = new WhyService();
const httpClient = new HttpClient();
const userService = new UserService();
const birthdayService = new BirthdayService();
const ninegagService = new NineGagService();
const deviantArtService = new DeviantArtService();
const youtubeService = new YoutubeService();
const decisionService = new DecisionService();
const euroMillionsService = new EuroMillionsService();
const howMuchService = new HowMuchService();

const weatherService = new WeatherService(httpClient);
const newsService = new NewsService(httpClient);
const recognitionService = new ImageRecognitionService(httpClient);
const timeService = new TimeService();

class MaggieMond {
  askBasicFollowUpQuestion() { return sample(BASIC_FOLLOWUP_QUESTION); }

  giveBasicAnswer() { return basicAnweringService.buildAnswerPhrase(); }
  sayBye() { return sample(BYE_ANSWER); }
  sayBirthDay(text) { return birthdayService.getBirthday(text); }
  sayCountry() { return sample(COUNTRY_LIST).name; }
  sayGoodMorning() { return sample(GOODMORNING_ANSWER); }
  sayHow() { return howService.getHowAnswer(); }
  sayHowMuch() { return  howMuchService.giveNumber() }
  sayHowYouDoing() { return basicAnweringService.buildAnswerToHowYouDoingPhrase(); }
  sayJoke() { return sample(JOKE_ANSWER); }
  sayThanks() { return sample(THANKS_ANSWER); }
  sayWeetje() { return sample(WEETJES_ANSWER); }
  sayWelNiet() { return basicAnweringService.buildAnswerToWelNietPhrase(); }
  sayWhen() { return sample(WHEN_ANSWER); }
  sayWhere() { return sample(WHERE_ANSWER); }
  sayMonth() { return sample(MONTH_ANSWERS); }
  sayWhy() { return whyService.getWhyAnswer() }
  sayWhat() { return sample(NOUNS) }

  sayRandomUser() { return userService.getRandomUser(); }
  tagUser(text) { return userService.tagUser(text); }

  showMeme() { return ninegagService.get9gagBasic(); }
  showGirl() { return ninegagService.get9gagGirl(); }
  showCosplay() { return deviantArtService.getDeviant('cosplay'); }
  showNsfw() { return deviantArtService.getDeviant('nude-art'); }
  sayTime(text) { return timeService.getRandomTime(text); }
  saySluip() { return youtubeService.getSluip(); }
  sayRandomYoutube(text) { return youtubeService.getRandomYoutube(text); }
  sayExactYoutube(text) { return youtubeService.getExactYoutube(text); }
  readTheNews() { return newsService.getNewsPosts(); }
  sayCurrentWeather(city) { return weatherService.getCurrentWeather(city); }
  sayCurrentWeatherPollution(city) { return weatherService.getCurrentPolution(city); }
  sayForecastWeather(city) { return weatherService.getAllWeatherInfo(city); }

  speakDecision(text) { return decisionService.makeDecision(text) }

  tellNextEuroMillionsDraw() { return euroMillionsService.getNextDraw(); }
  recognize(imageUrl) { return recognitionService.get(imageUrl) }

  saySorry() {return sample(SORRY_ANSWER)}
}

export { MaggieMond };





