import { sample } from 'lodash';
import { HttpClient } from '../../../httpClient';

const BASE_POSTS_URL = 'https://9gag.com/v1/group-posts/group/';

class Ninegag {

  constructor(postCount, section = 'hot', group = "default", httpClient = new HttpClient() ) {
    if (httpClient == undefined) throw new Error('Expected an http client');
    if (postCount <= 0) throw new Error('Post count must be positive');
    this.httpClient = httpClient;
    this.postCount = postCount;
    this.section = section;
    this.group = group;
  }

  postsUrl(group) {
    const g = group ? group : this.group;

    return BASE_POSTS_URL + g + '/type/' + this.section;
  }

  /**
   * Scraps 9gag from the start or continues after some post id
   * 
   * @param {string} [group] - group section
   */
  async scrap(group) {
    let result = [];
    const pages = Math.ceil(this.postCount);
    for (let i = 0; i < pages; i++) {
      let response = await this.httpClient.get(this.postsUrl(group));
      result = result.concat(response);
    }
    let posts = result.slice(0, this.postCount)[0]?.data?.posts
    return sample(posts)?.images?.image700?.url;
  }
}

class NineGagService {
  get9gagBasic = async () => {
    return await new Ninegag(50, "hot", "default").scrap();
  };

  get9gagGirl = async () => {
    return await new Ninegag(50, "hot", "default").scrap("girl");
  };
  
}

export { NineGagService };