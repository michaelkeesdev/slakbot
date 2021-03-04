import { sample } from 'lodash';
import { HttpClient } from './../../../httpClient';

class NewsService {
    httpClient;

    constructor(httpClient) {
      this.httpClient = httpClient;
    }

    // "https://api.smartocto.com/api/brands/tentacles?i=h4xmfyj9c6jpezbbzufqgmu378wgd8e3"

    getNewsPosts = async () => {
        let response = await this.httpClient.get(
          "https://tt.onthe.io/qRBhM0Zc7FKK/ht.json"
        );
        const articleKeys = Object.keys(response);
        const articleKey = sample(articleKeys);
        return `
          ${respones[articleKey]?.original_title} \n 
          ${'https://www.hbvl.be/'+respones[articleKey]?.url}
          `;
      };
}

export { NewsService };