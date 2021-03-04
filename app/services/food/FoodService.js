import { sample } from 'lodash';
import { cheerio } from 'cheerio';

class FoodService {
    httpClient;

    constructor(httpClient) {
      this.httpClient = httpClient;
    }

    getRecaipie = async (suggest) => {
        let htmlDom = await this.httpClient.get(
          "https://dagelijksekost.een.be/az-index"
        );

        console.log("htmlDom", htmlDom);

        const $ = cheerio.load(htmlDom);

        console.log("$", $);

        // const articleKeys = Object.keys(response);
        // const articleKey = sample(articleKeys);
        // return `${'https://www.hbvl.be/'+response[articleKey]?.url}`;
      };
}

export { FoodService };