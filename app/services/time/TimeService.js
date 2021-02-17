import { NumberUtil } from "../../util/NumberUtil";
import { sample } from 'lodash';
import { TIME_ANSWER } from "../../answers/Time";


class TimeService {

    numberUtil = new NumberUtil();

    getRandomTime(text) {
        let hh = this.numberUtil.generateRandom(6, 24);
        let mm = this.numberUtil.generateRandom(0, 60);

        if (hh < 10) hh = "0" + hh;
        if (mm < 10) mm = "0" + mm;
    
        var time = {
            "%hh%": hh,
            "%mm%": mm
        };

        let answer = sample(TIME_ANSWER).replace(/%\w+%/g, function(all) {
            return time[all] || all;
        });

        return answer;
    }
}

export { TimeService };


