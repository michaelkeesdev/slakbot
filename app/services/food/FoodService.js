import { sample } from "lodash";
import { BASIC_SUFFIX } from "../../answers/basic/BasicSuffix";
import { FOOD } from "../../answers/Food";
import { FOOD_TRIGGER_SUFFIX_EXCLUDE, FOOD_TRIGGER, FOOD_TRIGGER_SUFFIX_INCLUDE } from "../../answers/food/Food";

const NOTHING_FOUND = "Spijtig. niks gevonden voor u";

class FoodService {
  httpClient;
  tokenizer;

  constructor(httpClient, tokenizer) {
    this.httpClient = httpClient;
    this.tokenizer = tokenizer;
  }

  getRecaipie = async (text) => {

    

    let recipes = FOOD;
    if (text) {
      const prefixRegexp = new RegExp(`(?:^|\\W)(.*?)(${FOOD_TRIGGER.join('|')})(?:$|\\W)`, 'ig');
      const removedPrefixFromSuggest = text.replace(prefixRegexp, '');
      
      const suggestKeys = this.tokenizer.tokenize(removedPrefixFromSuggest);

      let including = true;
      recipes = FOOD.filter((food) =>
        suggestKeys.every((s) => {
          const excludeRegexp = new RegExp(`(?:^|\\W)(${FOOD_TRIGGER_SUFFIX_EXCLUDE.join('|')})(?:$|\\W)`, 'ig');
          const includeRegexp = new RegExp(`(?:^|\\W)(${FOOD_TRIGGER_SUFFIX_INCLUDE.join('|')})(?:$|\\W)`, 'ig');
          
          if(s.match(excludeRegexp) || s.match(includeRegexp)) {
            including = !s.match(excludeRegexp);
            return true;
          } else {
            return including ? food.includes(s.trim()) : !food.includes(s.trim());
          }
        })
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
