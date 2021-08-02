import Redtube from "redtube";
import { sample } from "lodash";
import util from "util";

class TubeService {
  r;
  exactVideos;

  constructor() {
    this.r = new Redtube({ output: 'json' });
    this.exactVideos = [];
  }

  getTube = async (text) => new Promise((resolve) => {
    this.r.search({ search: text }, (err, response) => {
      if(!err)
        this.exactVideos = response.videos.filter(v => v.video.title.toLowerCase().includes(text.toLowerCase()));
        if(this.exactVideos.length > 0) {
          resolve(sample(this.exactVideos).video.url);
        } else {
          resolve(sample(response.videos).video.url);
        }
    });
  })
}

export { TubeService };
