// SLACK

import { App } from "@slack/bolt";
import "dotenv/config";

import { Maggie } from "./app/Maggie";

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
});

const maggie = new Maggie();

app.event("message", async ({ event, context }) => {
  const token = context?.botToken;
  const channel = event?.channel;

  let text = event?.text;
  let user = event?.user;
  console.log("message event", `${user}: ${text}`);

  const messages = await maggie.getMessageResponses(text, user);

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

  const response = await maggie.getMentionResponse(text, context, files, user);
  const message = { token, channel, text: response };

  await app.client.chat.postMessage(message);
});

(async () => {
  await app.start(process.env.PORT || 8080);
  console.log("init", await maggie.getMentionResponse("blad steen schaar"));
  console.log("play", await maggie.getMentionResponse("hoer"));
  console.log("end", await maggie.getMentionResponse("ge suckt"));

  console.log("⚡️ Slakbot is running!");
})();


// DISCORD

const { Client, Intents, Permissions } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', () => {
	console.log('Discord Ready!');
});

client.on('message', async (message) => {
  if (message.isMentioned(client.user)) {
    console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
    response = await maggie.getMentionResponse(message, null, null, message.user)
    message.reply(response);
  }
});

client.login(process.env.DISCORD_TOKEN);
