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
  const user = event?.user;

  // HILARISCHE SHIT
  
  /* if(event?.user === "U01NEE5JYSY") {
    const response = await maggie.getResponse(event?.text, context);
    const message = { token, channel, text: response };
    setTimeout(async () => {
      await app.client.chat.postMessage(message);
    }, 1000);
  } else if(event?.user === "U01K3BVEVT3") {
    const response = await maggie.getResponse(event?.text, context);
    const message = { token, channel, text: response };
    setTimeout(async () => {
      await app.client.chat.postMessage(message);
    }, 1000);
  }  */ 
  
  
  /* let response;
  if (user === userService.getActiveUser()) {
    response = `ge suckt <@${user}>`;
    userService.setActiveUser(null);
  }
  if (event?.text === "hoer") {
    response = `zelf hoer <@${user}>`;
  } */
  /* if (response) {
    const message = { token, channel, text: response };
    await app.client.chat.postMessage(message);
  } */
});

app.event("app_mention", async ({ context, event }) => {
  console.log("app_mention", context, event);
  const token = context.botToken;
  const channel = event.channel;

  const text = event.text.replace(`<@${context.botUserId}>`, "").trim();
  const files = event?.files ? event.files : [];

  const response = await maggie.getResponse(text, context, files);
  const message = { token, channel, text: response };

  await app.client.chat.postMessage(message);
});

(async () => {
  await app.start(process.env.PORT || 8080);

  const files = [
    {
      name: 'screenshot_2021-02-25_at_08.39.29.png',
      permalink_public: 'https://slack-files.com/T92K3TTQX-F01Q0EPQ324-c18e7c6a17'
    }
  ]
  // console.log("test", await maggie.getResponse("<@Maggie> doenbaar", { botUserId: "Maggie"}, files));

  console.log("⚡️ Slakbot is running!");
})();
