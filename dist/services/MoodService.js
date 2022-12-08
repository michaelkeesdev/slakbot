"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoodService = void 0;
var _lodash = require("lodash");
var _Scheld = require("../answers/basic/Scheld");
var _Emojis = require("../answers/V2/Emojis");
var _Tags = require("../answers/V2/Tags");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var happyWords = _Emojis.EMOJIS.filter(function (emoji) {
  return emoji.tags.includes(_Tags.HAPPY);
});
var MoodService = /*#__PURE__*/function () {
  function MoodService() {
    _classCallCheck(this, MoodService);
    _defineProperty(this, "currentMood", "");
    _defineProperty(this, "moods", [_Tags.ANGRY, _Tags.SAD, null, _Tags.KIND, _Tags.HAPPY]);
    _defineProperty(this, "extraMoods", [_Tags.CONFUSED, _Tags.BUSY]);
    _defineProperty(this, "MOOD_SWING_PID", 4);
  }
  _createClass(MoodService, [{
    key: "setMood",
    value: function setMood(textInput) {
      var moodSwing = this.frequency(this.MOOD_SWING_PID);
      if (moodSwing || !this.currentMood) {
        this.currentMood = (0, _lodash.sample)(this.moods);
      }
      if (new RegExp(_Scheld.SCHELD.join("|")).test(textInput)) {
        var i = this.moods.indexOf(this.currentMood);
        if (i > 0) {
          this.currentMood = this.moods[i--];
        }
      }
      if (new RegExp(happyWords.join("|")).test(textInput)) {
        var _i = this.moods.indexOf(this.currentMood);
        if (_i < this.moods.length - 1) {
          this.currentMood = this.moods[_i++];
        }
      }
    }
  }, {
    key: "getMood",
    value: function getMood() {
      console.log("mood", this.currentMood);
      return this.currentMood;
    }
  }, {
    key: "frequency",
    value: function frequency(percent) {
      return Math.floor(Math.random() * 100) < percent;
    }
  }, {
    key: "random",
    value: function random(up) {
      return Math.floor(Math.random() * up);
    }
  }]);
  return MoodService;
}();
exports.MoodService = MoodService;