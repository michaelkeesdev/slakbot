import { App } from "@slack/bolt";
import { google, GoogleApis } from "googleapis";
import {
  HOW_MUCH,
  BASIC,
  WHO,
  WHEN,
  HOW,
  WHERE,
  THANKS,
  GOODMORNING,
  BYE,
} from "./messages/messages";

import { SLUIP_IDS } from "./messages/sluip";

import "dotenv/config";
import regeneratorRuntime from "regenerator-runtime";

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
});

const getRandom = (length) => {
  return Math.floor(Math.random() * length);
};

// let youtube;

app.event("app_mention", async ({ context, event }) => {
  const token = context.botToken;
  const channel = event.channel;

  const text = event.text.replace(`<@${context.botUserId}>`, "").trim();

  let response = "Ja?"; // calculate response

  // console.log("text", text);
  //console.log("event", context, event);

  switch (true) {
    case /^(versie|-v|--version)/.test(text):
      response = "1.0.0";
      break;
    case /^(hoeveel|hoe veel)/.test(text):
      response = HOW_MUCH[getRandom(HOW_MUCH.length)];
      break;
    case /^wie/.test(text):
      response = WHO[getRandom(WHO.length)];
      break;
    case /^wanneer/.test(text):
      response = WHEN[getRandom(WHEN.length)];
      break;
    case /^hoe/.test(text):
      response = HOW[getRandom(HOW.length)];
      break;
    case /^waar/.test(text):
      response = WHERE[getRandom(WHERE.length)];
      break;
    case /^(bedankt|thanks|thank|dank)/.test(text):
      response = THANKS[getRandom(THANKS.length)];
      break;
    case /^(goeiemorgen|goeimorgen|morgend|murgend|goedemorgen|goedemorgend|daag|gedag|ey|hallo)/.test(
      text
    ):
      response = GOODMORNING[getRandom(GOODMORNING.length)];
      break;
    case /^(dag|salut|ciao)/.test(text):
      response = BYE[getRandom(BYE.length)];
      break;
    case /^(sluip|humor|sluip random|youtube sluip random)/.test(text):
      console.log("sluip test");
      response = `https://www.youtube.com/watch?v=${
        SLUIP_IDS[getRandom(SLUIP_IDS.length)]
      }`;
      break;
    case /^(zoek|zoek youtube|muziek|random)/.test(text):
      let youtube = google.youtube({
        version: "v3",
        auth: process.env.YOUTUBE_API_KEY,
      });
      let result = await youtube.search.list({
        part: "id,snippet",
        maxResults: "50",
        q: text,
      });
      let index = getRandom(50);
      response = `https://www.youtube.com/watch?v=${result.data.items[index].id.videoId}`;
      break;
    case /^(youtube|exact|zoek exact|geef video over)/.test(text):
      youtube = google.youtube({
        version: "v3",
        auth: process.env.YOUTUBE_API_KEY,
      });
      result = await youtube.search.list({
        part: "id,snippet",
        q: text,
      });
      response = `https://www.youtube.com/watch?v=${result.data.items[0].id.videoId}`;
      break;
    case /^(kick)/.test(text):

      const userMatch = text.match(new RegExp('\<\@(.*?)\>'))[1];

      const res = await app.client.conversations.kick({
        token: process.env.SLACK_BOT_TOKEN,
        channel: event.channel,
        user: userMatch
      })
      console.log("res", JSON.stringify(res));

      /* const resUsers = await app.client.users.list({
        token: process.env.SLACK_BOT_TOKEN,
      }); */

      // console.log("LIST", resUsers);
    
      break;
    default:
      response = BASIC[getRandom(BASIC.length)];
  }

  console.log("response", response);

  const message = { token, channel, text: response };

  await app.client.chat.postMessage(message);
});

(async () => {
  await app.start(process.env.PORT || 8080);
  console.log("⚡️ Slakbot is running!");
})();

// GET USER = <@${event.user}>

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
