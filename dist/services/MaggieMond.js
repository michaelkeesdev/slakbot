"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MaggieMond = void 0;
var _lodash = require("lodash");
var _bolt = require("@slack/bolt");
var _BasicFollowUpQuestion = require("./../answers/questions/BasicFollowUpQuestion");
var _Bye = require("./../answers/Bye");
var _Countries = require("./../answers/Countries");
var _Goodmorning = require("./../answers/Goodmorning");
var _Joke = require("./../answers/Joke");
var _Thanks = require("./../answers/Thanks");
var _When = require("./../answers/When");
var _Sorry = require("./../answers/Sorry");
var _Timeout = require("../answers/Timeout");
var _BaseAnsweringServiceV = require("./answering/BaseAnsweringServiceV2");
var _BaseAnsweringService = require("./answering/BaseAnsweringService");
var _UserService = require("./user/UserService");
var _BirthdayService = require("./user/BirthdayService");
var _NewsService = require("./news/NewsService");
var _gagService = require("./9gag/9gagService");
var _FoodService = require("./food/FoodService");
var _YoutubeService = require("./google/YoutubeService");
var _TubeService = require("./google/TubeService");
var _EuroMillionsService = require("./game/EuroMillionsService");
var _WeatherService = require("./weather/WeatherService");
var _TimeService = require("./time/TimeService");
var _httpClient = require("../httpClient");
var _deviantArtService = require("./deviantart/deviantArtService");
var _Month = require("../answers/Month");
var _Game = require("../answers/Game");
var _Colours = require("../answers/words/Colours");
var _ImageRecognition = require("./recognition/ImageRecognition");
var _Monologue = require("../answers/Monologue");
var _Hoer = require("../answers/Hoer");
var _TagService = require("./user/TagService");
var _Tokenizer = require("./tokenizer/Tokenizer");
var _MolService = require("./tv/MolService");
var _WikiService = require("./wiki/WikiService");
var _ImageService = require("./google/ImageService");
var _PoepService = require("./game/PoepService");
var _MopService = require("./mop/MopService");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var baseAnweringService = new _BaseAnsweringService.BaseAnweringService();
var baseAnweringServicev2 = new _BaseAnsweringServiceV.BaseAnweringServiceV2();
var httpClient = new _httpClient.HttpClient();
var userService = new _UserService.UserService();
var birthdayService = new _BirthdayService.BirthdayService();
var ninegagService = new _gagService.NineGagService();
var deviantArtService = new _deviantArtService.DeviantArtService();
var youtubeService = new _YoutubeService.YoutubeService();
var tubeService = new _TubeService.TubeService();
var euroMillionsService = new _EuroMillionsService.EuroMillionsService();
var tokenizer = new _Tokenizer.TokenizerService();
var weatherService = new _WeatherService.WeatherService(httpClient);
var newsService = new _NewsService.NewsService(httpClient);
var recognitionService = new _ImageRecognition.ImageRecognitionService(httpClient);
var foodService = new _FoodService.FoodService(httpClient, tokenizer);
var timeService = new _TimeService.TimeService();
var molService = new _MolService.MolService();
var wikiService = new _WikiService.WikiService(httpClient);
var imageService = new _ImageService.ImageService();
var poepService = new _PoepService.PoepService();
var mopService = new _MopService.MopService();
var MaggieMond = /*#__PURE__*/function () {
  function MaggieMond(platform) {
    _classCallCheck(this, MaggieMond);
    _defineProperty(this, "tagService", void 0);
    this.tagService = new _TagService.TagService(platform);
  }

  // BASE ANSWER SERVICE
  _createClass(MaggieMond, [{
    key: "giveBasicAnswer",
    value: function giveBasicAnswer(text, mood) {
      return baseAnweringServicev2.answer(_BaseAnsweringService.COMMAND_YESNODONTKNOW, mood, text);
    }
  }, {
    key: "makeDecision",
    value: function makeDecision(text) {
      return baseAnweringServicev2.answer(_BaseAnsweringService.COMMAND_DECISION, "mood", text);
    }
  }, {
    key: "sayHow",
    value: function sayHow(text) {
      return baseAnweringServicev2.answer(_BaseAnsweringService.COMMAND_HOW, "mood", text);
    }
  }, {
    key: "sayHowMuch",
    value: function sayHowMuch(text) {
      return baseAnweringServicev2.answer(_BaseAnsweringService.COMMAND_HOWMUCH, "mood", text);
    }
  }, {
    key: "sayHowYouDoing",
    value: function sayHowYouDoing(text, mood) {
      return baseAnweringServicev2.answer(_BaseAnsweringService.COMMAND_HOWYOUDOING, mood, text);
    }
  }, {
    key: "sayWhat",
    value: function sayWhat(text) {
      return baseAnweringServicev2.answer(_BaseAnsweringService.COMMAND_WHAT, "mood", text);
    }
  }, {
    key: "sayWhere",
    value: function sayWhere(text) {
      return baseAnweringServicev2.answer(_BaseAnsweringService.COMMAND_WHERE, "mood", text);
    }
  }, {
    key: "sayWhy",
    value: function sayWhy(text) {
      return baseAnweringServicev2.answer(_BaseAnsweringService.COMMAND_WHY, "mood", text);
    }

    // CUSTOM //
  }, {
    key: "askBasicFollowUpQuestion",
    value: function askBasicFollowUpQuestion() {
      return (0, _lodash.sample)(_BasicFollowUpQuestion.BASIC_FOLLOWUP_QUESTION);
    }
  }, {
    key: "sayBye",
    value: function sayBye() {
      return (0, _lodash.sample)(_Bye.BYE_ANSWER);
    }
  }, {
    key: "sayBirthDay",
    value: function sayBirthDay(text) {
      return birthdayService.getBirthday(text);
    }
  }, {
    key: "sayCountry",
    value: function sayCountry() {
      return (0, _lodash.sample)(_Countries.COUNTRY_LIST).name;
    }
  }, {
    key: "sayGoodMorning",
    value: function sayGoodMorning() {
      return (0, _lodash.sample)(_Goodmorning.GOODMORNING_ANSWER);
    }
  }, {
    key: "sayJoke",
    value: function sayJoke() {
      return (0, _lodash.sample)(_Joke.JOKE_ANSWER);
    }
  }, {
    key: "sayThanks",
    value: function sayThanks() {
      return (0, _lodash.sample)(_Thanks.THANKS_ANSWER);
    }
  }, {
    key: "sayWhen",
    value: function sayWhen() {
      return (0, _lodash.sample)(_When.WHEN_ANSWER);
    }
  }, {
    key: "sayMonth",
    value: function sayMonth() {
      return (0, _lodash.sample)(_Month.MONTH_ANSWERS);
    }
  }, {
    key: "sayGame",
    value: function sayGame() {
      return (0, _lodash.sample)(_Game.GAME_ANSWERS);
    }
  }, {
    key: "sayRandomUser",
    value: function sayRandomUser() {
      return userService.getRandomUserRandomName();
    }
  }, {
    key: "tagUser",
    value: function tagUser(text) {
      return this.tagService.tagUserAndAddTextCommand(text);
    }
  }, {
    key: "tagEveryone",
    value: function tagEveryone() {
      return this.tagService.tagEveryone();
    }
  }, {
    key: "scheldUser",
    value: function scheldUser(text) {
      return this.tagService.tagUserAndScheld(text);
    }
  }, {
    key: "showMeme",
    value: function showMeme() {
      return ninegagService.get9gagBasic();
    }
  }, {
    key: "showGirl",
    value: function showGirl() {
      return ninegagService.get9gagGirl();
    }
  }, {
    key: "showCosplay",
    value: function showCosplay() {
      return deviantArtService.getDeviant("cosplay");
    }
  }, {
    key: "showNsfw",
    value: function showNsfw() {
      return deviantArtService.getDeviant("nude-art");
    }
  }, {
    key: "sayTime",
    value: function sayTime(text) {
      return timeService.getRandomTime(text);
    }
  }, {
    key: "saySluip",
    value: function saySluip() {
      return youtubeService.getSluip();
    }
  }, {
    key: "sayRandomYoutube",
    value: function sayRandomYoutube(text) {
      return youtubeService.getRandomYoutube(text);
    }
  }, {
    key: "sayExactYoutube",
    value: function sayExactYoutube(text) {
      return youtubeService.getExactYoutube(text);
    }
  }, {
    key: "sayExactTube",
    value: function sayExactTube(text) {
      return tubeService.getTube(text);
    }
  }, {
    key: "readTheNews",
    value: function readTheNews() {
      return newsService.getNewsPosts();
    }
  }, {
    key: "sayCurrentWeather",
    value: function sayCurrentWeather(city) {
      return weatherService.getCurrentWeather(city);
    }
  }, {
    key: "sayCurrentWeatherPollution",
    value: function sayCurrentWeatherPollution(city) {
      return weatherService.getCurrentPolution(city);
    }
  }, {
    key: "sayForecastWeather",
    value: function sayForecastWeather(city) {
      return weatherService.getAllWeatherInfo(city);
    }
  }, {
    key: "sayFood",
    value: function sayFood(suggest) {
      return foodService.getRecaipie(suggest);
    }
  }, {
    key: "tellNextEuroMillionsDraw",
    value: function tellNextEuroMillionsDraw() {
      return euroMillionsService.getNextDraw();
    }
  }, {
    key: "recognize",
    value: function recognize(imageUrl) {
      return recognitionService.get(imageUrl);
    }
  }, {
    key: "saySorry",
    value: function saySorry() {
      return (0, _lodash.sample)(_Sorry.SORRY_ANSWER);
    }
  }, {
    key: "sayMonologue",
    value: function sayMonologue() {
      return (0, _lodash.sample)(_Monologue.MONOLOGUE);
    }
  }, {
    key: "sayHoer",
    value: function sayHoer() {
      return (0, _lodash.sample)(_Hoer.HOER);
    }
  }, {
    key: "sayMolName",
    value: function sayMolName() {
      return molService.giveRandomName();
    }
  }, {
    key: "sayColour",
    value: function sayColour() {
      return (0, _lodash.sample)(_Colours.COLOURS);
    }
  }, {
    key: "sayWeetje",
    value: function sayWeetje() {
      return wikiService.getWeetje();
    }
  }, {
    key: "sayWikiSummary",
    value: function sayWikiSummary(topic) {
      return wikiService.getWikiSummary(topic);
    }
  }, {
    key: "sayWiki",
    value: function sayWiki(topic) {
      return wikiService.getWikiSearch(topic);
    }
  }, {
    key: "sayImage",
    value: function sayImage(text) {
      return imageService.getImage(text);
    }
  }, {
    key: "askForStopTimeout",
    value: function askForStopTimeout() {
      return (0, _lodash.sample)(_Timeout.TIMEOUT_STOP_PLACEHOLDER);
    }
  }, {
    key: "sendPoepLink",
    value: function sendPoepLink() {
      return poepService.sendPoepLink();
    }
  }, {
    key: "sayMopje",
    value: function sayMopje() {
      return mopService.sayMopje();
    }
  }]);
  return MaggieMond;
}();
exports.MaggieMond = MaggieMond;