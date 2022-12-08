"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserService = void 0;
var _lodash = require("lodash");
var _User = require("../../answers/user/User");
var _TubeService = require("../google/TubeService");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var UserService = /*#__PURE__*/function () {
  function UserService() {
    _classCallCheck(this, UserService);
    _defineProperty(this, "activeUser", "");
  }
  _createClass(UserService, [{
    key: "getRandomUser",
    value: function getRandomUser() {
      var nameRoll = Math.floor(Math.random() * 10);
      if (nameRoll < 8) {
        return (0, _lodash.sample)(_User.USERS);
      } else if (nameRoll == 8 || nameRoll == 9) {
        return (0, _lodash.sample)(_User.USERS_EXTRA);
      }
    }
  }, {
    key: "getRandomUserRandomName",
    value: function getRandomUserRandomName() {
      var user = this.getRandomUser();
      var nameRoll = Math.floor(Math.random() * 10);
      if (nameRoll < 5) {
        if (user.tagName) {
          return user.tagName;
        } else {
          return user.firstName;
        }
      }
      if (nameRoll == 5 || nameRoll == 6) {
        return user.shortNames[Math.floor(Math.random() * user.shortNames.length)];
      }
      if (nameRoll == 7) {
        return user.lastName;
      }
      if (nameRoll == 8 || nameRoll == 9) {
        return user.firstName.concat(" ").concat(user.lastName);
      }
    }
  }, {
    key: "extractUsersFromText",
    value: function extractUsersFromText(text) {
      var _this = this;
      if (text.includes("iedereen")) {
        return _User.USERS;
      }
      return _User.USERS.filter(function (user) {
        return _this.textIncludesUser(text.toLowerCase(), user);
      });
    }
  }, {
    key: "getUserById",
    value: function getUserById(id) {
      var users = _User.USERS.filter(function (user) {
        return user.id == id || user.discordId == id;
      });
      if (users.length == 1) return users[0];
    }
  }, {
    key: "textIncludesUser",
    value: function textIncludesUser(text, user) {
      return text.includes(user.id) || text.includes(user.tagName) || user.shortNames.some(function (shortName) {
        return text.includes(shortName.toLowerCase());
      });
    }
  }]);
  return UserService;
}();
exports.UserService = UserService;