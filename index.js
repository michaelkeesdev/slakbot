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

  if(messages?.length){
    messages.map( async (message) => {
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

  const response = await maggie.getMentionResponse(text, context, files);
  const message = { token, channel, text: response };

  await app.client.chat.postMessage(message);
});

(async () => {
  await app.start(process.env.PORT || 8080);

  console.log("⚡️ Slakbot is running!");
})();
