"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.COMMAND_YESNODONTKNOW = exports.COMMAND_WHY = exports.COMMAND_WHERE = exports.COMMAND_WHAT = exports.COMMAND_HOWYOUDOING = exports.COMMAND_HOWMUCH = exports.COMMAND_HOW = exports.COMMAND_DECISION = exports.BaseAnweringServiceV2 = void 0;
exports.frequency = frequency;
exports.random = random;
var _StringBuilder = require("../../util/StringBuilder");
var _lodash = require("lodash");
var _HowYouDoingService = require("./HowYouDoingService");
var _HowService = require("./HowService");
var _WhatService = require("./WhatService");
var _WhyService = require("./WhyService");
var _WhereService = require("./WhereService");
var _HowMuchService = require("./HowMuchService");
var _DecisionService = require("./DecisionService");
var _StringUtil = require("../../util/StringUtil");
var _Answers = require("../../answers/V2/Answers");
var _Prefix = require("../../answers/V2/Prefix");
var _Tags = require("../../answers/V2/Tags");
var _Suffix = require("../../answers/V2/Suffix");
var _Emojis = require("../../answers/V2/Emojis");
var _UserService = require("../user/UserService");
var _Adjectives = require("../../answers/V2/Adjectives");
var _Scheld = require("../../answers/V2/Scheld");
var _Verbs = require("../../answers/words/Verbs");
var _Sentences = require("../../answers/V2/Sentences");
var _Punctuations = require("../../answers/V2/Punctuations");
var _Weetjesprefix = require("../../answers/weetjes/Weetjesprefix");
var _Weetjes = require("../../answers/weetjes/Weetjes");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var COMMAND_DECISION = "DECISION_ANSWER_COMMAND";
exports.COMMAND_DECISION = COMMAND_DECISION;
var COMMAND_HOW = "HOW_ANSWERCOMMAND";
exports.COMMAND_HOW = COMMAND_HOW;
var COMMAND_HOWMUCH = "HOWMUCH_ANSWERCOMMAND";
exports.COMMAND_HOWMUCH = COMMAND_HOWMUCH;
var COMMAND_HOWYOUDOING = "HOWYOUDOING_ANSWERCOMMAND";
exports.COMMAND_HOWYOUDOING = COMMAND_HOWYOUDOING;
var COMMAND_WHAT = "WHAT_ANSWERCOMMAND";
exports.COMMAND_WHAT = COMMAND_WHAT;
var COMMAND_WHERE = "WHERE_ANSWER_COMMAND";
exports.COMMAND_WHERE = COMMAND_WHERE;
var COMMAND_WHY = "WHY_ANSWERCOMMAND";
exports.COMMAND_WHY = COMMAND_WHY;
var COMMAND_YESNODONTKNOW = "YESNODONTKNOW_ANSWERCOMMAND";
exports.COMMAND_YESNODONTKNOW = COMMAND_YESNODONTKNOW;
function frequency(percent) {
  return Math.floor(Math.random() * 100) < percent;
}
function random(up) {
  return Math.floor(Math.random() * up);
}
var BaseAnweringServiceV2 = /*#__PURE__*/function () {
  function BaseAnweringServiceV2() {
    var _this = this;
    _classCallCheck(this, BaseAnweringServiceV2);
    _defineProperty(this, "userService", new _UserService.UserService());
    _defineProperty(this, "punctuationList", _Punctuations.PUNCTUATION_MARKS.map(function (punc) {
      return punc.value;
    }));
    _defineProperty(this, "answer", function (answerCommand, mood, textInput) {
      var responseBuilder = new _StringBuilder.StringBuilder();
      switch (answerCommand) {
        case COMMAND_DECISION:
          new _DecisionService.DecisionService(mood, textInput, responseBuilder).answer();
          break;
        case COMMAND_HOW:
          new _HowService.HowService(mood, textInput, responseBuilder).answer();
          break;
        case COMMAND_HOWMUCH:
          new _HowMuchService.HowMuchService(mood, textInput, responseBuilder).answer();
          break;
        case COMMAND_HOWYOUDOING:
          new _HowYouDoingService.HowYouDoingService(mood, textInput, responseBuilder).answer();
          break;
        case COMMAND_WHAT:
          new _WhatService.WhatService(mood, textInput, responseBuilder).answer();
          break;
        case COMMAND_WHERE:
          new _WhereService.WhereService(mood, textInput, responseBuilder).answer();
          break;
        case COMMAND_WHY:
          new _WhyService.WhyService(mood, textInput, responseBuilder).answer();
          break;
        case COMMAND_YESNODONTKNOW:
          _this.basisAnswer(mood, textInput, responseBuilder);
          break;
        default:
          _this.basisAnswer(mood, textInput, responseBuilder);
      }
      var answer = responseBuilder.toString();
      return answer ? answer : "";
    });
  }
  _createClass(BaseAnweringServiceV2, [{
    key: "basisAnswer",
    value: function basisAnswer(mood, textInput, responseBuilder) {
      this.getEmojis(responseBuilder, _Emojis.EMOJIS_MOOD_PID, mood);
      this.getPrefix(responseBuilder, _Prefix.PREFIX_PID, mood);
      this.getAnswerByDecision(responseBuilder, 90, mood);
      this.getSuffix(responseBuilder, _Suffix.SUFFIX_PID, mood);
      this.getEmojis(responseBuilder, _Emojis.EMOJIS_NORMAL_PID, mood);
      this.getWeetje(responseBuilder, 3, mood);
      this.getBasicSentence(responseBuilder, 20, mood);
      this.getAdvancedSentence(responseBuilder, 10, mood);
      this.replaceParams(responseBuilder, mood);
    }
  }, {
    key: "replaceParams",
    value: function replaceParams(responseBuilder, mood) {
      var parts = {
        "%WHO": this.userService.getRandomUserRandomName(),
        "%WHAT": new _WhatService.WhatService(mood, null, new _StringBuilder.StringBuilder()).answer(),
        "%ADJECTIVE": (0, _lodash.sample)(_Adjectives.ADJECTIVES).value,
        "%SCHELD": (0, _lodash.sample)(_Scheld.SCHELD).value,
        "%PLACE": new _WhereService.WhereService(mood, null, new _StringBuilder.StringBuilder()).answer(),
        "%VERB": (0, _lodash.sample)(_Verbs.VERBS)
      };
      var response = responseBuilder.toString();
      for (var _i = 0, _Object$keys = Object.keys(parts); _i < _Object$keys.length; _i++) {
        var key = _Object$keys[_i];
        response = response.replace(new RegExp(key, "g"), parts[key]);
      }
      responseBuilder.clear();
      responseBuilder.append(response);
    }
  }, {
    key: "getAnswerByDecision",
    value: function getAnswerByDecision(responseBuilder, percent, mood) {
      var list = _Answers.BASIC_ANSWER_FREQUENCY_LIST;
      if (mood) {
        list = this.setMoodList(mood, list);
      }
      if (frequency(percent)) {
        var pid = random(18);
        var BASIC_ANSWER_TYPE = "";
        if (pid < 6) BASIC_ANSWER_TYPE = _Tags.AGREE;
        if (pid >= 6 && pid < 12) BASIC_ANSWER_TYPE = _Tags.DISAGREE;
        if (pid >= 12 && pid < 14) BASIC_ANSWER_TYPE = _Tags.CONFUSED;
        if (pid >= 14 && pid < 16) BASIC_ANSWER_TYPE = _Tags.BUSY;
        var answersFilteredByType = list.filter(function (answer) {
          return answer.tags.includes(BASIC_ANSWER_TYPE);
        });
        var response = (0, _lodash.sample)(answersFilteredByType);
        if (response && response.value) {
          responseBuilder.appendWithCasing(response.value, true, this.punctuationList);
        }
      }
    }
  }, {
    key: "getBasicSentence",
    value: function getBasicSentence(responseBuilder, percent, mood) {
      if (frequency(percent)) {
        responseBuilder.appendFullStopIfNone(this.punctuationList).appendWithCasing((0, _lodash.sample)(_Sentences.SENTENCES_BASIC).value, true, this.punctuationList);
        this.getPunctuationMark(responseBuilder);
      }
    }
  }, {
    key: "getAdvancedSentence",
    value: function getAdvancedSentence(responseBuilder, percent, mood) {
      if (frequency(percent)) {
        responseBuilder.appendFullStopIfNone(this.punctuationList).appendWithCasing((0, _lodash.sample)(_Sentences.SENTENCES_ADVANCED).value, true, this.punctuationList);
        this.getPunctuationMark(responseBuilder);
      }
    }
  }, {
    key: "getPrefix",
    value: function getPrefix(responseBuilder, percent, mood) {
      var list = _Prefix.PREFIX_FREQUENCY_LIST;
      if (mood) {
        list = this.setMoodList(mood, list);
      }
      if (frequency(percent)) {
        responseBuilder.appendWithCasing((0, _lodash.sample)(list).value, true, this.punctuationList);
        this.getPrefix(responseBuilder, percent / 3, mood);
      }
    }
  }, {
    key: "getSuffix",
    value: function getSuffix(responseBuilder, percent, mood) {
      var list = _Suffix.SUFFIX_FREQUENCY_LIST;
      if (mood) {
        list = this.setMoodList(mood, list);
      }
      if (frequency(percent)) {
        responseBuilder.appendWithCasing((0, _lodash.sample)(list).value, true, this.punctuationList);
        this.getPrefix(responseBuilder, percent / 3, mood);
        this.getPunctuationMark(responseBuilder);
      }
      return;
    }
  }, {
    key: "getEmojis",
    value: function getEmojis(responseBuilder, percent, mood) {
      var list = _Emojis.EMOJI_FREQUENCY_LIST;
      if (mood) {
        list = this.setMoodList(mood, list);
      }
      if (frequency(percent)) {
        responseBuilder.appendWithCasing((0, _lodash.sample)(list).value, true, this.punctuationList);
        this.getEmojis(responseBuilder, percent / 3, mood);
      }
      return;
    }
  }, {
    key: "getWeetje",
    value: function getWeetje(responseBuilder, percent, mood) {
      if (frequency(percent)) {
        responseBuilder.appendFullStopIfNone(this.punctuationList).appendWithCasing((0, _lodash.sample)(_Weetjesprefix.WEETJES_PREFIX)).append(_StringUtil.StringUtil.firstCharToLower((0, _lodash.sample)(_Weetjes.WEETJES_ANSWER)));
      }
    }
  }, {
    key: "getPunctuationMark",
    value: function getPunctuationMark(responseBuilder, mood) {
      var list = _Punctuations.PUNCTUATION_MARKS_PID;
      if (mood) {
        list = this.setMoodList(mood, list);
      }
      if (frequency(list)) {
        responseBuilder.append((0, _lodash.sample)(_Punctuations.PUNCTUATION_MARKS_FREQUENCY_LIST).value, true, this.punctuationList);
      }
    }
  }, {
    key: "setMoodList",
    value: function setMoodList(mood, list) {
      return list.flatMap(function (item) {
        var itemList = [];
        if (item.tags.includes(mood)) {
          for (var i = 0; i < item.frequency * 10; i++) {
            itemList.push({
              value: item.value
            });
          }
        }
        if (item.tags.length === 0) {
          for (var _i2 = 0; _i2 < item.frequency * 5; _i2++) {
            itemList.push({
              value: item.value
            });
          }
        } else {
          itemList.push(item);
        }
        return itemList;
      });
    }
  }]);
  return BaseAnweringServiceV2;
}();
exports.BaseAnweringServiceV2 = BaseAnweringServiceV2;