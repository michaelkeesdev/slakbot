"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseGameService = void 0;
var _TagService = require("./../user/TagService");
var _UserService = require("../user/UserService");
var _BladSteenSchaarService = require("./BladSteenSchaarService");
var _HigherLowerService = require("./HigherLowerService");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var currentRunningGames = new Map();
var BaseGameService = /*#__PURE__*/function () {
  function BaseGameService(platform) {
    _classCallCheck(this, BaseGameService);
    _defineProperty(this, "tagService", void 0);
    _defineProperty(this, "userService", void 0);
    this.tagService = new _TagService.TagService(platform);
    this.userService = new _UserService.UserService();
  }
  _createClass(BaseGameService, [{
    key: "textInputContainsGameName",
    value: function textInputContainsGameName(textInput) {
      return textInput === "rps" || textInput.substr(0, 12) === "higher lower";
    }
  }, {
    key: "initGame",
    value: function initGame(textInput, user) {
      var _this = this;
      if (this.textInputContainsGameName(textInput) && !currentRunningGames.has(user)) {
        var initUserObject = this.userService.getUserById(user);
        var initPlayerTag = this.tagService.tagUser(initUserObject);
        var players = [initPlayerTag];
        // Gameservice needs init() method
        if (textInput === "rps") {
          currentRunningGames.set(initPlayerTag, new _BladSteenSchaarService.BladSteenSchaarService(players));
        } else if (textInput.substr(0, 12) === "higher lower") {
          this.userService.extractUsersFromText(textInput).forEach(function (user) {
            players.push(_this.tagService.tagUser(user));
          });
          this.shufflePlayers(players);
          currentRunningGames.set(initPlayerTag, new _HigherLowerService.HigherLowerService(players));
        }
      }
    }
  }, {
    key: "playGame",
    value: function playGame(textInput, user) {
      var playerObject = this.userService.getUserById(user);
      if (playerObject != null) {
        var playerTag = this.tagService.tagUser(playerObject);
        // Gameservice needs play() method
        if (currentRunningGames.has(playerTag) && !currentRunningGames.get(playerTag).gameHasEnded()) {
          var game = currentRunningGames.get(playerTag);
          var init = false;
          if (textInput === "rps") {
            init = true;
          } else if (textInput.substr(0, 12) === "higher lower") {
            init = true;
          }
          var response = game.play(textInput, init);

          // Gameservice needs gameHasEnded() method
          currentRunningGames["delete"](playerTag);
          if (!game.gameHasEnded()) {
            console.log("setting next player in game on", game.getNextPlayerTag());
            currentRunningGames.set(game.getNextPlayerTag(), game);
          }
          return response;
        }
      }
    }
  }, {
    key: "shufflePlayers",
    value: function shufflePlayers(players) {
      for (var i = players.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var _ref = [players[j], players[i]];
        players[i] = _ref[0];
        players[j] = _ref[1];
      }
    }
  }]);
  return BaseGameService;
}();
exports.BaseGameService = BaseGameService;