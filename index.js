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

  if(event?.user === "U01NEE5JYSY") {
    const message = { token, channel, text: `waddist <@U01K3BVEVT3> ?` };
    await app.client.chat.postMessage(message);
  } else if(event?.user === "U01K3BVEVT3") {
    const message = { token, channel, text: `ja jong <@U01NEE5JYSY> ?` };
    await app.client.chat.postMessage(message);
  }
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

  const response = await maggie.getResponse(text, context);
  const message = { token, channel, text: response };

  await app.client.chat.postMessage(message);
});

(async () => {
  await app.start(process.env.PORT || 8080);

  console.log("test", await maggie.getResponse("vraagje"));

  console.log("⚡️ Slakbot is running!");
})();
