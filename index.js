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

  console.log("in hoek", await maggie.getMentionResponse("zwijg hoer", null, null, "U91HHN2JE"));

  console.log("test", await maggie.getMentionResponse("test"));
  console.log("test", await maggie.getMentionResponse("test"));
  console.log("test", await maggie.getMentionResponse("test"));
  console.log("test", await maggie.getMentionResponse("test"));


  console.log("kom terug", await maggie.getMentionResponse("kom terug"));
  console.log("nee", await maggie.getMentionResponse("nee", null, null, "U91HHN2JE"));

  console.log("test", await maggie.getMentionResponse("test", null, null, "U91HHN2JE"));


  console.log("⚡️ Slakbot is running!");
})();
