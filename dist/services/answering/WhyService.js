"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WhyService = void 0;
var _lodash = require("lodash");
var _Why = require("../../answers/Why");
var _RandomNouns = require("../../answers/words/RandomNouns");
var _Verbs = require("../../answers/words/Verbs");
var _Adjectives = require("../../answers/words/Adjectives");
var _Scheld = require("../../answers/basic/Scheld");
var _UserService = require("../user/UserService");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var WhyService = /*#__PURE__*/_createClass(function WhyService(mood, inputText, responseBuilder) {
  var _this = this;
  _classCallCheck(this, WhyService);
  _defineProperty(this, "mood", void 0);
  _defineProperty(this, "inputText", void 0);
  _defineProperty(this, "responseBuilder", void 0);
  _defineProperty(this, "answer", function () {
    var noun1 = (0, _lodash.sample)(_RandomNouns.NOUNS);
    var noun2 = (0, _lodash.sample)(_RandomNouns.NOUNS);
    var user = new _UserService.UserService().getRandomUserRandomName();
    var verb = (0, _lodash.sample)(_Verbs.VERBS);
    var adjective = (0, _lodash.sample)(_Adjectives.ADJECTIVES);
    var scheld = (0, _lodash.sample)(_Scheld.SCHELD);
    var why = {
      "%noun1%": noun1,
      "%noun2%": noun2,
      "%user%": user,
      "%verb%": verb,
      "%adjective%": adjective,
      "%scheld%": scheld
    };
    var answer = (0, _lodash.sample)(_Why.WHY_ANSWERS).replace(/%\w+%/g, function (all) {
      return why[all] || all;
    });
    _this.responseBuilder.append(answer);
    return _this.responseBuilder.toString();
  });
  this.mood = mood;
  this.inputText = inputText;
  this.responseBuilder = responseBuilder;
});
exports.WhyService = WhyService;