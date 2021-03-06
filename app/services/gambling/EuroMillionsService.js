import { NumberUtil } from "../../util/NumberUtil";

class EuroMillionsService {

    numberUtil = new NumberUtil();

    getNextDraw() {
        let n = this.numberUtil.generateRandomList(5, 1, 50);
        let s = this.numberUtil.generateRandomList(2, 1, 12);
        let nextDraw = this.getNextEuroMillionsDrawDay();
        return `De winnende cijfers van ${nextDraw} zijn: ${n[0]}, ${n[1]}, ${n[2]}, ${n[3]} en ${n[4]}. De sterren zijn ${s[0]} en ${s[1]}.`
    }

    getNextEuroMillionsDrawDay() {
        let weekdays = [], today = new Date().getDay();
        weekdays[0] = "zondag";
        weekdays[1] = "maandag";
        weekdays[2] = "dinsdag";
        weekdays[3] = "woensdag";
        weekdays[4] = "donderdag";
        weekdays[5] = "vrijdag";
        weekdays[6] = "zaterdag";

        if (today == 2 || today == 5) {
            return "vandaag";
        } else if (today < 2 || today > 5) {
            return weekdays[2];
        } else {
            return weekdays[5];
        }

    }
}

export { EuroMillionsService };

