import { MaggieBrein } from "./services/MaggieBrein";
import { MaggieMond } from "./services/MaggieMond";

const maggieMond = new MaggieMond();
const maggieBrein = new MaggieBrein();

class Maggie {

    getResponse = async (textInput, context) => {
        const text = textInput?.replace(`<@${context?.botUserId}>`, "").trim();
        
        const tokens = maggieBrein.getTokens(text);

        const exactMatches = await maggieBrein.getExactMatches(tokens);
        const fuzzyMatch = await maggieBrein.getFuzzyMatch(tokens);

        let response = "";
        if (fuzzyMatch) {
            response = await fuzzyMatch?.action(text, context); 
        } else if(exactMatches) {
            response = await exactMatches[0]?.action(text, context);
        }

        if (!response) {
            switch (true) {
                case maggieBrein.needsToDecide(text):
                    response = maggieMond.speakDecision(text);
                    break;
                default:
                    response = maggieMond.giveBasicAnswer();
            }
        }

        return response;
    };
}

export { Maggie };
