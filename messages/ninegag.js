
import { HttpClient } from '../httpClient';

const POSTS_PER_PAGE = 10;
const BASE_POSTS_URL = 'https://9gag.com/v1/group-posts/group/';

class Ninegag {

  constructor(postCount, section = 'hot', group = "default", commentCount = 0, httpClient = new HttpClient(), ) {
    if (httpClient == undefined) throw new Error('Expected an http client');
    if (postCount <= 0) throw new Error('Post count must be positive');
    if (commentCount < 0) throw new Error('Comment count cannot be negative');
    this.httpClient = httpClient;
    this.postCount = postCount;
    this.section = section;
    this.commentCount = commentCount;
    this.group = group;
  }

  postsUrl(lastPostId) {
    let url = BASE_POSTS_URL + this.group + '/type/' + this.section;
    if (lastPostId) url += '?after=' + lastPostId;
    return url;
  }

  /**
   * Scraps 9gag from the start or continues after some post id
   * 
   * @param {string} [lastPostId] - Last scrapped post id
   */
  async scrap(lastPostId) {
    let result = [];
    const pages = Math.ceil(this.postCount / POSTS_PER_PAGE);
    for (let i = 0; i < pages; i++) {
      let response = await this.httpClient.get(this.postsUrl(lastPostId));
      lastPostId = response[response.length - 1]?.id;
      result = result.concat(response);
    }
    return result.slice(0, this.postCount);
  }
}

export { Ninegag };


