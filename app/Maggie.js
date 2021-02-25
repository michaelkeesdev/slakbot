import { MaggieBrein } from "./services/MaggieBrein";
import { MaggieMond } from "./services/MaggieMond";

const maggieMond = new MaggieMond();
const maggieBrein = new MaggieBrein();

class Maggie {


    getMentionResponse = async (textInput, context, files) => {
        const text = textInput?.replace(`<@${context?.botUserId}>`, "").trim();
        let imageUrl;
        if(files?.length > 0){
            imageUrl = files[0]?.thumb_960;
            /* const splitted = files[0]?.permalink.split('/');
            const name = splitted[splitted.length -1];
            const keys = files[0]?.permalink_public?.replace("https://slack-files.com/", "")?.split("-");
            imageUrl = `https://files-origin.slack.com/files-pri/${keys[0]}-${keys[1]}/${name}?pub_secret=${keys[2]}`; */
        }
        console.log("files", JSON.stringify(files));
        console.log("imageUrl", imageUrl);

        const tokens = maggieBrein.getTokens(text);

        const exactMatches = await maggieBrein.getExactMatches(tokens);
        const fuzzyMatch = await maggieBrein.getFuzzyMatch(tokens);

        let response = "";
        if (fuzzyMatch) {
            response = await fuzzyMatch?.action(text, context, imageUrl); 
        } else if(exactMatches) {
            response = await exactMatches[0]?.action(text, context, imageUrl);
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

    getMessageResponse = async (message, user) => {
        maggieBrein.pushMessage({ text: message, user });

        const duplicateSize = 4;
        const monoloqueSize = 7;

        if(maggieBrein?.messages.length >= duplicateSize) {
            const messagesFilter = maggieBrein?.messages.slice(maggieBrein?.messages.length - duplicateSize, maggieBrein?.messages.length - 1);
            if(messagesFilter?.every(m => m.text === maggieBrein.messages[0].text)) {
                return message;
            }
        } 
        if(maggieBrein?.messages?.length > monoloqueSize) {
            const messagesFilter = maggieBrein?.messages.slice(maggieBrein?.messages.length - monoloqueSize, maggieBrein?.messages.length - 1);
            if(messagesFilter?.every(m => m.user === maggieBrein.messages[0].user)) {
                return maggieMond.sayMonologue();
            }
        }
        return null;
    }
}

export { Maggie };
