import { sample } from "lodash";
import { JOKE_PREFIX, JOKE_SUFFIX } from "../../answers/Joke";
import { HttpClient } from "./../../httpClient";

class MopService {
    httpClient; 
    constructor() {
        this.httpClient = new HttpClient()
    }

    sayMopje = async () => {
        let url = "https://www.moppenbot.nl/api/random/?nsfw=true"
        let mopResponse = await this.httpClient.get(url); 


        let prefixRoll = Math.floor(Math.random() * 10);
        let suffixRoll = Math.floor(Math.random() * 10);

        let response = "";
        if (prefixRoll < 3) {
            response += sample(JOKE_PREFIX);
        }

        response += mopResponse.joke.joke;

        if (suffixRoll < 3) {
            response += sample(JOKE_SUFFIX);
        }
        
        return response;
    }
}

export { MopService };
