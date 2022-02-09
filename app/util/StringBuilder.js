import { StringUtil } from "./StringUtil";

class StringBuilder {
  strings;

  constructor() {
    this.strings = [];
    return this;
  }

  append(value, caseCheck, punctuationList) {
    if (
      caseCheck &&
      StringUtil.lastCharEqualsOneOf(this.toString(), punctuationList)
    ) {
      value = StringUtil.firstCharToLower(value);
    }
    if (value) {
      this.strings.push(value);
    }
    return this;
  }

  appendFullStopIfNone(punctuations) {
    const punctuationList = punctuations ? punctuations : [",", ".", "?", "!"];
    if (!StringUtil.lastCharEqualsOneOf(this.toString(), punctuationList)) {
      this.append(".");
    }
    return this;
  }

  appendWithCasing(value, caseCheck, punctuationList) {
    if (
      caseCheck &&
      StringUtil.lastCharEqualsOneOf(this.toString(), punctuationList)
    ) {
      value = StringUtil.firstCharToUpper(value);
    } else {
      value = StringUtil.firstCharToLower(value);
    }
    if (value) {
      this.strings.push(" " + value);
    }
    return this;
  }

  clear() {
    this.strings = [];
    return this;
  }

  toString() {
    return this.strings.join("");
  }
}

export { StringBuilder };
