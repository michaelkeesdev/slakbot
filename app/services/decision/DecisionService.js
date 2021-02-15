import { sample } from 'lodash';

class DecisionService {
    needsToDecide(text) {
        return text.split(" of ").length > 1
    }

    makeDecision(text) {
        if (this.needsToDecide(text)) {
            return sample(text.split(" of "))
        }
    }
}

export { DecisionService };


