import { sample } from 'lodash';
import { HttpClient } from './../../../httpClient';

class NewsService {
    httpClient;

    constructor(httpClient) {
      this.httpClient = httpClient;
    }

    getNewsPosts = async () => {
        let response = await this.httpClient.get(
          "https://api.smartocto.com/api/brands/tentacles?i=h4xmfyj9c6jpezbbzufqgmu378wgd8e3"
        );
        return sample(response?.headerTests).title;
      };
}

export { NewsService };