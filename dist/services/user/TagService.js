"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TagService = void 0;
var _UserService = require("./UserService");
var _StringBuilder = require("./../../util/StringBuilder");
var _BasicCommand = require("./../../answers/basic/BasicCommand");
var _Scheld = require("../../answers/basic/Scheld");
var _Adjectives = require("../../answers/words/Adjectives");
var _lodash = require("lodash");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var TagService = /*#__PURE__*/function () {
  function TagService(platform) {
    _classCallCheck(this, TagService);
    _defineProperty(this, "platform", "");
    _defineProperty(this, "userService", new _UserService.UserService());
    this.platform = platform;
  }
  _createClass(TagService, [{
    key: "tagUserAndAddTextCommand",
    value: function tagUserAndAddTextCommand(text) {
      var responseBuilder = new _StringBuilder.StringBuilder();
      var users = this.userService.extractUsersFromText(text);
      if (users.length > 0) {
        responseBuilder.append(this.tagUsers(users));
        var alreadyMatched = false;
        _BasicCommand.BASIC_COMMAND.forEach(function (command) {
          if (text.split(" ".concat(command, " ")).length > 1 && !alreadyMatched) {
            alreadyMatched = true;
            return responseBuilder.append(text.split(" ".concat(command, " "))[1]).toString();
          }
        });
      } else {
        responseBuilder.append("wie?");
      }
      return responseBuilder.toString();
    }
  }, {
    key: "tagUserAndScheld",
    value: function tagUserAndScheld(text) {
      var responseBuilder = new _StringBuilder.StringBuilder();
      var users = this.userService.extractUsersFromText(text);
      var scheldParts = {
        "%adjective%": (0, _lodash.sample)(_Adjectives.ADJECTIVES),
        "%scheld%": (0, _lodash.sample)(_Scheld.SCHELD),
        "%suffix%": (0, _lodash.sample)(_Scheld.SCHELD_SUFFIX)
      };
      var scheld = (0, _lodash.sample)(_Scheld.SCHELD_PHRASE).replace(/%\w+%/g, function (all) {
        return scheldParts[all] || all;
      });
      if (users.length > 0) {
        responseBuilder.append(this.tagUsers(users) + scheld);
      } else {
        responseBuilder.append("wie?");
      }
      return responseBuilder.toString();
    }
  }, {
    key: "tagUsers",
    value: function tagUsers(users) {
      var _this = this;
      var responseBuilder = new _StringBuilder.StringBuilder();
      users.forEach(function (user) {
        responseBuilder.append(_this.tagUser(user)).append(" ");
      });
      return responseBuilder.toString();
    }
  }, {
    key: "tagUser",
    value: function tagUser(user) {
      if (user != null) {
        if (this.platform == "slack" && user.id) {
          return "<@".concat(user.id, ">");
        } else if (user.discordId) {
          return "<@".concat(user.discordId, ">");
        }
      }
    }
  }, {
    key: "tagEveryone",
    value: function tagEveryone() {
      if (this.platform == "discord") {
        return "Hup @everyone";
      } else {
        return "Hup <!channel>";
      }
    }
  }]);
  return TagService;
}();
exports.TagService = TagService;