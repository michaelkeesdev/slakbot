import { sample } from "lodash";
import { PARTIJ_NAMES } from "./../../answers/politiek/Partij";

class PolitiekService {
  sayPartij() {
    return sample(PARTIJ_NAMES);
  }
}

export { PolitiekService };