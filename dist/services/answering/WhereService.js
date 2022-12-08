"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WhereService = void 0;
var _lodash = require("lodash");
var _Verbs = require("../../answers/words/Verbs");
var _Adjectives = require("../../answers/words/Adjectives");
var _Scheld = require("../../answers/basic/Scheld");
var _UserService = require("../user/UserService");
var _Where = require("../../answers/Where");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var WhereService = /*#__PURE__*/function () {
  function WhereService(mood, inputText, responseBuilder) {
    var _this = this;
    _classCallCheck(this, WhereService);
    _defineProperty(this, "mood", void 0);
    _defineProperty(this, "inputText", void 0);
    _defineProperty(this, "responseBuilder", void 0);
    _defineProperty(this, "answer", function () {
      var place = "Weet het ni";
      var user = new _UserService.UserService().getRandomUserRandomName();
      var decision = Math.floor(Math.random() * 16);
      var pidScheld = Math.floor(Math.random() * 40);
      var pidAdjective = Math.floor(Math.random() * 40);
      var pidVerb = Math.floor(Math.random() * 40);
      var pidWhoIncl = Math.floor(Math.random() * 30);
      var pidWhoPlace = Math.floor(Math.random() * 10);
      if (_this.inputText) {
        decision = _this.changeDecisionBasedOnText(decision);
      }
      if (decision < 7) {
        place = (0, _lodash.sample)(_Where.PLACES_BASIC);
      }
      if (decision >= 7 && decision < 9) {
        place = (0, _lodash.sample)(_Where.PLACES_PLACE);
      }
      if (decision === 9) {
        place = (0, _lodash.sample)(_Where.PLACES_SPECIAL_PLACES);
      }
      if (decision >= 10 && decision < 14) {
        place = (0, _lodash.sample)(_Where.PLACES_WHO);
        if (pidWhoPlace === 1) {
          place = place + " van " + user;
        }
      }
      if (decision >= 14 && decision < 16) {
        place = (0, _lodash.sample)(_Where.PLACES_JOB);
      }
      if (pidAdjective === 1) {
        place = (0, _lodash.sample)(_Adjectives.ADJECTIVES) + " " + place;
      }
      if (pidScheld === 1) {
        place = place + " " + (0, _lodash.sample)(_Scheld.SCHELD);
      }
      if (pidVerb === 1) {
        place = place + " " + (0, _lodash.sample)(_Verbs.VERBS);
      }
      if (pidWhoIncl === 1) {
        place = place + " met " + user;
      }
      _this.responseBuilder.append(place);
      return _this.responseBuilder.toString();
    });
    this.mood = mood;
    this.inputText = inputText;
    this.responseBuilder = responseBuilder;
  }
  _createClass(WhereService, [{
    key: "changeDecisionBasedOnText",
    value: function changeDecisionBasedOnText(decision) {
      switch (this.inputText) {
        case this.inputText.match(new RegExp(/weekend|zomer|vakantie|verlof/)):
          decision = 6;
          break;
        default:
          decision = decision;
          break;
      }
      return decision;
    }
  }]);
  return WhereService;
}();
exports.WhereService = WhereService;