import { sample } from "lodash";
import { HttpClient } from "../../../httpClient";
import { ADJECTIVES } from "../../answers/words/Adjectives";
import { StringBuilder } from "../../util/StringBuilder";


export const RECOGNITION_PREFIX = [
  "wat een",
  "och",
  "oh",
  "ja duidelijk een"
]
class ImageRecognitionService {
  httpClient;

  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  get = async (imageUrl) => {
    const header = {
      Authorization:
        "Basic YWNjX2U3YzhlN2RkNTU4OWUxZTo2NTc0ZmM4NDYxNTQ4YWYxZGRmMTk3ZjA4OGRjZWUyNg==",
    };
    //console.log("imageUrl", imageUrl, header);
    // imageUrl = 'https://newsifier.imgix.net/androidworld.nl/images/images/Google-app.png?w=744&ar=3:2&fit=crop';
    let response = await this.httpClient.get(
      `https://api.imagga.com/v2/tags?image_url=${imageUrl}&language=nl`,
      header
    );

    const tags = response?.result?.tags;
    let responseBuilder = new StringBuilder();

    responseBuilder.append(sample(RECOGNITION_PREFIX));
    responseBuilder.append(" ").append(sample(ADJECTIVES));
    responseBuilder.append(" ").append(tags[0].tag?.nl);
    responseBuilder.append(" ").append(tags[1].tag?.nl);

    return responseBuilder.toString();
  };
}

export { ImageRecognitionService };
