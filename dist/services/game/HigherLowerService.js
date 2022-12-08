"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HigherLowerService = void 0;
var _lodash = require("lodash");
var _NumberUtil = require("../../util/NumberUtil");
var _HigherLower = require("../../answers/game/HigherLower");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var HigherLowerService = /*#__PURE__*/function () {
  function HigherLowerService(players) {
    var _this = this;
    _classCallCheck(this, HigherLowerService);
    _defineProperty(this, "numberUtil", new _NumberUtil.NumberUtil());
    _defineProperty(this, "lastPick", void 0);
    _defineProperty(this, "currentPlayerTag", void 0);
    _defineProperty(this, "nextPlayerTag", void 0);
    _defineProperty(this, "nextPlayerIndex", 0);
    _defineProperty(this, "players", void 0);
    _defineProperty(this, "scores", new Map());
    _defineProperty(this, "playerFirstTurn", new Map());
    _defineProperty(this, "playerLostFlag", new Map());
    this.players = players;
    this.nextPlayerTag = players[0];
    this.players.forEach(function (player) {
      _this.scores.set(player, 0);
      _this.playerFirstTurn.set(player, true);
      _this.playerLostFlag.set(player, false);
    });
  }
  _createClass(HigherLowerService, [{
    key: "init",
    value: function init() {
      this.lastPick = this.numberUtil.generateRandom(1, 100);
      var higherLower = {
        "%number%": this.lastPick,
        "%nextPlayerTag%": this.getNextPlayerTag()
      };
      return (0, _lodash.sample)(_HigherLower.HIGHER_LOWER_INIT_PHRASE).replace(/%\w+%/g, function (all) {
        return higherLower[all] || all;
      });
    }
  }, {
    key: "play",
    value: function play(playerInput, init) {
      var _this2 = this;
      if (init) {
        return this.init();
      }

      // Prepare current turn
      this.setCurrentPlayerTag(this.nextPlayerTag);
      console.log("set current player to ", this.nextPlayerTag);
      do {
        if (this.players.length - 1 > this.nextPlayerIndex) {
          this.nextPlayerIndex++;
        } else {
          this.nextPlayerIndex = 0;
        }
      } while (this.playerLostFlag.get(this.players[this.nextPlayerIndex]));
      console.log("set next player to ", this.players[this.nextPlayerIndex]);
      this.setNextPlayerTag(this.players[this.nextPlayerIndex]);
      this.playerFirstTurn.set(this.getCurrentPlayerTag, false);

      // Game
      var maggiePick;
      do {
        maggiePick = this.numberUtil.generateRandom(1, 100);
      } while (maggiePick === this.lastPick);
      var response;
      console.log("Maggie picked ", maggiePick, "for ", this.getCurrentPlayerTag(), ".", this.getCurrentPlayerTag(), "said ", playerInput, ".");
      if (this.playerWon(playerInput, maggiePick)) {
        console.log(this.getCurrentPlayerTag(), "wins");
        var currentScore = this.scores.get(this.getCurrentPlayerTag());
        var newScore = currentScore + 1;
        this.scores.set(this.getCurrentPlayerTag(), newScore);
        this.lastPick = maggiePick;
        response = this.respond((0, _lodash.sample)(_HigherLower.HIGHER_LOWER_CORRECT_CONTINUE));
      } else if (this.playerLost(playerInput, maggiePick)) {
        console.log(this.getCurrentPlayerTag(), "loses");
        this.playerLostFlag.set(this.getCurrentPlayerTag(), true);
        this.lastPick = maggiePick;
        if (this.gameHasEnded()) {
          response = this.respond((0, _lodash.sample)(_HigherLower.HIGHER_LOWER_WRONG_END));
          this.players.forEach(function (player) {
            response += player + ": " + _this2.scores.get(player) + " punt. ";
          });
        } else {
          response = this.respond((0, _lodash.sample)(_HigherLower.HIGHER_LOWER_WRONG_LOSE));
        }
      } else if (this.playerSkip(playerInput, maggiePick)) {
        response = this.respond((0, _lodash.sample)(_HigherLower.HIGHER_LOWER_SKIP));
      } else {
        response = this.respond((0, _lodash.sample)(_HigherLower.HIGHER_LOWER_WTF_PHRASE));
      }
      return response;
    }
  }, {
    key: "respond",
    value: function respond(response) {
      var score = this.scores.get(this.getCurrentPlayerTag());
      var higherLower = {
        "%number%": this.lastPick,
        "%score%": score,
        "%currentPlayerTag%": this.getCurrentPlayerTag(),
        "%nextPlayerTag%": this.getNextPlayerTag()
      };
      return response.replace(/%\w+%/g, function (all) {
        return higherLower[all] || all;
      });
    }
  }, {
    key: "playerWon",
    value: function playerWon(playerInput, maggiePick) {
      return this.playerSaidHigher(playerInput) && !this.playerSaidLower(playerInput) && maggiePick > this.lastPick || this.playerSaidLower(playerInput) && !this.playerSaidHigher(playerInput) && maggiePick < this.lastPick;
    }
  }, {
    key: "playerLost",
    value: function playerLost(playerInput, maggiePick) {
      return this.playerSaidHigher(playerInput) && !this.playerSaidLower(playerInput) && maggiePick < this.lastPick || this.playerSaidLower(playerInput) && !this.playerSaidHigher(playerInput) && maggiePick > this.lastPick;
    }
  }, {
    key: "playerSaidHigher",
    value: function playerSaidHigher(playerInput) {
      return playerInput.includes("hoger") || playerInput.includes("higher");
    }
  }, {
    key: "playerSaidLower",
    value: function playerSaidLower(playerInput) {
      return playerInput.includes("lager") || playerInput.includes("lower");
    }
  }, {
    key: "playerSkip",
    value: function playerSkip(playerInput) {
      return playerInput.includes("skip");
    }
  }, {
    key: "getPlayer1Tag",
    value: function getPlayer1Tag() {
      return this.player1Tag;
    }
  }, {
    key: "setNextPlayerTag",
    value: function setNextPlayerTag(nextPlayerTag) {
      this.nextPlayerTag = nextPlayerTag;
    }
  }, {
    key: "setCurrentPlayerTag",
    value: function setCurrentPlayerTag(currentPlayerTag) {
      this.currentPlayerTag = currentPlayerTag;
    }
  }, {
    key: "getNextPlayerTag",
    value: function getNextPlayerTag() {
      return this.nextPlayerTag;
    }
  }, {
    key: "getCurrentPlayerTag",
    value: function getCurrentPlayerTag() {
      return this.currentPlayerTag;
    }
  }, {
    key: "gameHasEnded",
    value: function gameHasEnded() {
      var _this3 = this;
      var playerStillPlaying = false;
      this.players.forEach(function (player) {
        if (!_this3.playerLostFlag.get(player)) {
          return playerStillPlaying = true;
        }
      });
      return !playerStillPlaying;
    }
  }]);
  return HigherLowerService;
}();
exports.HigherLowerService = HigherLowerService;