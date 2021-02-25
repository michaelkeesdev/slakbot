import { App } from "@slack/bolt";
import "dotenv/config";

import { Maggie } from "./app/Maggie";

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
});

const maggie = new Maggie();

app.event("message", async ({ event, context }) => {
  console.log("message event", event);
  console.log("message context", context);
  const token = context?.botToken;
  const channel = event?.channel;

  let text = event?.text;
  let user;
  if(["U01NEE5JYSY", "U01K3BVEVT3"].includes(event?.user)) {
    console.log("BOT event:", event);
    user = event?.user
  } else {
    user = event?.user
  }
  const response = await maggie.getMessageResponse(text, user);

  if(response){
    const message = { token, channel, text: response };
    await app.client.chat.postMessage(message);
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

  const messages = [
    {text: "hallo", user: "1"},
    {text: "hallo", user: "1"},
    {text: "hallo", user: "1"},
    {text: "niks", user: "1"},
    {text: "hallo", user: "1"},
    {text: "hallo", user: "1"},
    {text: "hallo", user: "1"},
    {text: "ni", user: "1"},
    {text: "ok", user: "1"},
  ]

  if(messages.length >= 7) {
    const messagesFilter = messages.slice(messages.length - 7, messages.length - 1);
    if(messagesFilter?.every(m => m.user === messages[0].user)) {
        console.log("message",  messages[0].text);
    }
  } 
   // console.log("test", await maggie.getResponse("<@Maggie> doenbaar", { botUserId: "Maggie"}, files));

  console.log("⚡️ Slakbot is running!");
})();
