"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HIGHER_LOWER_WTF_PHRASE = exports.HIGHER_LOWER_WRONG_LOSE = exports.HIGHER_LOWER_WRONG_END = exports.HIGHER_LOWER_SKIP = exports.HIGHER_LOWER_INIT_TRIGGER = exports.HIGHER_LOWER_INIT_PHRASE = exports.HIGHER_LOWER_EQUAL_STOP = exports.HIGHER_LOWER_CORRECT_CONTINUE = void 0;
var HIGHER_LOWER_INIT_TRIGGER = ["higher lower"];
exports.HIGHER_LOWER_INIT_TRIGGER = HIGHER_LOWER_INIT_TRIGGER;
var HIGHER_LOWER_INIT_PHRASE = ["ok doe %nextPlayerTag%, getal is %number%", "hup %nextPlayerTag%, %number%", "ok hup %nextPlayerTag%, %number%", "goed doe maar %nextPlayerTag%, %number%", "ben benieuwd %nextPlayerTag%, %number%", "ok %nextPlayerTag%, ik zeg %number%"];
exports.HIGHER_LOWER_INIT_PHRASE = HIGHER_LOWER_INIT_PHRASE;
var HIGHER_LOWER_CORRECT_CONTINUE = ["idd %score% al juist %currentPlayerTag%. Het was %number%, volgende hoger of lager %nextPlayerTag%?", "idd, was %number%, %score% juist nu %currentPlayerTag%. Volgende hoger of lager %nextPlayerTag%?", "%score% goed al %currentPlayerTag%, getal was %number%. Volgende hoger of lager %nextPlayerTag%?", "ok idd %number%. %score% punten %currentPlayerTag%. Hoger of lager %nextPlayerTag% zeg keer?"];
exports.HIGHER_LOWER_CORRECT_CONTINUE = HIGHER_LOWER_CORRECT_CONTINUE;
var HIGHER_LOWER_WRONG_LOSE = ["haha loser het was %number%, volgende hoger of lager %nextPlayerTag%?", "lol %currentPlayerTag% het was %number%, volgende hoger of lager %nextPlayerTag%?", "ge suckt %currentPlayerTag% het was %number%, volgende hoger of lager %nextPlayerTag%?", "lol nee, het was %number% %currentPlayerTag%, volgende hoger of lager %nextPlayerTag%?"];
exports.HIGHER_LOWER_WRONG_LOSE = HIGHER_LOWER_WRONG_LOSE;
var HIGHER_LOWER_WRONG_END = ["heuh loser het was %number%. Spel gedaan dan. Eindscores: ", "haha ge suckt allemaal, het was %number%. Eindscores: ", "Oke spel gedaan, slecht wel want het was %number%. Scores: ", "Pff nee %number%. Olle punten zijn "];
exports.HIGHER_LOWER_WRONG_END = HIGHER_LOWER_WRONG_END;
var HIGHER_LOWER_SKIP = ["ok geen punten voor %currentPlayerTag%, %nextPlayerTag% gij proberen hoger of lager als %number%?", "ok %currentPlayerTag% skipt, %nextPlayerTag% uw beurt voor  %number%?", "%currentPlayerTag% durft niet, %nextPlayerTag% gij hoger of lager als %number%?", "skip van %currentPlayerTag%, hoger of lager als %number% %nextPlayerTag%"];
exports.HIGHER_LOWER_SKIP = HIGHER_LOWER_SKIP;
var HIGHER_LOWER_EQUAL_STOP = ["tf gelijk, was exact %number%. Ik blokkeer", "wa, was idd %number%. Ik blokkeer"];
exports.HIGHER_LOWER_EQUAL_STOP = HIGHER_LOWER_EQUAL_STOP;
var HIGHER_LOWER_WTF_PHRASE = ["wtf doe normaal %currentPlayerTag%", "ja dag %currentPlayerTag%", "hoger lager dacht ik %currentPlayerTag%???", "wa %currentPlayerTag%? tis hoger lager? laat maar dan", "ok %currentPlayerTag% als ge ni tegoei speelt, dag"];
exports.HIGHER_LOWER_WTF_PHRASE = HIGHER_LOWER_WTF_PHRASE;