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

const ninegag = new Ninegag(100, "hot", "default");

const getRandom = (length) => {
  return Math.floor(Math.random() * length);
};

const get9gagPost = async (group) => {
  let result = await ninegag.scrap(group);
  return result[0]?.data?.posts[getRandom(result[0]?.data?.posts?.length)]?.images?.image700?.url;
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
};

const getExactYoutube = async (text) => {
  youtube = google.youtube({
    version: "v3",
    auth: process.env.YOUTUBE_API_KEY,
  });
  let result = await youtube.search.list({
    part: "id,snippet",
    q: text,
  });
  return `https://www.youtube.com/watch?v=${result.data.items[0].id.videoId}`;
};

const matches = [
  {
    names: ["hoeveel", "hoe veel", "hoe veel"],
    action: async () => getRandomElement(HOW_MUCH),
  },
  { names: ["wie"], action: async () => getRandomElement(WHO) },
  { names: ["wanneer"], action: async () => getRandomElement(WHEN) },
  { names: ["waar"], action: async () => getRandomElement(WHERE) },
  { names: ["hoe"], action: async () => getRandomElement(HOW) },
  {
    names: ["bedankt", "thanks", "thank", "dank"],
    action: async () => getRandomElement(THANKS),
  },
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
    action: async () => getRandomElement(GOODMORNING),
  },
  {
    names: ["dag", "salut", "ciao"],
    action: async () => getRandomElement(BYE),
  },
  {
    names: ["sluip", "humor", "sluip random", "youtube sluip random"],
    action: async () =>
      `https://www.youtube.com/watch?v=${getRandomElement(SLUIP_IDS)}`,
  },
  {
    names: ["zoek", "zoek youtube", "muziek", "random"],
    action: async (text) => await getRandomYoutube(text),
  },
  {
    names: ["youtube", "exact", "zoek exact", "geef video over"],
    action: async (text) => await getExactYoutube(text),
  },
  { names: ["grietje", "wufke", "slet"], action: async () => await get9gagPost("girl") },
  { names: ["9gag", "ninegag", "meme", "foto"], action: async () => await get9gagPost() },
];

const getResponse = async (text) => {
  const fuse = new Fuse(matches, { keys: ["names"] });
  const result = fuse.search(text);

  console.log("result", JSON.stringify(result));

  let response = await result[0]?.item?.action(text);

  if (!response) {
    switch (true) {
      case text.split(" of ").length > 1:
        response = text.split("of")[getRandom(text.split("of").length)];
        break;
      default:
        response = BASIC[getRandom(BASIC.length)];
    }
  }

  return response;
};

app.event("app_mention", async ({ context, event }) => {
  const token = context.botToken;
  const channel = event.channel;

  const text = event.text.replace(`<@${context.botUserId}>`, "").trim();

  const response = await getResponse(text);
  const message = { token, channel, text: response };

  await app.client.chat.postMessage(message);
});

(async () => {
  await app.start(process.env.PORT || 8080);

  console.log("test", await getResponse("ninegag"));
  console.log("⚡️ Slakbot is running!");
})();
