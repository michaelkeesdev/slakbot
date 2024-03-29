import { sample } from "lodash";
import { HttpClient } from "./../../httpClient";

const BASE_POSTS_URL = "https://9gag.com/v1/group-posts/group/";
const TAG_POSTS_URL = "https://9gag.com/v1/tag-posts/tag/"; 

class Ninegag {
  constructor(
    postCount,
    section = "hot",
    group = "default",
    httpClient = new HttpClient()
  ) {
    if (httpClient == undefined) throw new Error("Expected an http client");
    if (postCount <= 0) throw new Error("Post count must be positive");
    this.httpClient = httpClient;
    this.postCount = postCount;
    this.section = section;
    this.group = group;
  }

  postsUrl(group, nextCursor) {
    const g = group ? group : this.group;
    let url = BASE_POSTS_URL + g + "/type/" + this.section;
    if (nextCursor) {
      url += "?" + nextCursor;
    }
    console.log("test", url);
    return url;
  }

  /**
   * Scraps 9gag from the start or continues after some post id
   *
   * @param {string} [group] - group section
   */
  async scrap(group) {
    let posts = [];
    const pages = this.postCount / 10;
    let response;
    for (let i = 0; i < pages; i++) {
      response = await this.httpClient.get(
        this.postsUrl(group, response?.data?.nextCursor)
      );
      const filterPosts = response?.data?.posts.filter(
        (post) => !post?.images?.image700?.url?.includes("thumbnail-facebook")
      );
      posts = posts.concat(filterPosts);
    }
    return sample(posts)?.images?.image700?.url;
  }
}

class NinegagV2 {
  constructor(
    httpClient = new HttpClient()
  ) {
    if (httpClient == undefined) throw new Error("Expected an http client");
    this.httpClient = httpClient;
  }

  /**
   * Scraps 9gag from the start or continues after some post id
   *
   * @param {string} [group] - group section
   */
  async get(tag, count) {
    let posts = [];
    const pages = count;
    let response;
    for (let i = 0; i < pages; i++) {
      let url = TAG_POSTS_URL + tag;
      if (response?.data?.nextCursor) {
          url += "?" + response?.data?.nextCursor;
      }
      console.log("url", url);
      response = await this.httpClient.get(url);
      console.log(response);
      const filterPosts = response?.data?.posts.filter(
        (post) => !!post?.images?.image700
      );
      posts = posts.concat(filterPosts);
      
    }
    const post = sample(posts);
    const url = encodeURI(post.images.image700.url);
    console.log("URL", url);
    return url;
  }
}

class NineGagService {
  get9gagBasic = async () => {
    // group-posts/group/default/type/hot
    return await new Ninegag(50, "hot", "default").scrap();
  };

  get9gagGirl = async () => {
    const res = await new NinegagV2().get("nsfw", 5);
    console.log("NINEGAGV2", res);
    return res;
  };
}

export { NineGagService };
