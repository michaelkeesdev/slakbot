"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WhatService = void 0;
var _lodash = require("lodash");
var _RandomNouns = require("../../answers/words/RandomNouns");
var _Verbs = require("../../answers/words/Verbs");
var _UserService = require("../user/UserService");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var WhatService = /*#__PURE__*/function () {
  function WhatService(mood, inputText, responseBuilder) {
    var _this = this;
    _classCallCheck(this, WhatService);
    _defineProperty(this, "mood", void 0);
    _defineProperty(this, "inputText", void 0);
    _defineProperty(this, "responseBuilder", void 0);
    _defineProperty(this, "answer", function () {
      var what = "Niks";
      var user = new _UserService.UserService().getRandomUserRandomName();
      var decision = Math.floor(Math.random() * 10);
      var pidWhoIncl = Math.floor(Math.random() * 30);
      if (_this.inputText) {
        decision = _this.changeDecisionBasedOnText(decision);
      }
      if (decision < 7) {
        what = (0, _lodash.sample)(_RandomNouns.NOUNS);
        if (pidWhoIncl === 1) {
          what = what + " van " + user;
        }
      }
      if (decision === 7) {
        what = (0, _lodash.sample)(_RandomNouns.NOUNS) + " " + (0, _lodash.sample)(_Verbs.VERBS);
      }
      if (decision === 8) {
        what = (0, _lodash.sample)(_Verbs.VERBS);
      }
      if (decision === 9) {
        what = user;
      }
      _this.responseBuilder.append(what);
      return _this.responseBuilder.toString();
    });
    this.mood = mood;
    this.inputText = inputText;
    this.responseBuilder = responseBuilder;
  }
  _createClass(WhatService, [{
    key: "changeDecisionBasedOnText",
    value: function changeDecisionBasedOnText(decision) {
      switch (this.inputText) {
        case this.inputText.match(new RegExp(/doen/)):
          decision = 8;
          break;
        default:
          decision = decision;
          break;
      }
      return decision;
    }
  }]);
  return WhatService;
}();
exports.WhatService = WhatService;