"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HowYouDoingService = void 0;
var _HowYouDoing = require("../../answers/HowYouDoing");
var _HowDoing = require("../../answers/V2/HowDoing");
var _lodash = require("lodash");
var _StringUtil = require("../../util/StringUtil");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var HowYouDoingService = /*#__PURE__*/function () {
  function HowYouDoingService(mood, inputText, responseBuilder) {
    var _this = this;
    _classCallCheck(this, HowYouDoingService);
    _defineProperty(this, "mood", void 0);
    _defineProperty(this, "inputText", void 0);
    _defineProperty(this, "responseBuilder", void 0);
    _defineProperty(this, "answer", function () {
      _this.addHowYouDoingPrefixToResponse();
      _this.addHowYouDoingAnswerToResponse();
      _this.addHowYouDoingSuffixToResponse();
      return _this.responseBuilder.toString();
    });
    this.mood = mood;
    this.inputText = inputText;
    this.responseBuilder = responseBuilder;
  }
  _createClass(HowYouDoingService, [{
    key: "addHowYouDoingPrefixToResponse",
    value: function addHowYouDoingPrefixToResponse() {
      this.responseBuilder.append((0, _lodash.sample)(_HowYouDoing.HOW_YOU_DOING_PREFIX));
    }
  }, {
    key: "addHowYouDoingAnswerToResponse",
    value: function addHowYouDoingAnswerToResponse() {
      var list = _HowDoing.HOW_YOU_DOING_ANSWER;
      if (this.mood) {
        list = this.setMoodList(this.mood, list);
      }
      this.responseBuilder.append(" ").append(_StringUtil.StringUtil.firstCharToLower((0, _lodash.sample)(_HowDoing.HOW_YOU_DOING_ANSWER).value));
    }
  }, {
    key: "addHowYouDoingSuffixToResponse",
    value: function addHowYouDoingSuffixToResponse() {
      this.responseBuilder.append(", ").append((0, _lodash.sample)(_HowYouDoing.HOW_YOU_DOING_SUFFIX));
    }
  }, {
    key: "setMoodList",
    value: function setMoodList(mood, list) {
      return list.flatMap(function (item) {
        var itemList = [];
        if (item.tags.includes(mood)) {
          for (var i = 0; i < item.frequency * 20; i++) {
            itemList.push({
              value: item.value
            });
          }
        }
        if (item.tags.length === 0) {
          for (var _i = 0; _i < item.frequency * 5; _i++) {
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
  return HowYouDoingService;
}();
exports.HowYouDoingService = HowYouDoingService;