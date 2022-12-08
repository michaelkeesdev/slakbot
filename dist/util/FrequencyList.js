"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.frequencyList = frequencyList;
function frequencyList(mark) {
  var list = [];
  for (var i = 0; i < mark.frequency; i++) {
    list.push({
      value: mark.value,
      tags: mark.tags
    });
  }
  return list;
}