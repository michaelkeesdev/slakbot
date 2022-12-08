"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TIMEOUT_TRIGGER = exports.TIMEOUT_STOP_TRIGGER = exports.TIMEOUT_STOP_POSITIVE_ANSWER = exports.TIMEOUT_STOP_POSITIVE = exports.TIMEOUT_STOP_NEGATIVE_ANSWER = exports.TIMEOUT_STOP_NEGATIVE = exports.TIMEOUT_STOP_ANSWER = exports.TIMEOUT_ANSWER = exports.DURING_TIMEOUT_ANSWER = void 0;
var TIMEOUT_TRIGGER = ["zwijg", "zwijg hoer", "zwijgt hoer", "zwijg slet", "zwijgt slet", "zwijgt eens", "klep houden", "klep", "bol het af", "ga weg", "ga in de hoek staan", "ga in hoek", "in de hoek", "laat ons eens praten", "trap het af"];
exports.TIMEOUT_TRIGGER = TIMEOUT_TRIGGER;
var TIMEOUT_ANSWER = ["Ok sorry :(", "Ja sorry", "Oke ik ben weg", "Ok hoer tot straks", "oke ff kaf dan", "ok excuseer"];
exports.TIMEOUT_ANSWER = TIMEOUT_ANSWER;
var DURING_TIMEOUT_ANSWER = ["Ik moest in de hoek van %user%", "Ik moet zwijgen van %user%", "Mag ni praten", "Kmoet zwijgen", "Vraag aan %user% ik mag ni praten", "Sorry sta in hoek", "Ik mag niks zeggen", "Ik moet zwijgen sorry"];
exports.DURING_TIMEOUT_ANSWER = DURING_TIMEOUT_ANSWER;
var TIMEOUT_STOP_TRIGGER = ["kom terug", "uit hoek", "uit de hoek", "kom uit hoek", "kom maar terug", "kom eens terug", "kom eens"];
exports.TIMEOUT_STOP_TRIGGER = TIMEOUT_STOP_TRIGGER;
var TIMEOUT_STOP_POSITIVE = ["ok", "ja", "is goed", "doe maar", "goed", "jaja", "kom terug", "kom es terug", "maakt da ge terug bent", "hup waarke"];
exports.TIMEOUT_STOP_POSITIVE = TIMEOUT_STOP_POSITIVE;
var TIMEOUT_STOP_NEGATIVE = ["nee lol", "nee", "nee?", "denk het niet", "dacht het niet", "meje", "denk ni", "nah"];
exports.TIMEOUT_STOP_NEGATIVE = TIMEOUT_STOP_NEGATIVE;
var TIMEOUT_STOP_ANSWER = ["mag ik terugkomen %user%?", "mag dat %user%", "moet ik aan %user% vragen.. %user% mag ik terug praten?"];
exports.TIMEOUT_STOP_ANSWER = TIMEOUT_STOP_ANSWER;
var TIMEOUT_STOP_POSITIVE_ANSWER = ["ok danku ben terug", "dankuwel", "danku"];
exports.TIMEOUT_STOP_POSITIVE_ANSWER = TIMEOUT_STOP_POSITIVE_ANSWER;
var TIMEOUT_STOP_NEGATIVE_ANSWER = ["och hoer", "och slet", "ok blijf in hoek", ":(", "jammer dan"];
exports.TIMEOUT_STOP_NEGATIVE_ANSWER = TIMEOUT_STOP_NEGATIVE_ANSWER;