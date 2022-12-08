"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.COMMAND_YESNODONTKNOW = exports.COMMAND_WHY = exports.COMMAND_WHERE = exports.COMMAND_WHAT = exports.COMMAND_HOWYOUDOING = exports.COMMAND_HOWMUCH = exports.COMMAND_HOW = exports.COMMAND_DECISION = exports.BaseAnweringService = void 0;
var _Weetjes = require("../../answers/weetjes/Weetjes");
var _Weetjesprefix = require("../../answers/weetjes/Weetjesprefix");
var _Prefix = require("../../answers/basic/Prefix");
var _Suffix = require("../../answers/basic/Suffix");
var _EmojiApp = require("../../answers/basic/EmojiApp");
var _Adjectives = require("../../answers/words/Adjectives");
var _Scheld = require("../../answers/basic/Scheld");
var _HowYouDoingService = require("./HowYouDoingService");
var _HowService = require("./HowService");
var _WhatService = require("./WhatService");
var _WhyService = require("./WhyService");
var _YesNoDontKnowService = require("./YesNoDontKnowService");
var _StringBuilder = require("../../util/StringBuilder");
var _lodash = require("lodash");
var _WhereService = require("./WhereService");
var _HowMuchService = require("./HowMuchService");
var _DecisionService = require("./DecisionService");
var _StringUtil = require("../../util/StringUtil");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var EMOJI_PID = 15;
var WEETJE_PID = 50;
var REGULAR_PREFIX_PID = 6;
var REGULAR_SUFFIX_PID = 6;
var MOOD_SWING_PID = 5;
var MOOD_SCALE_WORST_MOOD = 2;
var MOOD_SCALE_BAD_MOOD_START = 4;
var MOOD_SCALE_GOOD_MOOD_START = 8;
var MOOD_SCALE_BEST_MOOD = 10;
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
var BaseAnweringService = /*#__PURE__*/function () {
  function BaseAnweringService() {
    var _this = this;
    _classCallCheck(this, BaseAnweringService);
    _defineProperty(this, "currentMood", 0);
    _defineProperty(this, "answer", function (answerCommand, mood, textInput) {
      _this.setMood(textInput);
      console.log("BASIC: answerCommand", answerCommand, "mood", _this.currentMood, "textInput", textInput);
      var responseBuilder = new _StringBuilder.StringBuilder();
      _this.buildStartOfAnswer(responseBuilder);
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
          new _YesNoDontKnowService.YesNoDontKnowService(mood, textInput, responseBuilder).answer();
          break;
        default:
          new _YesNoDontKnowService.YesNoDontKnowService(mood, textInput, responseBuilder).answer();
      }
      _this.addMoreTextToResponse(responseBuilder);
      return responseBuilder.toString();
    });
  }
  _createClass(BaseAnweringService, [{
    key: "setMood",
    value: function setMood(textInput) {
      if (this.currentMood == 0) {
        this.currentMood = 6;
      }
      if (Math.floor(Math.random() * MOOD_SWING_PID) == 1) {
        if (this.currentMood <= MOOD_SCALE_BEST_MOOD) {
          console.log("Mood up");
          this.currentMood++;
        }
      }
      if (Math.floor(Math.random() * MOOD_SWING_PID) == 2) {
        if (this.currentMood >= MOOD_SCALE_WORST_MOOD) {
          console.log("Mood down");
          this.currentMood--;
        }
      }
      if (textInput.includes("hoer") || textInput.includes("slet")) {
        if (this.currentMood >= MOOD_SCALE_WORST_MOOD) {
          this.currentMood--;
        }
      }
      if (textInput.includes("xoxo") || textInput.includes("xx")) {
        if (this.currentMood <= MOOD_SCALE_BEST_MOOD) {
          this.currentMood++;
        }
      }
    }
  }, {
    key: "buildStartOfAnswer",
    value: function buildStartOfAnswer(responseBuilder) {
      // 2, 3, 4 = unhappy
      if (this.currentMood <= MOOD_SCALE_BAD_MOOD_START) {
        // Unhappy      0 PLUS CURRENT 4, PID = 4
        // Very unhappy 0 PLUS CURRENT 2, PID = 2
        if (Math.floor(Math.random() * (0 + this.currentMood)) == 1) {
          responseBuilder.append((0, _lodash.sample)(_Prefix.PREFIX_BAD_MOOD));
        }
        // 8, 9, 10 = happy    
      } else if (this.currentMood >= MOOD_SCALE_GOOD_MOOD_START) {
        // Happy        12 MINUS CURRENT 8, PID = 4
        // Very happy   12 MINUS CURRENT 10, PID = 2
        if (Math.floor(Math.random() * (12 - this.currentMood)) == 1) {
          responseBuilder.append((0, _lodash.sample)(_Prefix.PREFIX_GOOD_MOOD));
        }
        // Regular mood    
      } else {
        if (Math.floor(Math.random() * REGULAR_PREFIX_PID) == 1) {
          responseBuilder.append((0, _lodash.sample)(_Prefix.PREFIX));
        }
      }
      responseBuilder.append(" ");
    }
  }, {
    key: "addMoreTextToResponse",
    value: function addMoreTextToResponse(responseBuilder) {
      var weetje = Math.floor(Math.random() * WEETJE_PID);
      var emoji = Math.floor(Math.random() * EMOJI_PID);
      if (weetje === 1) {
        responseBuilder.appendFullStopIfNone().append(" ").append((0, _lodash.sample)(_Weetjesprefix.WEETJES_PREFIX)).append(_StringUtil.StringUtil.firstCharToLower((0, _lodash.sample)(_Weetjes.WEETJES_ANSWER)));
      }

      // 2, 3, 4 = unhappy
      if (this.currentMood <= MOOD_SCALE_BAD_MOOD_START) {
        // Unhappy      0 PLUS CURRENT 4, PID = 4
        // Very unhappy 0 PLUS CURRENT 2, PID = 2
        if (Math.floor(Math.random() * (0 + this.currentMood)) == 1) {
          this.appendSuffix(responseBuilder, (0, _lodash.sample)(_Suffix.SUFFIX_BAD_MOOD));
        }
        // 8, 9, 10 = happy    
      } else if (this.currentMood >= MOOD_SCALE_GOOD_MOOD_START) {
        // Happy        12 MINUS CURRENT 8, PID = 4
        // Very happy   12 MINUS CURRENT 10, PID = 2
        if (Math.floor(Math.random() * (12 - this.currentMood)) == 1) {
          this.appendSuffix(responseBuilder, (0, _lodash.sample)(_Suffix.SUFFIX_GOOD_MOOD));
        }
        // Regular mood    
      } else {
        if (Math.floor(Math.random() * REGULAR_SUFFIX_PID) == 1) {
          this.appendSuffix(responseBuilder, (0, _lodash.sample)(_Suffix.SUFFIX));
        }
      }
      if (emoji === 1) {
        responseBuilder.append(" ").append((0, _lodash.sample)(_EmojiApp.EMOJIS));
      }
    }
  }, {
    key: "appendSuffix",
    value: function appendSuffix(responseBuilder, chosenSuffix) {
      var suffixParts = {
        "%adjective%": (0, _lodash.sample)(_Adjectives.ADJECTIVES),
        "%scheld%": (0, _lodash.sample)(_Scheld.SCHELD)
      };
      var suffix = chosenSuffix.replace(/%\w+%/g, function (all) {
        return suffixParts[all] || all;
      });
      responseBuilder.appendFullStopIfNone().append(" ").append(suffix);
    }
  }]);
  return BaseAnweringService;
}();
exports.BaseAnweringService = BaseAnweringService;