import { App } from "@slack/bolt";
import { google } from "googleapis";

import Fuse from "fuse.js";

import {
  HOW_MUCH,
  BASIC,
  WHEN,
  HOW,
  WHERE,
  THANKS,
  GOODMORNING,
  BYE,
} from "./app/messages";

import { UserService } from "./app/users";

import { SLUIP_IDS } from "./app/sluip";

import { Ninegag } from "./app/ninegag";

import "dotenv/config";
import { WEETJES } from "./app/weetjes";

import { HttpClient } from "./httpClient";

const httpClient = new HttpClient();
const userService = new UserService();

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
});

const ninegag = new Ninegag(50, "hot", "default");

const getRandom = (length) => {
  return Math.floor(Math.random() * length);
};

const get9gagPost = async (group) => {
  let result = await ninegag.scrap(group);
  return result[0]?.data?.posts[getRandom(result[0]?.data?.posts?.length)]
    ?.images?.image700?.url;
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

const getNewsPosts = async () => {
  let response = await httpClient.get(
    "https://api.smartocto.com/api/brands/tentacles?i=h4xmfyj9c6jpezbbzufqgmu378wgd8e3"
  );
  console.log("response", response?.headerTests);
  return response?.headerTests[getRandom(response?.headerTests.length)].title;
};

const getExactMatches = (matches, text) => {
  return matches
    .flatMap((match) => {
      return match?.names?.map((name) => {
        return text?.match(new RegExp(`/^${name}/`)) && match;
      });
    })
    .filter((match) => match);
};

const matches = [
  {
    names: ["tag", "wie"],
    action: async (text, context) => userService.getRandomUser(),
  },
  {
    names: ["hoeveel", "hoe veel", "hoe veel"],
    action: async () => getRandomElement(HOW_MUCH),
  },
  {
    names: ["weetje", "wistje", "zeg eens iets"],
    action: async () => getRandomElement(WEETJES),
  },
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
  {
    names: ["grietje", "wufke", "slet"],
    action: async () => await get9gagPost("girl"),
  },
  {
    names: ["9gag", "ninegag", "meme", "foto"],
    action: async () => await get9gagPost(),
  },
  {
    names: [
      "nieuws",
      "vandaag gebeurd",
      "news",
      "vandaag",
      "nieuw",
      "hln",
      "gazet",
    ],
    action: async () => getNewsPosts(),
  },
];

const getResponse = async (text, context) => {
  const fuse = new Fuse(matches, { keys: ["names"] });
  const fuzzyMatches = fuse.search(text);
  const exactMatches = getExactMatches(matches, text);

  let response = exactMatches
    ? await exactMatches[0]?.item?.action(text, context)
    : await fuzzyMatches[0]?.item?.action(text, context);

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

app.event("message", async ({ event, context }) => {
  console.log("event", event);
  if (event?.text === "hoer") {
    const token = context?.botToken;
    const channel = event?.channel;
    const user = event?.user;

    const response = `zelf hoer <@${user}>`;
    const message = { token, channel, text: response };
    await app.client.chat.postMessage(message);
  }
});

app.event("app_mention", async ({ context, event }) => {
  const token = context.botToken;
  const channel = event.channel;

  const text = event.text.replace(`<@${context.botUserId}>`, "").trim();

  console.log("context: ", JSON.stringify(context));
  console.log("context: ", JSON.stringify(event));

  const response = await getResponse(text, context);
  const message = { token, channel, text: response };

  await app.client.chat.postMessage(message);
});

(async () => {
  await app.start(process.env.PORT || 8080);

  console.log("test", await getResponse("weetje"));

  console.log("⚡️ Slakbot is running!");
})();
