import { MaggieBrein } from "./services/MaggieBrein";
import { MaggieMond } from "./services/MaggieMond";

const maggieMond = new MaggieMond();
const maggieBrein = new MaggieBrein();

class Maggie {
    getResponse = async (text, context) => {
        const exactMatches = maggieBrein.getExactMatches(text);
        const fuzzyMatches = maggieBrein.getFuzzyMatches(text)

        let response = "";
        if (exactMatches) {
            response = await exactMatches[0]?.action(text, context)
        } else {
            response = await fuzzyMatches[0]?.item?.action(text, context);
        }

        if (!response) {
            switch (true) {
                case maggieBrein.needsToDecide(text):
                    response = maggieMond.makeDecision(text);
                    break;
                default:
                    response = maggieMond.sayBasicMessage();
            }
        }

        return response;
    };
}

export { Maggie };
