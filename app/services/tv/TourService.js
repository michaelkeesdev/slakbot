import { sample } from "lodash";
import { RIDERS } from "./../../answers/riders";

class TourService {
  giveRandomName() {
    return sample(RIDERS);
  }
}

export { TourService };
