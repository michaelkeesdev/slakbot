import { sample } from 'lodash';

const ALL_PID = 10;

class DecisionService {
    needsToDecide(text) {
        return text.split(" of ").length > 1
    }

    makeDecision(text) {
        if (this.needsToDecide(text)) {
            let ALL_PID = Math.floor(Math.random() * ALL_PID);
            if(ALL_PID === 1) {
                return text.replace(" of ", " en ");
            } else {
                return sample(text.split(" of "))
            }
            
        }
    }
}

export { DecisionService };


