import { MaggieBrein } from "./services/MaggieBrein";
import { MaggieMond } from "./services/MaggieMond";

const maggieMond = new MaggieMond();
const maggieBrein = new MaggieBrein();

class Maggie {
    getResponse = async (text, context) => {
        const tokens = maggieBrein.getTokens(text);

        const exactMatches = maggieBrein.getExactMatches(tokens);
        const fuzzyMatches = maggieBrein.getFuzzyMatches(tokens);

        console.log("exactMatches", exactMatches);
        console.log("fuzzyMatches", JSON.stringify(fuzzyMatches));

        let response = "";
        if(exactMatches) {
            response = await exactMatches[0]?.action(text, context);
        } else if (fuzzyMatches) {
            response = await fuzzyMatches[0]?.item?.action(text, context); 
        } 

        if (!response) {
            switch (true) {
                case maggieBrein.needsToDecide(text):
                    response = maggieMond.speakDecision(text);
                    break;
                default:
                    response = maggieMond.sayBasicMessage();
            }
        }

        return response;
    };
}

export { Maggie };
