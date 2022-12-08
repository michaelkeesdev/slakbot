"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PUNCTUATION_MARKS_PID = exports.PUNCTUATION_MARKS_FREQUENCY_LIST = exports.PUNCTUATION_MARKS = void 0;
var _FrequencyList = require("../../util/FrequencyList");
// first being most common
// frequency van 2 marks achter elkaar is 30% van de huidige frequency

var PUNCTUATION_MARKS_PID = 90;
exports.PUNCTUATION_MARKS_PID = PUNCTUATION_MARKS_PID;
var PUNCTUATION_MARKS = [{
  value: ".",
  tags: [],
  frequency: 100
}, {
  value: ",",
  tags: [],
  frequency: 10
}, {
  value: "!",
  tags: ["ANGRY", "HAPPY"],
  frequency: 60
}, {
  value: "?",
  tags: [],
  frequency: 80
}, {
  value: "..",
  tags: [],
  frequency: 20
}, {
  value: "...",
  tags: ["ANGRY"],
  frequency: 15
}, {
  value: "......",
  tags: ["ANGRY"],
  frequency: 10
}];
exports.PUNCTUATION_MARKS = PUNCTUATION_MARKS;
var PUNCTUATION_MARKS_FREQUENCY_LIST = PUNCTUATION_MARKS.flatMap(_FrequencyList.frequencyList);
exports.PUNCTUATION_MARKS_FREQUENCY_LIST = PUNCTUATION_MARKS_FREQUENCY_LIST;