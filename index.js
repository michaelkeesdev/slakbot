import { App } from "@slack/bolt";
import { google } from "googleapis";
import { logger } from "heroku-logger";

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

  logger.info('app_mention', { token: token, context: context })

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
    default:
      response = BASIC[getRandom(BASIC.length)];
  }

  const message = { token, channel, text: response };

  await app.client.chat.postMessage(message);
});

(async () => {
  await app.start(process.env.PORT || 8080);
  logger.info('Starting server', { port: 8080 });
  console.log("⚡️ Slakbot is running!");
})();
