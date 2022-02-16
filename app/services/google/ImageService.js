import { google } from "googleapis";
import { sample } from "lodash";
import { IMAGE_TRIGGER } from "../../answers/image/Images";

class ImageService {
  search;

  constructor() {
    this.search = google.customsearch({
      version: "v1",
      auth: process.env.YOUTUBE_API_KEY,
    });
  }

  getImage = async (text) => {
    const regex = new RegExp(
      `(?:^|\\W)(.*?)(${IMAGE_TRIGGER.join("|")})(?:$|\\W)`,
      "ig"
    );
    const removedPrefixFromSuggest = text.replace(regex, "");

    let result = await this.search.cse.list({
      searchType: "image",
      cx: "eb00fd8986af6a2ce",
      q: removedPrefixFromSuggest,
    });

    if (result.data?.items?.length) {
      const item = sample(result.data.items);
      return item.link;
    }
    return null;
  };
}

export { ImageService };
