// SLACK

import { App } from "@slack/bolt";
import { sample } from "lodash";
require("dotenv").config();

const { Client, Intents, MessageEmbed } = require("discord.js");

import { Maggie } from "./Maggie";

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
});

const maggieSlack = new Maggie("slack");
const maggieDiscord = new Maggie("discord");

app.event("message", async ({ event, context }) => {
  const token = context?.botToken;
  const channel = event?.channel;
  console.log("event,", JSON.stringify(event));

  let text = event?.text;
  let user = event?.user;
  console.log("message event", `${user}: ${text} ${channel}`);

  const messages = await maggieSlack.getMessageResponses(text, user);

  const pinMessageWritePid = Math.floor(Math.random() * 200);
  if (pinMessageWritePid === 1) {
    await app.client.pins.add({ token, channel, timestamp: event.event_ts });
  }

  const pinMessageReadPid = Math.floor(Math.random() * 200);
  if (pinMessageReadPid === 1) {
    const pins = await app.client.pins.list({ token, channel });
    const message = sample(pins?.items)?.message;
    messages.push(`@<${message.user}> : ${message.text}`);
  }

  if (messages?.length) {
    messages.map(async (message) => {
      const postMessage = { token, channel, text: message };
      await app.client.chat.postMessage(postMessage);
    });
  }
});

app.event("app_mention", async ({ context, event }) => {
  console.log("app_mention", context, event);
  const token = context.botToken;
  const channel = event.channel;

  const text = event.text.replace(`<@${context.botUserId}>`, "").trim();
  const files = event?.files ? event.files : [];

  let user = event?.user;

  const response = await maggieSlack.getMentionResponse(
    text,
    context,
    files,
    user
  );
  const message = { token, channel, text: response };

  await app.client.chat.postMessage(message);
});

(async () => {
  await app.start(process.env.PORT || 8080);
  console.log(
    "tag",
    await maggieSlack.getMentionResponse("tag tok", null, null, "U91HHN2JE")
  );
  console.log("⚡️ Slakbot is running!");

  console.log(
    "test",
    await maggieSlack.getMentionResponse("denk gij wel content he?", null)
  );
})();

const DISCORD_IDS = [
  "&875087867293106238",
  "!875074049968058431",
  "&931182323309875270",
  "!931182323309875270",
];

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_WEBHOOKS,
    Intents.FLAGS.GUILD_INTEGRATIONS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_TYPING,
    Intents.FLAGS.DIRECT_MESSAGE_TYPING,
  ],
});

client.on("ready", async (client) => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", async (msg) => {
  const botIdRegex = new RegExp("^<@875074049968058431>");
  let message = msg.content.replace(botIdRegex, "").trim();

  console.log(msg.content);
  console.log(botIdRegex);
  console.log(msg.content.match(botIdRegex));

  if (msg.content.match(botIdRegex)) {
    const response = await maggieDiscord.getMentionResponse(
      message,
      null,
      [],
      msg.author.id
    );

    if (response != null && response != "") {
      msg.channel.send(response);
    }
  }
});

//make sure this line is the last line
client.login(process.env.DISCORD_BOT_TOKEN); //login bot using token
