"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BirthdayService = void 0;
var _UserService = require("./UserService");
var _StringBuilder = require("./../../util/StringBuilder");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var BirthdayService = /*#__PURE__*/function () {
  function BirthdayService() {
    _classCallCheck(this, BirthdayService);
    _defineProperty(this, "userService", new _UserService.UserService());
  }
  _createClass(BirthdayService, [{
    key: "getBirthday",
    value: function getBirthday(text) {
      var responseBuilder = new _StringBuilder.StringBuilder();
      var users = this.userService.extractUsersFromText(text);
      if (users.length > 0) {
        users.forEach(function (user) {
          if (user.birthday !== "") {
            responseBuilder.append("De verjaardag van ").append(user.firstName + " " + user.lastName).append(" is op ").append(user.birthDay).append(". ");
          } else {
            responseBuilder.append("ken ik nog ni").append(". ");
          }
        });
      } else {
        responseBuilder.append("jaardag van wie slet?");
      }
      return responseBuilder.toString();
    }
  }]);
  return BirthdayService;
}();
exports.BirthdayService = BirthdayService;