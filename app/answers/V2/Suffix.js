import { frequencyList } from "../../util/FrequencyList";

export const SUFFIX_PID = 70; // 30/100%

export const SUFFIX = [
  { value: "he", tags: [], frequency: 100 },
  { value: "hoor", tags: ["HAPPY"], frequency: 30 },
  { value: "pff", tags: ["ANGRY", "SAD", "GRUMPY"], frequency: 80 },
  { value: "zucht", tags: ["ANGRY", "SAD", "GRUMPY"], frequency: 20 },
  { value: "ff", tags: [], frequency: 20 },
  { value: "nu", tags: [], frequency: 30 },
  { value: "mh", tags: [], frequency: 50 },
  { value: "denk ik", tags: [], frequency: 50 },
  { value: "denk", tags: [], frequency: 50 },
  { value: "nope", tags: ["ANGRY"], frequency: 20 },
  { value: "Sterf", tags: ["ANGRY", frequency: 3 },
];   

export const SUFFIX_FREQUENCY_LIST = SUFFIX.flatMap(frequencyList);
     