import { sample } from "lodash";
import { MOL_NAMES } from "./../../answers/mol/Names";

class MolService {
    giveRandomName() {
        return sample(MOL_NAMES);
    }
}

export {MolService};
