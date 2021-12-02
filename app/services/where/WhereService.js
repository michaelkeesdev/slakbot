import { sample } from "lodash";
import { WHY_ANSWERS } from "./../../answers/Why";
import { NOUNS } from "./../../answers/words/RandomNouns";
import { VERBS } from "./../../answers/words/Verbs";
import { ADJECTIVES } from "./../../answers/words/Adjectives";
import { SCHELD } from "./../../answers/basic/Scheld";
import { UserService } from "./../user/UserService";
import {
  PLACES_PLACE,
  PLACES_BASIC,
  PLACES_SPECIAL_PLACES,
  PLACES_WHO,
  PLACES_JOB,
} from "../../answers/Where";

class WhereService {
  getWhereAnswer(text) {
    let place = "Weet het ni";
    let user = new UserService().getRandomUserRandomName();

    let decision = Math.floor(Math.random() * 16);
    let pidScheld = Math.floor(Math.random() * 40);
    let pidAdjective = Math.floor(Math.random() * 40);
    let pidVerb = Math.floor(Math.random() * 40);
    let pidWhoIncl = Math.floor(Math.random() * 30);
    let pidWhoPlace = Math.floor(Math.random() * 10);

    if (text) {
      console.log("text", text);
      decision = this.changeDecisionBasedOnText(text, decision);
    }

    console.log("decision", decision);

    switch (decision) {
      case decision < 5:
        place = sample(PLACES_BASIC);
        break;
      case decision >= 5 && decision < 7:
        place = sample(PLACES_PLACE);
        break;
      case decision >= 5 && decision < 8:
        place = sample(PLACES_SPECIAL_PLACES);
        break;
      case decision >= 9 && decision < 12:
        place = sample(PLACES_WHO);
        if (pidWhoPlace === 1) {
          place = place + " van " + user;
        }
        break;
      case decision >= 13 && decision < 16:
        place = sample(PLACES_JOB);
        break;
    }
    if (pidAdjective === 1) {
      place = sample(ADJECTIVES) + " " + place;
    }
    if (pidScheld === 1) {
      place = place + " " + sample(SCHELD);
    }
    if (pidVerb === 1) {
      place = place + " " + sample(VERBS);
    }
    if (pidWhoIncl === 1) {
      place = place + " met " + user;
    }
    console.log("place", place);
    return place;
  }

  changeDecisionBasedOnText(text, decision) {
    switch (text) {
      case text.split(" ").includes("weekend"):
        decision = 6;
        break;
      default:
        decision = decision;
        break;
    }
    return decision;
  }
}

export { WhereService };
