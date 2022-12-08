"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BladSteenSchaarService = void 0;
var _lodash = require("lodash");
var _BladSteenSchaar = require("../../answers/game/BladSteenSchaar");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var BladSteenSchaarService = /*#__PURE__*/function () {
  function BladSteenSchaarService(players) {
    _classCallCheck(this, BladSteenSchaarService);
    _defineProperty(this, "gameEnded", void 0);
    _defineProperty(this, "player1Tag", void 0);
    // Just 1
    this.player1Tag = players[0];
  }
  _createClass(BladSteenSchaarService, [{
    key: "init",
    value: function init() {
      var response = (0, _lodash.sample)(_BladSteenSchaar.BLAD_STEEN_SCHAAR_INIT_PHRASE);
      var bladsteenschaar = {
        "%player1Tag%": this.getPlayer1Tag()
      };
      return response.replace(/%\w+%/g, function (all) {
        return bladsteenschaar[all] || all;
      });
    }
  }, {
    key: "play",
    value: function play(playerInput, init) {
      if (init) {
        response = this.init();
        this.gameEnded = false;
        return response;
      }
      this.gameOnFirstTurn = false;
      var maggiePick = (0, _lodash.sample)(_BladSteenSchaar.BLAD_STEEN_SCHAAR);
      var response;
      if (this.isEqual(playerInput, maggiePick)) {
        response = (0, _lodash.sample)(_BladSteenSchaar.BLAD_STEEN_SCHAAR_EQUAL_PHRASE);
      } else if (this.isWinForMaggie(playerInput, maggiePick)) {
        response = (0, _lodash.sample)(_BladSteenSchaar.BLAD_STEEN_SCHAAR_MAGGIE_WIN_PHRASE);
      } else if (this.isLossForMaggie(playerInput, maggiePick)) {
        response = (0, _lodash.sample)(_BladSteenSchaar.BLAD_STEEN_SCHAAR_MAGGIE_LOSS_PHRASE);
      } else {
        response = (0, _lodash.sample)(_BladSteenSchaar.BLAD_STEEN_SCHAAR_WTF_PHRASE);
      }
      var bladsteenschaar = {
        "%bladsteenschaar%": maggiePick,
        "%player1Tag%": this.getPlayer1Tag()
      };
      this.gameEnded = true;
      return response.replace(/%\w+%/g, function (all) {
        return bladsteenschaar[all] || all;
      });
    }
  }, {
    key: "isEqual",
    value: function isEqual(playerInput, maggiePick) {
      return playerInput.includes("blad") && maggiePick === "blad" || playerInput.includes("steen") && maggiePick === "steen" || playerInput.includes("schaar") && maggiePick === "schaar";
    }
  }, {
    key: "isWinForMaggie",
    value: function isWinForMaggie(playerInput, maggiePick) {
      return playerInput.includes("blad") && maggiePick === "schaar" || playerInput.includes("steen") && maggiePick === "blad" || playerInput.includes("schaar") && maggiePick === "steen";
    }
  }, {
    key: "isLossForMaggie",
    value: function isLossForMaggie(playerInput, maggiePick) {
      return playerInput.includes("blad") && maggiePick === "steen" || playerInput.includes("steen") && maggiePick === "schaar" || playerInput.includes("schaar") && maggiePick === "blad";
    }
  }, {
    key: "getPlayer1Tag",
    value: function getPlayer1Tag() {
      return this.player1Tag;
    }
  }, {
    key: "getNextPlayerTag",
    value: function getNextPlayerTag() {
      return this.player1Tag;
    }
  }, {
    key: "gameHasEnded",
    value: function gameHasEnded() {
      return this.gameEnded;
    }
  }]);
  return BladSteenSchaarService;
}();
exports.BladSteenSchaarService = BladSteenSchaarService;