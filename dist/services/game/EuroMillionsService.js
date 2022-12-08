"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuroMillionsService = void 0;
var _NumberUtil = require("../../util/NumberUtil");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var EuroMillionsService = /*#__PURE__*/function () {
  function EuroMillionsService() {
    _classCallCheck(this, EuroMillionsService);
    _defineProperty(this, "numberUtil", new _NumberUtil.NumberUtil());
  }
  _createClass(EuroMillionsService, [{
    key: "getNextDraw",
    value: function getNextDraw() {
      var n = this.numberUtil.generateRandomList(5, 1, 50);
      var s = this.numberUtil.generateRandomList(2, 1, 12);
      var nextDraw = this.getNextEuroMillionsDrawDay();
      return "De winnende cijfers van ".concat(nextDraw, " zijn: ").concat(n[0], ", ").concat(n[1], ", ").concat(n[2], ", ").concat(n[3], " en ").concat(n[4], ". De sterren zijn ").concat(s[0], " en ").concat(s[1], ".");
    }
  }, {
    key: "getNextEuroMillionsDrawDay",
    value: function getNextEuroMillionsDrawDay() {
      var weekdays = [],
        today = new Date().getDay();
      weekdays[0] = "zondag";
      weekdays[1] = "maandag";
      weekdays[2] = "dinsdag";
      weekdays[3] = "woensdag";
      weekdays[4] = "donderdag";
      weekdays[5] = "vrijdag";
      weekdays[6] = "zaterdag";
      if (today == 2 || today == 5) {
        return "vandaag";
      } else if (today < 2 || today > 5) {
        return weekdays[2];
      } else {
        return weekdays[5];
      }
    }
  }]);
  return EuroMillionsService;
}();
exports.EuroMillionsService = EuroMillionsService;