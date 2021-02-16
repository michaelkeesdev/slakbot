import { sample } from 'lodash';
<<<<<<< HEAD
import { HttpClient } from './../../../httpClient';
=======
import { HttpClient } from '../../../httpClient';
>>>>>>> d404bf9378316670f3b51cbc379f5a56ee9d32b7

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