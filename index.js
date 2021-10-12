// SLACK

import { App } from "@slack/bolt";
require("dotenv").config();

const { Client, Intents, MessageEmbed } = require("discord.js");

import { Maggie } from "./app/Maggie";

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
});

const maggieSlack = new Maggie("slack");
const maggieDiscord = new Maggie("discord");

app.event("message", async ({ event, context }) => {
  const token = context?.botToken;
  const channel = event?.channel;

  let text = event?.text;
  let user = event?.user;
  console.log("message event", `${user}: ${text}`);

  const messages = await maggieSlack.getMessageResponses(text, user);

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

  const response = await maggieSlack.getMentionResponse(text, context, files, user);
  const message = { token, channel, text: response };

  await app.client.chat.postMessage(message);
});

(async () => {
  await app.start(process.env.PORT || 8080);

  console.log("1 slack", await maggieSlack.getMentionResponse("tag kees slack", null, null, "U91HHN2JE"));
  console.log("2 discord", await maggieDiscord.getMentionResponse("tag kees discord", null, null, "37026172062466048"));
  console.log("3 slack", await maggieSlack.getMentionResponse("scheld kees slack", null, null, "U91HHN2JE"));
  console.log("4 discord", await maggieDiscord.getMentionResponse("scheld kees discord", null, null, "37026172062466048"));

  console.log("⚡️ Slakbot is running!");
})();

const DISCORD_MAGGIE_IDS = ["&875087867293106238", "!875074049968058431"];

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
  console.log(msg.content);

  const maggieIdRegex = new RegExp(`(<@)(${DISCORD_MAGGIE_IDS.join("|")})(>)`);
  if (msg.content.match(maggieIdRegex)) {
    let message = msg.content.replace(maggieIdRegex, "").trim();
    const response = await maggieDiscord.getMentionResponse(
      message,
      null,
      [],
      msg.author.id
    );
    msg.channel.send(response);
  }
});

//make sure this line is the last line
client.login(process.env.DISCORD_TOKEN); //login bot using token
