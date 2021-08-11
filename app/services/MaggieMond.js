import { sample } from "lodash";

import { BASIC_FOLLOWUP_QUESTION } from "./../answers/questions/BasicFollowUpQuestion";

import { BYE_ANSWER } from "./../answers/Bye";
import { COUNTRY_LIST } from "./../answers/Countries";
import { GOODMORNING_ANSWER } from "./../answers/Goodmorning";
import { JOKE_ANSWER } from "./../answers/Joke";
import { THANKS_ANSWER } from "./../answers/Thanks";
import { WEETJES_ANSWER } from "../answers/weetjes/Weetjes";
import { WHEN_ANSWER } from "./../answers/When";
import { WHERE_ANSWER } from "./../answers/Where";
import { SORRY_ANSWER } from "./../answers/Sorry";
import { TIMEOUT_ANSWER, TIMEOUT_STOP_PLACEHOLDER } from "../answers/Timeout";

import { BasicAnweringService } from "./answering/BasicAnsweringService";
import { UserService } from "./user/UserService";
import { BirthdayService } from "./user/BirthdayService";
import { NewsService } from "./news/NewsService";
import { NineGagService } from "./9gag/9gagService";
import { FoodService } from "./food/FoodService";
import { YoutubeService } from "./google/YoutubeService";
import { TubeService } from "./google/TubeService";
import { DecisionService } from "./answering/DecisionService";
import { EuroMillionsService } from "./game/EuroMillionsService";
import { WeatherService } from "./weather/WeatherService";
import { TimeService } from "./time/TimeService";
import { HttpClient } from "../../httpClient";
import { DeviantArtService } from "./deviantart/deviantArtService";
import { HowMuchService } from "./HowMuchService";
import { MONTH_ANSWERS } from "../answers/Month";
import { HowService } from "./hoe/HowService";
import { WhyService } from "./why/WhyService";
import { NOUNS } from "../answers/words/RandomNouns";
import { COLOURS } from "../answers/words/Colours";
import { ImageRecognitionService } from "./recognition/ImageRecognition";
import { MONOLOGUE } from "../answers/Monologue";
import { HOER } from "../answers/Hoer";
import { TagService } from "./user/TagService";
import { TokenizerService } from "./tokenizer/Tokenizer";
import { MolService } from "./tv/MolService";
import { WikiService } from "./wiki/WikiService";
import { ImageService } from "./google/ImageService";
import { BladSteenSchaarService } from "./game/BladSteenSchaarService";

const basicAnweringService = new BasicAnweringService();

const howService = new HowService();
const whyService = new WhyService();
const httpClient = new HttpClient();
const userService = new UserService();
const birthdayService = new BirthdayService();
const ninegagService = new NineGagService();
const deviantArtService = new DeviantArtService();
const youtubeService = new YoutubeService();
const tubeService = new TubeService();
const decisionService = new DecisionService();
const euroMillionsService = new EuroMillionsService();
const howMuchService = new HowMuchService();

const tokenizer = new TokenizerService();
const weatherService = new WeatherService(httpClient);
const newsService = new NewsService(httpClient);
const recognitionService = new ImageRecognitionService(httpClient);
const foodService = new FoodService(httpClient, tokenizer);
const timeService = new TimeService();
const tagService = new TagService();
const molService = new MolService();
const wikiService = new WikiService(httpClient);
const imageService = new ImageService();
const bladSteenSchaarService = new BladSteenSchaarService();

class MaggieMond {
  askBasicFollowUpQuestion() {
    return sample(BASIC_FOLLOWUP_QUESTION);
  }

  giveBasicAnswer() {
    return basicAnweringService.buildAnswerPhrase();
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
  sayHow() {
    return howService.getHowAnswer();
  }
  sayHowMuch() {
    return howMuchService.giveNumber();
  }
  sayHowYouDoing() {
    return basicAnweringService.buildAnswerToHowYouDoingPhrase();
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
  sayWhere() {
    return sample(WHERE_ANSWER);
  }
  sayMonth() {
    return sample(MONTH_ANSWERS);
  }
  sayWhy() {
    return whyService.getWhyAnswer();
  }
  sayWhat() {
    return sample(NOUNS);
  }
  sayRandomUser() {
    return userService.getRandomUserRandomName();
  }
  tagUser(text) {
    return tagService.tagUserAndAddTextCommand(text);
  }
  scheldUser(text) {
    return tagService.tagUserAndScheld(text);
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
  speakDecision(text) {
    return decisionService.makeDecision(text);
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
  initBladSteenSchaar() {
    return bladSteenSchaarService.init();
  }
  playBladSteenSchaar(textInput) {
    return bladSteenSchaarService.play(textInput);
  }
}

export { MaggieMond };
