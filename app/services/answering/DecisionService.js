import { sample } from 'lodash';

const ALL_PID = 10;

class DecisionService {
    mood;
    inputText;
    responseBuilder;
  
    constructor(mood, inputText, responseBuilder) {
        this.mood = mood;
        this.inputText = inputText;
        this.responseBuilder = responseBuilder;
    }

    answer = () => {
        if (this.inputText.split(" of ").length > 1) {
            let and = Math.floor(Math.random() * ALL_PID);
            if(and === 1) {
                this.responseBuilder.append(this.inputText.replace(" of ", " en "));
            } else {
                this.responseBuilder.append(sample(this.inputText.split(" of ")))
            }
            
            return this.responseBuilder.toString();
        }
    }
}

export { DecisionService };


