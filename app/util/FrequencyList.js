export function frequencyList(mark) {
  const list = [];
  for (let i = 0; i < mark.frequency; i++) {
    list.push({ value: mark.value, tags: mark.tags });
  }
  return list;
}
