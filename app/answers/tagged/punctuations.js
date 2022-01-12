// first being most common
// frequency van 2 marks achter elkaar is 30% van de huidige frequency

export const PUNCTUATION_MARKS_PID = 50;

export const PUNCTUATION_MARKS = [
  { value: ".", tags: [], frequency: 100 },
  { value: ",", tags: [], frequency: 80 },
  { value: ";", tags: [], frequency: 5 },
  { value: "!", tags: ["ANGRY", "HAPPY"], frequency: 60 },
  { value: "?", tags: [], frequency: 80 },
  { value: "..", tags: [], frequency: 20 },
  { value: "...", tags: ["ANGRY"], frequency: 20 },
  { value: "......", tags: ["ANGRY"], frequency: 10 },
];
