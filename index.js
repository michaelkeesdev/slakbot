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

const getRandomYoutube = async (text) => {
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
  return `https://www.youtube.com/watch?v=${result.data.items[index].id.videoId}`;
}

const getExactYoutube = async (text) => {
  youtube = google.youtube({
    version: "v3",
    auth: process.env.YOUTUBE_API_KEY,
  });
  result = await youtube.search.list({
    part: "id,snippet",
    q: text,
  });
  return `https://www.youtube.com/watch?v=${result.data.items[0].id.videoId}`;
}

const matches = [
  { names: ["9gag", "ninegag"], action: async () => await get9gagPost() },
  { names: ["hoeveel", "hoe veel", "hoe veel"], action: () => getRandomElement(HOW_MUCH) },
  { names: ["wie"], action: () => getRandomElement(WHO)  },
  { names: ["wanneer"], action: () => getRandomElement(WHEN)  },
  { names: ["waar"], action: () => getRandomElement(WHERE) },
  { names: ["hoe"], action: () => getRandomElement(HOW)  },
  { names: ["bedankt", "thanks", "thank", "dank"], action: () => getRandomElement(THANKS)  },
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
    action: () => getRandomElement(GOODMORNING)
  },
  { names: ["dag", "salut", "ciao"], action: () => getRandomElement(BYE)  },
  {
    names: ["sluip", "humor", "sluip random", "youtube sluip random"],
    action: () => getRandomElement(SLUIP_IDS) ,
  },
  {
    names: ["zoek", "zoek youtube", "muziek", "random"],
    action: async () => await getRandomYoutube(),
  },
  {
    names: ["youtube", "exact", "zoek exact", "geef video over"],
    action: async () => await getExactYoutube(),
  },
];

app.event("app_mention", async ({ context, event }) => {
  const token = context.botToken;
  const channel = event.channel;

  const text = event.text.replace(`<@${context.botUserId}>`, "").trim();

  const fuse = new Fuse(matches, { keys: ["names"] });
  const result = fuse.search(text);

  let response = await result[0]?.item?.action();

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
