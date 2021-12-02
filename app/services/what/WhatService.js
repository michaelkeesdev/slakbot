import { sample } from "lodash";
import { NOUNS } from "./../../answers/words/RandomNouns";
import { VERBS } from "./../../answers/words/Verbs";
import { UserService } from "./../user/UserService";

class WhatService {
  getWhatAnswer(text) {
    let what = "Niks";

    let user = new UserService().getRandomUserRandomName();
    let decision = Math.floor(Math.random() * 10);
    let pidWhoIncl = Math.floor(Math.random() * 30);

    if (text) {
      decision = this.changeDecisionBasedOnText(text, decision);
    }

    if (decision < 7) {
      what = sample(NOUNS);
      if (pidWhoIncl === 1) {
        what = what + " van " + user;
      }
    }
    if (decision === 7) {
      what = sample(NOUNS) + " " + sample(VERBS);
    }
    if (decision === 8) {
      what = sample(VERBS);
    }
    if (decision === 9) {
      what = user;
    }
    return what;
  }

  changeDecisionBasedOnText(text, decision) {
    switch (text) {
      case text.match(new RegExp(/doen/)):
        decision = 8;
        break;
      default:
        decision = decision;
        break;
    }
    return decision;
  }
}

export { WhatService };
