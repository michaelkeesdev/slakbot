import { HttpClient } from './../../../httpClient';

const BASE_TOKEN_URL = 'https://www.deviantart.com/oauth2/token';
const BASE_POSTS_URL = 'https://www.deviantart.com/api/v1/oauth2/browse/topic';
const axios = require('axios');

class DeviantArt {

  constructor(httpClient = new HttpClient() ) {
  }

  async getDeviantArtPost(topic) {
    const resp = await axios.get(BASE_TOKEN_URL, {
      params : {
        grant_type:'client_credentials',
        client_id: '14785',
        client_secret: '6df4ad734231ca314d62877043f795ce'
      }
    });
    const offset =  Math.floor(Math.random() * 20) + 1;
    const resp2 = await axios.get(BASE_POSTS_URL, {
      params : {
        access_token: resp.data.access_token,
        offset: offset ,
        limit: 1,
        topic: topic
      }
    });
    return resp2.data.results[0].url;
  };
}

class DeviantArtService {
  getDeviant = async (topic) => {
    return await new DeviantArt().getDeviantArtPost(topic);
  };
}

export { DeviantArtService };
