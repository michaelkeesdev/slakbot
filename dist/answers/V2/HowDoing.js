"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HOW_YOU_DOING_TRIGGER = exports.HOW_YOU_DOING_SUFFIX = exports.HOW_YOU_DOING_PREFIX = exports.HOW_YOU_DOING_ANSWER = void 0;
var HOW_YOU_DOING_TRIGGER = ["hoe gaat", "alles goed", "cva"];
exports.HOW_YOU_DOING_TRIGGER = HOW_YOU_DOING_TRIGGER;
var HOW_YOU_DOING_PREFIX = ["Met mij gaat het", "Hier echt", "Best"];
exports.HOW_YOU_DOING_PREFIX = HOW_YOU_DOING_PREFIX;
var HOW_YOU_DOING_ANSWER = [{
  value: "Prachtig",
  tags: ["HAPPY", "KIND"]
}, {
  value: "Top",
  tags: ["HAPPY", "KIND"]
}, {
  value: "Perfect",
  tags: ["HAPPY", "KIND"]
}, {
  value: "Slecht",
  tags: ["SAD", "ANGRY"]
}, {
  value: "Goed",
  tags: ["HAPPY", "KIND"]
}, {
  value: "Moeilijk, ik ben moe",
  tags: ["SAD", "ANGRY"]
}, {
  value: "Heel goed vandaag",
  tags: ["HAPPY", "KIND"]
}, {
  value: "Matig, maar ok",
  tags: ["SAD", "ANGRY"]
}, {
  value: "Oke",
  tags: ["KIND"]
}, {
  value: "Super",
  tags: ["HAPPY", "KIND"]
}, {
  value: "Echt niet goed",
  tags: ["SAD", "ANGRY"]
}, {
  value: "Niet goed",
  tags: ["SAD", "ANGRY"]
}, {
  value: "Vies triest",
  tags: ["SAD", "ANGRY"]
}, {
  value: "Vies goed",
  tags: ["HAPPY", "KIND"]
}];
exports.HOW_YOU_DOING_ANSWER = HOW_YOU_DOING_ANSWER;
var HOW_YOU_DOING_SUFFIX = ["met u?", "cva met u?", "hoe gaat het bij jou?", "jij?"];
exports.HOW_YOU_DOING_SUFFIX = HOW_YOU_DOING_SUFFIX;