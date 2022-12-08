"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.YesNoDontKnowService = void 0;
var _Prefix = require("../../answers/basic/Prefix");
var _BasicAgree = require("../../answers/basic/BasicAgree");
var _BasicDisagree = require("../../answers/basic/BasicDisagree");
var _BasicDontKnow = require("../../answers/basic/BasicDontKnow");
var _lodash = require("lodash");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var YesNoDontKnowService = /*#__PURE__*/_createClass(function YesNoDontKnowService(mood, inputText, responseBuilder) {
  var _this = this;
  _classCallCheck(this, YesNoDontKnowService);
  _defineProperty(this, "mood", void 0);
  _defineProperty(this, "inputText", void 0);
  _defineProperty(this, "responseBuilder", void 0);
  _defineProperty(this, "NOTHING_TO_SAY_PID", 50);
  _defineProperty(this, "answer", function () {
    var decision = Math.floor(Math.random() * 17);

    // 0-1-2-3-4-5-6 Maggie agrees
    if (decision < 7) {
      _this.responseBuilder.append((0, _lodash.sample)(_BasicAgree.BASIC_AGREE_ANSWER));
    }
    // 7-8-9-10-11-12-13 Maggie disagrees
    if (decision >= 7 && decision < 14) {
      _this.responseBuilder.append((0, _lodash.sample)(_BasicDisagree.BASIC_DISAGREE_ANSWER));
    }
    // 14-15 Maggie weet ni
    if (decision == 14 || decision == 15) {
      _this.responseBuilder.append((0, _lodash.sample)(_BasicDontKnow.BASIC_DONT_KNOW_ANSWER));
    }
    // 15 just prefix
    if (decision == 16) {
      _this.responseBuilder.append(" ").append((0, _lodash.sample)(_Prefix.BASIC_PHRASE));
    }
    if (Math.floor(Math.random() * _this.NOTHING_TO_SAY_PID !== 1)) {
      return _this.responseBuilder.toString();
    } else {
      return "";
    }
  });
  this.mood = mood;
  this.inputText = inputText;
  this.responseBuilder = responseBuilder;
});
exports.YesNoDontKnowService = YesNoDontKnowService;