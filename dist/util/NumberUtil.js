"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NumberUtil = void 0;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var NumberUtil = /*#__PURE__*/function () {
  function NumberUtil() {
    _classCallCheck(this, NumberUtil);
  }
  _createClass(NumberUtil, [{
    key: "generateRandom",
    value: function generateRandom(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
  }, {
    key: "generateRandomList",
    value: function generateRandomList(listSize, minNumber, maxNumber) {
      var numbers = [],
        random;
      do {
        random = this.generateRandom(minNumber, maxNumber);
        if (!numbers.includes(random)) {
          numbers.push(random);
        }
      } while (numbers.length < listSize);
      return numbers.sort(function (a, b) {
        return a - b;
      });
    }
  }], [{
    key: "toFixed",
    value: function toFixed(x) {
      if (Math.abs(x) < 1.0) {
        var e = parseInt(x.toString().split('e-')[1]);
        if (e) {
          x *= Math.pow(10, e - 1);
          x = '0.' + new Array(e).join('0') + x.toString().substring(2);
        }
      } else {
        var e = parseInt(x.toString().split('+')[1]);
        if (e > 20) {
          e -= 20;
          x /= Math.pow(10, e);
          x += new Array(e + 1).join('0');
        }
      }
      return x;
    }
  }]);
  return NumberUtil;
}();
exports.NumberUtil = NumberUtil;