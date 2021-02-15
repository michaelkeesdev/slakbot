import { sample } from 'lodash';
import { HttpClient } from '../httpClient';

class NewsService {
    getNewsPosts = async () => {
        let httpClient = new HttpClient()
        let response = await httpClient.get(
          "https://api.smartocto.com/api/brands/tentacles?i=h4xmfyj9c6jpezbbzufqgmu378wgd8e3"
        );
        return sample(response?.headerTests).title;
      };
}

export { NewsService };