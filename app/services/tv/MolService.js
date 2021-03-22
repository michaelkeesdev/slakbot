import { sample } from "lodash";
import { MOL_2021_NAMES } from "../../answers/mol2021/Names";

class MolService {
    giveRandomName() {
        return sample(MOL_2021_NAMES);
    }
}

export {MolService};
