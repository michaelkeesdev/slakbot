import { sample } from "lodash";
import { BASIC_SUFFIX } from "../../answers/basic/BasicSuffix";
import { FOOD } from "../../answers/Food";

const NOTHING_FOUND = "Spijtig. niks gevonden voor u";

class FoodService {
  httpClient;
  tokenizer;

  constructor(httpClient, tokenizer) {
    this.httpClient = httpClient;
    this.tokenizer = tokenizer;
  }

  getRecaipie = async (suggest) => {
    let recipes = FOOD;
    if (suggest) {
      const suggestKeys = this.tokenizer.tokenize(suggest);
      recipes = FOOD.filter((food) =>
        suggestKeys.every((s) => food.includes(s))
      );
    }
    const recipe = sample(recipes);
    if (!recipe) {
      return `${NOTHING_FOUND}.. ${sample(BASIC_SUFFIX)}`;
    } else {
      return recipe;
    }
  };
}

export { FoodService };
