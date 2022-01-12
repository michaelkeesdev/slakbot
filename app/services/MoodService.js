import { sample } from "lodash";
import { SCHELD } from "../answers/basic/Scheld";
import { EMOJIS } from "../answers/V2/Emojis";
import { ANGRY, BUSY, CONFUSED, HAPPY, KIND, SAD } from "../answers/V2/Tags";

const happyWords = EMOJIS.filter((emoji) => emoji.tags.includes(HAPPY));

class MoodService {
  currentMood = "";
  moods = [ANGRY, SAD, null, KIND, HAPPY];
  extraMoods = [CONFUSED, BUSY];
  MOOD_SWING_PID = 4;

  constructor() {}

  setMood(textInput) {
    const moodSwing = this.frequency(this.MOOD_SWING_PID);
    if (moodSwing || !this.currentMood) {
      this.currentMood = sample(this.moods);
    }
    if (new RegExp(SCHELD.join("|")).test(textInput)) {
      let i = this.moods.indexOf(this.currentMood);
      if (i > 0) {
        this.currentMood = this.moods[i--];
      }
    }

    if (new RegExp(happyWords.join("|")).test(textInput)) {
      let i = this.moods.indexOf(this.currentMood);
      if (i < this.moods.length - 1) {
        this.currentMood = this.moods[i++];
      }
    }
  }

  getMood() {
    console.log("mood", this.currentMood);
    return this.currentMood;
  }

  frequency(percent) {
    return Math.floor(Math.random() * 100) < percent;
  }

  random(up) {
    return Math.floor(Math.random() * up);
  }
}

export { MoodService };
