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

  maggie.getMessageResponse()
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

  const files = [
    {
      "permalink": "https://dajjjmm.slack.com/files/U90TSU6JU/F01PB55GHR8/screenshot_2021-02-23_at_16.58.14.png",
      "permalink_public": "https://slack-files.com/T92K3TTQX-F01PB55GHR8-8d1a3bb529",
      "thumb_360": "https://files.slack.com/files-tmb/T92K3TTQX-F01PB55GHR8-1fec514622/screenshot_2021-02-23_at_16.58.14_360.png",
      "thumb_960": "https://files.slack.com/files-pri/T92K3TTQX-F01Q0RMNN6L/screenshot_2021-02-25_at_08.39.29.png",
    }
  ]
   // console.log("test", await maggie.getResponse("<@Maggie> doenbaar", { botUserId: "Maggie"}, files));

  console.log("⚡️ Slakbot is running!");
})();
