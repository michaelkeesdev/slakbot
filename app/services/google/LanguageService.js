import { google } from "googleapis";

class LanguageService {
  language;

  constructor() {
    this.language = google.language({version: "v1", auth: process.env.YOUTUBE_API_KEY});
  }

  getSentiment = (message) => {
      return this.language.documents.analyzeSentiment({
        requestBody: {
          document: {
            type: 'PLAIN_TEXT',
            language: "en",
            content: message,
          }
        }
      });
  };
}

export { LanguageService };
