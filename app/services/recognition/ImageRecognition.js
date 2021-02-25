import { google } from "googleapis";
import { sample } from "lodash";

import { ADJECTIVES } from "../../answers/words/Adjectives";
import { StringBuilder } from "../../util/StringBuilder";

export const RECOGNITION_PREFIX = ["wat een", "och", "oh", "ja duidelijk een"];
class ImageRecognitionService {
  vision;

  constructor() {
    this.vision = google.vision({
      version: "v1",
      auth: process.env.YOUTUBE_API_KEY,
    });
  }

  get = async (imageUrl) => {
    const req = {
      requestBody: {
        requests: [
          {
            image: {
              source: {
                imageUri: imageUrl,
              },
            },
            features: [{
              type:'LABEL_DETECTION',
              maxResults: 2,
            }]
          },
        ],
      }
    }
    const res = await this.vision.images.annotate(req);

    const tags = res?.data?.responses[0].labelAnnotations
    let responseBuilder = new StringBuilder();

    if (tags) {
      responseBuilder.append(sample(RECOGNITION_PREFIX));
      responseBuilder.append(" ").append(sample(ADJECTIVES));
      responseBuilder.append(" ").append(tags[0].description);
    }
    return responseBuilder.toString() ? responseBuilder.toString() : null;
  };

  getImagga = async (imageUrl) => {
    const header = {
      Authorization:
        "Basic YWNjX2U3YzhlN2RkNTU4OWUxZTo2NTc0ZmM4NDYxNTQ4YWYxZGRmMTk3ZjA4OGRjZWUyNg==",
    };

    let response = await this.httpClient.get(
      `https://api.imagga.com/v2/tags?image_url=${imageUrl}`,
      header
    );

    console.log("response", JSON.stringify(response));

    const tags = response?.result?.tags;
    let responseBuilder = new StringBuilder();

    if (tags) {
      responseBuilder.append(sample(RECOGNITION_PREFIX));
      responseBuilder.append(" ").append(sample(ADJECTIVES));
      responseBuilder.append(" ").append(tags[0].tag?.nl);
      responseBuilder.append(" ").append(tags[1].tag?.nl);
    }
    return responseBuilder.toString() ? responseBuilder.toString() : null;
  };
}

export { ImageRecognitionService };
