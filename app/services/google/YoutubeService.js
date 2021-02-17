import { google } from "googleapis";
import { sample } from "lodash";
import { SLUIP_IDS } from "./../../answers/youtube/Sluip";

class YoutubeService {
  youtube;

  constructor() {
    this.youtube = google.youtube({
      version: "v3",
      auth: process.env.YOUTUBE_API_KEY,
    });
  }

  getRandomYoutube = async (text) => {
    let result = await this.youtube.search.list({
      part: "id,snippet",
      maxResults: "50",
      q: text,
    });
    let index = Math.floor(Math.random() * 50);
    return `https://www.youtube.com/watch?v=${result.data.items[index].id.videoId}`;
  };

  getExactYoutube = async (text) => {
    let result = await this.youtube.search.list({
      part: "id,snippet",
      q: text,
    });
    return `https://www.youtube.com/watch?v=${result.data.items[0].id.videoId}`;
  };

  getSluip = async () => {
    return `https://www.youtube.com/watch?v=${sample(SLUIP_IDS)}`;
  };
}

export { YoutubeService };
