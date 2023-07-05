import { sample } from "lodash";

import { App } from "@slack/bolt";
import { BASIC_FOLLOWUP_QUESTION } from "./../answers/questions/BasicFollowUpQuestion";

import { BYE_ANSWER } from "./../answers/Bye";
import { COUNTRY_LIST } from "./../answers/Countries";
import { GOODMORNING_ANSWER } from "./../answers/Goodmorning";
import { JOKE_ANSWER } from "./../answers/Joke";
import { THANKS_ANSWER } from "./../answers/Thanks";
import { WHEN_ANSWER } from "./../answers/When";
import { SORRY_ANSWER } from "./../answers/Sorry";
import { TIMEOUT_STOP_PLACEHOLDER } from "../answers/Timeout";

import { BaseAnweringServiceV2 } from "./answering/BaseAnsweringServiceV2";
import {
  BaseAnweringService,
  COMMAND_DECISION,
  COMMAND_HOW,
  COMMAND_HOWMUCH,
  COMMAND_HOWYOUDOING,
  COMMAND_WHAT,
  COMMAND_WHERE,
  COMMAND_WHY,
  COMMAND_YESNODONTKNOW,
} from "./answering/BaseAnsweringService";
import { UserService } from "./user/UserService";
import { BirthdayService } from "./user/BirthdayService";
import { NewsService } from "./news/NewsService";
import { NineGagService } from "./9gag/9gagService";
import { FoodService } from "./food/FoodService";
import { YoutubeService } from "./google/YoutubeService";
import { TubeService } from "./google/TubeService";
import { EuroMillionsService } from "./game/EuroMillionsService";
import { WeatherService } from "./weather/WeatherService";
import { TimeService } from "./time/TimeService";
import { HttpClient } from "../httpClient";
import { DeviantArtService } from "./deviantart/deviantArtService";
import { MONTH_ANSWERS } from "../answers/Month";
import { GAME_ANSWERS } from "../answers/Game";
import { COLOURS } from "../answers/words/Colours";
import { ImageRecognitionService } from "./recognition/ImageRecognition";
import { MONOLOGUE } from "../answers/Monologue";
import { HOER } from "../answers/Hoer";
import { TagService } from "./user/TagService";
import { TokenizerService } from "./tokenizer/Tokenizer";
import { MolService } from "./tv/MolService";
import { TourService } from "./tv/TourService";
import { WikiService } from "./wiki/WikiService";
import { ImageService } from "./google/ImageService";
import { PoepService } from "./game/PoepService";
import { MopService } from "./mop/MopService";
import { PolitiekService } from "./politiek/PolitiekService";

const baseAnweringService = new BaseAnweringService();
const baseAnweringServicev2 = new BaseAnweringServiceV2();

const httpClient = new HttpClient();
const userService = new UserService();
const birthdayService = new BirthdayService();
const ninegagService = new NineGagService();
const deviantArtService = new DeviantArtService();
const youtubeService = new YoutubeService();
const tubeService = new TubeService();
const euroMillionsService = new EuroMillionsService();

const tokenizer = new TokenizerService();
const weatherService = new WeatherService(httpClient);
const newsService = new NewsService(httpClient);
const recognitionService = new ImageRecognitionService(httpClient);
const foodService = new FoodService(httpClient, tokenizer);
const timeService = new TimeService();
const molService = new MolService();
const tourService = new TourService();
const wikiService = new WikiService(httpClient);
const imageService = new ImageService();
const poepService = new PoepService();
const mopService = new MopService();
const politiekService = new PolitiekService();

class MaggieMond {
  tagService;

  constructor(platform) {
    this.tagService = new TagService(platform);
  }

  // BASE ANSWER SERVICE

  giveBasicAnswer(text, mood) {
    return baseAnweringServicev2.answer(COMMAND_YESNODONTKNOW, mood, text);
  }

  makeDecision(text) {
    return baseAnweringServicev2.answer(COMMAND_DECISION, "mood", text);
  }

  sayHow(text) {
    return baseAnweringServicev2.answer(COMMAND_HOW, "mood", text);
  }

  sayHowMuch(text) {
    return baseAnweringServicev2.answer(COMMAND_HOWMUCH, "mood", text);
  }

  sayHowYouDoing(text, mood) {
    return baseAnweringServicev2.answer(COMMAND_HOWYOUDOING, mood, text);
  }

  sayWhat(text) {
    return baseAnweringServicev2.answer(COMMAND_WHAT, "mood", text);
  }

  sayWhere(text) {
    return baseAnweringServicev2.answer(COMMAND_WHERE, "mood", text);
  }

  sayWhy(text) {
    return baseAnweringServicev2.answer(COMMAND_WHY, "mood", text);
  }

  // CUSTOM //

  askBasicFollowUpQuestion() {
    return sample(BASIC_FOLLOWUP_QUESTION);
  }

  sayBye() {
    return sample(BYE_ANSWER);
  }
  sayBirthDay(text) {
    return birthdayService.getBirthday(text);
  }
  sayCountry() {
    return sample(COUNTRY_LIST).name;
  }
  sayGoodMorning() {
    return sample(GOODMORNING_ANSWER);
  }

  sayJoke() {
    return sample(JOKE_ANSWER);
  }
  sayThanks() {
    return sample(THANKS_ANSWER);
  }
  sayWhen() {
    return sample(WHEN_ANSWER);
  }

  sayMonth() {
    return sample(MONTH_ANSWERS);
  }
  sayGame() {
    return sample(GAME_ANSWERS);
  }
  sayRandomUser() {
    return userService.getRandomUserRandomName();
  }
  tagUser(text) {
    return this.tagService.tagUserAndAddTextCommand(text);
  }
  tagEveryone() {
    return this.tagService.tagEveryone();
  }
  scheldUser(text) {
    return this.tagService.tagUserAndScheld(text);
  }
  showMeme() {
    return ninegagService.get9gagBasic();
  }
  showGirl() {
    return ninegagService.get9gagGirl();
  }
  showCosplay() {
    return deviantArtService.getDeviant("cosplay");
  }
  showNsfw() {
    return deviantArtService.getDeviant("nude-art");
  }
  sayTime(text) {
    return timeService.getRandomTime(text);
  }
  saySluip() {
    return youtubeService.getSluip();
  }
  sayRandomYoutube(text) {
    return youtubeService.getRandomYoutube(text);
  }
  sayExactYoutube(text) {
    return youtubeService.getExactYoutube(text);
  }
  sayExactTube(text) {
    return tubeService.getTube(text);
  }
  readTheNews() {
    return newsService.getNewsPosts();
  }
  sayCurrentWeather(city) {
    return weatherService.getCurrentWeather(city);
  }
  sayCurrentWeatherPollution(city) {
    return weatherService.getCurrentPolution(city);
  }
  sayForecastWeather(city) {
    return weatherService.getAllWeatherInfo(city);
  }
  sayFood(suggest) {
    return foodService.getRecaipie(suggest);
  }

  tellNextEuroMillionsDraw() {
    return euroMillionsService.getNextDraw();
  }
  recognize(imageUrl) {
    return recognitionService.get(imageUrl);
  }

  saySorry() {
    return sample(SORRY_ANSWER);
  }

  sayMonologue() {
    return sample(MONOLOGUE);
  }
  sayHoer() {
    return sample(HOER);
  }
  sayMolName() {
    return molService.giveRandomName();
  }
  sayTourName() {
    return tourService.giveRandomName();
  }
  sayColour() {
    return sample(COLOURS);
  }
  sayWeetje() {
    return wikiService.getWeetje();
  }
  sayWikiSummary(topic) {
    return wikiService.getWikiSummary(topic);
  }
  sayWiki(topic) {
    return wikiService.getWikiSearch(topic);
  }
  sayImage(text) {
    return imageService.getImage(text);
  }
  askForStopTimeout() {
    return sample(TIMEOUT_STOP_PLACEHOLDER);
  }
  sendPoepLink() {
    return poepService.sendPoepLink();
  }
  sayMopje() {
    return mopService.sayMopje();
  }
  sayPartij() {
    return politiekService.sayPartij();
  }
}

export { MaggieMond };
