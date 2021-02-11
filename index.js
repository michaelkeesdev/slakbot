import { App } from "@slack/bolt";
import { google } from "googleapis";

import Fuse from "fuse.js";

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

import { Ninegag } from "./messages/ninegag";

import "dotenv/config";

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
});

const ninegag = new Ninegag(10, "hot", 3);

const getRandom = (length) => {
  return Math.floor(Math.random() * length);
};

const get9gagPost = async () => {
  const posts = await ninegag.scrap();
  return posts[getRandom(posts.length)]?.content;
};

const getRandomElement = (list) => {
  return list[getRandom(list.length)];
};

const doAction = async (action) => {
  switch (action) {
    case "NINE_GAG":
      return get9gagPost();
      break;
    case "HOW_MUCH":
      return getRandomElement(HOW_MUCH);
      break;
    case "WHO":
      return getRandomElement(WHO);
      break;
    case "WHEN":
      return getRandomElement(WHEN);
      break;
    case "HOW":
      return getRandomElement(HOW);
      break;
    case "WHERE":
      return getRandomElement(WHERE);
      break;
    case "THANKS":
      return getRandomElement(THANKS);
      break;
    case "BYE":
      return getRandomElement(BYE);
      break;
    case "GOODMORNING":
      return getRandomElement(GOODMORNING);
      break;
    case "SLUIP":
      return getRandomElement(SLUIP_IDS);
      break;
    case "YOUTUBE_EXACT":
      return `https://www.youtube.com/watch?v=${
        SLUIP_IDS[getRandom(SLUIP_IDS.length)]
      }`;
      break;
    case "YOUTUBE_RANDOM":
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
  }
};

const matches = [
  { names: ["9gag", "ninegag"], action: "NINE_GAG" },
  { names: ["hoeveel", "hoe veel", "hoe veel"], action: "HOW_MUCH" },
  { names: ["wie"], action: "WHO" },
  { names: ["wanneer"], action: "WHEN" },
  { names: ["waar"], action: "WHERE" },
  { names: ["hoe"], action: "HOW" },
  { names: ["bedankt", "thanks", "thank", "dank"], action: "THANKS" },
  {
    names: [
      "goeiemorgen",
      "goeimorgen",
      "morgend",
      "murgend",
      "goedemorgen",
      "goedemorgend",
      "daag",
      "gedag",
      "ey",
      "hallo",
    ],
    action: "GOODMORNING",
  },
  { names: ["dag", "salut", "ciao"], action: "BYE" },
  {
    names: ["sluip", "humor", "sluip random", "youtube sluip random"],
    action: "SLUIP",
  },
  {
    names: ["zoek", "zoek youtube", "muziek", "random"],
    action: "YOUTUBE_RANDOM",
  },
  {
    names: ["youtube", "exact", "zoek exact", "geef video over"],
    action: "YOUTUBE_EXACT",
  },
];

app.event("app_mention", async ({ context, event }) => {
  const token = context.botToken;
  const channel = event.channel;

  const text = event.text.replace(`<@${context.botUserId}>`, "").trim();

  const fuse = new Fuse(matches, { keys: ["names"] });
  const result = fuse.search(text);

  let response = await doAction(result[0]?.item?.action);

  switch (true && !response) {
    case text.split(" of ").length > 1:
      response = text.split("of")[getRandom(text.split("of").length)];
      break;
    default:
      response = BASIC[getRandom(BASIC.length)];
  }

  const message = { token, channel, text: response };

  await app.client.chat.postMessage(message);
});

(async () => {
  await app.start(process.env.PORT || 8080);
  console.log("⚡️ Slakbot is running!");
})();
