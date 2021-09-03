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
  console.log("1 init", await maggie.getMentionResponse("higher lower", null, null, "U91HHN2JE"));
  console.log("2 other player higher", await maggie.getMentionResponse("hoger", null, null, "U90TSU6JU"));
  console.log("3 other player rps", await maggie.getMentionResponse("rps", null, null, "U90TSU6JU"));

  console.log("4 higher", await maggie.getMentionResponse("hoger", null, null, "U91HHN2JE"));
  console.log("5 other player blad", await maggie.getMentionResponse("blad", null, null, "U90TSU6JU"));
  console.log("6 higher", await maggie.getMentionResponse("hoger", null, null, "U91HHN2JE"));
  console.log("7 higher", await maggie.getMentionResponse("hoger", null, null, "U91HHN2JE"));

  console.log("8 init game 2", await maggie.getMentionResponse("higher lower", null, null, "U91HHN2JE"));
  console.log("9 play game 2", await maggie.getMentionResponse("hoger", null, null, "U91HHN2JE"));
  console.log("10 play game 2", await maggie.getMentionResponse("hoger", null, null, "U91HHN2JE"));
  console.log("11 play game 2", await maggie.getMentionResponse("hoger", null, null, "U91HHN2JE"));
  console.log("12 play game 2", await maggie.getMentionResponse("hoger", null, null, "U91HHN2JE"));


  console.log("⚡️ Slakbot is running!");
})();


// DISCORD


// respond with "hello world" when a GET request is made to the homepage

/*
const express = require('express');
const { Client, Intents, Permissions } = require('discord.js');
const { InteractionResponseType, verifyKeyMiddleware } = require("discord-interactions");

var discordApp = express();
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });


discordApp.post('/interactions', verifyKeyMiddleware('f79402272be9d36eb834d5c9364761fd6a1fdec310a12685c947c92bc7cd3b95'), async (req, res) => {
  const message = req.body;

  if (message.isMentioned(client.user)) {
    response = await maggie.getMentionResponse(message.content, null, null, message.author)
    res.send({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: response,
      },
    });
  }
});

client.login(process.env.DISCORD_TOKEN);

discordApp.listen(8081, function () {
  client.once('ready', () => {
    console.log('⚡️ Discord Ready!');
  });
 });
 */
