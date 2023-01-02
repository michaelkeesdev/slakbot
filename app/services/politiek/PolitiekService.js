import { sample } from "lodash";
import { PARTIJ_NAMES } from "./../../answers/politiek/Partij";

class PolitiekService {
  giveRandomPartij() {
    return sample(PARTIJ_NAMES);
  }
}

export { PolitiekService };