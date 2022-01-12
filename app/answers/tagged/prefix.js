import { frequencyList } from "../../util/FrequencyList";

export const PREFIX_PID = 75;
export const PREFIX_MOOD_PID = 90;

export const PREFIX = [
  { value: "Ja", tags: [], frequency: 100 },
  { value: "Mja", tags: ["ANGRY", "SAD"], frequency: 40 },
  { value: "Maja", tags: ["ANGRY", "SAD"], frequency: 40 },
  { value: "Mh", tags: [], frequency: 30 },
  { value: "Tf", tags: ["ANGRY"], frequency: 20 },
  { value: "Ik heb het opgezocht en", tags: ["ANGRY"], frequency: 4 },
  { value: "Ge bent een %SCHELD dus", tags: ["ANGRY"], frequency: 2 },
  { value: "Tf zegt ge", tags: ["ANGRY"], frequency: 2 },
  { value: "Och", tags: ["ANGRY", "SAD"], frequency: 5 },
  { value: "Pff", tags: ["ANGRY", "SAD"], frequency: 5 },
  { value: "Pfffff", tags: ["ANGRY", "SAD"], frequency: 2 },
  { value: "Meh", tags: ["ANGRY", "SAD"], frequency: 4 },
  { value: "Even denken", tags: [], frequency: 20 },
  { value: "Ah hm", tags: [], frequency: 20 },
  { value: "Euh", tags: [], frequency: 30 },
  { value: "Lachwekkend", tags: ["ANGRY"], frequency: 5 },
  { value: "Triest", tags: ["ANGRY"], frequency: 3 },
  { value: "Zielige %SCHELD", tags: ["ANGRY"], frequency: 2 },
  { value: "k", tags: ["ANGRY"], frequency: 6 },
  { value: "OK", tags: ["ANGRY"], frequency: 6 },
  { value: "Wat een zin", tags: ["ANGRY"], frequency: 3 },
  { value: "Blij dat je me stuurt", tags: ["HAPPY", "KIND"], frequency: 3 },
  { value: "Vermoeiend", tags: ["ANGRY", "SAD"], frequency: 8 },
  { value: "Halloooooooo", tags: ["ANGRY", "SAD"], frequency: 8 },
  { value: "Hey Hoi", tags: [], frequency: 3 },
  { value: "joepie", tags: ["HAPPY"], frequency: 5 },
];

export const PREFIX_FREQUENCY_LIST = PREFIX.flatMap(frequencyList);
