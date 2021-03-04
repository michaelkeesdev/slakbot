import { sample } from 'lodash';
import { HUMAN_OPINION_PREFIX, SYSTEM_OPINION_PREFIX, OPINION, OPINION_SUFFIX } from '../../answers/basic/BasicOpinion';
import { NOUNS } from '../../answers/words/RandomNouns';
import { StringUtil } from '../../util/StringUtil';
import { UserService } from '../user/UserService';

const SUFFIX_PID = 3;

const userService = new UserService();

class OpinionService {
    clearAndAppendSystemOpinionPrefix(responseBuilder) {
        responseBuilder.clear();
        responseBuilder.append(sample(SYSTEM_OPINION_PREFIX));
    }

    appendHumanOpinion(responseBuilder) {
        let addOpinionSuffix = Math.floor(Math.random() * SUFFIX_PID);

        if (!StringUtil.lastCharEqualsOneOf(responseBuilder.toString(), [".", "?", "!"])) {
            responseBuilder.append(".")
        }

        responseBuilder.append(" ").append(sample(HUMAN_OPINION_PREFIX));
        responseBuilder.append(" ").append(this.getOpinion());

        if (addOpinionSuffix == 1) {
            responseBuilder.append(" ").append(sample(OPINION_SUFFIX));

        }

        return responseBuilder;
    }

    getOpinion() {
        let noun = sample(NOUNS);
        let user = userService.getRandomUserRandomName();

        let opinionContents = {
            "%noun%": noun,
            "%user%": user,
        }

        let opinion = sample(OPINION).replace(/%\w+%/g, function (all) {
            return opinionContents[all] || all;
        });

        return opinion;
    }
}

export { OpinionService };


