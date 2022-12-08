"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HowMuchService = void 0;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var PID_100 = 20;
var PID_1000 = 40;
var HowMuchService = /*#__PURE__*/_createClass(function HowMuchService(mood, inputText, responseBuilder) {
  var _this = this;
  _classCallCheck(this, HowMuchService);
  _defineProperty(this, "mood", void 0);
  _defineProperty(this, "inputText", void 0);
  _defineProperty(this, "responseBuilder", void 0);
  _defineProperty(this, "answer", function () {
    var pid100 = Math.floor(Math.random() * PID_100);
    var pid1000 = Math.floor(Math.random() * PID_1000);
    if (pid1000 === 1) {
      _this.responseBuilder.append(Math.floor(Math.random() * 1000));
    } else if (pid100 === 1) {
      _this.responseBuilder.append(Math.floor(Math.random() * 100));
    } else {
      _this.responseBuilder.append(Math.floor(Math.random() * 10));
    }
    return _this.responseBuilder.toString();
  });
  this.mood = mood;
  this.inputText = inputText;
  this.responseBuilder = responseBuilder;
});
exports.HowMuchService = HowMuchService;