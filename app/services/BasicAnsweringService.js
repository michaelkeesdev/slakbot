import { sample } from 'lodash';
import { BASIC_AGREE_ANSWER } from './../answers/basic/BasicAgree';
import { BASIC_DISAGREE_ANSWER } from './../answers/basic/BasicDisagree';
import { BASIC_DONT_KNOW_ANSWER } from './../answers/basic/BasicDontKnow';
import { BASIC_PHRASE } from './../answers/basic/BasicPhrase';

class BasicAnweringService {
    buildAnswerPhrase = () => {
        let decision = Math.floor(Math.random() * 3);
        let wantsToTalk = Math.floor(Math.random() * 2);

        let answer;

        switch(wantsToTalk) {
            case 0:
                // Short answer
                answer = "";
                break
            case 1:
                // Some text
                answer = sample(BASIC_PHRASE);
                break;
        }

        switch(decision) {
            case 0:
                // 0 Maggie agrees
                return answer.concat(" ").concat(sample(BASIC_AGREE_ANSWER));
            case 1:
                // 1 Maggie disagrees
                return answer.concat(" ").concat(sample(BASIC_DISAGREE_ANSWER));
            case 2:    
                // 2 Maggie weet ni
                return sample(BASIC_DONT_KNOW_ANSWER);     
            default:
                return sample(BASIC_PHRASE);       
        }
    };


}

export { BasicAnweringService };