"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SUFFIX_PID = exports.SUFFIX_FREQUENCY_LIST = exports.SUFFIX = void 0;
var _FrequencyList = require("../../util/FrequencyList");
var SUFFIX_PID = 40; // 30/100%
exports.SUFFIX_PID = SUFFIX_PID;
var SUFFIX = [{
  value: "he",
  tags: [],
  frequency: 100
}, {
  value: "hoor",
  tags: ["HAPPY"],
  frequency: 6
}, {
  value: "pff",
  tags: ["ANGRY", "SAD", "GRUMPY"],
  frequency: 60
}, {
  value: "zucht",
  tags: ["ANGRY", "SAD", "GRUMPY"],
  frequency: 20
}, {
  value: "ff",
  tags: [],
  frequency: 20
}, {
  value: "nu",
  tags: [],
  frequency: 30
}, {
  value: "mh",
  tags: [],
  frequency: 50
}, {
  value: "denk ik",
  tags: [],
  frequency: 50
}, {
  value: "denk",
  tags: [],
  frequency: 50
}, {
  value: "nope",
  tags: ["ANGRY"],
  frequency: 20
}, {
  value: "Sterf",
  tags: ["ANGRY"],
  frequency: 3
}];
exports.SUFFIX = SUFFIX;
var SUFFIX_FREQUENCY_LIST = SUFFIX.flatMap(_FrequencyList.frequencyList);
exports.SUFFIX_FREQUENCY_LIST = SUFFIX_FREQUENCY_LIST;