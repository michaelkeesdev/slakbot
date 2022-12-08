"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BASIC_ANSWER_FREQUENCY_LIST = exports.BASIC_ANSWER = void 0;
var _FrequencyList = require("../../util/FrequencyList");
// punct kan na answer komen
// suffix kan na answer komen en voor punct
// prefix kan enkel voor answer komen
// emojis kan na answer komen en voor answer
// answert kan herhaald worden max 1x
// adjectives zijn prefixes en komen voor answer
// emojis kunnen op zichzelf bestaan
// PREFIX kunnen oo op zichzelf bestaan
// Punctuation kunnen op zichzelf bestaan

// als vraagteken in zin -> domme vraag

var BASIC_ANSWER = [{
  value: "Zeer zeker",
  tags: ["HAPPY", "KIND", "AGREE"],
  frequency: 70
}, {
  value: "Volgens mij wel",
  tags: ["AGREE"],
  frequency: 70
}, {
  value: "Zeer waarschijnlijk wel",
  tags: ["AGREE"],
  frequency: 60
}, {
  value: "Ja",
  tags: ["AGREE"],
  frequency: 5000
}, {
  value: "Affirmatief",
  tags: ["AGREE"],
  frequency: 500
}, {
  value: "Correct",
  tags: ["AGREE"],
  frequency: 70
}, {
  value: "Yep",
  tags: ["AGREE"],
  frequency: 5000
}, {
  value: "Pak van wel",
  tags: ["AGREE"],
  frequency: 40
}, {
  value: "Zeker en vast",
  tags: ["HAPPY", "KIND", "AGREE"],
  frequency: 60
}, {
  value: "Jazeker",
  tags: ["AGREE"],
  frequency: 60
}, {
  value: "Kan he",
  tags: ["SAD", "AGREE"],
  frequency: 70
}, {
  value: "Natuurlijk",
  tags: ["HAPPY", "AGREE"],
  frequency: 60
}, {
  value: "Mhm",
  tags: ["NEUTRAL"],
  frequency: 30
}, {
  value: "Mh",
  tags: ["NEUTRAL"],
  frequency: 30
}, {
  value: "Ye",
  tags: ["AGREE"],
  frequency: 50
}, {
  value: "Klopt",
  tags: ["AGREE"],
  frequency: 60
}, {
  value: "Is",
  tags: ["AGREE"],
  frequency: 70
}, {
  value: "Zeker",
  tags: ["AGREE"],
  frequency: 60
}, {
  value: "Idd",
  tags: ["AGREE"],
  frequency: 60
}, {
  value: "Ofc",
  tags: ["AGREE"],
  frequency: 60
}, {
  value: "Ja",
  tags: ["AGREE"],
  frequency: 80
}, {
  value: "Tuurlijk",
  tags: ["HAPPY", "AGREE"],
  frequency: 70
}, {
  value: "Wa dacht ge",
  tags: ["ANGRY", "AGREE"],
  frequency: 40
}, {
  value: "Yes",
  tags: ["AGREE"],
  frequency: 70
}, {
  value: "Jaja",
  tags: ["NEUTRAL"],
  frequency: 70
}, {
  value: "Jong",
  tags: ["NEUTRAL"],
  frequency: 20
}, {
  value: "Jom",
  tags: ["NEUTRAL"],
  frequency: 20
}, {
  value: "Dat is een zekerheid",
  tags: ["HAPPY", "KIND", "AGREE"],
  frequency: 505
}, {
  value: "Zal zo zijn",
  tags: ["AGREE"],
  frequency: 40
}, {
  value: "Ja",
  tags: ["AGREE"],
  frequency: 90
}, {
  value: "Sowieso",
  tags: ["AGREE"],
  frequency: 40
}, {
  value: "Zowiezo",
  tags: ["HAPPY", "KIND", "AGREE"],
  frequency: 30
}, {
  value: "Wees daar maar zeker van",
  tags: ["HAPPY", "KIND", "AGREE"],
  frequency: 505
}, {
  value: "Absoluut",
  tags: ["AGREE"],
  frequency: 20
}, {
  value: "Gelijk",
  tags: ["KIND", "AGREE"],
  frequency: 50
}, {
  value: "Zal wel",
  tags: ["AGREE"],
  frequency: 60
}, {
  value: "Is wel",
  tags: ["AGREE"],
  frequency: 60
}, {
  value: "Altijd gelijk",
  tags: ["KIND", "AGREE"],
  frequency: 30
}, {
  value: "Jaa",
  tags: ["HAPPY", "KIND", "AGREE"],
  frequency: 40
}, {
  value: "Klopt zeker",
  tags: ["AGREE"],
  frequency: 50
}, {
  value: "Yep is zo",
  tags: ["AGREE"],
  frequency: 50
}, {
  value: "Zo is dat",
  tags: ["AGREE"],
  frequency: 50
}, {
  value: "Is zeker zo",
  tags: ["AGREE"],
  frequency: 50
}, {
  value: "Zal wel zijn",
  tags: ["AGREE"],
  frequency: 50
}, {
  value: "Waarschijnlijk",
  tags: ["AGREE"],
  frequency: 50
}, {
  value: "Lijkt mij van wel",
  tags: ["AGREE"],
  frequency: 30
}, {
  value: "Lijkt mij correct",
  tags: ["AGREE"],
  frequency: 30
}, {
  value: "Is zo",
  tags: ["AGREE"],
  frequency: 50
}, {
  value: "Zal kloppen",
  tags: ["AGREE"],
  frequency: 50
}, {
  value: "Tuurlijk",
  tags: ["KIND", "AGREE"],
  frequency: 70
}, {
  value: "Sws",
  tags: ["AGREE"],
  frequency: 70
}, {
  value: "Ja waarom ni",
  tags: ["AGREE"],
  frequency: 40
}, {
  value: "Positief",
  tags: ["KIND", "AGREE"],
  frequency: 20
}, {
  value: "Uiteraard",
  tags: ["AGREE"],
  frequency: 20
}, {
  value: "Vanzelfsprekend",
  tags: ["AGREE"],
  frequency: 20
}, {
  value: "Vast",
  tags: ["AGREE"],
  frequency: 20
}, {
  value: "Natuurlijk",
  tags: ["HAPPY", "KIND", "AGREE"],
  frequency: 50
}, {
  value: "Bevestigd",
  tags: ["AGREE"],
  frequency: 10
}, {
  value: "Uw ja zij ja",
  tags: ["HAPPY", "KIND", "AGREE"],
  frequency: 5
}, {
  value: "Juist",
  tags: ["HAPPY", "KIND", "AGREE"],
  frequency: 70
}, {
  value: "Klopt als een bus",
  tags: ["KIND", "AGREE"],
  frequency: 5
}, {
  value: "Correct",
  tags: ["KIND", "AGREE"],
  frequency: 70
}, {
  value: "Geldig",
  tags: ["KIND", "AGREE"],
  frequency: 5
}, {
  value: "Terecht",
  tags: ["KIND", "AGREE"],
  frequency: 20
}, {
  value: "Waar",
  tags: ["KIND", "AGREE"],
  frequency: 70
}, {
  value: "Jawel",
  tags: ["KIND", "AGREE"],
  frequency: 70
}, {
  value: "Precies",
  tags: ["AGREE"],
  frequency: 10
}, {
  value: "Gewoon",
  tags: ["NEUTRAL"],
  frequency: 20
}, {
  value: "Moet nagaan",
  tags: ["NEUTRAL"],
  frequency: 5
}, {
  value: "Ja nee waarom wel",
  tags: ["DISAGREE"],
  frequency: 10
}, {
  value: "Zeer twijfelachtig",
  tags: ["DISAGREE"],
  frequency: 50
}, {
  value: "Niet hopen",
  tags: ["DISAGREE"],
  frequency: 50
}, {
  value: "Nooit",
  tags: ["DISAGREE"],
  frequency: 70
}, {
  value: "Incorrect",
  tags: ["DISAGREE"],
  frequency: 70
}, {
  value: "Het antwoord is nee",
  tags: ["DISAGREE"],
  frequency: 50
}, {
  value: "Nope",
  tags: ["DISAGREE"],
  frequency: 80
}, {
  value: "Nee",
  tags: ["DISAGREE"],
  frequency: 100
}, {
  value: "Nooit van z'n leven",
  tags: ["DISAGREE", "ANGRY"],
  frequency: 50
}, {
  value: "Van z'n leven ni",
  tags: ["DISAGREE", "ANGRY"],
  frequency: 50
}, {
  value: "Nop",
  tags: ["DISAGREE",, "ANGRY"],
  frequency: 60
}, {
  value: "Nah",
  tags: ["DISAGREE",, "ANGRY"],
  frequency: 70
}, {
  value: "Neh",
  tags: ["DISAGREE",, "ANGRY"],
  frequency: 70
}, {
  value: "Denk ni",
  tags: ["DISAGREE"],
  frequency: 70
}, {
  value: "Is ni",
  tags: ["DISAGREE"],
  frequency: 70
}, {
  value: "Fout",
  tags: ["DISAGREE"],
  frequency: 50
}, {
  value: "Neje",
  tags: ["DISAGREE"],
  frequency: 50
}, {
  value: "Neen",
  tags: ["DISAGREE"],
  frequency: 70
}, {
  value: "Tuurlijk ni",
  tags: ["DISAGREE", "ANGRY"],
  frequency: 50
}, {
  value: "Nooope",
  tags: ["DISAGREE", "ANGRY"],
  frequency: 20
}, {
  value: "Zal wel ni",
  tags: ["DISAGREE"],
  frequency: 50
}, {
  value: "Nee",
  tags: ["DISAGREE"],
  frequency: 50
}, {
  value: "Is niet",
  tags: ["DISAGREE"],
  frequency: 50
}, {
  value: "Sws niet",
  tags: ["DISAGREE"],
  frequency: 50
}, {
  value: "Kan nooit",
  tags: ["DISAGREE", "ANGRY"],
  frequency: 50
}, {
  value: "Nee",
  tags: ["DISAGREE"],
  frequency: 50
}, {
  value: "Nop",
  tags: ["DISAGREE"],
  frequency: 50
}, {
  value: "Kan niet",
  tags: ["DISAGREE"],
  frequency: 50
}, {
  value: "0% kans",
  tags: ["DISAGREE"],
  frequency: 20
}, {
  value: "Sowieso niet",
  tags: ["DISAGREE"],
  frequency: 50
}, {
  value: "Zowiezo niet",
  tags: ["DISAGREE"],
  frequency: 50
}, {
  value: ":x:",
  tags: ["DISAGREE"],
  frequency: 5
}, {
  value: "Ik ben daar niet zeker van",
  tags: ["DISAGREE"],
  frequency: 20
}, {
  value: "Met zekerheid niet",
  tags: ["DISAGREE"],
  frequency: 30
}, {
  value: "Gewoon nee",
  tags: ["DISAGREE", "ANGRY"],
  frequency: 50
}, {
  value: "Nee jom",
  tags: ["DISAGREE", "ANGRY"],
  frequency: 50
}, {
  value: "Nee jong",
  tags: ["DISAGREE", "ANGRY"],
  frequency: 50
}, {
  value: "Tzal",
  tags: ["DISAGREE", "ANGRY"],
  frequency: 50
}, {
  value: "Denkt gij",
  tags: ["DISAGREE"],
  frequency: 30
}, {
  value: "Is ni",
  tags: ["DISAGREE"],
  frequency: 50
}, {
  value: "Maja nee",
  tags: ["DISAGREE", "ANGRY"],
  frequency: 50
}, {
  value: "Zeker niet",
  tags: ["DISAGREE"],
  frequency: 50
}, {
  value: "Een kat is geen mus",
  tags: ["DISAGREE", "ANGRY"],
  frequency: 5
}, {
  value: "Zwijg nu eens",
  tags: ["DISAGREE", "ANGRY"],
  frequency: 20
}, {
  value: "Nee zwijg",
  tags: ["DISAGREE", "ANGRY"],
  frequency: 20
}, {
  value: "Geef het op aub",
  tags: ["DISAGREE", "ANGRY"],
  frequency: 20
}, {
  value: "Negatief",
  tags: ["DISAGREE", "ANGRY"],
  frequency: 20
}, {
  value: "Helaas",
  tags: ["DISAGREE"],
  frequency: 30
}, {
  value: "Da weet ik nie",
  tags: ["CONFUSED", "ANGRY"],
  frequency: 10
}, {
  value: "Och %SCHELD me al die vragen",
  tags: ["CONFUSED", "ANGRY"],
  frequency: 40
}, {
  value: "Kheb er geen idee van",
  tags: ["CONFUSED", "ANGRY"],
  frequency: 40
}, {
  value: "Ik hoop dat ge erin stikt",
  tags: ["ANGRY"],
  frequency: 5
}, {
  value: "Hou uw kutbek %SCHELD",
  tags: ["ANGRY"],
  frequency: 30
}, {
  value: "Vermoeiend",
  tags: ["ANGRY"],
  frequency: 30
}, {
  value: "Ik wil dood",
  tags: ["SAD", "ANGRY"],
  frequency: 5
}, {
  value: "Zou beter zwijgen",
  tags: ["ANGRY"],
  frequency: 20
}, {
  value: "Weet ik ni",
  tags: ["CONFUSED", "ANGRY"],
  frequency: 50
}, {
  value: "Domme vraag",
  tags: ["ANGRY"],
  frequency: 10
}, {
  value: "Ga ni op antwoorden",
  tags: ["CONFUSED", "ANGRY"],
  frequency: 50
}, {
  value: "Wa",
  tags: ["CONFUSED"],
  frequency: 30
}, {
  value: "ff werken dan antwoord ik",
  tags: ["BUSY"],
  frequency: 10
}, {
  value: "secondje, stuur u straks",
  tags: ["BUSY"],
  frequency: 5
}, {
  value: "stuur u straks",
  tags: ["BUSY"],
  frequency: 10
}, {
  value: "w8 ff",
  tags: ["BUSY"],
  frequency: 20
}, {
  value: "wacht ff",
  tags: ["BUSY"],
  frequency: 50
}, {
  value: "nu ff niet",
  tags: ["BUSY"],
  frequency: 50
}, {
  value: "even geduld",
  tags: ["BUSY"],
  frequency: 50
}, {
  value: "de jap de jap de jap",
  tags: ["ANGRY"],
  frequency: 20
}, {
  value: "moet ni zoveel vragen stellen",
  tags: ["ANGRY"],
  frequency: 10
}, {
  value: "nutteloze vraag",
  tags: ["ANGRY"],
  frequency: 20
}, {
  value: "zwijg",
  tags: ["ANGRY"],
  frequency: 10
}, {
  value: "zwijgt nu toch eens",
  tags: ["ANGRY"],
  frequency: 10
}, {
  value: "ma laat mij nu eens doen",
  tags: ["BUSY", "ANGRY"],
  frequency: 10
}, {
  value: "idk",
  tags: ["CONFUSED"],
  frequency: 10
}, {
  value: "geen idee",
  tags: ["CONFUSED"],
  frequency: 50
}, {
  value: "waarom zou ik da weten",
  tags: ["CONFUSED"],
  frequency: 50
}, {
  value: "moet ik da weten",
  tags: ["CONFUSED"],
  frequency: 50
}, {
  value: "kan ik ni weten",
  tags: ["CONFUSED", "ANGRY"],
  frequency: 50
}, {
  value: "vraagt iemand anders eens",
  tags: ["BUSY", "ANGRY"],
  frequency: 20
}, {
  value: "val eens iemand anders lastig",
  tags: ["CONFUSED", "ANGRY"],
  frequency: 10
}, {
  value: "laat me doen",
  tags: ["BUSY", "ANGRY"],
  frequency: 50
}, {
  value: "vraag straks ff bezig",
  tags: ["BUSY"],
  frequency: 50
}, {
  value: "ff weg",
  tags: ["BUSY"],
  frequency: 50
}, {
  value: "Ben er nu niet",
  tags: ["BUSY"],
  frequency: 50
}, {
  value: "Kan nu niet antwoorden",
  tags: ["BUSY"],
  frequency: 50
}, {
  value: "Ff geen tijd",
  tags: ["BUSY"],
  frequency: 50
}, {
  value: "Zal straks antwoorden",
  tags: ["BUSY"],
  frequency: 50
}, {
  value: "Kom hier dadelijk op terug",
  tags: ["BUSY"],
  frequency: 50
}, {
  value: "Bel zo terug",
  tags: ["BUSY"],
  frequency: 50
}, {
  value: "Ff kaf halen",
  tags: ["BUSY"],
  frequency: 50
}, {
  value: "Jat kaf ff",
  tags: ["BUSY"],
  frequency: 50
}, {
  value: "Jatje kaf halen",
  tags: ["BUSY"],
  frequency: 50
}, {
  value: "Jatje kaf %WHO ?",
  tags: ["BUSY"],
  frequency: 20
}];
exports.BASIC_ANSWER = BASIC_ANSWER;
var BASIC_ANSWER_FREQUENCY_LIST = BASIC_ANSWER.flatMap(_FrequencyList.frequencyList);
exports.BASIC_ANSWER_FREQUENCY_LIST = BASIC_ANSWER_FREQUENCY_LIST;