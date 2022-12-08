"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StringBuilder = void 0;
var _StringUtil = require("./StringUtil");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var StringBuilder = /*#__PURE__*/function () {
  function StringBuilder() {
    _classCallCheck(this, StringBuilder);
    _defineProperty(this, "strings", void 0);
    this.strings = [];
    return this;
  }
  _createClass(StringBuilder, [{
    key: "append",
    value: function append(value, caseCheck, punctuationList) {
      if (caseCheck && _StringUtil.StringUtil.lastCharEqualsOneOf(this.toString(), punctuationList)) {
        value = _StringUtil.StringUtil.firstCharToLower(value);
      }
      if (value) {
        this.strings.push(value);
      }
      return this;
    }
  }, {
    key: "appendFullStopIfNone",
    value: function appendFullStopIfNone(punctuations) {
      var punctuationList = punctuations ? punctuations : [",", ".", "?", "!"];
      if (!_StringUtil.StringUtil.lastCharEqualsOneOf(this.toString(), punctuationList)) {
        this.append(".");
      }
      return this;
    }
  }, {
    key: "appendWithCasing",
    value: function appendWithCasing(value, caseCheck, punctuationList) {
      if (caseCheck && _StringUtil.StringUtil.lastCharEqualsOneOf(this.toString(), punctuationList)) {
        value = _StringUtil.StringUtil.firstCharToUpper(value);
      } else {
        value = _StringUtil.StringUtil.firstCharToLower(value);
      }
      if (value) {
        this.strings.push(" " + value);
      }
      return this;
    }
  }, {
    key: "clear",
    value: function clear() {
      this.strings = [];
      return this;
    }
  }, {
    key: "toString",
    value: function toString() {
      return this.strings.join("");
    }
  }]);
  return StringBuilder;
}();
exports.StringBuilder = StringBuilder;