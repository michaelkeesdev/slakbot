"use strict";

var _bolt = require("@slack/bolt");

var _googleapis = require("googleapis");

var _messages = require("./messages/messages");

var _sluip = require("./messages/sluip");

require("dotenv/config");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var app = new _bolt.App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN
});

var getRandom = function getRandom(length) {
  return Math.floor(Math.random() * length);
}; // let youtube;


app.event("app_mention", /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
    var _result$data$items$in, _result$data$items$in2, _result$data$items$, _result$data$items$$i;

    var context, event, token, channel, text, response, youtube, result, index, userMatch, res, message;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            context = _ref.context, event = _ref.event;
            token = context.botToken;
            channel = event.channel;
            text = event.text.replace("<@".concat(context.botUserId, ">"), "").trim();
            response = "Ja?"; // calculate response
            // console.log("text", text);
            //console.log("event", context, event);

            _context.t0 = true;
            _context.next = _context.t0 === /^(versie|-v|--version)/.test(text) ? 8 : _context.t0 === /^(hoeveel|hoe veel)/.test(text) ? 10 : _context.t0 === /^wie/.test(text) ? 12 : _context.t0 === /^wanneer/.test(text) ? 14 : _context.t0 === /^hoe/.test(text) ? 16 : _context.t0 === /^waar/.test(text) ? 18 : _context.t0 === /^(bedankt|thanks|thank|dank)/.test(text) ? 20 : _context.t0 === /^(goeiemorgen|goeimorgen|morgend|murgend|goedemorgen|goedemorgend|daag|gedag|ey|hallo)/.test(text) ? 22 : _context.t0 === /^(dag|salut|ciao)/.test(text) ? 24 : _context.t0 === /^(sluip|humor|sluip random|youtube sluip random)/.test(text) ? 26 : _context.t0 === /^(zoek|zoek youtube|muziek|random)/.test(text) ? 29 : _context.t0 === /^(youtube|exact|zoek exact|geef video over)/.test(text) ? 36 : _context.t0 === /^(kick)/.test(text) ? 42 : 48;
            break;

          case 8:
            response = "1.0.0";
            return _context.abrupt("break", 49);

          case 10:
            response = _messages.HOW_MUCH[getRandom(_messages.HOW_MUCH.length)];
            return _context.abrupt("break", 49);

          case 12:
            response = _messages.WHO[getRandom(_messages.WHO.length)];
            return _context.abrupt("break", 49);

          case 14:
            response = _messages.WHEN[getRandom(_messages.WHEN.length)];
            return _context.abrupt("break", 49);

          case 16:
            response = _messages.HOW[getRandom(_messages.HOW.length)];
            return _context.abrupt("break", 49);

          case 18:
            response = _messages.WHERE[getRandom(_messages.WHERE.length)];
            return _context.abrupt("break", 49);

          case 20:
            response = _messages.THANKS[getRandom(_messages.THANKS.length)];
            return _context.abrupt("break", 49);

          case 22:
            response = _messages.GOODMORNING[getRandom(_messages.GOODMORNING.length)];
            return _context.abrupt("break", 49);

          case 24:
            response = _messages.BYE[getRandom(_messages.BYE.length)];
            return _context.abrupt("break", 49);

          case 26:
            console.log("sluip test");
            response = "https://www.youtube.com/watch?v=".concat(_sluip.SLUIP_IDS[getRandom(_sluip.SLUIP_IDS.length)]);
            return _context.abrupt("break", 49);

          case 29:
            youtube = _googleapis.google.youtube({
              version: "v3",
              auth: process.env.YOUTUBE_API_KEY
            });
            _context.next = 32;
            return youtube.search.list({
              part: "id,snippet",
              maxResults: "50",
              q: text
            });

          case 32:
            result = _context.sent;
            index = getRandom(50);
            response = "https://www.youtube.com/watch?v=".concat((_result$data$items$in = result.data.items[index]) === null || _result$data$items$in === void 0 ? void 0 : (_result$data$items$in2 = _result$data$items$in.id) === null || _result$data$items$in2 === void 0 ? void 0 : _result$data$items$in2.videoId);
            return _context.abrupt("break", 49);

          case 36:
            youtube = _googleapis.google.youtube({
              version: "v3",
              auth: process.env.YOUTUBE_API_KEY
            });
            _context.next = 39;
            return youtube.search.list({
              part: "id,snippet",
              q: text
            });

          case 39:
            result = _context.sent;
            response = "https://www.youtube.com/watch?v=".concat((_result$data$items$ = result.data.items[0]) === null || _result$data$items$ === void 0 ? void 0 : (_result$data$items$$i = _result$data$items$.id) === null || _result$data$items$$i === void 0 ? void 0 : _result$data$items$$i.videoId);
            return _context.abrupt("break", 49);

          case 42:
            userMatch = text.match(new RegExp('\<\@(.*?)\>'))[1];
            _context.next = 45;
            return app.client.conversations.kick({
              token: process.env.SLACK_BOT_TOKEN,
              channel: event.channel,
              user: userMatch
            });

          case 45:
            res = _context.sent;
            console.log("res", JSON.stringify(res));
            /* const resUsers = await app.client.users.list({
              token: process.env.SLACK_BOT_TOKEN,
            }); */
            // console.log("LIST", resUsers);

            return _context.abrupt("break", 49);

          case 48:
            response = _messages.BASIC[getRandom(_messages.BASIC.length)];

          case 49:
            console.log("response", response);
            message = {
              token: token,
              channel: channel,
              text: response
            };
            _context.next = 53;
            return app.client.chat.postMessage(message);

          case 53:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref2.apply(this, arguments);
  };
}());

_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
  return regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return app.start(process.env.PORT || 8080);

        case 2:
          console.log("⚡️ Slakbot is running!");

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2);
}))(); // GET USER = <@${event.user}>

/*
{
  isEnterpriseInstall: false,
  botToken: 'xoxb-308649945847-1649403505921-GhpPbvZWN9qIup8GV1HJYTvG',
  botUserId: 'U01K3BVEVT3',
  botId: 'B01JML61DHB',
  teamId: 'T92K3TTQX',
  updateConversation: [Function (anonymous)]
}

event {
  client_msg_id: 'edabcaec-aecb-4bd4-8909-12641d7ffc75',
  type: 'app_mention',
  text: '<@U01K3BVEVT3>',
  user: 'U90TSU6JU',
  ts: '1610641077.002600',
  team: 'T92K3TTQX',
  blocks: [ { type: 'rich_text', block_id: 'QKqm', elements: [Array] } ],
  channel: 'C01JR4QQD1Q',
  event_ts: '1610641077.002600'
}


*/
